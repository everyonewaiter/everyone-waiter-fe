import Checkbox from "@/components/common/Checkbox";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { TableCell, TableRow } from "@/components/common/Table/Tables";
import { permissionTranslate, stateTranslate } from "@/constants/translates";
import cn from "@/lib/utils";

interface IProps extends AdminAccount {
  openModal: () => void;
}

export default function UsersTableRow({ openModal, ...item }: IProps) {
  return (
    <TableRow onClick={openModal}>
      <TableCell className="md:w-[64px] lg:w-[68px]">
        <Checkbox />
      </TableCell>
      <TableCell className="flex-[1.3]">
        <span className="hidden lg:block">{item.email}</span>
        <span className="hidden md:block lg:hidden">
          {item.email.length > 15
            ? `${item.email.slice(0, 15)}...`
            : item.email}
        </span>
      </TableCell>
      <TableCell className="flex-1">{item.createdAt.slice(2, 16)}</TableCell>
      <TableCell className="flex flex-1 justify-center">
        <ResponsiveButton
          responsiveButtons={{
            lg: {
              buttonSize: "md",
              className: "!h-[37px] !px-5 !py-2 !rounded-[24px]",
            },
            md: {
              buttonSize: "md",
              className:
                "!h-[26px] !rounded-[24px] !bg-[#3900B508] !text-[#3900B5] !text-xs !font-regular !px-3 !py-1",
            },
          }}
          commonClassName={cn(
            "!font-medium",
            item.permission === "OWNER"
              ? "!bg-[#3900B518] !text-[#3900B5]"
              : "",
            item.permission === "USER" ? "!bg-[#00C03010] !text-[#00C030]" : "",
            item.permission === "ADMIN" ? "!bg-[#FFB70018] !text-[#FFB700]" : ""
          )}
        >
          {permissionTranslate[item.permission as Permission]}
        </ResponsiveButton>
      </TableCell>
      <TableCell className="flex-1">-</TableCell>
      <TableCell className="flex-1">{item.hasStore}</TableCell>
      <TableCell className="flex-1">
        {stateTranslate[item.state] || "-"}
      </TableCell>
    </TableRow>
  );
}
