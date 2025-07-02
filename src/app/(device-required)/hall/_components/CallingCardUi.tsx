"use client";

import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import CompleteAllModal from "./CompleteAllModal";

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
