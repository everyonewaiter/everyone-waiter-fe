"use client";

import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useState } from "react";
import { Plus } from "lucide-react";
import Icon from "@/components/common/Icon";
import OriginTable from "./_components/OriginTable";
import InfoFields from "./_components/InfoFields";
import useStoreInfoForm from "./_hooks/useStoreInfoForm";
import SubmitButton from "./_components/SubmitButton";

export default function StoreInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [makeDisabled, setMakeDisabled] = useState(false);

  const { form, submitHandler, newItem } = useStoreInfoForm();

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
                onSubmit={form.handleSubmit((data) => {
                  setMakeDisabled(true);
                  submitHandler(data, () => setMakeDisabled(false));
                })}
              >
                <InfoFields form={form} />
                <Label>원산지</Label>
                {isEditing || form.watch("origins")?.length > 0 ? (
                  <OriginTable form={form} isEditing={isEditing} />
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
                        sm: { buttonSize: "sm", className: "flex" },
                        md: {
                          buttonSize: "sm",
                          className: "md-4 flex",
                        },
                        lg: { buttonSize: "lg", className: "!h-10" },
                      }}
                      disabled={makeDisabled}
                      commonClassName="border-dashed mt-3"
                      onClick={() => {
                        const current = form.watch("origins");
                        const updated = [...current];

                        if (
                          updated.length > 0 &&
                          updated[updated.length - 1].isAdded
                        ) {
                          updated[updated.length - 1] = {
                            ...updated[updated.length - 1],
                            isAdded: false,
                          };
                        }

                        form.setValue("origins", [...updated, newItem]);
                      }}
                    >
                      <Plus className="h-5 w-5 text-gray-400" />
                    </ResponsiveButton>
                    <SubmitButton type="submit" disabled={makeDisabled}>
                      저장하기
                    </SubmitButton>
                  </>
                )}
              </form>
            </Form>

            {!isEditing && (
              <SubmitButton
                type="button"
                variant="outline"
                color="black"
                disabled={makeDisabled}
                onClick={isEditing ? undefined : () => setIsEditing(true)}
              >
                <Icon iconKey="edit" size={20} />
                <span>수정하기</span>
              </SubmitButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
