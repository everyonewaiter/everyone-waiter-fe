import { useDaumPostcodePopup } from "react-daum-postcode";
import { UseFormReturn } from "react-hook-form";

const useOpenDaumPostcode = (form: UseFormReturn<any, any, any>) => {
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    form.setValue("address", fullAddress);
  };

  const handleOpenAddress = () => {
    open({ onComplete: handleAddressComplete });
  };

  return {
    handleOpenAddress,
  };
};

export default useOpenDaumPostcode;
