# YaguRoute - 카카오맵 기반 경로 안내 서비스

Next.js와 카카오맵을 활용한 현대적인 웹 애플리케이션입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🗺️ 카카오맵 설정

### 1. 카카오 개발자 계정 생성

1. [Kakao Developers](https://developers.kakao.com/)에 접속
2. 계정 생성 및 로그인
3. 애플리케이션 생성

### 2. JavaScript 키 발급

1. 생성된 애플리케이션 선택
2. 플랫폼 > Web 플랫폼 등록
3. 사이트 도메인 등록 (개발 시: `http://localhost:3000`)
4. JavaScript 키 복사

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
NEXT_PUBLIC_KAKAO_MAP_API_KEY=YOUR_JAVASCRIPT_KEY_HERE
```

### 4. API 키 적용

`src/app/layout.tsx` 파일에서 다음 부분을 수정하세요:

```tsx
<Script
  type="text/javascript"
  src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer`}
  strategy="beforeInteractive"
/>
```

## 🛠️ 주요 기능

- **실시간 지도**: 카카오맵을 통한 정확한 위치 정보
- **경로 안내**: 최적의 경로를 찾아주는 서비스
- **장소 검색**: 원하는 장소를 쉽게 찾을 수 있는 기능
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🏗️ 프로젝트 구조

```
yaguroute/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── KakaoMap.tsx    # 카카오맵 컴포넌트
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   └── page.module.css     # 스타일
│   └── ...
├── public/                     # 정적 파일
└── package.json
```

## 🔧 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: CSS Modules
- **Maps**: Kakao Maps API
- **Package Manager**: pnpm

## 📱 반응형 지원

- 데스크톱, 태블릿, 모바일 디바이스 지원
- CSS Grid를 활용한 유연한 레이아웃
- 터치 친화적인 인터페이스

## 🚨 주의사항

- 카카오맵 API 키는 반드시 환경 변수로 관리하세요
- API 키를 소스 코드에 직접 하드코딩하지 마세요
- 프로덕션 배포 시 도메인을 카카오 개발자 콘솔에 등록하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 이슈를 통해 제출해 주세요.
