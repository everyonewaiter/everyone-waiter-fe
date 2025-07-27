import { useFormContext } from "react-hook-form";
import { menuQueries } from "../../../menu/_queries/useMenu";
import { formToRequest } from "./useMenuForm";
import { TypeMenuForm } from "../../../menu/_schema/menu.schema";

interface IProps {
  storeId: string;
  type: "create" | "update";
  data: {
    menuId?: string;
    image?: string;
  };
  onSetIsSubmitted: (value: boolean) => void;
}

export default function useHandleMenuSubmit({
  storeId,
  type,
  data,
  onSetIsSubmitted,
}: IProps) {
  const form = useFormContext<TypeMenuForm>();

  const add = menuQueries.useAddMenu(storeId);
  const updateWithImg = menuQueries.useUpdateWithImage(storeId);
  const updateWithoutImg = menuQueries.useUpdateWithoutImage(storeId);

  const handleSubmit = (
    handleAfter: () => {
      onSuccess: () => void;
      onError: () => void;
    }
  ) => {
    onSetIsSubmitted(true);

    const values = form.getValues();
    const { request } = formToRequest(values);

    if (type === "create") {
      add.mutate(
        {
          storeId,
          categoryId: form.watch("category"),
          body: {
            file: form.getValues("imgFile") as File,
            request,
          },
        },
        { ...handleAfter() }
      );
    } else if (type === "update") {
      if (form.watch("imgFile") && data?.image !== form.watch("imgString")) {
        updateWithImg.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: {
              file: form.watch("imgFile") as File,
              request,
            },
          },
          { ...handleAfter() }
        );
      } else {
        updateWithoutImg.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: request,
          },
          { ...handleAfter() }
        );
      }
    }
  };

  return { handleSubmit };
}
