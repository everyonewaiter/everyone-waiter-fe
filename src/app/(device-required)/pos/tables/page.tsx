import dynamic from "next/dynamic";

const PosTables = dynamic(() => import("../_components/template/PosTables"));

export default function Page() {
  return <PosTables />;
}
