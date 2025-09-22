import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import { registrationTableWidths } from "@/constants/itemWidths";
import { registerStateTranslate } from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";
import cn from "@/lib/utils";

interface IProps {
  data?: StoreDetail[];
  onOpenModal: (value: StoreDetail) => void;
}

export default function Tables({ data, onOpenModal }: IProps) {
  return (
    <Table className="z-10 mt-[-10px] flex w-full flex-col md:mt-4">
      <TableHeader className="w-full">
        <TableRow isHead>
          {Object.keys(registrationTableWidths).map((item) => (
            <TableHead
              key={item}
              className={
                registrationTableWidths[
                  item as keyof typeof registrationTableWidths
                ].className
              }
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, idx) => (
          <TableRow
            key={item.registrationId.toString()}
            onClick={() => onOpenModal(item)}
          >
            <TableCell className={registrationTableWidths["No."].className}>
              {idx + 1}
            </TableCell>
            <TableCell className={registrationTableWidths.신청일.className}>
              {transformDate(item.createdAt)}
            </TableCell>
            <TableCell className={registrationTableWidths.상호명.className}>
              {item.name}
            </TableCell>
            <TableCell
              className={cn(
                registrationTableWidths.상태.className,
                "flex justify-center"
              )}
            >
              <ResponsiveButton
                color={item.status.toLowerCase()}
                responsiveButtons={{
                  md: {
                    buttonSize: "custom",
                    className:
                      "h-[26px] px-4 py-1 rounded-md text-xs text-white font-semibold",
                  },
                  lg: {
                    buttonSize: "custom",
                    className:
                      "h-[37px] px-5 py-2 rounded-lg text-sm text-white font-regular",
                  },
                }}
              >
                {registerStateTranslate[item.status]}
              </ResponsiveButton>
            </TableCell>
            <TableCell className={registrationTableWidths.사유.className}>
              {item.reason || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
