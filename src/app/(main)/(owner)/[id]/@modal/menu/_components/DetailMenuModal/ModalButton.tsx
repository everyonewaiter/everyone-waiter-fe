"use client";

import { usePathname, useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { getPathnameWithoutStoreId } from "@/utils/getPathname";
import { useStoreContext } from "@/providers/storeProvider";
import { formToRequest } from "../../_hooks/useMenuForm";
import { MenuFormType } from "../../_types/menuForm.type";
import { menuQueries } from "../../../../menu/_queries/useMenu";

interface IProps {
  isEditing: boolean;
  onSetEditing: (value: boolean) => void;
  image: string | undefined;
  menuId: string | undefined;
  type: "create" | "update";
}

export default function ModalButton({
  isEditing,
  onSetEditing,
  type,
  ...data
}: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const { storeId } = useStoreContext();

  const form = useFormContext<
    Omit<MenuFormType, "image"> & { image: File | string | null }
  >();

  const add = menuQueries.useAddMenu(storeId);
  const updateWithImg = menuQueries.useUpdateWithImage(storeId);
  const updateWithoutImg = menuQueries.useUpdateWithoutImage(storeId);

  const handleSubmit = () => {
    const values = form.getValues();
    const { request } = formToRequest(values);

    if (type === "create") {
      add.mutate(
        {
          storeId,
          categoryId: form.watch("category"),
          body: {
            file: form.getValues("image") as File,
            request,
          },
        },
        {
          onSuccess: () => navigate.back(),
        }
      );
    } else if (type === "update") {
      if (
        form.watch("image") instanceof File &&
        data?.image !== form.watch("image")
      ) {
        updateWithImg.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: {
              file: form.watch("image") as File,
              request,
            },
          },
          {
            onSuccess: () => navigate.back(),
          }
        );
      } else {
        updateWithoutImg.mutate(
          {
            storeId,
            menuId: data?.menuId as string,
            body: request,
          },
          { onSuccess: () => navigate.back() }
        );
      }
    }
  };

  const buttonText = () => {
    if (getPathnameWithoutStoreId(pathname) === "/menu/create") {
      return "등록하기";
    }
    return isEditing ? "저장하기" : "수정하기";
  };

  return (
    <ResponsiveButton
      type={isEditing ? "submit" : "button"}
      color={isEditing ? "black" : "primary"}
      responsiveButtons={{
        lg: {
          buttonSize: "xl",
          className: "!text-lg !font-semibold !h-14 py-8 w-[480px]",
        },
        md: { buttonSize: "sm", className: "!h-10 w-[292px]" },
        sm: { buttonSize: "sm", className: "!h-10" },
      }}
      onClick={() => (isEditing ? handleSubmit() : onSetEditing(true))}
    >
      {buttonText()}
    </ResponsiveButton>
  );
}
