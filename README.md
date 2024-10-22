# GovenMiniIoTManage

고피자 Goven MINI IoT 시스템의 관리자 페이지입니다.

## 시스템 구성

- Frontend: GovenMiniIoTManage (현재 레포지토리)
- Backend(prd): https://api.gopizza.kr
- Backend(dev): https://dev.api.gopizza.kr

## 기술 스택

- Next.js 14
- TypeScript
- MobX
- TailwindCSS
- Vercel

## 주요 기능

- IoT 기기 관리
  - 기기 상태 모니터링
  - 기기별 설정 관리
- 데이터 모니터링 및 로그 조회

## 개발 환경 설정

1. 의존성 설치
   yarn install

2. 개발 서버 실행
   yarn dev

3. 프로덕션 빌드
   yarn build

## 배포

현재 Vercel을 통해 자동 배포가 구성되어 있습니다:

- `main` 브랜치: 프로덕션 환경 배포
- PR 생성시: 프리뷰 환경 배포

## 프로젝트 구조

```
GovenMiniIoTManage/
├── api/ # API 통신 관련
├── components/ # 재사용 컴포넌트
├── data/ # 정적 데이터
├── hooks/ # Custom Hooks
├── mobx/ # MobX 스토어
├── pages/ # 페이지 컴포넌트
├── public/ # 정적 파일
├── styles/ # 스타일 관련
└── util/ # 유틸리티 함수
```

## 관련 링크

- [관리자 페이지](https://goven-demo.vercel.app)

## 라이선스

Private Repository - 고피자 내부용

## 문의

- 고피자 푸드테크연구소 (futureplanning@gopizza.kr)
