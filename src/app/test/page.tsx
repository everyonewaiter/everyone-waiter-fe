"use client";

import Input from "@/components/common/Input";

export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-1/2 flex-col items-center justify-center gap-4">
      <Input type="email" placeholder="Email" />
      <Input type="email" placeholder="Email" disabled />
    </div>
  );
}
