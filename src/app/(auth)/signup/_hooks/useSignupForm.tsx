import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeSignup, signupSchema } from "@/schema/signup.schema";

export default function useSignupForm() {
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState({
    phoneAuth: false,
    codeAuth: false,
  });

  const form = useForm<TypeSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone: "",
      authNumber: "",
      password: "",
      confirm: "",
    },
  });

  const submitHandler = (
    data: TypeSignup,
    action: UseMutateFunction<any, Error, Account, unknown>,
    successHandler: () => void
  ) => {
    setFormButtonDisabled(true);

    action(
      {
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
      },
      {
        onSuccess: successHandler,
        onError: () => setFormButtonDisabled(false),
      }
    );
  };

  const handleSubmitValue = (key: keyof typeof isSubmitted, value: boolean) => {
    setIsSubmitted((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    submitHandler,
    disableFormButton: formButtonDisabled,
    isSubmitted,
    handleSubmitValue,
  };
}
