import Image from "next/image";

export default function SignupCompleted() {
  return (
    <div className="mt-[-100px] flex h-full w-full flex-col items-center justify-center gap-6 text-center md:mt-[-20px]">
      <Image
        src="/gif/signup-completed.gif"
        width={150}
        height={150}
        alt="회원가입 로딩 이미지"
        className="md:h-30 md:w-30 lg:h-[150px] lg:w-[150px]"
      />
      <div className="flex flex-col gap-2 md:mt-0 lg:mt-7">
        <p className="text-gray-0 font-semibold md:text-lg lg:text-2xl">
          회원가입이 완료되었어요!
        </p>
        <span className="font-regular text-center text-gray-300 md:text-sm lg:text-lg">
          이메일 인증을 위해 등록하신 이메일을 확인해주세요.
          <br />
          인증을 완료하셔야 서비스 이용이 가능합니다.
        </span>
      </div>
      <div className="mt-8 flex items-center justify-center rounded-[12px] bg-gray-700 text-gray-300 md:h-[51px] md:w-[292px] md:text-lg md:font-medium lg:h-[60px] lg:w-[432px] lg:text-xl">
        asdfasdf@gmail.com
      </div>
    </div>
  );
}
