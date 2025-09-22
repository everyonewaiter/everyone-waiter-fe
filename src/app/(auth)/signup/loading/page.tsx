import Image from "next/image";

export default function SignupLoading() {
  return (
    <div className="mt-[-100px] flex h-full w-full flex-col items-center justify-center gap-6 text-center md:mt-[-20px]">
      <Image
        src="/gif/signup-loading.gif"
        width={300}
        height={300}
        alt="회원가입 로딩 이미지"
        className="object-cover md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]"
      />
      <div className="mt-[-30px] flex flex-col gap-1 lg:gap-2">
        <p className="text-gray-0 text-lg font-semibold lg:text-2xl">
          가입 절차를 마무리하고 있어요!
        </p>
        <span className="font-regular text-sm text-gray-300 lg:text-lg">
          잠깐만 기다려주세요.
        </span>
      </div>
    </div>
  );
}
