"use client";

import { ArrowDownUp, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import Spinner from "@/components/common/Spinner";
import CategoryForm from "../../../../menu/_components/CategoryForm";
import ModalButton from "../../../_components/ModalButton";
import ModalTitle from "../../../_components/ModalTitle";
import useCategoryForm from "../../_hooks/useCategoryForm";
import useCategoryMove from "../../_hooks/useCategoryMove";

const Sortable = dynamic(
  () => import("../../../../../../../../components/Sortable"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const storeId = params?.id as string;

  const [changeMove, setChangeMove] = useState(false);

  const {
    form: { form, watch, setValue },
  } = useCategoryForm(storeId);

  const { handleSortSave, handleDrag } = useCategoryMove(storeId);

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
        <FormProvider {...form}>
          {changeMove ? (
            <Sortable
              items={watch("categories").map((field) => field.categoryId)}
              onDragEnd={(props) =>
                handleDrag({
                  categories: watch("categories"),
                  setCategories: (val: Category[]) =>
                    setValue("categories", val),
                  ...props,
                })
              }
            >
              <CategoryForm changeMove={changeMove} />
            </Sortable>
          ) : (
            <CategoryForm changeMove={changeMove} />
          )}
        </FormProvider>
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
              setValue("categories", [
                ...watch("categories"),
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
        onAction={() =>
          changeMove
            ? handleSortSave(() =>
                navigate.replace(`/${storeId}/menu/category`)
              )
            : null
        }
      />
    </div>
  );
}
