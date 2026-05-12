import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { PrismaClient } from "@prisma/client";

import { router, protectedProcedure } from "@/server/trpc";

type TRPCCtx = { prisma: PrismaClient; userId: string | null };

async function requireDbUser(ctx: TRPCCtx) {
  const user = await ctx.prisma.user.findUnique({
    where: { clerkId: ctx.userId! },
  });
  if (!user) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "App user profile not found.",
    });
  }
  return user;
}

function assertBoardParticipant(board: { userOne: number; userTwo: number }, userId: number) {
  if (board.userOne !== userId && board.userTwo !== userId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Not a participant in this conversation" });
  }
}

export const messageRouter = router({
  listBoards: protectedProcedure.query(async ({ ctx }) => {
    const me = await requireDbUser(ctx);
    const boards = await ctx.prisma.messageboard.findMany({
      where: {
        OR: [{ userOne: me.id }, { userTwo: me.id }],
      },
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { sender: true },
        },
        userOneRel: { select: { id: true, firstName: true, lastName: true, profileImageUrl: true } },
        userTwoRel: { select: { id: true, firstName: true, lastName: true, profileImageUrl: true } },
      },
    });
    return boards.map((b) => {
      const peer = b.userOne === me.id ? b.userTwoRel : b.userOneRel;
      return {
        id: b.id,
        createdAt: b.createdAt,
        peer,
        lastMessage: b.messages[0] ?? null,
      };
    });
  }),

  boardDetail: protectedProcedure
    .input(z.object({ boardId: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const me = await requireDbUser(ctx);
      const board = await ctx.prisma.messageboard.findUnique({
        where: { id: input.boardId },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
            include: { sender: true, post: true },
          },
          userOneRel: true,
          userTwoRel: true,
        },
      });
      if (!board) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Conversation not found" });
      }
      assertBoardParticipant(board, me.id);
      return board;
    }),

  /** First message in a new board between current user and recipient. */
  startConversation: protectedProcedure
    .input(
      z.object({
        recipientUserId: z.number().int(),
        content: z.string().min(1).max(500),
        postId: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const me = await requireDbUser(ctx);
      if (input.recipientUserId === me.id) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot message yourself" });
      }
      const peer = await ctx.prisma.user.findUnique({
        where: { id: input.recipientUserId },
      });
      if (!peer) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Recipient not found" });
      }
      const u1 = Math.min(me.id, input.recipientUserId);
      const u2 = Math.max(me.id, input.recipientUserId);
      let board = await ctx.prisma.messageboard.findFirst({
        where: { userOne: u1, userTwo: u2 },
      });
      if (!board) {
        board = await ctx.prisma.messageboard.create({
          data: { userOne: u1, userTwo: u2 },
        });
      }
      const message = await ctx.prisma.message.create({
        data: {
          boardId: board.id,
          senderId: me.id,
          content: input.content,
          postId: input.postId,
        },
        include: { sender: true, post: true },
      });
      return { boardId: board.id, message };
    }),

  /** Reply in an existing board. */
  reply: protectedProcedure
    .input(
      z.object({
        boardId: z.number().int(),
        content: z.string().min(1).max(500),
        postId: z.number().int().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const me = await requireDbUser(ctx);
      const board = await ctx.prisma.messageboard.findUnique({
        where: { id: input.boardId },
      });
      if (!board) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Conversation not found" });
      }
      assertBoardParticipant(board, me.id);
      const message = await ctx.prisma.message.create({
        data: {
          boardId: input.boardId,
          senderId: me.id,
          content: input.content,
          postId: input.postId,
        },
        include: { sender: true, post: true },
      });
      return message;
    }),
});
