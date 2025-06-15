import React, { forwardRef, PropsWithChildren } from "react";

const FloatingInfo = forwardRef<HTMLDivElement, PropsWithChildren>(
  ({ children }, ref) => (
    <aside className="absolute -top-22.5 left-3 z-50" ref={ref}>
      <div className="relative inline-block">
        {/* 본체 */}
        <div className="w-[240px] rounded-2xl bg-white p-3 text-left text-xs whitespace-pre-line text-[#505050] shadow-md">
          {children}
        </div>

        {/* 삼각형을 감싸는 컨테이너에 그림자 적용 */}
        <div className="absolute -bottom-6 md:left-2 lg:left-6">
          <svg
            width="97"
            height="34"
            viewBox="0 0 97 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_5395_25760)">
              <path
                d="M44.3324 17.9761L34 8H63L52.6676 17.9761C50.3426 20.2209 46.6574 20.2209 44.3324 17.9761Z"
                fill="white"
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
  )
);

export default FloatingInfo;
