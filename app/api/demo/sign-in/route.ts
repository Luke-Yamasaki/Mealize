import { NextResponse } from "next/server";
import { z } from "zod";

import { createDemoSignInToken } from "@/lib/demo-clerk";
import { DEMO_PERSONA_IDS, isDemoPersonaId } from "@/lib/demo-personas";

export const runtime = "nodejs";

const bodySchema = z.object({
  persona: z.string(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success || !isDemoPersonaId(parsed.data.persona)) {
    return NextResponse.json(
      {
        error: "Unknown demo persona.",
        personas: DEMO_PERSONA_IDS,
      },
      { status: 400 },
    );
  }

  if (!process.env.CLERK_SECRET_KEY) {
    return NextResponse.json(
      { error: "CLERK_SECRET_KEY is not configured." },
      { status: 501 },
    );
  }

  try {
    const result = await createDemoSignInToken(parsed.data.persona);
    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not start demo sign-in.";
    console.error("[demo/sign-in]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    personas: DEMO_PERSONA_IDS,
  });
}
