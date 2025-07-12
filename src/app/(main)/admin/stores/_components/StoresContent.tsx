import Checkbox from "@/components/common/Checkbox";
import Dropdown from "@/components/common/Dropdown";
import Searchbar from "@/components/Searchbar";
import cn from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import StoresTable from "./StoresTable";

interface IProps {
  data: AdminStores[];
}

export default function StoresContent({ data }: IProps) {
  const { watch, setValue } = useFormContext();

  const toggleCheck = () => setValue("isChecked", !watch("isChecked"));

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-0 lg:px-5">
        <div className="mt-4 flex items-center gap-2 md:hidden">
          <Searchbar
            searchWord={watch("searchWord")}
            setSearchWord={(value) => setValue("searchWord", value)}
            placeholder={
              watch("isChecked")
                ? "매장명을 입력해주세요"
                : "신청자 이메일을 입력해주세요"
            }
          />
        </div>
        <div className="mt-4 flex items-center justify-between md:mt-6">
          <div className="flex w-full items-center justify-between gap-2">
            <Dropdown
              data={["전체", "접수", "재접수", "승인", "반려"]}
              defaultText="상태"
              active={watch("activeStatus")}
              setActive={(value) => setValue("activeStatus", value)}
              triggerClassName="lg:!text-base !w-[80px] lg:!w-[110px] !rounded-[20px]"
              className="lg:!text-base"
            />
            <div
              className={cn(
                "flex items-center gap-2 text-xs md:hidden",
                watch("isChecked") ? "text-gray-100" : "text-gray-300"
              )}
            >
              매장 검색
              <Checkbox checked={watch("isChecked")} onClick={toggleCheck} />
            </div>
          </div>
          <div className="hidden items-center justify-end gap-2 md:flex">
            <div
              className={cn(
                "flex flex-shrink-0 items-center gap-2 text-xs lg:text-base",
                watch("isChecked") ? "text-gray-100" : "text-gray-300"
              )}
            >
              매장 검색
              <Checkbox checked={watch("isChecked")} onClick={toggleCheck} />
            </div>
            <Searchbar
              searchWord={watch("searchWord")}
              setSearchWord={(value) => setValue("searchWord", value)}
              placeholder={
                watch("isChecked")
                  ? "매장명을 입력해주세요"
                  : "신청자 이메일을 입력해주세요"
              }
              className="md:text-s w-full lg:!w-[280px] lg:text-base"
            />
          </div>
        </div>
        <StoresTable data={data!} />
      </div>
    </div>
  );
}
