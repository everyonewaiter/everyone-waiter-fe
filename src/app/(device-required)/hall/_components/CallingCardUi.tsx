"use client";

import dynamic from "next/dynamic";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";
import { hallQueries } from "../_query/useHall";

const CompleteAllModal = dynamic(() => import("./CompleteAllModal"), {
  ssr: false,
});

interface IProps {
  staffCallId: string;
  tableNo: number;
  text: string;
}

export default function CallingCardUi({ staffCallId, ...props }: IProps) {
  const { open, close } = useOverlay();

  const callStaff = hallQueries.useComompleteStaffCall();

  const handleCompleteAll = () => {
    open(() => (
      <CompleteAllModal
        close={close}
        type="single-complete"
        onComplete={() => {
          callStaff.mutate({ staffCallId }, { onSuccess: close });
        }}
        {...props}
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
