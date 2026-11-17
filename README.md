# 고정비노트 (FixNote) 💸📱

> **"숨만 쉬어도 매달 나가는 내 돈, 한눈에 파악하고 1년에 100만 원 이상 다이어트하기!"**  
> 디지털 구독(OTT)부터 휴대폰/인터넷 통신비, 아파트 관리비, 실비보험, 자동차 렌트/리스, 주택담보대출까지 한곳에서 관리하는 초경량 스마트 고정비 PWA 웹앱.

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-emerald?logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ 핵심 차별점 & 주요 기능

### 1. 6대 생활 고정비 통합 관리
- 🏦 **대출 & 금융**: 주택담보대출, 전세대출, 신용대출 (원리금/이자 분할상환, 금리, 만기)
- 🚗 **자동차 & 모빌리티**: 신차 장기렌터카, 오토리스, 차량할부금, 정기 주차비
- 🛡️ **보험**: 실손(실비)보험, 암/종합건강보험, 다이렉트 자동차보험 (1년 갱신월 D-Day)
- 🏠 **주거 & 공과금**: 아파트/원룸 관리비, 도시가스 난방비, 한전 전기세, 수도요금
- 📶 **통신 & 방송**: 휴대폰 요금(통신3사/알뜰폰), 인터넷+IPTV (3년 약정 만료 D-Day)
- 📱 **디지털 & 구독**: 넷플릭스, 유튜브 프리미엄, 쿠팡 와우, ChatGPT, 멜론 등 (N인 쉐어 분할)

### 2. 강력한 대시보드 & 결제일 D-Day 알리미
- **월간 총액 & 연간 환산 충격 요약**: "매월 약 200만 원 ➔ 1년에 약 2,400만 원 고정 지출"
- **다가오는 결제일(D-Day)**: `오늘 D-Day`, `내일 D-1`, `D-3` 뱃지로 통장 잔고 사전 대비
- **카테고리별 비중 그래프**: 어디에 돈이 가장 많이 빠져나가는지 직관적 시각화

### 3. 고정비 다이어트 (절약 시뮬레이터 & 수익화)
- **통신비 다이어트**: 통신 3사(월 8만 원) ➔ 알뜰폰(월 1.9만 원) 변경 시 **연간 73만 원 절약** 실시간 계산
- **대출 금리 인하(대환대출)**: 금리 0.5%p~1.0%p 인하 시 아끼는 연간 이자 시뮬레이션
- **자동차보험 다이렉트 전환**: 다이렉트 갱신 + 마일리지 특약 체크리스트
- **토스 숨은 환급금 찾기 연계**: 놓친 세금 환급금 5분 조회 연계

### 4. 100% 개인정보 안심 보장 (Zero-Server)
- 번거롭고 찝찝한 **회원가입, 로그인, 은행 인증서 연동 불필요!**
- 모든 데이터는 **사용자 스마트폰 브라우저(LocalStorage)**에만 100% 암호화 보관.
- JSON 파일로 1초 만에 **백업 & 복원(기기 변경 지원)**.

### 5. 모바일 최적화 PWA
- 앱스토어 설치 없이 **"홈 화면에 추가"** 1초 설치.
- 오프라인 환경에서도 0.1초 즉시 실행.
- 엄지 영역 최적화 하단 네비게이션 및 햅틱 진동 피드백.

---

## 🛠️ 기술 스택 (Tech Stack)
- **Framework**: React 18, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4, Lucide React Icons, Pretendard Font
- **Storage**: LocalStorage (Zero-Backend)
- **PWA**: Service Worker, Web App Manifest
- **Deploy**: Vercel

---

## 🚀 빠른 시작 (Local Development)

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 배포 빌드
npm run build
```

---

## 📄 라이선스
MIT License
