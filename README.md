# Next.js 템플릿

이 템플릿은 Next.js 15 기반의 프로젝트를 빠르게 시작할 수 있도록 설계되었습니다.
개발 생산성과 코드 품질을 높이기 위한 다양한 도구들이 사전 구성되어 있습니다.

## 기술 스택

- **Next.js 15**: React 기반 풀스택 웹 프레임워크
- **TypeScript**: 정적 타입 지원
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **ESLint**: 코드 품질 검사 도구
- **Prettier**: 코드 포맷팅 도구
- **Husky**: Git 훅 관리
- **lint-staged**: 스테이징된 파일에 대한 린트 실행
- **commitlint**: 커밋 메시지 컨벤션 검사
- **pnpm**: 패키지 매니저

## 시작하기

1. 이 템플릿으로 새 저장소 생성:
   - GitHub에서 "Use this template" 버튼 클릭

```bash
# 저장소 클론
git clone https://github.com/~

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 디렉토리 구조

```
├── .husky/               # Git 훅 설정
├── public/               # 정적 파일
├── src/
│   ├── app/              # App Router 페이지 및 레이아웃
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── lib/              # 유틸리티 함수 및 공통 로직
├── .eslintrc.json        # ESLint 설정
├── .prettierrc           # Prettier 설정
├── commitlint.config.js  # Commitlint 설정
├── next.config.js        # Next.js 설정
├── tailwind.config.js    # Tailwind CSS 설정
└── tsconfig.json         # TypeScript 설정
```

## 커밋 메시지 가이드

이 프로젝트는 Conventional Commits 스펙을 따릅니다:

```
<type>: <description>

[optional body]

[optional footer]
```

### 타입 (Type)

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `design`: 디자인 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 수정
- `chore`: 빌드 프로세스, 패키지 매니저 설정 등
- `rename`: 파일 이름 변경
- `remove`: 파일 삭제
- `comment`: 주석 추가 또는 수정
