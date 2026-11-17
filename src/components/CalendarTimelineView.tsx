import React, { useState } from 'react';
import { ExpenseItem, UserSettings } from '../types';
import { CATEGORIES } from '../data/categories';
import { formatCurrency, formatShortWon, getMonthlyEquivalent } from '../utils/formatters';
import { CategoryIcon } from './CategoryIcon';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, 
  ChevronUp, ListFilter, Sparkles, Plus, Wallet 
} from 'lucide-react';

interface CalendarTimelineViewProps {
  items: ExpenseItem[];
  settings: UserSettings;
  onEditItem: (item: ExpenseItem) => void;
  onOpenAddModalWithPayDay?: (payDay: number) => void;
}

export const CalendarTimelineView: React.FC<CalendarTimelineViewProps> = ({
  items,
  settings,
  onEditItem,
  onOpenAddModalWithPayDay
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 ~ 11
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());

  const activeItems = items.filter(item => item.isActive);

  // 해당 월의 1일의 요일과 말일 계산
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0(일) ~ 6(토)
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate(); // 28 ~ 31

  // 날짜별 항목 매핑
  const itemsByDay: Record<number, ExpenseItem[]> = {};
  for (let d = 1; d <= lastDate; d++) {
    itemsByDay[d] = activeItems.filter(item => item.payDay === d);
  }

  // 월 이동
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // 선택된 날짜의 지출 항목 및 합계
  const selectedDayItems = itemsByDay[selectedDay] || [];
  const selectedDayTotal = selectedDayItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);

  // 이번 달 총 고정비
  const monthTotal = activeItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);

  // 캘린더 그리드 셀 생성 (빈 칸 포함)
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    calendarCells.push(d);
  }

  return (
    <div className="space-y-4 pb-6">
      
      {/* 1. 상단 월 네비게이션 & 뷰 전환 헤더 */}
      <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          
          {/* 년/월 전환 버튼 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-base font-extrabold text-white tracking-tight">
              {currentYear}년 {currentMonth + 1}월
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 달력/리스트 뷰 전환 탭 */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'calendar'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              달력
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                viewMode === 'timeline'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              목록
            </button>
          </div>

        </div>

        {/* 월간 합계 및 접기/펼치기 제어 */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">이번 달 고정 지출:</span>
            <span className="font-extrabold text-emerald-400 text-sm">
              {formatCurrency(monthTotal)}
            </span>
          </div>

          {viewMode === 'calendar' && (
            <button
              onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg transition-colors"
            >
              <span>{isCalendarExpanded ? '달력 접기' : '달력 펼치기'}</span>
              {isCalendarExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* 2. 7열 월간 캘린더 그리드 뷰 */}
      {viewMode === 'calendar' && isCalendarExpanded && (
        <div className="rounded-2xl bg-slate-900/95 p-3 sm:p-4 border border-slate-800 shadow-xl space-y-2">
          
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 pb-2 border-b border-slate-800">
            <span className="text-rose-400">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-blue-400">토</span>
          </div>

          {/* 달력 날짜 셀 그리드 */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-slate-950/20" />;
              }

              const dayItems = itemsByDay[day] || [];
              const hasItems = dayItems.length > 0;
              const isSelected = selectedDay === day;
              const isSalary = day === settings.salaryDay;
              const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
              const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;

              const dayTotal = dayItems.reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-14 sm:h-16 p-1 rounded-xl flex flex-col justify-between cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-md shadow-emerald-500/20 scale-[1.02]'
                      : isToday
                      ? 'bg-slate-850 border-emerald-500/40 hover:border-slate-600'
                      : hasItems
                      ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-850 hover:border-slate-800 opacity-60'
                  }`}
                >
                  {/* 날짜 숫자 & 뱃지 */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold ${
                      isToday
                        ? 'text-emerald-400 bg-emerald-500/10 px-1 rounded'
                        : isSunday
                        ? 'text-rose-400'
                        : isSaturday
                        ? 'text-blue-400'
                        : 'text-slate-300'
                    }`}>
                      {day}
                    </span>

                    {isSalary && (
                      <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-950/80 px-1 rounded border border-emerald-500/40">
                        급여
                      </span>
                    )}
                  </div>

                  {/* 지출 점(dots) 및 금액 요약 */}
                  {hasItems ? (
                    <div className="min-w-0">
                      <div className="flex items-center gap-0.5 overflow-hidden">
                        {dayItems.slice(0, 3).map(it => (
                          <div
                            key={it.id}
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: CATEGORIES[it.category]?.color || '#10b981' }}
                          />
                        ))}
                        {dayItems.length > 3 && (
                          <span className="text-[8px] text-slate-400 font-bold">+{dayItems.length - 3}</span>
                        )}
                      </div>
                      <div className="text-[9px] font-extrabold text-slate-200 truncate mt-0.5">
                        {formatShortWon(dayTotal)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[9px] text-slate-600"></div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 3. 선택된 날짜의 결제 항목 상세 (선택일 드로어) */}
      <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              {currentMonth + 1}월 {selectedDay}일 지출 예정
            </h3>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              {selectedDayItems.length}건
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block text-[10px]">이 날 결제 총액</span>
            <span className="text-sm font-bold text-emerald-400">
              {formatCurrency(selectedDayTotal)}
            </span>
          </div>
        </div>

        {selectedDayItems.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-850">
            {selectedDay}일에는 예정된 고정비가 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {selectedDayItems.map(item => {
              const meta = CATEGORIES[item.category];

              return (
                <div
                  key={item.id}
                  onClick={() => onEditItem(item)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                    >
                      <CategoryIcon category={item.category} iconName={item.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="text-slate-300 font-medium">{meta.shortLabel}</span>
                        {item.paymentMethod && <span>· {item.paymentMethod}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <div className="text-xs font-bold text-slate-100">
                      {formatCurrency(getMonthlyEquivalent(item))}
                    </div>
                    {item.billingCycle === 'yearly' && (
                      <div className="text-[10px] text-amber-400">연납 {formatCurrency(item.amount)}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. 타임라인 리스트 뷰 (뷰모드가 타임라인일 때) */}
      {viewMode === 'timeline' && (
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300 px-1">
            결제일 순 전체 일정 (1일 ~ 31일)
          </div>
          {activeItems.sort((a, b) => a.payDay - b.payDay).map(item => {
            const meta = CATEGORIES[item.category];
            return (
              <div
                key={item.id}
                onClick={() => onEditItem(item)}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-slate-400 leading-none">매월</span>
                    <span className="text-sm font-extrabold text-emerald-400 leading-tight">{item.payDay}일</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{item.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span style={{ color: meta.color }} className="font-medium">{meta.shortLabel}</span>
                      {item.paymentMethod && <span>· {item.paymentMethod}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs font-bold text-slate-100">
                    {formatCurrency(getMonthlyEquivalent(item))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
