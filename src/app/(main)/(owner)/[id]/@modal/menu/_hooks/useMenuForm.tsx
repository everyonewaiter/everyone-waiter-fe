import { TypeMenuForm } from "../../../menu/_schema/menu.schema";
import { MenuFormType } from "../_types/menuForm.type";

export const menuDetailToForm = (menu: MenuDetail): MenuFormType => {
  const requiredGroup = menu.menuOptionGroups.find(
    (group: MenuOptionGroups) => group.type === "MANDATORY"
  );
  const optionalGroup = menu.menuOptionGroups.find(
    (group: MenuOptionGroups) => group.type === "OPTIONAL"
  );

  return {
    ...menu,
    category: menu.categoryId,
    image: null,
    requiredOptions: requiredGroup
      ? [{ name: requiredGroup.name, menuOptions: requiredGroup.menuOptions }]
      : [],
    optionalOptions: optionalGroup
      ? [{ name: optionalGroup.name, menuOptions: optionalGroup.menuOptions }]
      : [],
  };
};

export const formToRequest = (form: TypeMenuForm) => {
  const menuOptionGroups = [];

  if (form.requiredOptions?.length > 0) {
    menuOptionGroups.push(
      ...form.requiredOptions
        .filter((group) => (group?.name?.trim() ?? "") !== "")
        .map((group) => ({
          name: group.name as string,
          type: "MANDATORY" as MenuOptionType,
          printEnabled: group.printEnabled ?? true,
          menuOptions: group.menuOptions.filter(
            (opt) => opt.name.trim() !== ""
          ),
        }))
        .filter((group) => group.menuOptions.length > 0)
    );
  }

  if (form.optionalOptions?.length > 0) {
    menuOptionGroups.push(
      ...form.optionalOptions
        .filter((group) => (group?.name?.trim() ?? "") !== "")
        .map((group) => ({
          name: group.name as string,
          type: "OPTIONAL" as MenuOptionType,
          printEnabled: group.printEnabled ?? true,
          menuOptions: group.menuOptions.filter(
            (opt) => opt.name.trim() !== ""
          ),
        }))
        .filter((group) => group.menuOptions.length > 0)
    );
  }

  return {
    file: form.imgFile,
    request: {
      name: form.name,
      description: form.description,
      price: Number(String(form.price ?? "").replace(/,/g, "") || 0),
      spicy: form.spicy,
      state: form.state,
      label: form.label,
      printEnabled: form.printEnabled,
      image: form.imgString,
      menuOptionGroups,
    },
  };
};
