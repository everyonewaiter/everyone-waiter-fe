import QueryProviders from "@/app/query-providers";
import useOverlay from "@/hooks/useOverlay";
import WaitingModal from "../_components/WaitingModal";

export default function useWaitingModal() {
  const { open, close } = useOverlay();

  const handleOpenModal = (
    type: "call" | "complete" | "cancel",
    waiting: Waiting
  ) => {
    open(() => (
      <QueryProviders>
        <WaitingModal close={close} type={type} {...waiting} />
      </QueryProviders>
    ));
  };

  return { handleOpenModal };
}
