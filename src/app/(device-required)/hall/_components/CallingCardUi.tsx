"use client";

import dynamic from "next/dynamic";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";

const CompleteAllModal = dynamic(() => import("./CompleteAllModal"), {
  ssr: false,
});

export default function CallingCardUi() {
  const { open, close } = useOverlay();

  const handleCompleteAll = () => {
    open(() => (
      <CompleteAllModal
        close={close}
        type="single-complete"
        onComplete={() => {}}
      />
    ));
  };

  return (
    <Button
      className="button-lg mt-3 w-full"
      color="black"
      onClick={handleCompleteAll}
    >
      완료
    </Button>
  );
}
