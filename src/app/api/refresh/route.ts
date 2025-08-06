import { renewToken } from "@/lib/api/auth.api";
import { getToken, setCookie } from "@/lib/cookies";

export async function POST() {
  const refreshToken = await getToken("refreshToken");
  if (!refreshToken) return new Response("Unauthorized", { status: 401 });

  try {
    const { accessToken } = await renewToken({ refreshToken });
    await setCookie("accessToken", accessToken);

    return Response.json({ accessToken });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
