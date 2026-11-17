import { ExpenseItem } from '../types';

/**
 * 숫자를 한국어 원화 포맷으로 변환 (예: 1250000 -> "1,250,000원")
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`;
}

/**
 * 큰 금액을 '만 원', '억 원' 단위로 친근하게 요약 (예: 1850000 -> "185만 원")
 */
export function formatShortWon(amount: number): string {
  if (amount >= 100000000) {
    const eok = Math.floor(amount / 100000000);
    const man = Math.round((amount % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString('ko-KR')}만 원` : `${eok}억 원`;
  }
  if (amount >= 10000) {
    const man = Math.round(amount / 10000);
    return `${man.toLocaleString('ko-KR')}만 원`;
  }
  return `${amount.toLocaleString('ko-KR')}원`;
}

/**
 * 주기(월납/연납/분기납)를 고려한 월 환산 금액 계산
 */
export function getMonthlyEquivalent(item: ExpenseItem): number {
  if (!item.isActive) return 0;
  
  const sharing = item.sharingCount && item.sharingCount > 1 ? item.sharingCount : 1;
  const baseAmount = item.amount / sharing;

  switch (item.billingCycle) {
    case 'yearly':
      return Math.round(baseAmount / 12);
    case 'quarterly':
      return Math.round(baseAmount / 3);
    case 'monthly':
    default:
      return Math.round(baseAmount);
  }
}

/**
 * 주기(월납/연납)를 고려한 연 환산 금액 계산
 */
export function getYearlyEquivalent(item: ExpenseItem): number {
  return getMonthlyEquivalent(item) * 12;
}

/**
 * 결제일까지 남은 일수 (D-Day) 및 다음 결제 날짜 계산
 */
export function calculateDDay(payDay: number): { dDay: number; label: string; nextDateStr: string } {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0 ~ 11
  const currentDate = today.getDate();

  // 이번 달의 말일 구하기
  const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const adjustedPayDay = Math.min(payDay, lastDayOfCurrentMonth);

  let targetDate = new Date(currentYear, currentMonth, adjustedPayDay);

  // 오늘보다 이전 날짜라면 다음 달로
  if (currentDate > adjustedPayDay) {
    const nextMonth = currentMonth + 1;
    const lastDayOfNextMonth = new Date(currentYear, nextMonth + 1, 0).getDate();
    const nextAdjustedDay = Math.min(payDay, lastDayOfNextMonth);
    targetDate = new Date(currentYear, nextMonth, nextAdjustedDay);
  }

  // 시간 차이 계산 (밀리초)
  const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const targetZero = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  const diffDays = Math.round((targetZero - todayZero) / (1000 * 60 * 60 * 24));

  let label = '';
  if (diffDays === 0) {
    label = 'D-Day (오늘)';
  } else if (diffDays === 1) {
    label = '내일 (D-1)';
  } else {
    label = `D-${diffDays}`;
  }

  const nextDateStr = `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;

  return { dDay: diffDays, label, nextDateStr };
}
