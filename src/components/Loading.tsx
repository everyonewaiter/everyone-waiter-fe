export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <img
        src="/gif/loading.gif"
        alt="로딩 중"
        className="h-[178px] w-[154px]"
      />
    </div>
  );
}
