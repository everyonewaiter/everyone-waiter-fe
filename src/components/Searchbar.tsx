import { Search } from "lucide-react";

interface IProps {
  searchWord: string;
  setSearchWord: (value: string) => void;
  onSubmit: () => void;
}

export default function Searchbar({
  searchWord,
  setSearchWord,
  onSubmit,
}: IProps) {
  return (
    <div className="flex h-8 w-full items-center justify-between rounded-[24px] border border-gray-600 bg-gray-700 px-4 md:mx-0 md:w-70 md:px-4 lg:ml-5 lg:h-[46px]">
      <input
        className="w-full text-sm outline-none md:text-xs lg:text-base"
        placeholder="검색어를 입력해주세요."
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <Search
        width={24}
        height={24}
        className="h-[18px] w-[18px] text-gray-300 lg:h-6 lg:w-6"
      />
    </div>
  );
}
