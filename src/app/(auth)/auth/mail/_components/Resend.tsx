import ResponsiveButton from "@/components/common/Button/ResponsiveButton";

interface IProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function Resend({ title, subtitle, onClick }: IProps) {
  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <strong className="text-gray-0 text-2xl font-semibold sm:text-lg">
          {title}
        </strong>
        <span className="font-regular text-base whitespace-pre-line text-gray-300 sm:text-sm">
          {subtitle}
        </span>
      </div>
      <ResponsiveButton
        type="button"
        responsiveButtons={{
          lg: { buttonSize: "lg" },
          md: { buttonSize: "md" },
          sm: { buttonSize: "md" },
        }}
        commonClassName="mt-8 font-regular"
        onClick={onClick}
      >
        이메일 재발송하기
      </ResponsiveButton>{" "}
    </>
  );
}
