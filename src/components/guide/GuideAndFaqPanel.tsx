import React, { useState, useMemo } from "react";
import {
  FileText,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Download,
  Building2,
  BookOpen,
  Zap,
  TrendingDown,
  Plus,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  PieChart,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface GuideAndFaqPanelProps {
  onOpenAddModal: () => void;
  onGoToCalendar: () => void;
  onGoToDiet: () => void;
  onOpenCancelGuide: () => void;
  onOpenSettingsModal: () => void;
}

type FaqCategory = "all" | "start" | "diet" | "backup" | "tips";

interface FaqItem {
  id: string;
  category: "start" | "diet" | "backup" | "tips";
  question: string;
  answer: React.ReactNode;
}

export function GuideAndFaqPanel({
  onOpenAddModal,
  onGoToCalendar,
  onGoToDiet,
  onOpenCancelGuide,
  onOpenSettingsModal,
}: GuideAndFaqPanelProps) {
  const [activeTab, setActiveTab] = useState<"guide" | "faq" | "standard">("guide");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<FaqCategory>("all");
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    faq_1: true,
    faq_4: true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqList: FaqItem[] = [
    {
      id: "faq_1",
      category: "start",
      question: "회원가입이나 금융 공인인증서 연동이 꼭 필요한가요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-emerald-400">전혀 필요 없습니다!</strong> 고정비노트는 번거로운 회원가입, 휴대폰 본인인증, 공인인증서/마이데이터 계좌 연동 없이 즉시 열리는 PWA(Progressive Web App)입니다.
          </p>
          <p>
            개인 식별 정보나 계좌 비밀번호를 요구하지 않으므로 접속 즉시 모든 기능을 <strong>100% 무료</strong>로 안심하고 사용하실 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_2",
      category: "start",
      question: "내가 등록한 고정비 지출 내역이 외부 서버로 유출되지는 않나요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-emerald-400">고객님의 스마트폰/PC 브라우저 내부(LocalStorage)에만 안전하게 보관됩니다.</strong>
          </p>
          <p>
            고정비노트는 외부 중앙 데이터베이스 서버로 어떤 고정 지출 내역도 전송하거나 수집하지 않습니다. 회사의 대외비 지출이나 개인 금융 내역이 외부로 유출될 위험이 전혀 없으므로 안심하세요.
          </p>
        </div>
      ),
    },
    {
      id: "faq_3",
      category: "start",
      question: "스마트폰에서 앱처럼 설치하여 홈 화면에 두고 쓰려면 어떻게 하나요?",
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            스마트폰 브라우저의 <strong>'홈 화면에 추가'</strong> 기능을 이용하시면 앱스토어 설치 없이 네이티브 앱과 동일하게 작동합니다:
          </p>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-2">
            <p className="flex items-start gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
              <span><strong>아이폰 (iOS Safari)</strong>: 브라우저 하단 중앙의 <strong>[공유 아이콘 (네모 위 화살표)]</strong> 터치 ➔ <strong>[홈 화면에 추가]</strong> 선택</span>
            </p>
            <p className="flex items-start gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>안드로이드 (Galaxy Chrome / 삼성인터넷)</strong>: 상단 메뉴 <strong>[더보기 (점 3개)]</strong> 터치 ➔ <strong>[홈 화면에 추가]</strong> 또는 <strong>[앱 설치]</strong> 선택</span>
            </p>
          </div>
          <p className="text-slate-400 text-[11px]">
            ※ 홈 화면의 '고정비노트' 아이콘을 터치하면 상단 주소창이 사라진 깨끗한 풀스크린 전용 앱으로 실행됩니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_4",
      category: "diet",
      question: "넷플릭스, 디즈니+, 유튜브 프리미엄 등 OTT 중복 구독은 어떻게 찾나요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            고정비노트에는 <strong>중복 구독 실시간 감지 알고리즘</strong>이 내장되어 있습니다.
          </p>
          <p>
            동일한 카테고리(예: 영상 스트리밍 넷플릭스 + 디즈니+ + 티빙, 또는 음원 스트리밍 멜론 + 유튜브뮤직)에 2개 이상의 서비스가 등록되어 있으면 대시보드 상단과 다이어트 탭에서 즉시 <strong>경고 알림</strong>을 띄워 중복 지출되는 월 누적 금액을 알려드립니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_5",
      category: "diet",
      question: "사용하지 않는 구독 서비스의 해지 방법을 잘 모르겠어요.",
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            고정비노트의 <strong>[구독 해지 1분 가이드]</strong>를 활용하시면 복잡한 해지 방어벽을 손쉽게 탈출할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
            <li>넷플릭스, 유튜브 프리미엄, 쿠팡 와우, 티빙, 디즈니+, 멜론 등 주요 구독 서비스의 <strong>공식 계정 관리 다이렉트 링크</strong> 제공</li>
            <li>꽁꽁 숨겨진 단계별 해지 메뉴 경로와 해지 방어 팝업 클릭 팁 제공</li>
            <li>다이어트 탭이나 대시보드 항목 클릭 시 언제든지 열어보실 수 있습니다.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq_6",
      category: "backup",
      question: "스마트폰에서 작성하던 데이터를 다른 폰이나 PC로 옮기거나 백업할 수 있나요?",
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            네! 화면 우측 상단의 <strong>[설정(톱니바퀴)]</strong> 메뉴를 활용하시면 1초 만에 기기 간 데이터를 이전할 수 있습니다:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-1 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-slate-300">
            <li>보내려는 기기에서 <strong>[데이터 백업 파일 다운로드(.json)]</strong> 클릭</li>
            <li>해당 파일을 카카오톡(나에게 보내기)이나 이메일로 전송</li>
            <li>사무실 PC나 새 스마트폰에서 접속 후 <strong>[백업 복원]</strong>으로 파일 선택 ➔ 즉시 복원 완료</li>
          </ol>
          <p className="text-[11px] text-slate-400">
            ※ 브라우저 캐시 삭제 시 데이터가 지워질 수 있으니 정기적인 백업 파일 저장을 권장합니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_7",
      category: "tips",
      question: "아파트 관리비나 전기세, 대출이자처럼 매달 금액이 조금씩 바뀌면 어떻게 하나요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>평균 예상 금액</strong>으로 먼저 등록해 두신 후, 관리비 고지서나 출금 문자가 올 때 수정하시면 가장 편리합니다.
          </p>
          <p>
            항목 상세 수정에서 <strong>메모란</strong>에 <em>'하절기 에어컨 전기세 반영'</em>, <em>'금리 변동 주기(6개월)'</em> 등을 기록해 두면 변동 추이를 안전하게 관리할 수 있습니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_8",
      category: "tips",
      question: "신용카드 결제일과 통장 출금일이 다른 경우는 결제일을 며칠로 해야 하나요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>'실제 내 계좌에서 돈이 빠져나가는 출금일'</strong> 기준으로 등록하시는 것을 가장 추천합니다!
          </p>
          <p>
            결제일 캘린더의 핵심 목적은 <em>'특정 일자에 통장 잔고가 부족해 연체가 발생하는 것을 막는 것'</em>이므로, 신용카드 결제일(예: 매월 14일이나 25일)에 맞춰두시면 통장 잔고 관리가 훨씬 직관적입니다.
          </p>
        </div>
      ),
    },
    {
      id: "faq_9",
      category: "tips",
      question: "토스 앱이나 카카오톡 인앱 브라우저에서도 깨짐 없이 바로 열리나요?",
      answer: (
        <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>네, 완벽하게 최적화되어 있습니다!</strong>
          </p>
          <p>
            고정비노트는 토스(Toss) 콘솔 앱 표준 규격과 모바일 브라우저 뷰포트(viewport-fit=cover)에 맞추어 설계되었으며, 카카오톡이나 네이버 밴드 링크로 접속하셔도 모바일 전체 화면으로 쾌적하게 작동합니다.
          </p>
        </div>
      ),
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchCategory =
        selectedFaqCategory === "all" || item.category === selectedFaqCategory;
      const matchQuery =
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof item.answer === "string" &&
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [faqList, selectedFaqCategory, searchQuery]);

  return (
    <div className="space-y-5 max-w-xl mx-auto break-keep pb-6">
      {/* 1. 상단 히어로 안내 헤더 */}
      <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-xl border border-slate-800 relative">
        <div className="flex flex-wrap items-center gap-2 mb-2 relative z-10">
          <span className="bg-emerald-600 text-white font-extrabold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            FIXNOTE USER GUIDE &amp; FAQ
          </span>
          <span className="text-slate-300 text-xs">스마트 고정비 다이어트 매뉴얼</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black relative z-10">
          스마트 고정비 &amp; 구독 통합 관리 가이드
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed relative z-10 max-w-2xl">
          처음 오신 분도 3분이면 마스터할 수 있습니다. 엑셀이나 복잡한 가계부 없이 6대 고정 지출을 10초 만에 정리하고 1년에 100만 원 이상 아껴보세요.
        </p>

        {/* 탭 전환 버튼바 */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "guide"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3단계 사용법 가이드</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "faq"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>자주 묻는 질문 (FAQ)</span>
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {faqList.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("standard")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "standard"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>고정비 절약 기준표</span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: 3단계 사용방법 가이드 ===================== */}
      {activeTab === "guide" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* 단계별 시각적 워크스루 카드 */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-emerald-400 text-[11px] font-black uppercase tracking-wider">
                  QUICK WORKFLOW
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  고정비노트 3단계 마스터 실무 프로세스
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full font-medium hidden sm:inline-block">
                소요 시간: 약 3분
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Step 1 */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center mb-2.5">
                    01
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>고정비 10초 등록 (인기 프리셋)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    OTT 구독(넷플릭스·유튜브), 통신비(SKT·KT·알뜰폰), 관리비, 실비보험, 대출이자 등 원클릭 프리셋으로 금액과 결제일을 10초 만에 등록합니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                >
                  내 고정비 추가하러 가기
                </button>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-black text-xs flex items-center justify-center mb-2.5">
                    02
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>결제일 캘린더 &amp; 지출 타임라인</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    매월 며칠에 얼마가 출금되는지 달력과 D-Day로 한눈에 확인하고, 카드 결제일 전 통장 잔고 부족으로 인한 연체를 사전에 방지합니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onGoToCalendar}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                >
                  결제일 캘린더 확인하기
                </button>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center mb-2.5">
                    03
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-amber-400" />
                    <span>중복 구독 감지 &amp; 고정비 다이어트</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    OTT/음원 중복 구독 자동 감지와 1분 해지 바로가기, 알뜰폰 전환(연 73만 원 세이브) 및 대환대출 금리 인하로 연간 100만 원 이상을 절약하세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onGoToDiet}
                  className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer text-center"
                >
                  고정비 다이어트 시뮬레이션
                </button>
              </div>
            </div>
          </div>

          {/* 주요 2대 핵심 기능 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 가이드 카드 1: 중복 구독 실시간 탐지기 */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <AlertTriangle className="size-5" />
                </div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  실시간 낭비 방지
                </span>
                <h3 className="text-base font-bold text-white mt-1 mb-1.5">
                  중복 구독 자동 감지기
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  넷플릭스를 보면서 디즈니+, 티빙, 웨이브까지 결제하고 계신가요? 중복되는 스트리밍 서비스를 자동 감지하여 즉시 알려드립니다.
                </p>
              </div>

              <button
                type="button"
                onClick={onGoToDiet}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                <span>중복 구독 확인하기</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* 가이드 카드 2: 구독 해지 1분 가이드 */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <LogOut className="size-5" />
                </div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                  방어벽 1초 탈출
                </span>
                <h3 className="text-base font-bold text-white mt-1 mb-1.5">
                  구독 1분 해지 바로가기
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  해지 버튼을 꽁꽁 숨겨둔 구독 서비스들! 공식 계정 해지 다이렉트 링크와 단계별 경로 안내로 복잡한 팝업을 뚫고 1분 만에 해지하세요.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenCancelGuide}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                <span>해지 가이드 열기</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: 자주 묻는 질문 (FAQ) ===================== */}
      {activeTab === "faq" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* FAQ 검색창 및 카테고리 필터 */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="궁금한 내용을 검색해 보세요 (예: 해지, 백업, 무료, 알뜰폰, 관리비...)"
                className="w-full pl-10 pr-12 py-2.5 text-xs sm:text-sm bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-white placeholder-slate-400 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  지우기
                </button>
              )}
            </div>

            {/* 카테고리 버튼 필터 */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedFaqCategory("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                  selectedFaqCategory === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                전체 ({faqList.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedFaqCategory("start")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  selectedFaqCategory === "start"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>시작 &amp; 보안</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFaqCategory("diet")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  selectedFaqCategory === "diet"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                <span>구독 &amp; 다이어트</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFaqCategory("backup")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  selectedFaqCategory === "backup"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>데이터 &amp; 백업</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFaqCategory("tips")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  selectedFaqCategory === "tips"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>실무 생활 팁</span>
              </button>
            </div>
          </div>

          {/* FAQ 아코디언 리스트 */}
          <div className="space-y-2.5">
            {filteredFaqs.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800 text-slate-400">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-300">검색 결과가 없습니다.</p>
                <p className="text-xs text-slate-500 mt-1">다른 검색어를 입력해 보세요.</p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = !!openFaqIds[faq.id];
                return (
                  <div
                    key={faq.id}
                    className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xs transition-all hover:border-slate-700"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="text-emerald-400 font-black text-sm shrink-0 mt-0.5">
                          Q.
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                      <div className="p-1 rounded-md text-slate-400 shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-800/80 bg-slate-950/40">
                        <div className="flex items-start gap-2.5">
                          <span className="text-emerald-500 font-black text-sm shrink-0 mt-0.5">
                            A.
                          </span>
                          <div className="flex-1 min-w-0">{faq.answer}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: 고정비 절약 기준표 & 체크리스트 ===================== */}
      {activeTab === "standard" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* 가구 유형별 권장 지출 비율 카드 */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded border border-emerald-500/30">
                가계 재무 권장치
              </span>
              <h3 className="text-base font-bold text-white">
                소득 대비 적정 고정비 비율 가이드
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              재무 전문가들이 권장하는 건강한 가계의 고정비 지출 상한선은 <strong>세후 월소득의 20~25% 이내</strong>(주거 대출이자 포함 시 최대 30% 이하)입니다. 고정비가 35%를 넘어가면 비상 저축과 투자가 어려워집니다.
            </p>
          </div>

          {/* 6대 생활 고정비 분류 및 절약 팁 표 */}
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>6대 생활 고정비 테마별 절약 실무표</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              항목별로 알뜰하게 다이어트했을 때 기대되는 1년 절약 효과입니다.
            </p>

            <div className="space-y-2.5 text-xs">
              {[
                {
                  category: "디지털 & 구독",
                  items: "넷플릭스, 유튜브, 쿠팡, 디즈니+",
                  saving: "연 20~35만 원 절약",
                  tip: "동일 분야 1개만 유지, 안 보는 계정 일시 정지",
                  color: "bg-purple-950/40 text-purple-200 border-purple-800/60",
                },
                {
                  category: "통신 & 방송",
                  items: "스마트폰 요금제, 인터넷+IPTV",
                  saving: "연 50~75만 원 절약",
                  tip: "통신 3사(8만 원) ➔ 알뜰폰(1.9만 원) 번호이동",
                  color: "bg-blue-950/40 text-blue-200 border-blue-800/60",
                },
                {
                  category: "주거 & 공과금",
                  items: "아파트 관리비, 전기세, 난방비",
                  saving: "연 15~30만 원 절약",
                  tip: "관리비 할인 제휴카드 자동이체(월 5천~1만 원 청구할인)",
                  color: "bg-amber-950/40 text-amber-200 border-amber-800/60",
                },
                {
                  category: "보험 & 렌탈",
                  items: "실손(실비)보험, 정수기, 암보험",
                  saving: "연 30~50만 원 절약",
                  tip: "중복 특약 정리, 4세대 실손 전환 검토, 렌탈 의무약정 점검",
                  color: "bg-emerald-950/40 text-emerald-200 border-emerald-800/60",
                },
                {
                  category: "대출 & 금융",
                  items: "주택담보대출, 전세대출, 신용대출",
                  saving: "연 100만 원+ 절약",
                  tip: "대환대출 인프라로 0.5~1.0%p 금리 인하 비교",
                  color: "bg-rose-950/40 text-rose-200 border-rose-800/60",
                },
                {
                  category: "자동차 & 모빌리티",
                  items: "신차 장기렌터카, 차량할부금, 자동차보험",
                  saving: "연 20~40만 원 절약",
                  tip: "다이렉트 자동차보험 비교 갱신(15~20% 할인) 및 주행거리 특약 환급",
                  color: "bg-cyan-950/40 text-cyan-200 border-cyan-800/60",
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border ${row.color} space-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{row.category}</span>
                    <span className="font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {row.saving}
                    </span>
                  </div>
                  <div className="text-[11px] opacity-80">{row.items}</div>
                  <div className="text-[11px] pt-1 border-t border-white/10 opacity-90 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{row.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
