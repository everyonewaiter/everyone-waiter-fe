import { useEffect, useRef } from "react";

export default function useFocusToLastText(isEditing: boolean) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const id = isEditing
      ? requestAnimationFrame(() => {
          const el = textareaRef.current;
          if (el) {
            el.focus();
            const len = el.value.length;
            el.setSelectionRange(len, len);
          }
        })
      : null;

    return () => {
      if (id !== null) cancelAnimationFrame(id);
    };
  }, [isEditing]);

  return { textareaRef };
}
