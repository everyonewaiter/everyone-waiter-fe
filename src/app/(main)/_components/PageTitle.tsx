export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-gray-600 pb-3 lg:pb-[26px]">
      <h2 className="text-[18px] font-bold md:text-[16px] lg:text-[28px]">
        {title}
      </h2>
    </div>
  );
}
