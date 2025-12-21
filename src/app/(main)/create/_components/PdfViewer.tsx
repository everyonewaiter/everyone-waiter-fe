"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";

interface IProps {
  file: string | File;
}

export default function PdfViewer({ file }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || isWorkerReady) {
      return undefined;
    }

    const initializeWorker = () => {
      try {
        if (!pdfjs || typeof pdfjs !== "object") return;

        const { version } = pdfjs;
        if (!version) return;

        const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;

        if (pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
          setIsWorkerReady(true);
          return;
        }

        (pdfjs as any).GlobalWorkerOptions = { workerSrc };
        setIsWorkerReady(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("PDF Worker 초기화 에러:", error);
      }
    };

    const timer = setTimeout(initializeWorker, 0);
    return () => clearTimeout(timer);
  }, [isWorkerReady]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const measure = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => {
        ro.disconnect();
      };
    }

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  if (!isWorkerReady) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gray-600">
        <p className="text-gray-300">PDF 초기화 중...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-2xl border border-gray-600 object-cover"
    >
      <Document
        file={file}
        onLoadError={(error) => {
          // eslint-disable-next-line no-console
          console.error("PDF 로드 에러:", error);
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-gray-300">PDF 로딩 중...</p>
          </div>
        }
      >
        <Page
          pageNumber={1}
          width={Math.max(100, width)}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
