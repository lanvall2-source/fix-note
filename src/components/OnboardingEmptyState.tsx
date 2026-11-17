import React from 'react';
import { PresetItem } from '../types';
import { POPULAR_PRESETS } from '../data/presets';
import { CategoryIcon } from './CategoryIcon';
import { Sparkles, Plus, ShieldCheck, Eye, ArrowRight, Zap } from 'lucide-react';

interface OnboardingEmptyStateProps {
  onOpenAddModal: () => void;
  onOpenAddWithPreset: (preset: PresetItem) => void;
  onLoadDemoData: () => void;
}

export const OnboardingEmptyState: React.FC<OnboardingEmptyStateProps> = ({
  onOpenAddModal,
  onOpenAddWithPreset,
  onLoadDemoData
}) => {
  return (
    <div className="space-y-6 py-4 break-keep">
      
      {/* 1. 환영 히어로 카드 */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 p-6 sm:p-8 border border-slate-700/60 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-md mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>고정비노트에 오신 것을 환영합니다!</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            숨만 쉬어도 매달 나가는 내 돈,<br />
            <span className="text-emerald-400">10초 만에</span> 한눈에 정리하기
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
            OTT 구독부터 통신비, 아파트 관리비, 실비보험, 대출이자까지 매달 빠져나가는 고정 지출을 손쉽게 파악하고 다이어트하세요.
          </p>

          {/* 메인 시작 버튼 */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={onOpenAddModal}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>내 고정비 첫 등록하기</span>
            </button>
          </div>

          {/* 보안 안심 배지 */}
          <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>회원가입/인증서 없이 내 폰 브라우저에만 100% 안전 저장</span>
          </div>
        </div>
      </div>

      {/* 2. 인기 항목 1초 등록 프리셋 가이드 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200">
              자주 쓰는 고정비 원클릭으로 추가하기
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">터치 시 바로 완성</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {POPULAR_PRESETS.slice(0, 6).map(preset => (
            <button
              key={preset.name}
              onClick={() => onOpenAddWithPreset(preset)}
              className="p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all active:scale-98 flex items-start gap-3 group shadow-sm"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${preset.color}20`, color: preset.color }}
              >
                <CategoryIcon category={preset.category} iconName={preset.icon} className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                  {preset.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {preset.defaultAmount.toLocaleString()}원
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. 예시 데이터 먼저 둘러보기 옵션 */}
      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-2">
        <p className="text-xs text-slate-400">
          앱의 화면과 캘린더 기능이 어떻게 생겼는지 먼저 보고 싶으신가요?
        </p>
        <button
          onClick={onLoadDemoData}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition-all active:scale-95"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>예시 데이터 11개로 미리 체험해보기</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

    </div>
  );
};
