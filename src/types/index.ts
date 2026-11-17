export type CategoryType = 
  | 'digital'    // 디지털 & 구독
  | 'telecom'    // 통신 & 방송
  | 'housing'    // 주거 & 공과금
  | 'insurance'  // 보험
  | 'vehicle'    // 자동차 & 모빌리티
  | 'finance';   // 대출 & 금융

export type BillingCycle = 'monthly' | 'yearly' | 'quarterly';

export interface ExpenseItem {
  id: string;
  name: string;
  category: CategoryType;
  amount: number;
  billingCycle: BillingCycle;
  payDay: number; // 1 ~ 31
  paymentMethod?: string; // 카드, 통장 등
  memo?: string;
  isActive: boolean; // 활성/일시정지
  color?: string;
  icon?: string;
  
  // 부가 정보 (선택)
  contractEndDate?: string; // 약정 만료일 / 만기일 (YYYY-MM-DD)
  interestRate?: number;     // 대출 금리 (%)
  loanBalance?: number;      // 대출 잔액 (원)
  sharingCount?: number;     // 구독 쉐어 인원 (1이면 본인 전액)
  
  createdAt: string;
  updatedAt: string;
}

export interface CategoryMeta {
  id: CategoryType;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
}

export interface PresetItem {
  name: string;
  category: CategoryType;
  defaultAmount: number;
  defaultCycle: BillingCycle;
  icon: string;
  color: string;
  popular?: boolean;
  tip?: string;
}

export interface UserSettings {
  salaryDay: number; // 급여일 (1~31)
  monthlyBudget?: number; // 월 목표 고정비 예산
  currency: string;
  installedPwaAt?: string;
}
