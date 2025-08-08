import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Spinner from "@/components/common/Spinner";

interface IProps {
  authTime: number;
  disabled: boolean;
  loading: boolean;
  onCheckAuth: () => void;
}

export default function AuthButton({
  authTime,
  disabled,
  loading,
  onCheckAuth,
}: IProps) {
  return (
    <>
      {authTime > 0 && (
        <div className="font-regular absolute top-1/2 right-0 -translate-y-1/2 transform text-[15px] text-gray-200 transition-all duration-300 ease-in-out sm:right-25 sm:mt-[-2px]">
          {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
        </div>
      )}
      <ResponsiveButton
        type="button"
        color="black"
        disabled={disabled}
        onClick={onCheckAuth}
        responsiveButtons={{
          sm: { buttonSize: "sm", className: "w-[120px]" },
          md: { buttonSize: "sm", className: "w-[94px]" },
          lg: { buttonSize: "lg", className: "w-[120px]" },
        }}
      >
        {loading ? <Spinner /> : "확인"}
      </ResponsiveButton>
    </>
  );
}
