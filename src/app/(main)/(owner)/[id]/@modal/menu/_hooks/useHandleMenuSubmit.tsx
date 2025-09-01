import { menuQueries } from "../../../menu/_queries/useMenu";
import { formToRequest } from "./useMenuForm";
import { TypeMenuForm } from "../../../menu/_schema/menu.schema";

interface IProps {
  storeId: string;
  type: "create" | "update";
  onSetIsSubmitted: (value: boolean) => void;
  propsData: {
    menuId: string;
    categoryId: string;
    image: string;
  };
}

export default function useHandleMenuSubmit({
  storeId,
  type,
  onSetIsSubmitted,
  propsData,
}: IProps) {
  const add = menuQueries.useAddMenu(storeId);
  const updateWithImg = menuQueries.useUpdateWithImage(
    storeId,
    propsData.categoryId
  );
  const updateWithoutImg = menuQueries.useUpdateWithoutImage(
    storeId,
    propsData.categoryId
  );

  const handleSubmit = (
    data: TypeMenuForm,
    handleAfter: () => {
      onSuccess: () => void;
      onError: () => void;
    }
  ) => {
    onSetIsSubmitted(true);

    const hasGroupWithNameButNoOptions = (
      groups?: TypeMenuForm["requiredOptions"]
    ) =>
      (groups ?? []).some((g) => {
        const hasName = (g?.name?.trim() ?? "") !== "";
        const numValidOptions = (g?.menuOptions ?? []).filter(
          (opt) => (opt?.name?.trim() ?? "") !== ""
        ).length;
        return hasName && numValidOptions === 0;
      });

    if (
      hasGroupWithNameButNoOptions(data.requiredOptions) ||
      hasGroupWithNameButNoOptions(data.optionalOptions)
    ) {
      // eslint-disable-next-line no-alert
      alert("하위 옵션을 1개 이상 입력해주세요.");
      onSetIsSubmitted(false);
      return;
    }

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
      if (data.imgFile && propsData?.image !== data.imgString) {
        updateWithImg.mutate(
          {
            storeId,
            menuId: propsData?.menuId as string,
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
            menuId: propsData?.menuId as string,
            body: request,
          },
          { ...handleAfter() }
        );
      }
    }
  };

  return { handleSubmit };
}
