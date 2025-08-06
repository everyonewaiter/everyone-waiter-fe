import { useForm } from "react-hook-form";
import { TypeDeviceStep1Form } from "../_schema/device.schema";

export default function useStep1Form() {
  const form = useForm<TypeDeviceStep1Form>({
    mode: "onChange",
    // resolver: zodResolver(step1Schema),
    defaultValues: {
      phone: "",
      authNumber: "",
    },
  });

  return {
    form: { form, watch: form.watch, setValue: form.setValue },
  };
}
