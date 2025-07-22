import SkeletonInput from "./SkeletonInput";
import SkeletonLabel from "./SkeletonLabel";

export default function SkeletonGroup() {
  return Array.from({ length: 5 }, (_, i: number) => i + 1).map(
    (el: number) => (
      <div className="flex flex-col gap-2.5" key={el}>
        <SkeletonLabel />
        <SkeletonInput />
      </div>
    )
  );
}
