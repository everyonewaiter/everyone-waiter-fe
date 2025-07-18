import { useForm } from "react-hook-form";

export interface FormValues {
  phone: string;
  authNumber: string;
}

export default function useStep1Form() {
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      phone: "",
      authNumber: "",
    },
  });

  return {
    form: { form, watch: form.watch, setValue: form.setValue },
  };
}
