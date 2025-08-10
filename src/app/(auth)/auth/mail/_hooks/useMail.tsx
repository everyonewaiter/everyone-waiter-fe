import { verifyEmail } from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: verifyEmail,
  });
