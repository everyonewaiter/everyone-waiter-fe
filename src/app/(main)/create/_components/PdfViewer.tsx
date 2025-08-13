"use client";

import { Document, Page, pdfjs } from "react-pdf";

interface IProps {
  file: string;
}

export default function PdfViewer({ file }: IProps) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <Document file={file}>
      <Page pageNumber={0} />
    </Document>
  );
}
