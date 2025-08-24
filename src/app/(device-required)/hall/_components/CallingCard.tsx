import CallingCardUi from "./CallingCardUi";

interface IProps extends StaffCall {}

export default function CallingCard({ ...props }: IProps) {
  return (
    <div className="w-[294px] rounded-3xl border border-gray-600 p-6">
      <div className="flex h-[52px] items-center justify-between">
        <span className="text-2xl font-semibold text-gray-100">
          테이블 번호
        </span>
        <strong className="text-4xl">
          {String(props.tableNo).padStart(2, "0")}
        </strong>
      </div>
      <div className="center text-gray-0 mt-2 h-[126px] rounded-xl border border-gray-600 text-lg font-semibold">
        {props.name}
      </div>
      <CallingCardUi
        staffCallId={props.staffCallId}
        tableNo={props.tableNo}
        text={props.name}
      />
    </div>
  );
}
