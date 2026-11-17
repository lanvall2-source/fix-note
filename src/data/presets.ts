import { PresetItem } from '../types';

export const POPULAR_PRESETS: PresetItem[] = [
  // 1. 디지털 & 구독
  {
    name: '유튜브 프리미엄',
    category: 'digital',
    defaultAmount: 14900,
    defaultCycle: 'monthly',
    icon: 'Youtube',
    color: '#EF4444',
    popular: true,
    tip: '인도/우주패스 우회 대신 가족 요금제 또는 제휴 카드 할인 검토'
  },
  {
    name: '넷플릭스 프리미엄',
    category: 'digital',
    defaultAmount: 17000,
    defaultCycle: 'monthly',
    icon: 'Tv',
    color: '#E50914',
    popular: true,
    tip: '가구원 추가 또는 광고형 스탠다드(5,500원)로 변경 시 연 13.8만원 절약'
  },
  {
    name: '쿠팡 와우 멤버십',
    category: 'digital',
    defaultAmount: 7890,
    defaultCycle: 'monthly',
    icon: 'ShoppingBag',
    color: '#3B82F6',
    popular: true,
    tip: '쿠팡플레이 및 로켓배송 무료 혜택 포함'
  },
  {
    name: '티빙 (TVING)',
    category: 'digital',
    defaultAmount: 13500,
    defaultCycle: 'monthly',
    icon: 'Tv',
    color: '#FF153C',
    popular: true
  },
  {
    name: '네이버 플러스 멤버십',
    category: 'digital',
    defaultAmount: 4900,
    defaultCycle: 'monthly',
    icon: 'ShoppingBag',
    color: '#03C75A',
    popular: true,
    tip: '연간 결제 시 월 3,900원으로 할인'
  },
  {
    name: 'ChatGPT Plus',
    category: 'digital',
    defaultAmount: 29000,
    defaultCycle: 'monthly',
    icon: 'Bot',
    color: '#10A37F',
    popular: true
  },
  {
    name: '멜론 (Melon)',
    category: 'digital',
    defaultAmount: 10900,
    defaultCycle: 'monthly',
    icon: 'Music',
    color: '#00CD3C'
  },
  {
    name: '스포티파이',
    category: 'digital',
    defaultAmount: 11990,
    defaultCycle: 'monthly',
    icon: 'Music',
    color: '#1DB954'
  },
  {
    name: '디즈니+',
    category: 'digital',
    defaultAmount: 13900,
    defaultCycle: 'monthly',
    icon: 'Tv',
    color: '#113CCF'
  },

  // 2. 통신 & 방송
  {
    name: '스마트폰 요금 (통신3사)',
    category: 'telecom',
    defaultAmount: 75000,
    defaultCycle: 'monthly',
    icon: 'Smartphone',
    color: '#2563EB',
    popular: true,
    tip: '알뜰폰(월 1.9만원)으로 번호이동 시 매월 약 5.6만원(연 67만원) 즉시 절약!'
  },
  {
    name: '스마트폰 요금 (알뜰폰)',
    category: 'telecom',
    defaultAmount: 19800,
    defaultCycle: 'monthly',
    icon: 'Smartphone',
    color: '#059669',
    popular: true,
    tip: '통신 3사 동일 통화/데이터 품질, 위약금 없음'
  },
  {
    name: '인터넷 + IPTV 요금',
    category: 'telecom',
    defaultAmount: 42000,
    defaultCycle: 'monthly',
    icon: 'Wifi',
    color: '#4F46E5',
    popular: true,
    tip: '3년 약정 만료 시 재약정 또는 타사 신규 가입으로 현금 사은품 수령 가능'
  },

  // 3. 주거 & 공과금
  {
    name: '아파트 / 오피스텔 관리비',
    category: 'housing',
    defaultAmount: 220000,
    defaultCycle: 'monthly',
    icon: 'Home',
    color: '#10B981',
    popular: true,
    tip: '관리비 자동이체 할인 신용카드 연결 시 매월 5,000~10,000원 캐시백'
  },
  {
    name: '도시가스 (난방비)',
    category: 'housing',
    defaultAmount: 65000,
    defaultCycle: 'monthly',
    icon: 'Flame',
    color: '#EA580C',
    popular: true,
    tip: '겨울철 외출 모드 및 온수 온도 조절로 15% 절감'
  },
  {
    name: '한국전력 전기요금',
    category: 'housing',
    defaultAmount: 45000,
    defaultCycle: 'monthly',
    icon: 'Zap',
    color: '#F59E0B',
    popular: true
  },
  {
    name: '상하수도 요금',
    category: 'housing',
    defaultAmount: 18000,
    defaultCycle: 'monthly',
    icon: 'Droplets',
    color: '#0284C7'
  },

  // 4. 보험
  {
    name: '실손의료비(실비) 보험',
    category: 'insurance',
    defaultAmount: 38000,
    defaultCycle: 'monthly',
    icon: 'Shield',
    color: '#D97706',
    popular: true,
    tip: '비급여 과다 청구 여부 및 4세대 전환 유불리 점검'
  },
  {
    name: '암 / 종합건강보험',
    category: 'insurance',
    defaultAmount: 120000,
    defaultCycle: 'monthly',
    icon: 'HeartPulse',
    color: '#DC2626',
    popular: true,
    tip: '중복 가입된 담보 정리 및 해지환급금 미지급형 활용'
  },
  {
    name: '자동차보험 (연납)',
    category: 'insurance',
    defaultAmount: 850000,
    defaultCycle: 'yearly',
    icon: 'ShieldCheck',
    color: '#7C3AED',
    popular: true,
    tip: '다이렉트 비교 가입 + 마일리지 특약 + 티맵 안전운전 점수로 최대 35% 할인'
  },
  {
    name: '운전자보험',
    category: 'insurance',
    defaultAmount: 15000,
    defaultCycle: 'monthly',
    icon: 'ShieldAlert',
    color: '#B45309'
  },

  // 5. 자동차 & 모빌리티
  {
    name: '신차 장기렌터카 대여료',
    category: 'vehicle',
    defaultAmount: 480000,
    defaultCycle: 'monthly',
    icon: 'Car',
    color: '#BE185D',
    popular: true,
    tip: '취등록세, 자동차세, 보험료 일체 포함 상품인지 확인'
  },
  {
    name: '자동차 오토리스료',
    category: 'vehicle',
    defaultAmount: 550000,
    defaultCycle: 'monthly',
    icon: 'Car',
    color: '#9D174D'
  },
  {
    name: '자동차 신차/중고차 할부금',
    category: 'vehicle',
    defaultAmount: 380000,
    defaultCycle: 'monthly',
    icon: 'CarFront',
    color: '#DB2777',
    popular: true
  },
  {
    name: '정기 주차비 (월주차)',
    category: 'vehicle',
    defaultAmount: 130000,
    defaultCycle: 'monthly',
    icon: 'ParkingCircle',
    color: '#64748B'
  },

  // 6. 대출 & 금융
  {
    name: '주택담보대출 (원리금/이자)',
    category: 'finance',
    defaultAmount: 950000,
    defaultCycle: 'monthly',
    icon: 'Landmark',
    color: '#4338CA',
    popular: true,
    tip: '대환대출 인프라를 통해 0.5%p 낮은 금리로 갈아탈 경우 연 150만~300만원 절약'
  },
  {
    name: '전세자금대출 이자',
    category: 'finance',
    defaultAmount: 480000,
    defaultCycle: 'monthly',
    icon: 'Building2',
    color: '#4F46E5',
    popular: true,
    tip: '버팀목/청년 전세대출 자격 요건 충족 시 1~2%대 저금리 전환 가능'
  },
  {
    name: '신용대출 / 마이너스통장 이자',
    category: 'finance',
    defaultAmount: 220000,
    defaultCycle: 'monthly',
    icon: 'CreditCard',
    color: '#6366F1',
    popular: true
  },
  {
    name: '정수기 / 비데 렌탈비',
    category: 'finance',
    defaultAmount: 32900,
    defaultCycle: 'monthly',
    icon: 'Sparkles',
    color: '#0891B2',
    tip: '제휴 신용카드 전월 실적 30만원 충족 시 월 13,000~15,000원 렌탈료 할인'
  }
];
