import { ExpenseItem } from '../types';
import { getMonthlyEquivalent } from './formatters';

export interface OverlapGroup {
  type: 'ott' | 'music' | 'shopping' | 'ai';
  title: string;
  badge: string;
  items: ExpenseItem[];
  monthlyTotal: number;
  yearlyTotal: number;
  potentialSaving: number;
  advice: string;
}

export function detectSubscriptionOverlaps(items: ExpenseItem[]): OverlapGroup[] {
  const activeItems = items.filter(it => it.isActive);
  const overlaps: OverlapGroup[] = [];

  // 1. 영상 스트리밍 (OTT) 분석
  const ottKeywords = ['넷플릭스', 'netflix', '유튜브', 'youtube', '티빙', 'tving', '디즈니', 'disney', '웨이브', 'wavve', '왓챠', 'watcha', '라프텔'];
  const ottItems = activeItems.filter(item => 
    ottKeywords.some(kw => item.name.toLowerCase().includes(kw))
  );

  if (ottItems.length >= 2) {
    const monthlyTotal = ottItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);
    // 가장 비싼 1개만 남기고 나머지를 순환 시청한다고 가정 시 절약액
    const sorted = [...ottItems].sort((a, b) => getMonthlyEquivalent(b) - getMonthlyEquivalent(a));
    const highestOne = getMonthlyEquivalent(sorted[0]);
    const potentialMonthlySaving = monthlyTotal - highestOne;

    overlaps.push({
      type: 'ott',
      title: `영상 스트리밍(OTT) ${ottItems.length}개 동시 구독 중`,
      badge: `${ottItems.length}개 중복`,
      items: ottItems,
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      potentialSaving: potentialMonthlySaving * 12,
      advice: 'OTT는 언제든 재가입해도 페널티가 없습니다. 보고 싶은 드라마가 끝났을 때 1개씩 번갈아 구독(순환 시청)하면 연간 수십만 원을 아낄 수 있습니다.'
    });
  }

  // 2. 음악 스트리밍 분석
  const musicKeywords = ['멜론', 'melon', '스포티파이', 'spotify', '애플뮤직', 'apple music', '지니', 'genie', '벅스', 'bugs', '플로', 'flo'];
  const musicItems = activeItems.filter(item => 
    musicKeywords.some(kw => item.name.toLowerCase().includes(kw))
  );
  const hasYoutube = activeItems.some(item => item.name.includes('유튜브'));

  if (musicItems.length >= 2 || (hasYoutube && musicItems.length >= 1)) {
    const monthlyTotal = musicItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);
    const potentialSaving = monthlyTotal * 12;

    overlaps.push({
      type: 'music',
      title: hasYoutube && musicItems.length >= 1 
        ? '유튜브 프리미엄 + 별도 음원 앱 중복 구독'
        : `음원 스트리밍 앱 ${musicItems.length}개 중복 구독`,
      badge: '음원 중복',
      items: musicItems,
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      potentialSaving: hasYoutube ? potentialSaving : Math.round(potentialSaving / 2),
      advice: hasYoutube 
        ? '유튜브 프리미엄에는 "유튜브 뮤직" 전곡 스트리밍이 무료 포함되어 있습니다! 멜론이나 스포티파이를 해지하면 음악 비용이 0원이 됩니다.'
        : '동일한 음악을 두 개 이상의 앱에서 들을 필요가 없습니다. 플레이리스트 이전 툴을 이용해 한 곳으로 단일화하세요.'
    });
  }

  // 3. 쇼핑 멤버십 분석 (쿠팡 + 네이버 등)
  const shoppingKeywords = ['쿠팡', 'coupang', '네이버', 'naver', '컬리', 'kurly', '신세계', '스마일클럽', '배민'];
  const shoppingItems = activeItems.filter(item => 
    item.category === 'digital' && shoppingKeywords.some(kw => item.name.toLowerCase().includes(kw))
  );

  if (shoppingItems.length >= 2) {
    const monthlyTotal = shoppingItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);
    const potentialSaving = Math.round(monthlyTotal * 12 * 0.5);

    overlaps.push({
      type: 'shopping',
      title: `쇼핑 멤버십 ${shoppingItems.length}개 동시 구독 중`,
      badge: '쇼핑 멤버십',
      items: shoppingItems,
      monthlyTotal,
      yearlyTotal: monthlyTotal * 12,
      potentialSaving,
      advice: '로켓배송과 네이버페이 적립 중 실제 월 구매 횟수가 더 많은 한 곳에만 집중 결제하고 나머지는 해지해도 생활에 지장이 없습니다.'
    });
  }

  return overlaps;
}
