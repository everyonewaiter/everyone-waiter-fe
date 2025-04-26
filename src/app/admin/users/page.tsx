"use client";

import Dropdown from "@/components/common/Dropdown";
import Paginations from "@/components/common/Pagination/Paginations";
import Searchbar from "@/components/Searchbar";
import SectionHeader from "@/components/SectionHeader";
// import Table from '@/components/Table';
import { useState } from "react";

// const itemWidths = {
//   _: {
//     className: "hidden sm:table-cell lg:w-[66px] md:w-[64px]",
//     text: "isChecked",
//   },
//   이메일: {
//     className: "hidden sm:table-cell flex-1",
//     text: "email",
//   },
//   가입일시: {
//     className: "hidden sm:table-cell flex-1",
//     text: "createdAt",
//   },
//   권한: {
//     className: "hidden sm:table-cell flex-1",
//     text: "permission",
//   },
//   구독상태: {
//     className: "hidden sm:table-cell flex-1",
//     text: "subscribe",
//   },
//   매장여부: {
//     className: "hidden sm:table-cell flex-1",
//     text: "storeAccepted",
//   },
//   상태: {
//     className: "hidden sm:table-cell flex-1",
//     text: "status",
//   },
// };

export default function Users() {
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState({
    permission: "",
    subscription: "",
    storeAccepted: "",
    status: "",
  });

  const submitHandler = () => {};
  return (
    <div className="h-full w-full">
      <SectionHeader title="회원 관리" />

      <div className="mt-6 flex h-12 w-full items-center justify-between">
        <div className="flex w-full items-center gap-2">
          <Dropdown
            data={["전체", "사장님", "사용자", "관리자"]}
            defaultText="권한"
            setActive={(value) =>
              setActive((prev) => ({ ...prev, permission: value }))
            }
            active={active.permission}
            className="ml-10"
          />
          <Dropdown
            data={["구독", "미구독", "구독철회"]}
            defaultText="구독 상태"
            setActive={(value) =>
              setActive((prev) => ({ ...prev, subscription: value }))
            }
            active={active.subscription}
          />
          <Dropdown
            data={["등록 매장", "미등록 매장"]}
            defaultText="매장 여부"
            setActive={(value) =>
              setActive((prev) => ({ ...prev, storeAccepted: value }))
            }
            active={active.storeAccepted}
          />
          <Dropdown
            data={["활성화", "비활성화"]}
            defaultText="상태"
            setActive={(value) =>
              setActive((prev) => ({ ...prev, status: value }))
            }
            active={active.status}
            className="ml-10"
          />
        </div>
        <Searchbar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSubmit={submitHandler}
        />
      </div>
      {/* <Table className='w-full'>
        <Table.THeadLayout>
          {Object.keys(itemWidths).map((key) => (
            <Table.THead
              key={key}
              value={key}
              className={itemWidths[key as keyof typeof itemWidths].className}
            />
          ))}
        </Table.THeadLayout>
        <Table.RowLayout>
          {data?.map((item, idx) => (
            <Table.Row
              key={item.registrationId.toString()}
              {...item}
              index={idx + 1}
              itemWidths={itemWidths}
            />
          ))}
        </Table.RowLayout>
      </Table> */}
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        totalPages={1}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
