import { MenuFormType } from "../_types/menuForm.type";

export const menuDetailToForm = (menu: MenuDetail): MenuFormType => {
  const requiredGroup = menu.menuOptionGroups.find(
    (group: MenuOptionGroups) => group.type === "MANDATORY"
  );
  const optionalGroup = menu.menuOptionGroups.find(
    (group: MenuOptionGroups) => group.type === "OPTIONAL"
  );

  return {
    image: null,
    category: "",
    name: menu.name,
    description: menu.description,
    price: menu.price,
    spicy: menu.spicy,
    state: menu.state,
    label: menu.label,
    printEnabled: menu.printEnabled,
    requiredOptions: requiredGroup
      ? [{ name: requiredGroup.name, menuOptions: requiredGroup.menuOptions }]
      : [],
    optionalOptions: optionalGroup
      ? [{ name: optionalGroup.name, menuOptions: optionalGroup.menuOptions }]
      : [],
  };
};

export const formToRequest = (form: MenuFormType, categoryId: string) => ({
  categoryId,
  file: form.image,
  request: {
    name: form.name,
    description: form.description,
    price: form.price,
    spicy: form.spicy,
    state: form.state,
    label: form.label,
    printEnabled: form.printEnabled,
    menuOptionGroups: [
      ...form.requiredOptions.map((el) => ({
        name: el.name,
        type: "MANDATORY",
        printEnabled: true,
        menuOptions: el.menuOptions,
      })),
      ...form.optionalOptions.map((el) => ({
        name: el.name,
        type: "OPTION",
        printEnabled: true,
        menuOptions: el.menuOptions,
      })),
    ],
  },
});
