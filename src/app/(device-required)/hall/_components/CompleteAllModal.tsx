import Button from "@/components/common/Button/Button";
import ModalWithTitle from "@/components/modal/largeModalLayout";

interface IProps {
  close: () => void;
  type: "all-complete" | "single-complete";
  onComplete: () => void;
}

export default function CompleteAllModal({ close, type, onComplete }: IProps) {
  return (
    <ModalWithTitle onClose={close} topRightComponent={null}>
      <div className="center flex-col gap-1 rounded-[16px] border border-gray-600 py-4">
        <span className="text-gray-0 text-xl font-semibold">테이블 번호</span>
        <strong className="text-gray-0 text-3xl font-bold">01</strong>
      </div>
      {type === "single-complete" && (
        <div className="center mt-2 flex-col gap-1 rounded-[16px] border border-gray-600 py-4">
          <span className="text-gray-0 text-lg font-semibold">
            물 더 주세요.
          </span>
        </div>
      )}
      <div className="center mt-6 flex flex-col gap-3">
        <span className="text-xl font-semibold">
          {type === "all-complete"
            ? "모든 주문을 완료 처리하시겠습니까?"
            : "호출을 완료 처리하시겠습니까?"}
        </span>
        <p className="text-gray-0 text-center text-base font-medium text-ellipsis whitespace-pre-line">
          {type === "all-complete"
            ? "해당 테이블의 모든 주문이 완료됩니다.\n완료 후에는 주문 내역을 되돌릴 수 없습니다."
            : "손님의 요청이 처리되었는지 다시 한 번 확인해 주세요.\n완료 후에는 호출 기록이 사라집니다."}
        </p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <Button
          color="grey"
          className="button-lg w-full !text-lg !font-medium"
          onClick={close}
        >
          취소
        </Button>
        <Button
          color="black"
          className="button-lg w-full !text-lg !font-medium"
          onClick={onComplete}
        >
          {type === "all-complete" ? "전체 완료" : "완료"}
        </Button>
      </div>
    </ModalWithTitle>
  );
}
