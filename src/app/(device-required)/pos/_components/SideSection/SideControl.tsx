import { MinusIcon, PlusIcon } from "@/components/common/Icon/index";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon/Icon";
import useCheckedMenuStore from "../../_hooks/useCheckedMenu";
import { useOrderStore } from "../../_hooks/useOrderStore";

interface IProps {
  orderType: DevicePayment;
  onCancelOrder: () => void;
  onUpdateOrder: (type: "add" | "sub") => void;
}

export default function SideControl({
  orderType,
  onCancelOrder,
  onUpdateOrder,
}: IProps) {
  const { checkedMenu } = useCheckedMenuStore();

  const { updateQuantity, orders } = useOrderStore();

  const handleQuantity = (type: "add" | "sub") =>
    updateQuantity(checkedMenu.menuId, checkedMenu.key, type);

  const handleUpdateMenu = (type: "add" | "sub") => {
    onUpdateOrder(type);
  };

  return orders.length ? (
    <div className="flex justify-end gap-3 pb-8">
      {/* quantity - 1 */}
      <Button
        variant="outline"
        color="grey"
        className="button-xl !w-14 !rounded-xl border-gray-600 !px-0 !text-gray-300"
        onClick={() => handleQuantity("sub")}
      >
        <MinusIcon size={24} />
      </Button>
      {/* quantity + 1 */}
      <Button
        variant="outline"
        color="grey"
        className="button-xl !w-14 !rounded-xl border-gray-600 !px-0 !text-gray-300"
        onClick={() => handleQuantity("add")}
      >
        <PlusIcon size={24} />
      </Button>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-3 pb-8">
      <div className="flex items-center gap-3">
        {/* 메뉴 수정 (-1) */}
        <Button
          variant="outline"
          color="grey"
          className="button-xl !w-14 !rounded-xl border-gray-600 !px-0 !text-gray-300"
          onClick={() => handleUpdateMenu("sub")}
        >
          <MinusIcon size={24} />
        </Button>
        {/* 메뉴 수정 (+1) */}
        <Button
          variant="outline"
          color="grey"
          className="button-xl !w-14 !rounded-xl border-gray-600 !px-0 !text-gray-300"
          onClick={() => handleUpdateMenu("add")}
        >
          <PlusIcon size={24} />
        </Button>
      </div>
      {/* 주문 하나 삭제 */}
      {orderType === "POSTPAID" && (
        <Button
          variant="outline"
          color="grey"
          className="button-xl !w-14 !rounded-xl border-gray-600 !px-0 !text-gray-300"
          onClick={onCancelOrder}
        >
          <Icon iconKey="trash" size={24} />
        </Button>
      )}
    </div>
  );
}
