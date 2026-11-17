import React from 'react';
import { ExpenseItem, CategoryType, PresetItem, UserSettings } from '../types';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import { POPULAR_PRESETS } from '../data/presets';
import { detectSubscriptionOverlaps } from '../utils/overlapDetector';
import { formatCurrency, formatShortWon, getMonthlyEquivalent, calculateDDay } from '../utils/formatters';
import { CategoryIcon } from './CategoryIcon';
import { TrendingDown, ChevronRight, AlertCircle, PlusCircle, ArrowUpRight, Flame, AlertTriangle, LogOut } from 'lucide-react';

interface DashboardViewProps {
  items: ExpenseItem[];
  settings: UserSettings;
  onOpenAddModalWithPreset: (preset: PresetItem) => void;
  onOpenAddModal: () => void;
  onSelectCategoryFilter: (category: CategoryType) => void;
  onGoToDietTab: () => void;
  onEditItem: (item: ExpenseItem) => void;
  onOpenCancelGuide: (serviceId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  items,
  settings,
  onOpenAddModalWithPreset,
  onOpenAddModal,
  onSelectCategoryFilter,
  onGoToDietTab,
  onEditItem,
  onOpenCancelGuide
}) => {
  // 활성 항목만 필터
  const activeItems = items.filter(item => item.isActive);

  // 중복 구독 감지
  const overlaps = detectSubscriptionOverlaps(items);

  // 월 환산 총액 및 연 환산 총액 계산
  const monthlyTotal = activeItems.reduce((acc, item) => acc + getMonthlyEquivalent(item), 0);
  const yearlyTotal = monthlyTotal * 12;

  // 카테고리별 합계 및 비중 계산
  const categoryStats = CATEGORY_LIST.map(cat => {
    const catItems = activeItems.filter(item => item.category === cat.id);
    const sum = catItems.reduce((acc, item) => acc + getMonthlyEquivalent(item), 0);
    const percentage = monthlyTotal > 0 ? Math.round((sum / monthlyTotal) * 100) : 0;
    return {
      category: cat,
      sum,
      count: catItems.length,
      percentage
    };
  }).filter(stat => stat.sum > 0).sort((a, b) => b.sum - a.sum);

  // 다가오는 결제일 (가장 가까운 D-Day 순 정렬)
  const upcomingItems = activeItems
    .map(item => {
      const { dDay, label, nextDateStr } = calculateDDay(item.payDay);
      return { item, dDay, label, nextDateStr };
    })
    .sort((a, b) => a.dDay - b.dDay)
    .slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-5 pb-6 break-keep">
      
      {/* 1. 메인 고정비 지출 요약 카드 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 sm:p-5 border border-slate-700/60 shadow-xl text-white">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              숨만 쉬어도 매달 나가는 고정비
            </span>
            <span className="bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 text-[11px] whitespace-nowrap">
              총 {activeItems.length}개 항목
            </span>
          </div>

          {/* 메인 월 총액 */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {formatCurrency(monthlyTotal)}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ 월</span>
          </div>

          {/* 연간 환산 및 연간 지출 쇼크 */}
          <div className="mt-3.5 pt-3.5 border-t border-slate-700/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 whitespace-nowrap">1년 환산 고정 지출</span>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 whitespace-nowrap">
                약 {formatShortWon(yearlyTotal)}
              </span>
            </div>
            <button
              onClick={onGoToDietTab}
              className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
            >
              <span>절약 시뮬레이터</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. 중복 구독 감지 퀵 알림 (중복이 있을 때 상단 노출) */}
      {overlaps.length > 0 && (
        <div 
          onClick={onGoToDietTab}
          className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between cursor-pointer hover:bg-amber-950/40 transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-xs text-amber-200 truncate">
              <strong>{overlaps[0].title}</strong> 감지! (월 {formatShortWon(overlaps[0].monthlyTotal)})
            </div>
          </div>
          <span className="text-[11px] text-amber-400 font-bold shrink-0 ml-2 whitespace-nowrap flex items-center gap-0.5">
            점검하기
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      )}

      {/* 3. 다가오는 결제일 D-Day 섹션 */}
      <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-400" />
            곧 결제되는 고정비 (D-Day)
          </h2>
          <span className="text-[11px] text-slate-400">다가오는 5개 항목</span>
        </div>

        {upcomingItems.length === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs">
            등록된 활성 고정비가 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {upcomingItems.map(({ item, dDay, label, nextDateStr }) => {
              const meta = CATEGORIES[item.category];
              const isUrgent = dDay <= 3;

              return (
                <div
                  key={item.id}
                  onClick={() => onEditItem(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 cursor-pointer active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                    >
                      <CategoryIcon category={item.category} iconName={item.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {item.name}
                        </span>
                        {item.sharingCount && item.sharingCount > 1 && (
                          <span className="text-[10px] bg-slate-700 text-slate-300 px-1 py-0.2 rounded shrink-0 whitespace-nowrap">
                            {item.sharingCount}인 쉐어
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 whitespace-nowrap overflow-hidden">
                        <span>{nextDateStr} (매월 {item.payDay}일)</span>
                        {item.paymentMethod && (
                          <span className="text-slate-500 truncate max-w-[80px]">· {item.paymentMethod}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <div className="text-xs font-bold text-slate-100 whitespace-nowrap">
                      {formatCurrency(getMonthlyEquivalent(item))}
                    </div>
                    <span 
                      className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 whitespace-nowrap ${
                        isUrgent
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                          : 'bg-slate-700/80 text-slate-300'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. 카테고리별 지출 비중 */}
      <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-200">
            어디에 돈이 가장 많이 나갈까?
          </h2>
          <span className="text-[11px] text-slate-400">카테고리별 비중</span>
        </div>

        {/* 누적 바 그래프 */}
        {categoryStats.length > 0 && (
          <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden mb-4 p-0.5 gap-0.5">
            {categoryStats.map(stat => (
              <div
                key={stat.category.id}
                title={`${stat.category.label}: ${stat.percentage}%`}
                className="h-full rounded-sm transition-all duration-500"
                style={{
                  width: `${stat.percentage}%`,
                  backgroundColor: stat.category.color
                }}
              />
            ))}
          </div>
        )}

        {/* 카테고리별 행 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categoryStats.map(stat => (
            <div
              key={stat.category.id}
              onClick={() => onSelectCategoryFilter(stat.category.id)}
              className="p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stat.category.color}20`, color: stat.category.color }}
                >
                  <CategoryIcon category={stat.category.id} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span className="whitespace-nowrap">{stat.category.label}</span>
                    <span className="text-[10px] text-slate-500">({stat.count})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    전체의 <span className="font-bold text-slate-300">{stat.percentage}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right whitespace-nowrap pl-2">
                <span className="text-xs font-bold text-slate-100">
                  {formatCurrency(stat.sum)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 빠른 원클릭 프리셋 등록 바 */}
      <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            인기 고정비 바로 등록하기
          </span>
          <button 
            onClick={onOpenAddModal}
            className="text-[11px] text-emerald-400 hover:underline whitespace-nowrap"
          >
            직접 입력
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {POPULAR_PRESETS.slice(0, 8).map(preset => (
            <button
              key={preset.name}
              onClick={() => onOpenAddModalWithPreset(preset)}
              className="shrink-0 flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 px-3 py-2 rounded-xl border border-slate-700 text-xs font-medium transition-all shadow-sm whitespace-nowrap"
            >
              <div 
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: preset.color }}
              />
              <span>{preset.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {formatShortWon(preset.defaultAmount)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 6. 1분 해지 가이드 & 다이어트 배너 2종 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div 
          onClick={() => onOpenCancelGuide()}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 flex items-center justify-between cursor-pointer hover:border-rose-500/50 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                구독 1분 해지 바로가기
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                넷플릭스·유튜브·쿠팡 해지 링크
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 shrink-0" />
        </div>

        <div 
          onClick={onGoToDietTab}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                통신비·대출이자 절약 계산기
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                알뜰폰 전환 연 73만원 세이브
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
        </div>
      </div>

    </div>
  );
};
