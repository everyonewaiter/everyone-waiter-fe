import Dropdown from "@/components/common/Dropdown";
import { useFormContext } from "react-hook-form";
import { TypeUserSearchForm } from "../_schema/user.schema";

function DropdownGroup() {
  const { watch, setValue } = useFormContext<TypeUserSearchForm>();

  return (
    <div className="flex items-center gap-2 md:gap-1 lg:gap-2">
      <Dropdown
        data={["전체", "사장님", "사용자", "관리자"]}
        defaultText="권한"
        setActive={(value) =>
          setValue(
            "active.permission",
            value as TypeUserSearchForm["active"]["permission"]
          )
        }
        active={watch("active.permission")}
        triggerClassName="text-s lg:!text-sm"
      />
      {/* <Dropdown
        data={["전체", "구독", "미구독", "구독철회"]}
        defaultText="구독 상태"
        setActive={(value) =>
          setValue(
            "active.subscription",
            value as TypeUserSearchForm["active"]["subscription"]
          )
        }
        active={watch("active.subscription")}
        triggerClassName="text-s lg:!text-sm"
      /> */}
      <Dropdown
        data={["전체", "Y", "N"]}
        defaultText="매장 여부"
        setActive={(value) =>
          setValue(
            "active.storeAccepted",
            value as TypeUserSearchForm["active"]["storeAccepted"]
          )
        }
        active={watch("active.storeAccepted")}
        triggerClassName="text-s lg:!text-sm"
      />
      <Dropdown
        data={["전체", "활성화", "비활성화"]}
        defaultText="상태"
        setActive={(value) =>
          setValue(
            "active.status",
            value as TypeUserSearchForm["active"]["status"]
          )
        }
        active={watch("active.status")}
        triggerClassName="text-s lg:!text-sm"
      />
    </div>
  );
}

export default DropdownGroup;
