import QueryProviders from "@/app/query-providers";
import Checkbox from "@/components/common/Checkbox";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import { TableCell, TableRow } from "@/components/common/Table/Tables";
import { PermissionObj } from "@/constants/permissionObj";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import UserInfoModal from "../../_components/UserInfoModal";

export default function UsersTableRow({ ...item }: AdminAccount) {
  const { open, close } = useOverlay();

  const handleOpenModal = (accountId: bigint) => {
    open(() => (
      <QueryProviders>
        <UserInfoModal close={close} accountId={accountId} />
      </QueryProviders>
    ));
  };

  return (
    <TableRow onClick={() => handleOpenModal(item.accountId)}>
      <TableCell className="w-[68px]">
        <Checkbox />
      </TableCell>
      <TableCell className="flex-[1.3]">{item.email}</TableCell>
      <TableCell className="flex-1">{item.createdAt}</TableCell>
      <TableCell className="flex flex-1 justify-center">
        <ResponsiveButton
          responsiveButtons={{
            lg: {
              buttonSize: "md",
              className: cn(
                "!h-[37px] !px-5 !py-2 !rounded-[24px]",
                item.permission === "OWNER"
                  ? "!bg-[#3900B508] !text-[#3900B5]"
                  : "",
                item.permission === "USER"
                  ? "!bg-[#00C03010] !text-[#00C030]"
                  : "",
                item.permission === "ADMIN"
                  ? "!bg-[#FFB70008] !text-[#FFB700]"
                  : ""
              ),
            },
            md: {
              buttonSize: "md",
              className:
                "!h-[26px] !rounded-[24px] !bg-[#3900B508] !text-[#3900B5] !text-xs !font-regular !px-3 !py-1",
            },
          }}
        >
          {PermissionObj[item.permission as TPermission]}
        </ResponsiveButton>
      </TableCell>
      <TableCell className="flex-1">??</TableCell>
      <TableCell className="flex-1">
        {item.hasStore === "Y" ? "구독중" : "-"}
      </TableCell>
      <TableCell className="flex-1">{item.stats || "-"}</TableCell>
    </TableRow>
  );
}
