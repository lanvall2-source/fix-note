import React from 'react';
import { Info, Trash2, Plus, Sparkles } from 'lucide-react';

interface DemoBannerProps {
  onClearDemoData: () => void;
  onOpenAddModal: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onClearDemoData,
  onOpenAddModal
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border-b border-amber-500/40 px-4 py-2.5 text-xs text-amber-200 shadow-md">
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        
        {/* 안내 문구 */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span>
            <strong>체험 모드</strong>: 현재 화면은 <strong>예시 데이터(11개)</strong>입니다.
          </span>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* 예시 데이터 전체 지우기 버튼 */}
          <button
            onClick={onClearDemoData}
            className="flex items-center gap-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold px-2.5 py-1 rounded-lg border border-rose-500/30 transition-all active:scale-95 text-[11px] whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>예시 데이터 지우기</span>
          </button>

          {/* 내 데이터 바로 추가 */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-2.5 py-1 rounded-lg transition-all active:scale-95 text-[11px] whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>내 고정비 추가</span>
          </button>
        </div>

      </div>
    </div>
  );
};
