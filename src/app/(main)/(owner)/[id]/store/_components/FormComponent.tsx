"use client";

import { useEffect, useState, PropsWithChildren } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import { useMediaQuery } from "react-responsive";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import Icon from "@/components/common/Icon";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import { Plus } from "lucide-react";
import useStores from "../_queries/useStores";

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

interface FormType {
  name: string;
  license: string;
  address: string;
  origins: CountryOfOriginItem[];
}

export default function FormComponent() {
  const { storeId } = useStoreContext();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 961px)" });

  const [makeDisabled, setMakeDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { storesDetail, updateInfo } = useStores();
  const { data } = storesDetail(storeId);

  const form = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      name: "",
      license: "",
      address: "",
      origins: [],
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      name: data.name,
      license: data.license,
      address: data.address,
      origins: data.setting.countryOfOrigins ?? [],
    });
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "origins",
  });

  const createNewItem = {
    item: "",
    origin: "",
  };

  const submitHandler = () => {
    updateInfo.mutate(
      {
        storeId,
        body: {
          ...data,
          landline: data?.landline!,
          setting: {
            ...data?.setting!,
            countryOfOrigins: fields,
          },
        },
      },
      {
        onSuccess: () => setMakeDisabled(true),
      }
    );
  };

  return (
    <div className="my-8 flex flex-col md:my-6 lg:my-10">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 lg:gap-4"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <LabeledInput form={form} label="상호명" name="name" disabled />
          <LabeledInput
            form={form}
            label="사업자 번호"
            name="license"
            disabled
          />
          <LabeledInput form={form} label="주소" name="address" disabled />
          <Label>원산지</Label>
          {isEditing || fields?.length > 0 ? (
            <div className="text-s flex flex-col overflow-hidden rounded-[12px] border border-gray-600 font-medium">
              <div className="flex h-10 w-full bg-gray-700">
                <TableRow className="w-full">품목</TableRow>
                <TableRow className="w-full">원산지</TableRow>
                {isEditing && (
                  <TableRow className="text-primary w-full text-center lg:w-20 lg:flex-shrink-0">
                    삭제
                  </TableRow>
                )}
              </div>
              {fields?.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex h-10 w-full ${
                    idx !== fields.length - 1 && "border-b border-b-gray-600"
                  }`}
                >
                  <TableRow className="w-full">
                    {isEditing ? (
                      <input
                        placeholder={
                          isLargeScreen ? "품목을 입력해주세요" : "품목 입력"
                        }
                        {...form.register(`origins.${idx}.item`)}
                        className="w-full text-center outline-none"
                      />
                    ) : (
                      item.item
                    )}
                  </TableRow>
                  <TableRow className="w-full">
                    {isEditing ? (
                      <input
                        placeholder={
                          isLargeScreen
                            ? "원산지를 입력해주세요"
                            : "원산지 입력"
                        }
                        {...form.register(`origins.${idx}.origin`)}
                        className="w-full text-center outline-none"
                      />
                    ) : (
                      item.origin
                    )}
                  </TableRow>
                  {isEditing && (
                    <TableRow className="w-full text-center lg:w-20 lg:flex-shrink-0">
                      <button type="button" onClick={() => remove(idx)}>
                        <Icon
                          iconKey="trash"
                          size={16}
                          className="text-primary"
                        />
                      </button>
                    </TableRow>
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
            <>
              <ResponsiveButton
                type="button"
                variant="outline"
                color="gray"
                responsiveButtons={{
                  sm: { buttonSize: "sm" },
                  md: {
                    buttonSize: "sm",
                    className: "md-4 flex",
                  },
                  lg: { buttonSize: "lg", className: "!h-10" },
                }}
                disabled={makeDisabled}
                commonClassName="border-dashed mt-3"
                onClick={() => append(createNewItem)}
              >
                <Plus className="h-5 w-5 text-gray-400" />
              </ResponsiveButton>
              <ResponsiveButton
                type="submit"
                responsiveButtons={{
                  sm: {
                    buttonSize: "sm",
                    className: "flex mt-6 !h-[34px] !gap-2 items-center",
                  },
                  md: {
                    buttonSize: "sm",
                    className: "!h-[34px] flex items-center !gap-1",
                  },
                  lg: {
                    buttonSize: "lg",
                    className: "mt-8",
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
              className: "mt-6 !h-[34px] !gap-2 items-center",
            },
            md: {
              buttonSize: "sm",
              className:
                "!h-[34px] md:flex items-center hidden lg:hidden !gap-1 mt-6",
            },
            lg: {
              buttonSize: "lg",
              className: "mt-8 !font-medium border-gray-0",
            },
          }}
          onClick={isEditing ? undefined : () => setIsEditing(true)}
        >
          <Icon iconKey="edit" size={20} className="text-gray-0" />
          <span>수정하기</span>
        </ResponsiveButton>
      )}
    </div>
  );
}
