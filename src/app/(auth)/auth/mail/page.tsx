import { sendAuthMail, verifyEmail } from "@/lib/api/auth.api";
import { redirect } from "next/navigation";
import Resend from "./_components/Resend";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email: string }>;
}) {
  const { token, email } = (await searchParams) as {
    token: string;
    email: string;
  };

  const handleResend = () => {
    sendAuthMail({ email })
      .then(() => redirect("/login"))
      .catch((e) => {
        const errorCode = (e as any)?.response?.data?.code;
        if (errorCode === "ALREADY_VERIFIED_EMAIL") {
          // eslint-disable-next-line
          alert("이미 이메일 인증이 완료된 계정입니다.");
          redirect("/login");
        } else if (errorCode === "ACCOUNT_NOT_FOUND") {
          // eslint-disable-next-line
          alert("잘못된 접근입니다. 이메일을 확인해주세요.");
          redirect("/login");
        }
      });
  };

  if (!token) {
    return (
      <Resend
        title="잘못된 접근입니다."
        subtitle="아래 재발송 버튼을 눌러 인증 이메일을 다시 받아보세요."
        onClick={handleResend}
      />
    );
  }

  try {
    await verifyEmail({ token });
    // eslint-disable-next-line
    alert("인증 되었습니다.");
    redirect("/login");
  } catch (error) {
    const code = (error as any)?.response?.data.code;
    if (code === "EXPIRED_VERIFICATION_EMAIL" || code === "ACCOUNT_NOT_FOUND") {
      return (
        <Resend
          title="잘못된 접근입니다."
          subtitle="아래 재발송 버튼을 눌러 인증 메일을 다시 받아보세요."
          onClick={handleResend}
        />
      );
    }

    if (code === "ALREADY_VERIFIED_EMAIL") {
      // eslint-disable-next-line
      alert("이미 이메일 인증이 완료된 계정입니다.");
      redirect("/login");
    }

    redirect("/login");
  }
}
