import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
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
