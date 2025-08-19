import { RefObject, useState } from "react";
import { categoryQueries } from "@/app/(main)/(owner)/[id]/menu/_queries/useCategories";
import { useFormContext } from "react-hook-form";
import { TypeCategoryForm } from "@/app/(main)/(owner)/[id]/menu/_schema/category.schema";
import { useRouter } from "next/navigation";
import ModalButton from "../../../../_components/ModalButton";

interface IProps {
  initialRef: RefObject<
    {
      categoryId: string;
      name: string;
      isUpdated: boolean;
      isAdded: boolean;
    }[]
  >;
  storeId: string;
}

export default function SaveButton({ initialRef, storeId }: IProps) {
  const navigate = useRouter();
  const form = useFormContext<TypeCategoryForm>();

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <ModalButton
      buttonText="저장하기"
      isSubmitted={isSubmitting}
      secondaryText="닫기"
      onClose={() => navigate.back()}
      onAction={handleSave}
    />
  );
}
