import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Spinner from "@/components/common/Spinner";

interface IProps {
  disabled: boolean;
  loading: boolean;
  onCheckAuth: () => void;
}

export default function AuthButton({ disabled, loading, onCheckAuth }: IProps) {
  return (
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
  );
}
