import { ChangeEvent, useRef, useState } from "react";

export default function useControlImage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>,
    onSetImage: (value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onSetImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return {
    fileRef,
    imageUrl,
    handleFile,
  };
}
