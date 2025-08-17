import { notFound } from "next/navigation";
import PosHistory from "../../_components/template/PosHistory";
import Pos from "../../page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ from: string }>;
}) {
  const { from } = await searchParams;

  if (from === "pos") {
    return <Pos />;
  }
  if (from === "history") {
    return <PosHistory />;
  }
  notFound();
}
