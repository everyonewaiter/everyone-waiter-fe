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

export const formToRequest = (form: MenuFormType) => {
  const menuOptionGroups = [];

  if (form.requiredOptions?.length > 0) {
    menuOptionGroups.push(
      ...form.requiredOptions
        .filter((group) => group.name.trim() !== "")
        .map((group) => ({
          name: group.name,
          type: "MANDATORY" as MenuOptionType,
          printEnabled: true,
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
        .filter((group) => group.name.trim() !== "")
        .map((group) => ({
          name: group.name,
          type: "OPTIONAL" as MenuOptionType,
          printEnabled: true,
          menuOptions: group.menuOptions.filter(
            (opt) => opt.name.trim() !== ""
          ),
        }))
        .filter((group) => group.menuOptions.length > 0)
    );
  }

  return {
    file: form.image,
    request: {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      spicy: form.spicy,
      state: form.state,
      label: form.label,
      printEnabled: form.printEnabled,
      menuOptionGroups,
    },
  };
};
