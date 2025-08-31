import { renewToken } from "@/lib/api/auth.api";
import { getToken, setCookie } from "@/lib/cookies";

export async function POST() {
  const refreshToken = await getToken("refreshToken");

  if (!refreshToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const response = await renewToken({ refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response;

    await setCookie("accessToken", accessToken);
    await setCookie("refreshToken", newRefreshToken);

    return Response.json({ accessToken });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
}
