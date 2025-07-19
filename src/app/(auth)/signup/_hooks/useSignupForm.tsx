import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeSignup, signupSchema } from "../_schema/signup.schema";

export default function useSignupForm() {
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState({
    phoneAuth: false,
    codeAuth: false,
  });

  const form = useForm<TypeSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  const submitHandler = (
    data: TypeSignup,
    action: UseMutationResult<any, Error, Account, unknown>,
    successHandler: () => void
  ) => {
    setFormButtonDisabled(true);

    action.mutate(
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
