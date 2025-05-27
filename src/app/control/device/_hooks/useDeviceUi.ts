"use client";

import { useState } from "react";

export default function useDeviceUI() {
  const [step, setStep] = useState(0);
  const [storeId, setStoreId] = useState(BigInt(0));
  const [phoneNumber, setPhoneNumber] = useState("");

  return { step, setStep, storeId, setStoreId, phoneNumber, setPhoneNumber };
}
