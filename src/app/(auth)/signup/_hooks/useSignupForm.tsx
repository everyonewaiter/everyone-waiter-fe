import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeSignup, signupSchema } from "../_schema/signup.schema";

export default function useSignupForm({
  isAuthActive,
}: {
  isAuthActive: boolean;
}) {
  const [formButtonDisabled, setFormButtonDisabled] = useState(false);

  const form = useForm<TypeSignup>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema(isAuthActive)),
    defaultValues: {
      email: "",
      phone: "",
      authNumber: "",
      password: "",
      confirm: "",
    },
  });

  const submitHandler = ({
    data,
    action,
    onSuccess,
  }: {
    data: TypeSignup;
    action: UseMutationResult<any, Error, Account, unknown>;
    onSuccess: () => void;
  }) => {
    setFormButtonDisabled(true);

    action.mutate(
      {
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
      },
      {
        onSuccess: () => onSuccess(),
        onError: () => setFormButtonDisabled(false),
      }
    );
  };

  return {
    form,
    submitHandler,
    disableFormButton: formButtonDisabled,
  };
}
