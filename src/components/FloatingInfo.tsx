interface FloatingInfoProps {
  style?: React.CSSProperties;
}

export default function FloatingInfo({ style }: FloatingInfoProps) {
  return (
    <aside
      className="absolute z-[9999] overflow-visible rounded-2xl bg-white shadow-[0_2px_10px_0_rgba(0,0,0,0.08)]"
      style={style}
    >
      <div className="relative inline-block">
        {/* 본체 */}
        <div className="w-[240px] rounded-2xl bg-white p-3 text-left text-xs whitespace-pre-line text-[#505050]">
          {`첫번째 옵션 상세가 기본값으로 설정됩니다.
순서변경 아이콘 클릭 시 옵션명 및 옵션상세의
순서를 변경할 수 있습니다.`}
        </div>

        {/* 삼각형 화살표 - 왼쪽에서 48.5px 위치 (SVG의 중앙) */}
        <div className="absolute -bottom-[26px] left-[48.5px] z-10 -translate-x-1/2 transform">
          <svg
            width="97"
            height="34"
            viewBox="0 0 97 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[34px] w-[97px]"
          >
            <g filter="url(#filter0_d_5395_25760)">
              <path
                d="M44.3324 17.9761L34 8H63L52.6676 17.9761C50.3426 20.2209 46.6574 20.2209 44.3324 17.9761Z"
                fill="#ffffffc9"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_5395_25760"
                x="0"
                y="0"
                width="97"
                height="34"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_5395_25760"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_5395_25760"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </aside>
  );
}
