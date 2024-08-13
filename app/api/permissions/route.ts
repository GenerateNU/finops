export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getMember } from "@/lib/sheets";

const schema = z.object({ email: z.string().email() });

type PermissionsResponse = {
  isAuthorized: boolean;
  message: string;
  data?: object;
};

export async function POST(
  request: Request,
): Promise<NextResponse<PermissionsResponse>> {
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

    return NextResponse.json({
      isAuthorized: true,
      message: "User authenticated",
      data: member,
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
