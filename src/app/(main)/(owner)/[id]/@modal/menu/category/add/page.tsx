"use client";

import { FormProvider } from "react-hook-form";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Plus } from "@/components/common/Icon/index";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import ModalButton from "../../../_components/ModalButton";
import ModalTitle from "../../../_components/ModalTitle";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalHeader from "./_components/ModalHeader";
import useCategoryMove from "../../_hooks/useCategoryMove";
import SaveButton from "./_components/SaveButton";

export enum OptionState {
  MOVE = "move",
  DELETE = "delete",
}

export default function Page() {
  const params = useParams();
  const storeId = params?.id as string;

  const { form, initialRef, items, setItems } = useCategoryMove(storeId);

  const [optionState, setOptionState] = useState<OptionState | null>(null);

  const getTitle = () => {
    if (optionState === "move") return "카테고리 순서 변경";
    if (optionState === "delete") return "카테고리 삭제";
    return "카테고리";
  };

  return (
    <div className="lg h-full md:w-[340px] lg:w-[540px]">
      <FormProvider {...form}>
        <ModalTitle
          title={getTitle()}
          topRightComponent={
            !optionState && <ModalHeader setOptionState={setOptionState} />
          }
          className="lg:!mb-0"
        />
        <CategoryForm
          optionState={optionState}
          initialCategoriesRef={initialRef}
          storeId={storeId}
          items={items}
          setItems={setItems}
        />

        {optionState === "move" && (
          <ModalButton
            buttonText=""
            secondaryText="돌아가기"
            onlyClose
            onClose={() => setOptionState(null)}
          />
        )}
        {optionState === "delete" && (
          <ModalButton
            buttonText=""
            secondaryText="돌아가기"
            onClose={() => setOptionState(null)}
            onlyClose
          />
        )}
        {!optionState && (
          <>
            <div className="flex flex-col">
              <ResponsiveButton
                type="button"
                variant="outline"
                color="grey"
                responsiveButtons={{
                  sm: {
                    buttonSize: "sm",
                    className: "mt-6 h-[34px] gap-2 items-center",
                  },
                  md: {
                    buttonSize: "sm",
                    className: "items-center gap-1 !text-s !font-medium mt-4",
                  },
                  lg: {
                    buttonSize: "lg",
                    className: "mt-4",
                  },
                }}
                commonClassName="w-full dashed-light"
                onClick={() =>
                  form.setValue("categories", [
                    ...form.watch("categories"),
                    {
                      categoryId: (
                        form.watch("categories").length + 1
                      ).toString(),
                      name: "",
                      isUpdated: false,
                      isAdded: true,
                    },
                  ])
                }
              >
                <Plus size={24} className="md:h-4 md:w-4 lg:h-6 lg:w-6" />
                <span>카테고리 추가</span>
              </ResponsiveButton>
            </div>
            <SaveButton initialRef={initialRef} storeId={storeId} />
          </>
        )}
      </FormProvider>
    </div>
  );
}
