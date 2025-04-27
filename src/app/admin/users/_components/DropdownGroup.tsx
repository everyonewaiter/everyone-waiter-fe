import Dropdown from "@/components/common/Dropdown";
import { TypeActive } from "../page";

function DropdownGroup({
  active,
  setActive,
}: {
  active: TypeActive;
  setActive: (prev: any) => any;
}) {
  return (
    <>
      <Dropdown
        data={["전체", "사장님", "사용자", "관리자"]}
        defaultText="권한"
        setActive={(value) =>
          setActive((prev: TypeActive) => ({
            ...prev,
            permission: value,
          }))
        }
        active={active.permission}
        className="ml-10"
      />
      <Dropdown
        data={["전체", "구독", "미구독", "구독철회"]}
        defaultText="구독 상태"
        setActive={(value) =>
          setActive((prev: TypeActive) => ({ ...prev, subscription: value }))
        }
        active={active.subscription}
      />
      <Dropdown
        data={["전체", "등록 매장", "미등록 매장"]}
        defaultText="매장 여부"
        setActive={(value) =>
          setActive((prev: TypeActive) => ({ ...prev, storeAccepted: value }))
        }
        active={active.storeAccepted}
      />
      <Dropdown
        data={["전체", "활성화", "비활성화"]}
        defaultText="상태"
        setActive={(value) =>
          setActive((prev: TypeActive) => ({ ...prev, status: value }))
        }
        active={active.status}
        className="ml-10"
      />
    </>
  );
}

export default DropdownGroup;
