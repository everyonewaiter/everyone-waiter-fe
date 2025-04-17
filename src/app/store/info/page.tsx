"use client";

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
import { Form } from "@/components/common/form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import SectionHeader from "@/components/SectionHeader";
import { storeInfoSchema, TypeStoreInfo } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@public/icons/edit-contained.svg";
import DeleteIcon from "@public/icons/trash-02.svg";
import { Plus } from "lucide-react";

interface OriginItem {
  item: string;
  origin: string;
  name: string;
}

export default function StoreInfo() {
  const [countryOfOrigins] = useState<OriginItem[]>([
    {
      item: "소",
      origin: "국내산",
      name: "등심",
    },
    {
      item: "소",
      origin: "국내산",
      name: "안심",
    },
  ]);
  // const [newItem, setNewItem] = useState<OriginItem>({
  //   item: "",
  //   origin: "",
  //   name: "",
  // });
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<TypeStoreInfo>({
    mode: "onChange",
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      name: "모두의 웨이터",
      license: "NNN-NN-NNNNN",
      address: "주소",
    },
  });

  function TableRow({ children }: { children: ReactNode }) {
    return (
      <div
        className={`center h-full ${isEditing ? "grow-[0.25]" : "grow-[0.33]"}`}
      >
        {children}
      </div>
    );
  }

  // const handleDeleteItem = (item: OriginItem) => { }

  return (
    <div className="h-full w-full">
      <SectionHeader title="매장 정보" className="hidden md:flex" />
      <div className="mt-10 flex w-full flex-col items-center overflow-y-scroll md:mt-6 md:h-[calc(100%-45px)] md:justify-start lg:h-[calc(100%-65px)] lg:justify-center">
        <div className="w-80 md:w-[272px] lg:w-120">
          <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
            매장 정보
          </h1>
          <div className="md:text-s font-regular gap-1/2 mt-2 flex flex-col text-xs text-gray-300 lg:mt-3 lg:text-sm">
            <span>등록된 매장 정보를 확인할 수 있습니다.</span>
            <span>변경된 정보가 있다면 언제든지 수정해 주세요.</span>
          </div>
          <div className="my-8 flex flex-col md:my-6 lg:my-10">
            <Form {...form}>
              <form className="flex flex-col gap-3 lg:gap-4">
                <LabeledInput
                  form={form}
                  label="상호명"
                  name="name"
                  disabled={!isEditing}
                  labelDisabled={!isEditing}
                />
                <LabeledInput
                  form={form}
                  label="사업자 번호"
                  name="license"
                  disabled={!isEditing}
                  labelDisabled={!isEditing}
                />
                <LabeledInput
                  form={form}
                  label="주소"
                  name="address"
                  disabled={!isEditing}
                  labelDisabled={!isEditing}
                />
                <Label>원산지</Label>
                {countryOfOrigins.length > 0 ? (
                  <div className="text-s flex flex-col overflow-hidden rounded-[12px] border border-gray-600 font-medium">
                    <div className="flex h-10 w-full bg-gray-700">
                      <TableRow>품목</TableRow>
                      <TableRow>원산지</TableRow>
                      <TableRow>음식명</TableRow>
                      {isEditing && (
                        <div className="center text-primary h-full grow-[0.25]">
                          삭제
                        </div>
                      )}
                    </div>
                    {countryOfOrigins.map((item, idx) => (
                      <div
                        key={item.name}
                        className={`flex h-10 w-full ${idx === countryOfOrigins.length - 1 ? "" : "border-b border-b-gray-600"}`}
                      >
                        <TableRow>{item.item}</TableRow>
                        <TableRow>{item.origin}</TableRow>
                        <TableRow>{item.name}</TableRow>
                        {isEditing && (
                          <button
                            type="button"
                            className="center h-full grow-[0.25]"
                            onClick={() => handleDeleteItem(item)}
                          >
                            <DeleteIcon
                              color="#F22020"
                              className="h-[18px] w-[16px]"
                            />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex w-full flex-col items-center justify-center rounded-[16px] border border-gray-600 bg-gray-700 md:h-35 md:gap-1 md:p-6">
                    <span className="text-gray-0 text-sm font-medium">
                      원산지가 등록되어 있지 않습니다.
                    </span>
                    <span className="text-s font-regular text-gray-300">
                      등록을 하시려면 수정 버튼을 추가해주세요.
                    </span>
                  </div>
                )}
                {isEditing && (
                  <ResponsiveButton
                    type="button"
                    variant="outline"
                    color="outline-gray"
                    responsiveButtons={{
                      md: {
                        buttonSize: "sm",
                        className: "md-4 md:!flex border-dashed mb-2",
                      },
                    }}
                    onClick={() => {
                      // 어떤 식으로 추가?
                    }}
                  >
                    <Plus className="h-5 w-5 text-gray-400" />
                  </ResponsiveButton>
                )}
                <ResponsiveButton
                  type="button"
                  variant={isEditing ? "default" : "outline"}
                  color={isEditing ? "primary" : "outline-black"}
                  responsiveButtons={{
                    sm: {
                      buttonSize: "sm",
                      className:
                        "!flex md:!hidden mt-6 !h-[34px] !gap-2 items-center",
                    },
                    md: {
                      buttonSize: "sm",
                      className:
                        "!h-[34px] md:!flex items-center hidden lg:hidden !gap-1",
                    },
                    lg: {
                      buttonSize: "lg",
                      className: "hidden lg:!flex mt-8",
                    },
                  }}
                  onClick={isEditing ? undefined : () => setIsEditing(true)}
                >
                  {isEditing ? (
                    "저장하기"
                  ) : (
                    <>
                      <EditIcon width={20} height={20} />
                      <span>수정하기</span>
                    </>
                  )}
                </ResponsiveButton>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
