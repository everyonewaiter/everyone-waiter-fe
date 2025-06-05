"use client";

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { storeInfoSchema, TypeStoreInfo } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import Icon from "@/components/common/Icon";
import useStores from "./_hooks/useStores";

export default function StoreInfo() {
  const params = useParams();

  const [makeDisabled, setMakeDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const storeId = params?.id;

  const { detailStoreInfoQuery } = useStores();
  const { data } = detailStoreInfoQuery(storeId as string);

  const form = useForm<TypeStoreInfo>({
    mode: "onChange",
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      name: data?.name,
      license: data?.license,
      address: data?.address,
    },
  });

  const [countryOfOrigins, setCountryOfOrigins] = useState<
    CountryOfOriginItem[]
  >(data?.setting.countryOfOrigin!);
  const newItem = {
    item: "",
    origin: "",
    menu: "",
  };

  function TableRow({
    children,
    className,
  }: PropsWithChildren<{ className?: string }>) {
    return (
      <div className={`center h-full w-full text-center ${className}`}>
        {children}
      </div>
    );
  }

  // const handleDeleteItem = () => {
  //   // delete item: OriginItem
  // };

  // // const handle

  // const handleChangeItem = (
  //   index: number,
  //   field: keyof OriginItem,
  //   value: string
  // ) => {
  //   const newOrigins = countryOfOrigins.map((origin, i) => {
  //     if (i === index) {
  //       return { ...origin, [field]: value };
  //     }
  //     return origin;
  //   });
  //   setCountryOfOrigins(newOrigins);
  // };

  const submitHandler = () => {
    setMakeDisabled(true);
    // submit data: TypeStoreinfo
  };

  return (
    <div className="h-full w-full">
      <div className="mt-10 flex w-full flex-col items-center overflow-y-scroll md:mt-6 md:h-[calc(100%-45px)] lg:mt-10 lg:h-[calc(100%-100px)]">
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
              <form
                className="flex flex-col gap-3 lg:gap-4"
                onSubmit={form.handleSubmit(submitHandler)}
              >
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
                {isEditing || countryOfOrigins?.length > 0 ? (
                  <div className="text-s flex flex-col overflow-hidden rounded-[12px] border border-gray-600 font-medium">
                    <div className="flex h-10 w-full bg-gray-700">
                      <TableRow>품목</TableRow>
                      <TableRow>원산지</TableRow>
                      <TableRow>음식명</TableRow>
                      {isEditing && (
                        <TableRow className="text-primary w-full">
                          삭제
                        </TableRow>
                      )}
                    </div>
                    {countryOfOrigins.map((item, idx) => (
                      <div
                        // TODO - 추후 API 연결 시 아이템으로 변경
                        key={idx}
                        className={`flex h-10 w-full ${
                          idx !== countryOfOrigins.length - 1 &&
                          "border-b border-b-gray-600"
                        }`}
                      >
                        {/* {item.isAdded ? (
                          <input
                            className="w-full text-center outline-none md:px-2 lg:px-4"
                            placeholder="품목 입력"
                            value={item.item}
                            onChange={(e) =>
                              handleChangeItem(idx, "item", e.target.value)
                            }
                          />
                        ) : (
                          <TableRow>{item.item}</TableRow>
                        )}
                        {item.isAdded ? (
                          <input
                            className="w-full text-center outline-none md:px-2 lg:px-4"
                            placeholder="원산지 입력"
                            value={item.origin}
                            onChange={(e) =>
                              handleChangeItem(idx, "origin", e.target.value)
                            }
                          />
                        ) : (
                          <TableRow>{item.origin}</TableRow>
                        )}
                        {item.isAdded ? (
                          <input
                            className="mr-1 w-full text-center outline-none md:px-2 lg:px-4"
                            placeholder="음식명 입력"
                            value={item.menu}
                            onChange={(e) =>
                              handleChangeItem(idx, "menu", e.target.value)
                            }
                          />
                        ) : (
                          <TableRow className="pr-1">{item.menu}</TableRow>
                        )}
                        {isEditing && (
                          <button
                            type="button"
                            className={
                              item.isAdded
                                ? "mr-1/2 flex w-full items-center justify-center md:px-2 lg:px-4"
                                : "flex w-full items-center justify-center"
                            }
                            onClick={handleDeleteItem}
                          >
                            <DeleteIcon
                              color="#F22020"
                              className="h-[18px] w-[16px]"
                            />
                          </button>
                        )} */}
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
                  <>
                    <ResponsiveButton
                      type="button"
                      variant="outline"
                      color="gray"
                      responsiveButtons={{
                        sm: { buttonSize: "sm", className: "!flex md:hidden" },
                        md: {
                          buttonSize: "sm",
                          className: "md-4 md:!flex",
                        },
                        lg: { buttonSize: "lg", className: "!h-10" },
                      }}
                      disabled={makeDisabled}
                      commonClassName="border-dashed mt-3"
                      onClick={() =>
                        setCountryOfOrigins([...countryOfOrigins, newItem])
                      }
                    >
                      <Plus className="h-5 w-5 text-gray-400" />
                    </ResponsiveButton>
                    <ResponsiveButton
                      type="submit"
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
                    >
                      저장하기
                    </ResponsiveButton>
                  </>
                )}
              </form>
            </Form>
            {!isEditing && (
              <ResponsiveButton
                type="button"
                variant="outline"
                color="black"
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
                <Icon iconKey="edit" size={20} />
                <span>수정하기</span>
              </ResponsiveButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
