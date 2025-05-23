export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <p>전체 메뉴 페이지 {id}</p>
    </div>
  );
}
