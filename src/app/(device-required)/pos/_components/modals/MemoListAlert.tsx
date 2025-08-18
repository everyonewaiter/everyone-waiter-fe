import Textarea from "@/components/common/TextArea";
import dynamic from "next/dynamic";
import { useState } from "react";
import useFocusToLastText from "@/hooks/useFocusToLastText";
import { orderQueries } from "../../_queries/useOrder";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  tableNo?: number;
  memos: { index: number; memo: string; orderId: string; menus: string[] }[];
}

export default function MemoListAlert({ close, tableNo, memos }: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [memo, setMemo] = useState(
    memos.map((el) => ({ id: el.orderId, memo: el.memo }))
  );

  const memoUpdate = orderQueries.useUpdateMemo();

  const { textareaRef } = useFocusToLastText(isEditing);

  const handleUpdateMemo = async () => {
    setIsSubmitted(true);

    const original = new Map(memos.map((m) => [m.orderId, m.memo]));
    const updates = memo
      .filter(({ id, memo: m }) => m && m !== original.get(id))
      .map(({ id, memo: m }) =>
        memoUpdate.mutateAsync({
          tableNo: Number(tableNo),
          orderId: id,
          body: { memo: m },
        })
      );

    try {
      await Promise.all(updates);
      setIsEditing(false);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <Alert
      onClose={close}
      layoutClassName="p-8 !w-[544px]"
      buttonText={isEditing ? "수정 저장하기" : "수정하기"}
      cancelText={isEditing ? "취소" : "닫기"}
      isSubmitted={isSubmitted}
      customButtonStyle="button-lg"
      onAction={() => (isEditing ? handleUpdateMemo() : setIsEditing(true))}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-0 text-2xl font-semibold">메모</h1>
          <span className="text-gray-0 text-lg font-semibold">
            {tableNo}번 테이블
          </span>
        </div>
        <div className="scrollbar-hide flex max-h-[278px] flex-col gap-5 overflow-y-auto">
          {memos.length === 0 && (
            <div className="text-base text-gray-500">
              등록된 메모가 없습니다.
            </div>
          )}
          {!isEditing &&
            memos.length > 0 &&
            memos.map((item) => (
              <div
                key={item.orderId}
                className="flex flex-col items-start gap-1"
              >
                <div className="flex w-full items-end justify-between">
                  <span className="text-gray-0 text-lg font-semibold">
                    {item.index}번 주문 메모
                  </span>
                  <span className="text-base font-medium text-gray-400">
                    {item.menus[0]}{" "}
                    {item.menus.length > 1 && `외 ${item.menus.length - 1}개`}
                  </span>
                </div>
                <div className="min-h-20 w-full rounded-[12px] border border-gray-600 px-4 py-3 pb-4 text-left text-base font-medium text-gray-100">
                  {item.memo}
                </div>
              </div>
            ))}
          {isEditing &&
            memos.length > 0 &&
            memos.map((item, idx) => (
              <div
                key={item.orderId}
                className="flex flex-col items-start gap-1"
              >
                <div className="flex w-full items-end justify-between">
                  <span className="text-gray-0 text-lg font-semibold">
                    {item.index}번 주문 메모
                  </span>
                  <span className="text-base font-medium text-gray-400">
                    {item.menus[0]}{" "}
                    {item.menus.length > 1 && `외 ${item.menus.length - 1}개`}
                  </span>
                </div>
                <Textarea
                  className="min-h-20 w-full rounded-[12px] border border-gray-600 px-4 py-3 pb-4 text-left !text-base font-medium text-gray-100"
                  ref={idx === 0 ? textareaRef : undefined}
                  value={memo.find((el) => el.id === item.orderId)?.memo}
                  onChange={(e) => {
                    setMemo(
                      memo.map((el) =>
                        el.id === item.orderId
                          ? { ...el, memo: e.target.value }
                          : el
                      )
                    );
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </Alert>
  );
}
