import dynamic from "next/dynamic";
import Image from "next/image";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { CloseIcon } from "@/components/common/Icon";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import Spinner from "@/components/common/Spinner";

const PdfViewer = dynamic(
  () => import("@/app/(main)/create/_components/PdfViewer"),
  { ssr: false, loading: () => <Spinner /> }
);

interface IProps {
  onClose: () => void;
  image: string;
  onClickUpdate: () => void;
  type: "pdf" | "image";
}

export default function LicensePreview({
  onClose,
  image,
  onClickUpdate,
  type,
}: IProps) {
  return (
    <ModalWithTitle
      onClose={onClose}
      topRightComponent={
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      }
      title="사업자 등록증 미리보기"
      className="md:w-[480px] lg:w-[540px]"
    >
      <div className="flex flex-1 flex-col gap-8">
        <div className="center w-full">
          {type === "pdf" && <PdfViewer file={image} />}
          {type === "image" && (
            <Image
              src={image as string}
              alt="사업자 등록중"
              width={381}
              height={458}
              className="aspect-[381/458] rounded-2xl border border-gray-600 object-cover lg:h-[458px] lg:w-[381px]"
            />
          )}
        </div>
        <ResponsiveButton
          responsiveButtons={{
            lg: { buttonSize: "xl" },
            md: { buttonSize: "md" },
            sm: { buttonSize: "sm" },
          }}
          color="black"
          commonClassName="w-full"
          onClick={onClickUpdate}
        >
          변경하기
        </ResponsiveButton>
      </div>
    </ModalWithTitle>
  );
}
