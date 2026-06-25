import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "@/server/trpc";

const allowed = ["png", "jpg", "jpeg", "webp"] as const;

function getS3Client() {
  const region = process.env.AWS_REGION ?? "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    return null;
  }
  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export const uploadRouter = router({
  presignedPut: protectedProcedure
    .input(
      z.object({
        contentType: z.enum(["image/png", "image/jpeg", "image/webp"]),
        extension: z.enum(allowed),
      }),
    )
    .mutation(async ({ input }) => {
      const bucket = process.env.S3_BUCKET;
      const region = process.env.AWS_REGION ?? "us-east-1";
      const client = getS3Client();
      if (!bucket || !client) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "S3 is not configured (S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).",
        });
      }

      const key = `uploads/${crypto.randomUUID()}.${input.extension}`;
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: input.contentType,
      });

      const uploadUrl = await getSignedUrl(client, command, { expiresIn: 120 });
      const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

      return { uploadUrl, key, publicUrl };
    }),
});
