import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  MobileTable,
  MobileTableCell,
  MobileTableHead,
  MobileTableRow,
  TableBody,
} from "@/components/common/Table/Tables";
import { registrationTableWidths } from "@/constants/itemWidths";
import { registerStateTranslate } from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";

interface IProps extends StoreDetail {
  onClick: (item: StoreDetail) => void;
  tableNo: number;
}

export default function MobileTables({ onClick, tableNo, ...props }: IProps) {
  console.log(props);
  return (
    <MobileTable className="z-10" onClick={() => onClick(props)}>
      <TableBody className="flex flex-col">
        <MobileTableRow>
          <MobileTableHead>No.</MobileTableHead>
          <MobileTableCell>{tableNo}</MobileTableCell>
        </MobileTableRow>
        {Object.keys(registrationTableWidths)
          .slice(1)
          .map((key) => (
            <MobileTableRow key={key}>
              <MobileTableHead>{key}</MobileTableHead>
              {key === "신청일" && (
                <MobileTableCell>
                  {transformDate(props.createdAt)}
                </MobileTableCell>
              )}
              {key === "상태" && (
                <MobileTableCell>
                  <ResponsiveButton
                    color={props.status.toLowerCase()}
                    responsiveButtons={{
                      sm: {
                        buttonSize: "custom",
                        className:
                          "h-[26px] px-4 py-1 rounded-md text-xs text-white font-semibold",
                      },
                    }}
                  >
                    {registerStateTranslate[props.status]}
                  </ResponsiveButton>
                </MobileTableCell>
              )}
              {key === "사유" && (
                <MobileTableCell hideBorder>
                  {props.reason || "-"}
                </MobileTableCell>
              )}
              {key !== "신청일" && key !== "상태" && key !== "사유" && (
                <MobileTableCell>
                  {props[
                    registrationTableWidths[
                      key as keyof typeof registrationTableWidths
                    ].text as keyof StoreDetail
                  ] ?? "-"}
                </MobileTableCell>
              )}
            </MobileTableRow>
          ))}
      </TableBody>
    </MobileTable>
  );
}
