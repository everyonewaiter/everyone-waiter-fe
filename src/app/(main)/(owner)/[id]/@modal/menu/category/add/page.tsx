"use client";

import { FormProvider } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "@/components/common/Icon/index";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import ModalButton from "../../../_components/ModalButton";
import ModalTitle from "../../../_components/ModalTitle";
import { categoryQueries } from "../../../../menu/_queries/useCategories";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalHeader from "./_components/ModalHeader";
import useCategoryMove from "../../_hooks/useCategoryMove";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const storeId = params?.id as string;

  const [optionState, setOptionState] = useState<"move" | "delete" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    form,
    handleSortSave,
    handleDrag,
    initialRef,
    resetMoves,
    isSortSubmitting,
    categories,
  } = useCategoryMove(storeId);

  console.log(categories);

  const update = categoryQueries.useUpdateCategory();
  const add = categoryQueries.useAddCategory();

  const handleSave = async () => {
    setIsSubmitting(true);
    const current = (form.getValues("categories") || []).map((c) => ({
      ...c,
      name: (c.name || "").trim(),
    }));

    const initial = initialRef.current || [];
    const initialById = new Map(initial.map((c) => [c.categoryId, c]));

    const toCreate = current.filter((c) => c.isAdded && c.name);
    const toUpdate = current.filter(
      (c) =>
        c.categoryId &&
        initialById.get(c.categoryId)?.name !== c.name &&
        c.isUpdated &&
        c.name
    );

    await Promise.all([
      ...toCreate.map((c) =>
        add.mutateAsync({ storeId, categoryName: c.name })
      ),
      ...toUpdate.map((c) =>
        update.mutateAsync({
          storeId,
          categoryId: c.categoryId!,
          categoryName: c.name,
        })
      ),
    ])
      .then(() => navigate.push(`/${storeId}/menu`))
      .catch(() => setIsSubmitting(false));
  };

  const getTitle = () => {
    if (optionState === "move") return "카테고리 순서 변경";
    if (optionState === "delete") return "카테고리 삭제";
    return "카테고리";
  };

  return (
    <div className="lg h-full md:w-[340px] lg:w-[540px]">
      <ModalTitle
        title={getTitle()}
        topRightComponent={
          <ModalHeader
            optionState={optionState}
            setOptionState={setOptionState}
          />
        }
      />
      <FormProvider {...form}>
        <CategoryForm
          optionState={optionState}
          initialCategoriesRef={initialRef}
          handleDrag={handleDrag}
        />
      </FormProvider>

      {optionState === "move" && (
        <ModalButton
          buttonText="순서 저장하기"
          secondaryText="돌아가기"
          colorBlack
          onClose={() => {
            resetMoves();
            setOptionState(null);
          }}
          onAction={() => {
            handleSortSave(() => {
              navigate.replace(`/${storeId}/menu`);
              setOptionState(null);
            });
          }}
          isSubmitted={isSortSubmitting}
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
          <ModalButton
            buttonText="저장하기"
            isSubmitted={isSubmitting}
            secondaryText="닫기"
            onClose={() => navigate.back()}
            onAction={handleSave}
          />
        </>
      )}
    </div>
  );
}
