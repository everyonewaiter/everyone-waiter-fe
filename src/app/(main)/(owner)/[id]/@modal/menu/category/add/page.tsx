"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { ArrowDownUp, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import { categoryQueries } from "../../../../menu/_queries/useCategories";
import ModalButton from "../../../_components/ModalButton";
import ModalTitle from "../../../_components/ModalTitle";
import useCategoryForm from "../../_hooks/useCategoryForm";

const Sortable = dynamic(
  () => import("../../../../../../../../components/Sortable"),
  {
    ssr: false,
    loading: () => <div>순서 변경 로딩 중...</div>,
  }
);

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const storeId = params?.id as string;

  const [changeMove, setChangeMove] = useState(false);
  const [pendingMoves, setPendingMoves] = useState<
    { sourceId: string; targetId: string; where: "NEXT" | "PREVIOUS" }[]
  >([]);

  const { data } = categoryQueries.useCategories(storeId);
  const move = categoryQueries.useMoveCategory(storeId);

  const { form, setInitialCategories } = useCategoryForm();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (data) {
      setInitialCategories(data?.categories);
    }
  }, [data, form]);

  const handleDrag = ({ active, over }: any) => {
    if (!over) return;

    const categoryData = form.watch("categories");
    const oldIndex = categoryData?.findIndex((c) => c.categoryId === active.id);
    const newIndex = categoryData?.findIndex((c) => c.categoryId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const sorted = arrayMove(categoryData, oldIndex, newIndex);

    form.setValue("categories", sorted);
    setPendingMoves((prev) => [
      ...prev,
      {
        sourceId: categoryData[oldIndex].categoryId,
        targetId: categoryData[newIndex].categoryId,
        where: oldIndex < newIndex ? "NEXT" : "PREVIOUS",
      },
    ]);
  };

  const handleSortSave = () => {
    Promise.all(
      pendingMoves.map((moveData) =>
        move.mutate(
          { storeId, ...moveData },
          { onSuccess: () => navigate.back() }
        )
      )
    );
  };

  return (
    <div className="lg h-full md:w-[340px] lg:w-[540px]">
      <ModalTitle
        title="카테고리"
        topRightComponent={
          !changeMove && (
            <>
              <ResponsiveButton
                color="grey"
                responsiveButtons={{
                  lg: {
                    buttonSize: "md",
                    className: "!rounded-[24px] !px-4 !py-2",
                  },
                }}
                commonClassName="hidden lg:flex"
                onClick={() => setChangeMove(true)}
              >
                <ArrowDownUp
                  size={18}
                  strokeWidth={1.5}
                  className="md:h-3 md:w-3 lg:h-[18px] lg:w-[18px]"
                />
                <span className="lg:text-base">순서 변경</span>
              </ResponsiveButton>
              <div className="flex items-center gap-4 lg:hidden">
                <button
                  type="button"
                  className="flex items-center gap-1"
                  onClick={() => setChangeMove(true)}
                >
                  <ArrowDownUp
                    size={16}
                    strokeWidth={1.5}
                    className="text-gray-300"
                  />
                  <span className="text-sm text-gray-300">순서 변경</span>
                </button>
                <button type="button" className="flex items-center gap-1">
                  <Icon
                    iconKey="trash"
                    className="text-status-error"
                    size={16}
                  />
                  <span className="text-status-error text-sm">삭제</span>
                </button>
              </div>
            </>
          )
        }
      />
      <ScrollArea className="md:h-[270px] lg:h-[424px]">
        {changeMove ? (
          <Sortable
            items={form.watch("categories").map((field) => field.categoryId)}
            onDragEnd={handleDrag}
          >
            <FormProvider {...form}>
              <CategoryForm changeMove={changeMove} />
            </FormProvider>
          </Sortable>
        ) : (
          <FormProvider {...form}>
            <CategoryForm changeMove={changeMove} />
          </FormProvider>
        )}
      </ScrollArea>

      {!changeMove && (
        <div className="flex flex-col md:mb-6 lg:mb-8">
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
            commonClassName="w-full border-none dashed-light"
            onClick={() =>
              form.setValue("categories", [
                ...form.watch("categories"),
                { categoryId: "", name: "" },
              ])
            }
          >
            <Plus size={24} className="md:h-4 md:w-4 lg:h-6 lg:w-6" />
            <span>카테고리 추가</span>
          </ResponsiveButton>
        </div>
      )}

      <ModalButton
        buttonText={changeMove ? "순서 저장하기" : "저장하기"}
        colorBlack={changeMove}
        onAction={handleSortSave}
      />
    </div>
  );
}
