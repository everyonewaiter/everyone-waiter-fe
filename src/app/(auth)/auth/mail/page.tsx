import { verifyEmail } from "@/lib/api/auth.api";
import { redirect } from "next/navigation";
import Resend from "./_components/Resend";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email: string }>;
}) {
  const { token, email } = await searchParams;

  if (!token) {
    return (
      <Resend
        title="잘못된 접근입니다."
        subtitle="아래 재발송 버튼을 눌러 인증 이메일을 다시 받아보세요."
        email={email}
      />
    );
  }

  try {
    await verifyEmail({ token });

    redirect("/login");
  } catch (error) {
    const code = (error as any)?.response?.data.code;
    if (code === "EXPIRED_VERIFICATION_EMAIL" || code === "ACCOUNT_NOT_FOUND") {
      return (
        <Resend
          title="잘못된 접근입니다."
          subtitle="아래 재발송 버튼을 눌러 인증 메일을 다시 받아보세요."
          email={email}
        />
      );
    }

    redirect("/login");
  }
}
