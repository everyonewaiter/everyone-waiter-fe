export interface MenuFormType {
  image: File | string | null;
  category: string;
  name: string;
  description: string;
  price: number;
  spicy: number;
  state: MenuState;
  label: MenuLabel;
  printEnabled: boolean;
  requiredOptions: { name: string; menuOptions: MenuOptions[] }[];
  optionalOptions: { name: string; menuOptions: MenuOptions[] }[];
}
