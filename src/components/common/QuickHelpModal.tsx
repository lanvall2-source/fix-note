import React from "react";
import {
  HelpCircle,
  X,
  BookOpen,
  Calendar,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Plus,
  TrendingDown,
} from "lucide-react";

interface QuickHelpModalProps {
  open: boolean;
  onClose: () => void;
  onGoToFullGuide: () => void;
}

export function QuickHelpModal({
  open,
  onClose,
  onGoToFullGuide,
}: QuickHelpModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 break-keep">
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HelpCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">고정비노트 1분 퀵 도움말</h3>
              <p className="text-[11px] text-slate-400">핵심 기능과 빠른 사용법을 확인하세요</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 본문 (스크롤) */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* 핵심 요약 3단계 */}
          <div className="space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 block">
              3단계 실무 핵심 요약
            </span>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/80 space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-emerald-500/30">
                  1
                </span>
                <div>
                  <strong className="text-white">인기 고정비 등록</strong>: 넷플릭스·유튜브·통신비·관리비 등 자주 쓰는 프리셋을 터치해 10초 만에 등록합니다.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-blue-500/30">
                  2
                </span>
                <div>
                  <strong className="text-white">결제일 달력 확인</strong>: 월간 캘린더에서 출금 일자와 D-Day를 확인하여 통장 잔고 부족 연체를 예방합니다.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0 border border-amber-500/30">
                  3
                </span>
                <div>
                  <strong className="text-white">중복 구독 &amp; 다이어트</strong>: 중복 스트리밍 서비스 감지, 1분 해지 바로가기, 알뜰폰 전환으로 연 100만 원 이상 아끼세요.
                </div>
              </div>
            </div>
          </div>

          {/* 자주 묻는 질문 TOP 3 */}
          <div className="space-y-2">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-400 block">
              가장 많이 묻는 질문 TOP 3
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-white block mb-1">
                  Q. 회원가입 없이 정말 무료인가요?
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  네! 회원가입과 금융인증서 연동 없이 브라우저에서 바로 사용하실 수 있으며, 모든 지출 데이터는 본인 기기에만 안전하게 보관됩니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-white block mb-1">
                  Q. 다른 폰이나 컴퓨터로 데이터를 옮기려면?
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  우측 상단 <strong>[설정(톱니바퀴)]</strong> 메뉴에서 [백업 파일 다운로드(.json)]를 받아 다른 기기에서 [백업 복원]하시면 1초 만에 그대로 복원됩니다.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="font-bold text-white block mb-1">
                  Q. 스마트폰 홈 화면에 앱처럼 두려면?
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  사파리나 크롬 메뉴에서 [홈 화면에 추가] 또는 [앱 설치]를 누르면 스마트폰 바탕화면에 앱 아이콘이 바로 생성됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 하단 버튼 */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToFullGuide();
            }}
            className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>전체 가이드 &amp; FAQ 상세 보기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
