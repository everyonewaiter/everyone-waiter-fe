import { PlusIcon } from "@/components/common/Icon/index";
import Button from "@/components/common/Button/Button";
import cn from "@/lib/utils";
import { Fragment } from "react";
import { hallQueries } from "../_query/useHall";

interface IProps extends TableOrderMenu {
  completed?: boolean;
  orderId: string;
}

export default function OrderCard({ completed, orderId, ...props }: IProps) {
  const serve = hallQueries.useServeMenu();

  const handleComplete = () => {
    serve.mutate({ orderId, orderMenuId: props.orderMenuId });
  };

  return (
    <div
      className={cn(
        "flex w-[320px] flex-col gap-6 rounded-[24px] border border-gray-600 p-6",
        completed ? "h-[245px]" : "h-[279px]"
      )}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <strong className="text-2xl font-semibold text-gray-100">
            {props.name}
          </strong>
          <span className="text-xl font-semibold text-gray-100">
            {props.quantity}개
          </span>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {props.orderOptionGroups.map((option) => (
            <Fragment key={option.orderOptionGroupId}>
              {option.orderOptions.map((o) => (
                <div
                  key={o.name}
                  className="flex items-center justify-between font-medium text-[#2E7BB3]"
                >
                  <span className="flex items-center text-base">
                    <PlusIcon
                      size={16}
                      className="mr-1 ml-0.5"
                      strokeWidth={1}
                    />
                    {o.name}
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      {!completed && (
        <Button
          variant="outline"
          color="black"
          className="button-lg w-full !border-gray-200 text-lg !font-medium text-gray-200"
          onClick={handleComplete}
        >
          완료
        </Button>
      )}
    </div>
  );
}
