"use client";

import { FormProvider } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "@/components/common/Icon/index";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import getQueryClient from "@/app/get-query-client";
import ModalButton from "../../../_components/ModalButton";
import ModalTitle from "../../../_components/ModalTitle";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalHeader from "./_components/ModalHeader";
import useCategoryMove from "../../_hooks/useCategoryMove";
import SaveButton from "./_components/SaveButton";
import { TypeCategoryForm } from "../../../../menu/_schema/category.schema";
import { categoryQueries } from "../../../../menu/_queries/useCategories";
import { categoryKeys } from "../../../../menu/_queries/keys";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const storeId = params?.id as string;

  const { form, initialRef } = useCategoryMove(storeId);

  const move = categoryQueries.useMoveCategory(storeId);

  const [isSortSubmitted, setIsSortSubmitted] = useState(false);
  const [optionState, setOptionState] = useState<"move" | "delete" | null>(
    null
  );
  const [items, setItems] = useState<TypeCategoryForm["categories"]>(
    form.watch("categories")
  );
  const [pendingMoves, setPendingMoves] = useState<
    { sourceId: string; targetId: string; where: "NEXT" | "PREVIOUS" }[]
  >([]);

  const getTitle = () => {
    if (optionState === "move") return "카테고리 순서 변경";
    if (optionState === "delete") return "카테고리 삭제";
    return "카테고리";
  };

  useEffect(() => {
    setItems(form.watch("categories"));
    // eslint-disable-next-line
  }, []);

  const handleSaveSort = async () => {
    if (pendingMoves.length === 0) {
      // eslint-disable-next-line
      alert("순서 변경 후 저장이 가능합니다.");
      return;
    }

    setIsSortSubmitted(true);

    try {
      const queryClient = getQueryClient();
      const promises = pendingMoves.map((value) =>
        move.mutateAsync({ storeId, ...value })
      );

      await Promise.all(promises);

      navigate.back();
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all(storeId),
      });
    } catch (error) {
      setIsSortSubmitted(false);
    }
  };

  return (
    <div className="lg h-full md:w-[340px] lg:w-[540px]">
      <FormProvider {...form}>
        <ModalTitle
          title={getTitle()}
          topRightComponent={
            <ModalHeader
              optionState={optionState}
              setOptionState={setOptionState}
            />
          }
        />
        <CategoryForm
          optionState={optionState}
          initialCategoriesRef={initialRef}
          items={items}
          onSetItems={setItems}
          onSetPendingMoves={(value) => {
            if (typeof value === "function") {
              setPendingMoves(value);
            } else {
              setPendingMoves((prev) => [...prev, value]);
            }
          }}
        />

        {optionState === "move" && (
          <ModalButton
            buttonText="순서 저장하기"
            secondaryText="돌아가기"
            colorBlack
            onClose={() => {
              setOptionState(null);
            }}
            onAction={handleSaveSort}
            isSubmitted={isSortSubmitted}
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
