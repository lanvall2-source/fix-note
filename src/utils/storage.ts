import { ExpenseItem, UserSettings } from '../types';

const STORAGE_KEY_ITEMS = 'fixnote_items_v1';
const STORAGE_KEY_SETTINGS = 'fixnote_settings_v1';
const STORAGE_KEY_HAS_VISITED = 'fixnote_visited_v1';

export const INITIAL_DEMO_ITEMS: ExpenseItem[] = [
  {
    id: 'demo-1',
    name: '넷플릭스 프리미엄 (4인 쉐어)',
    category: 'digital',
    amount: 17000,
    billingCycle: 'monthly',
    payDay: 5,
    sharingCount: 4,
    paymentMethod: '신한카드',
    isActive: true,
    memo: '친구 4명 뿜빠이 중 (실부담 4,250원)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: '유튜브 프리미엄',
    category: 'digital',
    amount: 14900,
    billingCycle: 'monthly',
    payDay: 14,
    paymentMethod: '카카오페이',
    isActive: true,
    memo: '백그라운드 재생 & 광고 제거',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-3',
    name: '쿠팡 와우 멤버십',
    category: 'digital',
    amount: 7890,
    billingCycle: 'monthly',
    payDay: 22,
    paymentMethod: '쿠페이',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-4',
    name: '스마트폰 5G 무제한 (SKT)',
    category: 'telecom',
    amount: 79000,
    billingCycle: 'monthly',
    payDay: 25,
    paymentMethod: 'KB국민카드 자동이체',
    isActive: true,
    memo: '25% 선택약정 할인 적용 중',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-5',
    name: '기가 인터넷 + B tv',
    category: 'telecom',
    amount: 41800,
    billingCycle: 'monthly',
    payDay: 25,
    paymentMethod: 'KB국민카드',
    isActive: true,
    memo: '3년 약정 결합 할인',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-6',
    name: '아파트 관리비',
    category: 'housing',
    amount: 245000,
    billingCycle: 'monthly',
    payDay: 28,
    paymentMethod: '우리은행 자동이체',
    isActive: true,
    memo: '여름/겨울 냉난방비 변동 있음',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-7',
    name: '도시가스 요금',
    category: 'housing',
    amount: 58000,
    billingCycle: 'monthly',
    payDay: 10,
    paymentMethod: '카카오페이 청구서',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-8',
    name: '실손의료비(실비) 보험',
    category: 'insurance',
    amount: 38500,
    billingCycle: 'monthly',
    payDay: 15,
    paymentMethod: '신한은행 계좌이체',
    isActive: true,
    memo: '3세대 단독 실손',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-9',
    name: '다이렉트 자동차보험 (연납)',
    category: 'insurance',
    amount: 780000,
    billingCycle: 'yearly',
    payDay: 18,
    paymentMethod: '현대카드 무이자 6개월',
    isActive: true,
    memo: '매년 5월 갱신 (월 환산 65,000원)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-10',
    name: '신차 장기렌터카 대여료 (아반떼)',
    category: 'vehicle',
    amount: 430000,
    billingCycle: 'monthly',
    payDay: 20,
    paymentMethod: '현대캐피탈 자동이체',
    isActive: true,
    memo: '보험료/자동차세 포함, 48개월 약정',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-11',
    name: '디딤돌 주택담보대출 (원리금)',
    category: 'finance',
    amount: 880000,
    billingCycle: 'monthly',
    payDay: 10,
    interestRate: 3.85,
    loanBalance: 195000000,
    paymentMethod: '국민은행 자동이체',
    isActive: true,
    memo: '고정금리 30년 분할상환',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DEFAULT_SETTINGS: UserSettings = {
  salaryDay: 25,
  monthlyBudget: 2000000,
  currency: 'KRW'
};

/**
 * 저장된 데이터 로드 (첫 접속 시 사용자가 놀라지 않도록 빈 배열로 시작)
 */
export function loadExpenseItems(): ExpenseItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (!raw) {
      // 신규 접속자: 빈 배열로 시작하여 본인 데이터 입력을 자연스럽게 유도
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify([]));
      return [];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load expense items from localStorage', err);
    return [];
  }
}

/**
 * 현재 아이템 목록이 예시 데이터인지 여부 판별
 */
export function checkIsDemoData(items: ExpenseItem[]): boolean {
  if (items.length === 0) return false;
  return items.some(item => item.id.startsWith('demo-'));
}

export function saveExpenseItems(items: ExpenseItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save expense items to localStorage', err);
  }
}

export function loadUserSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to localStorage', err);
  }
}

/**
 * 데이터 백업 파일 (JSON) 다운로드
 */
export function exportDataAsJson(items: ExpenseItem[], settings: UserSettings): void {
  const data = {
    app: 'FixNote',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    items,
    settings
  };
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FixNote_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * JSON 파일에서 데이터 복원
 */
export function importDataFromJson(jsonStr: string): { items: ExpenseItem[]; settings: UserSettings } | null {
  try {
    const data = JSON.parse(jsonStr);
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('유효하지 않은 FixNote 백업 파일입니다.');
    }
    return {
      items: data.items,
      settings: data.settings || DEFAULT_SETTINGS
    };
  } catch (err) {
    console.error('Failed to import json', err);
    return null;
  }
}
