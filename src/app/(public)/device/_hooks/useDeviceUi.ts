"use client";

import { useState } from "react";

export default function useDeviceUI() {
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState({
    storeId: "",
    phoneNumber: "",
    storeName: "",
  });

  return { step, setStep, device, setDevice };
}
