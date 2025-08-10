import { setCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();
    await setCookie("refreshToken", refreshToken);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "토큰 저장 실패",
      },
      { status: 500 }
    );
  }
}
