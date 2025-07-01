import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useOrderStore } from "../../_hooks/useOrderStore";
import useCheckedMenuStore from "../../_hooks/useCheckedMenu";

interface IProps {
  orderType: DevicePayment;
  onCancelOrder: () => void;
  onCancelMenu: () => void;
}

export default function SideControl({
  orderType,
  onCancelOrder,
  onCancelMenu,
}: IProps) {
  const { checkedMenu } = useCheckedMenuStore();
  const { updateQuantity, orders } = useOrderStore();

  const handleQuantity = (type: "add" | "sub") =>
    updateQuantity(checkedMenu.menuId, checkedMenu.key, type);

  return orders.length ? (
    <div className="flex justify-end gap-3 pb-8">
      {/* quantity - 1 */}
      <Button
        variant="outline"
        color="grey"
        className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
        onClick={() => handleQuantity("sub")}
      >
        <MinusIcon size={24} />
      </Button>
      {/* quantity + 1 */}
      <Button
        variant="outline"
        color="grey"
        className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
        onClick={() => handleQuantity("add")}
      >
        <PlusIcon size={24} />
      </Button>
    </div>
  ) : (
    <div className="flex items-center justify-end gap-3 pb-8">
      {/* 메뉴 하나 삭제 */}
      <Button
        variant="outline"
        color="grey"
        className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
        onClick={onCancelMenu}
      >
        <MinusIcon size={24} />
      </Button>
      {/* 주문 하나 삭제 */}
      {orderType === "POSTPAID" && (
        <Button
          variant="outline"
          color="grey"
          className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
          onClick={onCancelOrder}
        >
          <Icon iconKey="trash" size={24} />
        </Button>
      )}
    </div>
  );
}
