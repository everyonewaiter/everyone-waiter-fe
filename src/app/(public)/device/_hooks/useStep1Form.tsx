import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, TypeDeviceStep1Form } from "../_schema/device.schema";

export default function useStep1Form({
  isAuthActive,
}: {
  isAuthActive: boolean;
}) {
  const form = useForm<TypeDeviceStep1Form>({
    mode: "onChange",
    resolver: zodResolver(step1Schema(isAuthActive)),
    defaultValues: {
      phone: "",
      authNumber: "",
    },
  });

  return {
    form,
  };
}
