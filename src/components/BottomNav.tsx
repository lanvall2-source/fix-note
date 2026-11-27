import React from 'react';
import { LayoutDashboard, CalendarDays, TrendingDown, ListTodo, Plus, HelpCircle } from 'lucide-react';

export type NavTab = 'dashboard' | 'calendar' | 'diet' | 'items' | 'guide';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAddModal: () => void;
  upcomingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAddModal,
  upcomingCount = 0
}) => {
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(12); } catch {}
    }
  };

  const handleTabClick = (tab: NavTab) => {
    triggerHaptic();
    onSelectTab(tab);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 text-slate-400 pb-safe">
      <div className="max-w-xl mx-auto flex items-center justify-around px-2 py-1.5 relative">
        
        {/* 1. 대시보드 */}
        <button
          onClick={() => handleTabClick('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'dashboard'
              ? 'text-emerald-400 font-bold'
              : 'hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className={`w-5 h-5 ${currentTab === 'dashboard' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5">대시보드</span>
        </button>

        {/* 2. 결제일 달력 */}
        <button
          onClick={() => handleTabClick('calendar')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
            currentTab === 'calendar'
              ? 'text-emerald-400 font-bold'
              : 'hover:text-slate-200'
          }`}
        >
          <CalendarDays className={`w-5 h-5 ${currentTab === 'calendar' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5">결제일</span>
          {upcomingCount > 0 && (
            <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        {/* 중앙 빠른 추가 FAB */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <button
            onClick={() => {
              triggerHaptic();
              onOpenAddModal();
            }}
            aria-label="고정비 등록"
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-transform"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
          <span className="text-[10px] text-slate-400 mt-1 font-semibold">등록</span>
        </div>

        {/* 3. 고정비 다이어트 */}
        <button
          onClick={() => handleTabClick('diet')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'diet'
              ? 'text-emerald-400 font-bold'
              : 'hover:text-slate-200'
          }`}
        >
          <TrendingDown className={`w-5 h-5 ${currentTab === 'diet' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5">다이어트</span>
        </button>

        {/* 4. 전체 목록 */}
        <button
          onClick={() => handleTabClick('items')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            currentTab === 'items'
              ? 'text-emerald-400 font-bold'
              : 'hover:text-slate-200'
          }`}
        >
          <ListTodo className={`w-5 h-5 ${currentTab === 'items' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] mt-0.5">목록</span>
        </button>

      </div>
    </nav>
  );
};
