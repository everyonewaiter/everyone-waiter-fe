import { Dispatch } from "react";
import { useForm } from "react-hook-form";

export default function useSettingsForm(
  setItems: Dispatch<React.SetStateAction<string[]>>
) {
  const form = useForm({ defaultValues: { value: "" } });

  const submitHandler = () => {
    const value = form.getValues("value");
    if (value.trim()) {
      setItems((prev) => [...prev, value]);
    }
    form.reset();
  };

  return { form, submitHandler };
}
