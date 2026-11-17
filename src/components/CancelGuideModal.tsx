import React, { useState } from 'react';
import { CANCEL_GUIDES, CancelGuideItem } from '../data/cancelGuides';
import { X, ExternalLink, AlertTriangle, CheckCircle2, Search, Smartphone, Info } from 'lucide-react';

interface CancelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const CancelGuideModal: React.FC<CancelGuideModalProps> = ({
  isOpen,
  onClose,
  initialServiceId
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(
    initialServiceId || CANCEL_GUIDES[0].id
  );
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredGuides = CANCEL_GUIDES.filter(guide => 
    guide.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeGuide = CANCEL_GUIDES.find(g => g.id === selectedGuideId) || CANCEL_GUIDES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full sm:max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* 헤더 */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>구독 해지 1분 가이드</span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 font-extrabold px-1.5 py-0.5 rounded border border-rose-500/30">
                방어벽 탈출
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              숨겨진 해지 메뉴와 다이렉트 바로가기 링크를 제공합니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 서비스 선택 가로 스크롤 바 */}
        <div className="px-4 py-2.5 bg-slate-950/50 border-b border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none">
          {CANCEL_GUIDES.map(guide => {
            const isSelected = guide.id === activeGuide.id;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {guide.serviceName}
              </button>
            );
          })}
        </div>

        {/* 본문 안내 내용 */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* 서비스 타이틀 & 바로가기 버튼 */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{activeGuide.serviceName}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  activeGuide.difficulty === '까다로움'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  해지 난이도: {activeGuide.difficulty}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                버튼을 누르면 공식 해지 관리 페이지로 즉시 이동합니다.
              </p>
            </div>

            {activeGuide.directUrl && (
              <a
                href={activeGuide.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all"
              >
                <span>해지 페이지 열기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {activeGuide.appScheme && (
              <a
                href={activeGuide.appScheme}
                className="shrink-0 flex items-center gap-1 bg-rose-500 hover:bg-rose-400 active:scale-95 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-lg shadow-rose-500/20 transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>구독 관리 열기</span>
              </a>
            )}
          </div>

          {/* 주의사항 (다크패턴 방어) */}
          {activeGuide.warningNotice && (
            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200 leading-relaxed font-medium">
                {activeGuide.warningNotice}
              </div>
            </div>
          )}

          {/* 단계별 해지 절차 */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              순서대로 따라하기
            </h3>
            <div className="space-y-2">
              {activeGuide.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-200"
                >
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[11px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 추가 꿀팁 */}
          {activeGuide.tips && (
            <div className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl flex items-start gap-2 text-xs text-slate-300">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>꿀팁</strong>: {activeGuide.tips}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
