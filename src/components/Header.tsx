import React from 'react';
import { Plus, Settings, Sparkles, Smartphone } from 'lucide-react';
import { isTossApp } from '../utils/env';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenPwaModal: () => void;
  itemCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onOpenSettingsModal,
  onOpenPwaModal,
  itemCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* 로고 & 타이틀 */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                고정비노트
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  FixNote
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">
              구독 · 통신 · 관리비 · 보험 · 차량 · 대출
            </p>
          </div>
        </div>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-2">
          {/* 웹 전용 홈 화면 추가 버튼 (토스 인앱에서는 숨김) */}
          {!isTossApp() && (
            <button
              onClick={onOpenPwaModal}
              aria-label="앱 설치"
              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-medium">앱 설치</span>
            </button>
          )}

          {/* 환경설정 버튼 */}
          <button
            onClick={onOpenSettingsModal}
            aria-label="설정 및 백업"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors active:scale-95"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* 고정비 추가 버튼 */}
          <button
            onClick={onOpenAddModal}
            aria-label="고정비 추가"
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-md shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>추가</span>
          </button>
        </div>
      </div>
    </header>
  );
};
