import Dropdown from "@/components/common/Dropdown";
import { useFormContext } from "react-hook-form";
import { TypeUserForm } from "../_schema/user.schema";

function DropdownGroup() {
  const { watch, setValue } = useFormContext<TypeUserForm>();

  return (
    <div className="flex items-center gap-2 md:gap-1 lg:gap-2">
      <Dropdown
        data={["전체", "사장님", "사용자", "관리자"]}
        defaultText="권한"
        setActive={(value) =>
          setValue(
            "active.permission",
            value as TypeUserForm["active"]["permission"]
          )
        }
        active={watch("active.permission")}
        triggerClassName="!rounded-[40px] text-s lg:!text-sm min-w-[65px] lg:min-w-[90px]"
      />
      <Dropdown
        data={["전체", "구독", "미구독", "구독철회"]}
        defaultText="구독 상태"
        setActive={(value) =>
          setValue(
            "active.subscription",
            value as TypeUserForm["active"]["subscription"]
          )
        }
        active={watch("active.subscription")}
        triggerClassName="lg:min-w-[110px] min-w-[94px] !rounded-[40px] text-s lg:!text-sm"
      />
      <Dropdown
        data={["전체", "Y", "N"]}
        defaultText="매장 여부"
        setActive={(value) =>
          setValue(
            "active.storeAccepted",
            value as TypeUserForm["active"]["storeAccepted"]
          )
        }
        active={watch("active.storeAccepted")}
        triggerClassName="lg:min-w-[110px] min-w-[94px] !rounded-[40px] text-s lg:!text-sm"
      />
      <Dropdown
        data={["전체", "활성화", "비활성화"]}
        defaultText="상태"
        setActive={(value) =>
          setValue("active.status", value as TypeUserForm["active"]["status"])
        }
        active={watch("active.status")}
        triggerClassName="!rounded-[40px] text-s lg:!text-sm lg:min-w-[90px] min-w-[65px]"
      />
    </div>
  );
}

export default DropdownGroup;
