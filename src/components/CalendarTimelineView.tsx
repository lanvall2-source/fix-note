import React, { useState } from 'react';
import { ExpenseItem, UserSettings } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatCurrency, formatShortWon, getMonthlyEquivalent } from '../utils/formatters';
import { CategoryIcon } from './CategoryIcon';
import { Calendar, CheckCircle2, ChevronRight, DollarSign } from 'lucide-react';

interface CalendarTimelineViewProps {
  items: ExpenseItem[];
  settings: UserSettings;
  onEditItem: (item: ExpenseItem) => void;
}

export const CalendarTimelineView: React.FC<CalendarTimelineViewProps> = ({
  items,
  settings,
  onEditItem
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const activeItems = items.filter(item => item.isActive);

  // 1일 ~ 31일까지 날짜별 매핑
  const daysMap = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // 날짜별 항목 매핑
  const itemsByDay: Record<number, ExpenseItem[]> = {};
  daysMap.forEach(day => {
    itemsByDay[day] = activeItems.filter(item => item.payDay === day);
  });

  // 기간별 소계 계산
  const earlyMonthTotal = activeItems
    .filter(item => item.payDay >= 1 && item.payDay <= 10)
    .reduce((acc, item) => acc + getMonthlyEquivalent(item), 0);

  const midMonthTotal = activeItems
    .filter(item => item.payDay >= 11 && item.payDay <= 20)
    .reduce((acc, item) => acc + getMonthlyEquivalent(item), 0);

  const lateMonthTotal = activeItems
    .filter(item => item.payDay >= 21 && item.payDay <= 31)
    .reduce((acc, item) => acc + getMonthlyEquivalent(item), 0);

  // 날짜를 가진 날들만 추출 (타임라인용)
  const scheduledDays = daysMap.filter(day => itemsByDay[day].length > 0 || day === settings.salaryDay);

  // 선택된 날짜의 항목 (없으면 전체 또는 첫날)
  const displayItems = selectedDay 
    ? itemsByDay[selectedDay] || []
    : activeItems.sort((a, b) => a.payDay - b.payDay);

  return (
    <div className="space-y-4 pb-6">
      
      {/* 1. 상단 월간 타임라인 소계 카드 */}
      <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-200">결제일 타임라인</h2>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
            급여일: 매월 {settings.salaryDay}일
          </span>
        </div>

        {/* 3개 구간 카드 */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400">1일 ~ 10일</span>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {formatShortWon(earlyMonthTotal)}
            </div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
            <span className="text-[10px] text-slate-400">11일 ~ 20일</span>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {formatShortWon(midMonthTotal)}
            </div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50 relative overflow-hidden">
            {settings.salaryDay >= 21 && (
              <span className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[9px] px-1 font-bold rounded-bl">
                급여
              </span>
            )}
            <span className="text-[10px] text-slate-400">21일 ~ 말일</span>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {formatShortWon(lateMonthTotal)}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 가로 스크롤 날짜 선택 바 */}
      <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
          <span>날짜별 바로보기</span>
          {selectedDay && (
            <button
              onClick={() => setSelectedDay(null)}
              className="text-emerald-400 hover:underline text-[11px]"
            >
              전체 보기
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {daysMap.map(day => {
            const dayItems = itemsByDay[day];
            const hasItems = dayItems.length > 0;
            const isSalary = day === settings.salaryDay;
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                className={`shrink-0 w-10 h-14 rounded-xl flex flex-col items-center justify-center transition-all relative ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30 scale-105'
                    : isSalary
                    ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-300'
                    : hasItems
                    ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
                    : 'bg-slate-900/40 text-slate-600 border border-slate-800/40 opacity-40'
                }`}
              >
                <span className="text-xs font-semibold">{day}일</span>
                {isSalary ? (
                  <span className="text-[9px] font-bold text-emerald-400 mt-0.5">급여</span>
                ) : hasItems ? (
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    {dayItems.length}건
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-600 mt-0.5">-</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 날짜별 결제 리스트 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-300">
            {selectedDay ? `${selectedDay}일 결제 예정 (${displayItems.length}건)` : '날짜순 전체 결제 일정'}
          </span>
          <span className="text-[11px] text-slate-400">
            합계: {formatCurrency(displayItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0))}
          </span>
        </div>

        {displayItems.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
            해당 날짜에 예정된 고정비가 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {displayItems.map(item => {
              const meta = CATEGORIES[item.category];

              return (
                <div
                  key={item.id}
                  onClick={() => onEditItem(item)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 cursor-pointer active:scale-[0.99] transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* 결제일 뱃지 */}
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-medium leading-none">매월</span>
                      <span className="text-sm font-extrabold text-emerald-400 leading-tight">
                        {item.payDay}일
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: meta.color }}
                        />
                        <span className="text-xs font-bold text-slate-200 truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700/60">
                          {meta.shortLabel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{item.paymentMethod || '결제수단 미지정'}</span>
                        {item.memo && <span className="text-slate-500 truncate max-w-[120px]">· {item.memo}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <span className="text-xs font-bold text-slate-100">
                      {formatCurrency(getMonthlyEquivalent(item))}
                    </span>
                    {item.billingCycle === 'yearly' && (
                      <div className="text-[10px] text-amber-400">
                        연 {formatCurrency(item.amount)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
