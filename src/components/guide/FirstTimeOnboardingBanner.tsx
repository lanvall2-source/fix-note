import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Calendar,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface FirstTimeOnboardingBannerProps {
  onOpenAddModal: () => void;
  onGoToCalendar: () => void;
  onGoToDiet: () => void;
  onGoToGuide: () => void;
}

export function FirstTimeOnboardingBanner({
  onOpenAddModal,
  onGoToCalendar,
  onGoToDiet,
  onGoToGuide,
}: FirstTimeOnboardingBannerProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fn_onboarding_collapsed");
    if (saved === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("fn_onboarding_collapsed", String(next));
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg border border-slate-800 relative break-keep mb-4">
      {/* 상단 헤더 & 접기/펼치기 버튼 */}
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-extrabold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full tracking-wide shadow-xs">
            <Zap className="w-3 h-3 text-amber-300" />
            초보자 3분 퀵가이드
          </span>
          <span className="text-slate-300 text-xs font-medium">
            처음 오셨나요? 딱 3단계로 숨은 고정비를 정리해 보세요!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onGoToGuide}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-slate-700"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>상세 사용법 &amp; FAQ</span>
          </button>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer border border-slate-700"
            title={collapsed ? "가이드 펼치기" : "가이드 접기"}
          >
            <span>{collapsed ? "펼치기" : "접기"}</span>
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 접혔을 때 컴팩트 뷰 */}
      {collapsed ? (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>1단계 고정비 10초 등록 · 2단계 결제일 달력 확인 · 3단계 중복 구독 감지 &amp; 다이어트</span>
          </div>
          <button
            type="button"
            onClick={onGoToGuide}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 cursor-pointer shrink-0"
          >
            FAQ 보기
          </button>
        </div>
      ) : (
        /* 펼쳐졌을 때 3단계 카드 뷰 */
        <div className="mt-4 space-y-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* 1단계 */}
            <div className="bg-slate-800/90 hover:bg-slate-800 rounded-xl p-4 border border-slate-700/80 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-400/30">
                    1
                  </span>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  인기 고정비 10초 등록
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  넷플릭스·유튜브·쿠팡부터 통신비, 관리비, 실비보험, 대출이자까지 원클릭 프리셋으로 10초 만에 등록하세요.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenAddModal}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>내 고정비 추가하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2단계 */}
            <div className="bg-slate-800/90 hover:bg-slate-800 rounded-xl p-4 border border-slate-700/80 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-black text-xs flex items-center justify-center border border-blue-400/30">
                    2
                  </span>
                  <Calendar className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  결제일 캘린더 &amp; D-Day
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  월간 결제일 달력에서 언제 얼마가 빠져나가는지 한눈에 파악하고 통장 잔고 부족 지출 충격을 미리 예방하세요.
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToCalendar}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>결제일 캘린더 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3단계 */}
            <div className="bg-slate-800/90 hover:bg-slate-800 rounded-xl p-4 border border-slate-700/80 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center border border-amber-400/30">
                    3
                  </span>
                  <TrendingDown className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">
                  중복 구독 감지 &amp; 다이어트
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  OTT/음원 중복 구독 자동 감지와 1분 해지 바로가기, 알뜰폰·대환대출로 연 100만 원 이상 아끼는 꿀팁을 확인하세요.
                </p>
              </div>
              <button
                type="button"
                onClick={onGoToDiet}
                className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>절약 다이어트 확인하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 하단 안심 배너 (무료, 로컬 저장, PWA 지원) */}
          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                회원가입/공인인증서 불필요 (개인정보 수집 0%)
              </span>
              <span className="inline-flex items-center gap-1 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                내 스마트폰 브라우저에 100% 안전 저장
              </span>
            </div>
            <button
              type="button"
              onClick={onGoToGuide}
              className="text-emerald-400 hover:text-white font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>자주 묻는 질문(FAQ) 전체보기</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
