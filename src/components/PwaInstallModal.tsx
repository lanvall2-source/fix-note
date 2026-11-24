import React, { useState, useEffect } from 'react';
import { X, Smartphone, Share2, PlusSquare, CheckCircle, Sparkles } from 'lucide-react';
import { isTossApp } from '../utils/env';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt
}) => {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (isTossApp()) return;
    // iOS 기기 감지
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 이미 PWA로 실행 중인지 감지
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(Boolean(standalone));
  }, []);

  if (!isOpen || isTossApp()) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        onClose();
      }
    } else {
      alert('브라우저 메뉴(⋮)에서 [홈 화면에 추가] 또는 [앱 설치]를 선택해주세요.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full sm:max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* 헤더 */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">스마트폰 홈 화면에 앱 추가하기</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          <div className="text-center py-2 space-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 text-slate-950">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white pt-1">
              앱스토어 설치 없이 1초 만에 바로가기
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              홈 화면에 추가하면 앱처럼 전체 화면으로 빠르고 쾌적하게 사용할 수 있습니다.
            </p>
          </div>

          {/* 원클릭 설치 버튼 (안드로이드 / PC 크롬 지원 시) */}
          {deferredPrompt && (
            <button
              onClick={handleNativeInstall}
              className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-xs transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
              <span>지금 원클릭으로 홈 화면에 추가하기</span>
            </button>
          )}

          {/* iOS 사파리 가이드 */}
          {isIOS ? (
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block">
                아이폰 (Safari 브라우저) 추가 방법
              </span>
              <ol className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    1
                  </div>
                  <span>사파리 화면 하단 중앙의 <strong>공유 버튼</strong> [ <Share2 className="w-3.5 h-3.5 inline text-blue-400" /> ] 터치</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    2
                  </div>
                  <span>스크롤을 아래로 내려 <strong>'홈 화면에 추가'</strong> [ <PlusSquare className="w-3.5 h-3.5 inline text-slate-300" /> ] 터치</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    3
                  </div>
                  <span>우측 상단 <strong>'추가'</strong> 터치하면 완료!</span>
                </li>
              </ol>
            </div>
          ) : (
            /* 안드로이드 크롬 가이드 */
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block">
                안드로이드 (Chrome 브라우저) 추가 방법
              </span>
              <ol className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    1
                  </div>
                  <span>우측 상단 더보기 [ <strong>⋮</strong> ] 메뉴 터치</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    2
                  </div>
                  <span><strong>'홈 화면에 추가'</strong> 또는 <strong>'앱 설치'</strong> 터치</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    3
                  </div>
                  <span>확인 팝업에서 <strong>'추가'</strong> 터치하면 완료!</span>
                </li>
              </ol>
            </div>
          )}

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            닫기
          </button>

        </div>

      </div>
    </div>
  );
};
