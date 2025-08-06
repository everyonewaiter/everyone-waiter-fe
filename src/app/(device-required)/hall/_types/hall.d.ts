interface StaffCall {
  staffCallId: StringIterator;
  tableNo: number;
  name: string;
  state: "COMPLETE" | "INCOMPLETE";
  completeTime: string;
  createdAt: string;
}

type HallOrder = TableOrder & {
  createdAt: string;
  updatedAt: string;
  tableNo: number;
  tableName: string;
};
