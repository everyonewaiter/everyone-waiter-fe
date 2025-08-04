import ResponsiveButton from "@/components/common/Button/ResponsiveButton";

interface IProps {
  data?: string;
  onAction: (key: string) => void;
}

export default function StoreSection({ data, onAction }: IProps) {
  return (
    <div>
      <h2 className="font-gray-0 before:bg-primary flex flex-row items-center gap-3 text-[15px] font-semibold before:inset-0 before:h-4 before:w-[2px] md:text-base lg:text-lg">
        매장
      </h2>
      <p className="mt-3 text-sm font-medium text-gray-100 md:mt-4">
        주방 프린터기와 연결된 기기를 선택해주세요.
      </p>
      <div className="mt-3 flex flex-row gap-3">
        {["POS", "HALL"].map((key) => {
          const isActive = data === key;
          return (
            <ResponsiveButton
              key={key}
              variant="outline"
              color={isActive ? "primary" : "grey"}
              responsiveButtons={{
                lg: {
                  buttonSize: "custom",
                  className: `h-10 w-full px-5 rounded-[8px]`,
                },
                md: {
                  buttonSize: "sm",
                  className: `w-full`,
                },
                sm: {
                  buttonSize: "sm",
                  className: `flex w-full`,
                },
              }}
              commonClassName={isActive ? "" : "border-gray-500"}
              onClick={() => onAction(key)}
            >
              {key === "HALL" ? "홀" : key}
            </ResponsiveButton>
          );
        })}
      </div>
    </div>
  );
}
