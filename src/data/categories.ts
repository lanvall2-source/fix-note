import { CategoryMeta, CategoryType } from '../types';

export const CATEGORIES: Record<CategoryType, CategoryMeta> = {
  digital: {
    id: 'digital',
    label: '디지털 & 구독',
    shortLabel: '구독',
    icon: 'Tv',
    color: '#8B5CF6', // Purple
    bgColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-600 dark:text-purple-400',
    description: 'OTT, 음악, AI, 클라우드, 쇼핑 멤버십'
  },
  telecom: {
    id: 'telecom',
    label: '통신 & 방송',
    shortLabel: '통신',
    icon: 'Smartphone',
    color: '#3B82F6', // Blue
    bgColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    description: '스마트폰 요금제, 인터넷, IPTV, 결합상품'
  },
  housing: {
    id: 'housing',
    label: '주거 & 공과금',
    shortLabel: '주거',
    icon: 'Home',
    color: '#10B981', // Emerald
    bgColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    description: '아파트/원룸 관리비, 도시가스, 전기, 수도'
  },
  insurance: {
    id: 'insurance',
    label: '보험',
    shortLabel: '보험',
    icon: 'Shield',
    color: '#F59E0B', // Amber
    bgColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    description: '실손의료비, 암/건강종합, 운전자, 자동차보험'
  },
  vehicle: {
    id: 'vehicle',
    label: '자동차 & 모빌리티',
    shortLabel: '차량',
    icon: 'Car',
    color: '#EC4899', // Pink
    bgColor: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
    borderColor: 'border-pink-200 dark:border-pink-800',
    textColor: 'text-pink-600 dark:text-pink-400',
    description: '장기렌트, 오토리스, 차량할부, 정기주차'
  },
  finance: {
    id: 'finance',
    label: '대출 & 금융',
    shortLabel: '대출',
    icon: 'Landmark',
    color: '#6366F1', // Indigo
    bgColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    description: '주택담보대출, 전세대출, 신용대출, 렌탈'
  }
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
