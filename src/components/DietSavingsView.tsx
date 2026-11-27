import React, { useState } from 'react';
import { ExpenseItem } from '../types';
import { formatCurrency, formatShortWon } from '../utils/formatters';
import { detectSubscriptionOverlaps } from '../utils/overlapDetector';
import { 
  TrendingDown, Smartphone, Landmark, ShieldCheck, 
  ExternalLink, Sparkles, CheckCircle2, ChevronRight, Calculator,
  AlertTriangle, ArrowRight, Gift, LogOut, Info, Lightbulb
} from 'lucide-react';

interface DietSavingsViewProps {
  items: ExpenseItem[];
  onOpenCancelGuide: (serviceId?: string) => void;
}

export const DietSavingsView: React.FC<DietSavingsViewProps> = ({ 
  items,
  onOpenCancelGuide
}) => {
  // 1. 중복 구독 감지
  const overlaps = detectSubscriptionOverlaps(items);

  // 2. 통신비 계산기 상태
  const telecomItem = items.find(it => it.category === 'telecom' && it.name.includes('스마트폰'));
  const [currentTelecom, setCurrentTelecom] = useState<number>(telecomItem ? telecomItem.amount : 79000);
  const [budgetPhoneRate, setBudgetPhoneRate] = useState<number>(19800);

  const monthlyTelecomSaving = Math.max(0, currentTelecom - budgetPhoneRate);
  const yearlyTelecomSaving = monthlyTelecomSaving * 12;

  // 3. 대출 금리 인하 시뮬레이터 상태
  const loanItem = items.find(it => it.category === 'finance' && (it.loanBalance || 0) > 0);
  const [loanBalance, setLoanBalance] = useState<number>(loanItem?.loanBalance || 150000000);
  const [interestDrop, setInterestDrop] = useState<number>(0.6);

  const yearlyLoanSaving = Math.round(loanBalance * (interestDrop / 100));
  const monthlyLoanSaving = Math.round(yearlyLoanSaving / 12);

  // 4. 자동차 보험 절약 예상
  const carInsuranceItem = items.find(it => it.category === 'insurance' && it.name.includes('자동차'));
  const carInsuranceAmount = carInsuranceItem ? carInsuranceItem.amount : 850000;
  const estimatedCarSaving = Math.round(carInsuranceAmount * 0.17);

  // 5. 총 합산 잠재 절약 가능액
  const totalPotentialYearlySaving = yearlyTelecomSaving + yearlyLoanSaving + estimatedCarSaving;

  return (
    <div className="space-y-5 pb-6 break-keep">
      
      {/* 1. 상단 총 절약 가능액 히어로 카드 */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-5 border border-emerald-500/40 shadow-xl shadow-slate-950/40 text-white relative">
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>고정비 다이어트 시뮬레이션</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
            1년에 최대 <span className="text-emerald-400 underline underline-offset-4">{formatShortWon(totalPotentialYearlySaving)}</span> 절약 가능!
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            생활 습관을 바꾸지 않아도, 통신사와 대출 금리만 점검하면 숨겨진 큰돈을 아낄 수 있습니다.
          </p>

          <div className="mt-4 pt-3.5 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-800/60 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">통신비 절약</span>
              <div className="font-bold text-emerald-400 mt-0.5">{formatShortWon(yearlyTelecomSaving)}</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">대출이자 절약</span>
              <div className="font-bold text-teal-300 mt-0.5">{formatShortWon(yearlyLoanSaving)}</div>
            </div>
            <div className="bg-slate-800/60 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block whitespace-nowrap">보험 다이렉트</span>
              <div className="font-bold text-indigo-300 mt-0.5">{formatShortWon(estimatedCarSaving)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 중복 구독 감지 경고 섹션 (신규 기능!) */}
      {overlaps.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>겹치는 구독 서비스 감지 ({overlaps.length}건)</span>
            </h3>
            <span className="text-[11px] text-amber-400 font-medium">다이어트 1순위</span>
          </div>

          {overlaps.map((overlap, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-slate-200 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{overlap.title}</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-extrabold border border-amber-500/30">
                      {overlap.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    포함 항목: {overlap.items.map(it => it.name).join(', ')}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 block text-[10px]">월 지출액</span>
                  <span className="text-xs font-bold text-amber-300">
                    {formatCurrency(overlap.monthlyTotal)}
                  </span>
                </div>
              </div>

              {/* 조언 텍스트 */}
              <div className="p-2.5 bg-slate-900/60 rounded-xl text-xs text-slate-300 border border-slate-800 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{overlap.advice}</span>
              </div>

              {/* 액션 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={() => onOpenCancelGuide(overlap.items[0]?.name.includes('넷플릭스') ? 'netflix' : undefined)}
                  className="flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>해지 방법 확인하기</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. 구독 해지 가이드 배너 (신규 기능!) */}
      <div 
        onClick={() => onOpenCancelGuide()}
        className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/30 flex items-center justify-between cursor-pointer hover:border-rose-500/50 transition-all shadow-md group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
              주요 구독 서비스 1분 해지 바로가기
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              넷플릭스·유튜브·쿠팡 등 꽁꽁 숨겨둔 해지 버튼 위치 안내
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors shrink-0" />
      </div>

      {/* 4. 통신비 다이어트 계산기 */}
      <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">통신비 다이어트 (알뜰폰 전환)</h3>
              <p className="text-[11px] text-slate-400">기존 번호 그대로, 통신망 품질 동일</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
            연 {formatShortWon(yearlyTelecomSaving)} 절약
          </span>
        </div>

        {/* 현재 통신비 슬라이더 */}
        <div className="bg-slate-800/60 p-3 rounded-xl space-y-2 border border-slate-700/50">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">현재 납부 중인 통신비 (1인)</span>
            <span className="font-bold text-slate-200">{formatCurrency(currentTelecom)} / 월</span>
          </div>
          <input
            type="range"
            min={30000}
            max={130000}
            step={5000}
            value={currentTelecom}
            onChange={(e) => setCurrentTelecom(Number(e.target.value))}
            className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>3만 원</span>
            <span>8만 원 (평균)</span>
            <span>13만 원</span>
          </div>
        </div>

        {/* 계산 결과 카드 */}
        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between">
          <div className="text-xs">
            <div className="text-slate-300">
              알뜰폰(월 {formatCurrency(budgetPhoneRate)})으로 변경 시
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              매월 <span className="text-emerald-400 font-bold">{formatCurrency(monthlyTelecomSaving)}</span> 세이브
            </div>
          </div>
          <a
            href="https://www.mvnohub.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md transition-all whitespace-nowrap"
          >
            <span>요금제 비교</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 5. 대출 금리 인하(대환대출) 시뮬레이터 */}
      <div className="rounded-2xl bg-slate-900/80 p-4 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">대출 대환 (금리 낮추기)</h3>
              <p className="text-[11px] text-slate-400">주담대·신용대출 금리비교 인프라</p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20 whitespace-nowrap">
            연 {formatShortWon(yearlyLoanSaving)} 절약
          </span>
        </div>

        {/* 대출 잔액 선택 */}
        <div className="bg-slate-800/60 p-3 rounded-xl space-y-2 border border-slate-700/50">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">현재 대출 잔액</span>
            <span className="font-bold text-slate-200">{formatShortWon(loanBalance)}</span>
          </div>
          <div className="flex gap-1.5">
            {[50000000, 100000000, 200000000, 300000000].map(amount => (
              <button
                key={amount}
                onClick={() => setLoanBalance(amount)}
                className={`flex-1 py-1 text-xs rounded-lg border transition-all ${
                  loanBalance === amount
                    ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                    : 'bg-slate-700/60 border-slate-600 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {formatShortWon(amount)}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">금리 {interestDrop}%p 인하 시 연간 아끼는 이자</span>
            <span className="font-bold text-emerald-400 text-sm">
              매월 {formatCurrency(monthlyLoanSaving)} (연 {formatShortWon(yearlyLoanSaving)})
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/60 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>대환대출 인프라 팁</strong>: 토스, 카카오페이, 핀다 등 금융 앱에서 본인 신용점수 하락 없이 1분 만에 여러 금융사의 갈아타기 금리를 비교할 수 있습니다.
          </span>
        </div>
      </div>

      {/* 6. 토스 숨은 환급금 찾기 제휴 배너 */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 p-4 border border-blue-500/40 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              토스 숨은 환급금 찾기
              <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.2 rounded font-extrabold">무료</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              놓친 연말정산·종합소득세 환급금 5분 만에 조회하기
            </div>
          </div>
        </div>
        <a
          href="https://tossincome.im/_m/d7vJn62"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-md transition-all ml-2 whitespace-nowrap"
        >
          <span>환급금 조회</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
