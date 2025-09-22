import LogoSvg from "@/assets/logo.svg";

interface IProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 120, height = 40, className }: IProps) {
  return <LogoSvg width={width} height={height} className={className} />;
}
