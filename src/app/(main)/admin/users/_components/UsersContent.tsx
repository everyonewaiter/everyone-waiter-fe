import Searchbar from "@/components/Searchbar";
import { useFormContext } from "react-hook-form";
import DropdownGroup from "./DropdownGroup";
import UsersTable from "./UsersTable";
import { TypeUserSearchForm } from "../_schema/user.schema";

interface IProps {
  debouncedValue: string;
  data: AdminAccount[];
}

export default function UsersContent({ debouncedValue, data }: IProps) {
  const { watch, setValue } = useFormContext<TypeUserSearchForm>();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-4 flex w-full px-0 md:hidden lg:px-5">
        <Searchbar
          searchWord={debouncedValue}
          setSearchWord={(value) => setValue("searchWord", value)}
        />
      </div>
      <div className="-mx-5 mt-6 block overflow-x-auto px-5 pb-6 [scrollbar-width:'none'] md:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full items-center gap-2">
          <DropdownGroup />
        </div>
      </div>
      <div className="-mt-3 w-full pb-10 md:hidden">
        <UsersTable data={data} />
      </div>
      <div className="mt-6 hidden items-center justify-between md:flex">
        <DropdownGroup />
        <div className="hidden md:flex">
          <Searchbar
            searchWord={watch("searchWord")}
            setSearchWord={(value) => setValue("searchWord", value)}
          />
        </div>
      </div>
      <div className="hidden md:block">
        <UsersTable data={data} />
      </div>
    </div>
  );
}
