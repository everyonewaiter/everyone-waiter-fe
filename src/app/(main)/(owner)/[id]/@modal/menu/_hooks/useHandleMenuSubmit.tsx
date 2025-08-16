import { useFormContext } from "react-hook-form";
import { menuQueries } from "../../../menu/_queries/useMenu";
import { formToRequest } from "./useMenuForm";
import { TypeMenuForm } from "../../../menu/_schema/menu.schema";

interface IProps {
  storeId: string;
  type: "create" | "update";
  originData: {
    menuId?: string;
    image?: string;
  };
  onSetIsSubmitted: (value: boolean) => void;
}

export default function useHandleMenuSubmit({
  storeId,
  type,
  originData,
  onSetIsSubmitted,
}: IProps) {
  const form = useFormContext<TypeMenuForm>();

  const add = menuQueries.useAddMenu(storeId, form);
  const updateWithImg = menuQueries.useUpdateWithImage(storeId);
  const updateWithoutImg = menuQueries.useUpdateWithoutImage(storeId);

  const handleSubmit = (
    data: TypeMenuForm,
    handleAfter: () => {
      onSuccess: () => void;
      onError: () => void;
    }
  ) => {
    onSetIsSubmitted(true);

    const { request } = formToRequest(data);

    if (type === "create") {
      add.mutate(
        {
          storeId,
          categoryId: data.category,
          body: {
            file: data.imgFile as File,
            request,
          },
        },
        { ...handleAfter() }
      );
    } else if (type === "update") {
      if (data.imgFile && originData?.image !== data.imgString) {
        updateWithImg.mutate(
          {
            storeId,
            menuId: originData?.menuId as string,
            body: {
              file: data.imgFile as File,
              request,
            },
          },
          { ...handleAfter() }
        );
      } else {
        updateWithoutImg.mutate(
          {
            storeId,
            menuId: originData?.menuId as string,
            body: request,
          },
          { ...handleAfter() }
        );
      }
    }
  };

  return { handleSubmit };
}
