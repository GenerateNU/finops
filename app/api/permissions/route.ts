export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getMember } from "@/lib/drive/sheets";

const schema = z.object({ email: z.string().email() });

export type PostPermissionsResponse = {
  isAuthorized: boolean;
  message: string;
  data?: {
    role?: string;
    branch?: string;
    team?: string;
    position?: string;
  };
};

export async function POST(
  request: Request,
): Promise<NextResponse<PostPermissionsResponse>> {
  const req = await request.json();
  const parsed = schema.safeParse(req);

  if (!parsed.success) {
    return NextResponse.json(
      {
        isAuthorized: false,
        message: "Invalid request",
      },
      { status: 400 },
    );
  }

  try {
    const member = await getMember(parsed.data.email);

    if (member?.finOpsAccess.toLowerCase() === "false") {
      return NextResponse.json(
        {
          isAuthorized: false,
          message: "User is not permitted",
        },
        { status: 403 },
      );
    }

    return NextResponse.json({
      isAuthorized: true,
      message: "User authenticated",
      data: {
        role: member?.finOpsAccess.toLowerCase() || "member",
        branch: member?.branch,
        team: member?.team,
        position: member?.position
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        isAuthorized: false,
        message: "Unable to authenticate user",
      },
      { status: 500 },
    );
  }
}
