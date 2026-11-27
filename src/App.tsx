import React, { useState, useEffect } from 'react';
import { ExpenseItem, CategoryType, PresetItem, UserSettings } from './types';
import { 
  loadExpenseItems, saveExpenseItems, loadUserSettings, saveUserSettings, 
  checkIsDemoData, INITIAL_DEMO_ITEMS 
} from './utils/storage';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { CalendarTimelineView } from './components/CalendarTimelineView';
import { DietSavingsView } from './components/DietSavingsView';
import { ItemsListView } from './components/ItemsListView';
import { ExpenseModal } from './components/ExpenseModal';
import { SettingsModal } from './components/SettingsModal';
import { PwaInstallModal } from './components/PwaInstallModal';
import { CancelGuideModal } from './components/CancelGuideModal';
import { DemoBanner } from './components/DemoBanner';
import { OnboardingEmptyState } from './components/OnboardingEmptyState';
import { FirstTimeOnboardingBanner } from './components/guide/FirstTimeOnboardingBanner';
import { GuideAndFaqPanel } from './components/guide/GuideAndFaqPanel';
import { QuickHelpModal } from './components/common/QuickHelpModal';

export function App() {
  const [items, setItems] = useState<ExpenseItem[]>(() => loadExpenseItems());
  const [settings, setSettings] = useState<UserSettings>(() => loadUserSettings());
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<CategoryType | 'all'>('all');

  // 모달 상태
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpenseItem | null>(null);
  const [presetForModal, setPresetForModal] = useState<PresetItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isCancelGuideOpen, setIsCancelGuideOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [cancelGuideServiceId, setCancelGuideServiceId] = useState<string | undefined>(undefined);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // URL 해시 및 경로 동기화 (#guide, #calendar, #diet, #items, #dashboard)
  useEffect(() => {
    const syncRoute = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.replace(/^\//, '').split('/')[0];
      const target = hash || path;

      if (target === 'guide' || target === 'faq') {
        setCurrentTab('guide');
      } else if (target === 'calendar') {
        setCurrentTab('calendar');
      } else if (target === 'diet') {
        setCurrentTab('diet');
      } else if (target === 'items') {
        setCurrentTab('items');
      } else if (target === 'dashboard' || !target) {
        setCurrentTab('dashboard');
      }
    };

    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    const targetHash = tab === 'dashboard' ? '' : `#${tab}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  };

  // 현재 데이터가 데모(체험) 데이터인지 여부
  const isDemo = checkIsDemoData(items);

  // 로컬 스토리지 자동 저장
  useEffect(() => {
    saveExpenseItems(items);
  }, [items]);

  useEffect(() => {
    saveUserSettings(settings);
  }, [settings]);

  // PWA beforeinstallprompt 리스너
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // 고정비 등록/수정 핸들러
  const handleSaveItem = (item: ExpenseItem) => {
    setItems(prev => {
      const existsIndex = prev.findIndex(it => it.id === item.id);
      if (existsIndex >= 0) {
        const next = [...prev];
        next[existsIndex] = item;
        return next;
      } else {
        return [item, ...prev];
      }
    });
    setEditingItem(null);
    setPresetForModal(null);
  };

  // 삭제 핸들러
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  // 활성/일시정지 토글 핸들러
  const handleToggleActive = (id: string) => {
    setItems(prev => prev.map(it => {
      if (it.id === id) {
        return { ...it, isActive: !it.isActive, updatedAt: new Date().toISOString() };
      }
      return it;
    }));
  };

  // 수정 열기
  const handleOpenEdit = (item: ExpenseItem) => {
    setEditingItem(item);
    setPresetForModal(null);
    setIsExpenseModalOpen(true);
  };

  // 프리셋으로 추가 모달 열기
  const handleOpenAddWithPreset = (preset: PresetItem) => {
    setEditingItem(null);
    setPresetForModal(preset);
    setIsExpenseModalOpen(true);
  };

  // 일반 추가 모달 열기
  const handleOpenAdd = () => {
    setEditingItem(null);
    setPresetForModal(null);
    setIsExpenseModalOpen(true);
  };

  // 해지 가이드 열기
  const handleOpenCancelGuide = (serviceId?: string) => {
    setCancelGuideServiceId(serviceId);
    setIsCancelGuideOpen(true);
  };

  // 대시보드에서 카테고리 클릭 시 목록 탭으로 이동 & 필터 적용
  const handleSelectCategoryFilterFromDashboard = (cat: CategoryType) => {
    setSelectedCategoryFilter(cat);
    setCurrentTab('items');
  };

  // 데이터 복원
  const handleRestoreData = (newItems: ExpenseItem[], newSettings: UserSettings) => {
    setItems(newItems);
    setSettings(newSettings);
  };

  // 예시 데이터 모두 지우기
  const handleClearAll = () => {
    setItems([]);
  };

  // 예시 데이터 불러오기
  const handleLoadDemoData = () => {
    setItems(INITIAL_DEMO_ITEMS);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 상단 고정 헤더 */}
      <Header
        onOpenAddModal={handleOpenAdd}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        onOpenPwaModal={() => setIsPwaModalOpen(true)}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        itemCount={items.length}
      />

      {/* 예시 데이터 둘러보기 모드일 때 최상단 안내 배너 */}
      {isDemo && (
        <DemoBanner
          onClearDemoData={handleClearAll}
          onOpenAddModal={handleOpenAdd}
        />
      )}

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 pt-4 pb-12">
        {/* 초보자 3분 퀵가이드 배너 (가이드 탭이 아닐 때 상단 노출) */}
        {currentTab !== 'guide' && (
          <FirstTimeOnboardingBanner
            onOpenAddModal={handleOpenAdd}
            onGoToCalendar={() => handleTabChange('calendar')}
            onGoToDiet={() => handleTabChange('diet')}
            onGoToGuide={() => handleTabChange('guide')}
          />
        )}

        {currentTab === 'dashboard' && (
          items.length === 0 ? (
            <OnboardingEmptyState
              onOpenAddModal={handleOpenAdd}
              onOpenAddWithPreset={handleOpenAddWithPreset}
              onLoadDemoData={handleLoadDemoData}
            />
          ) : (
            <DashboardView
              items={items}
              settings={settings}
              onOpenAddModalWithPreset={handleOpenAddWithPreset}
              onOpenAddModal={handleOpenAdd}
              onSelectCategoryFilter={handleSelectCategoryFilterFromDashboard}
              onGoToDietTab={() => handleTabChange('diet')}
              onEditItem={handleOpenEdit}
              onOpenCancelGuide={handleOpenCancelGuide}
            />
          )
        )}

        {currentTab === 'calendar' && (
          items.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-900/60 rounded-2xl p-6 border border-slate-800">
              <p className="text-sm font-bold text-slate-200">등록된 고정비 일정이 없습니다.</p>
              <p className="text-xs text-slate-400">내 고정비를 등록하면 결제일 달력에 자동으로 표시됩니다.</p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={handleOpenAdd}
                  className="bg-emerald-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  고정비 등록하기
                </button>
                <button
                  onClick={handleLoadDemoData}
                  className="bg-slate-800 text-slate-300 hover:text-white font-medium text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 cursor-pointer"
                >
                  예시로 체험하기
                </button>
              </div>
            </div>
          ) : (
            <CalendarTimelineView
              items={items}
              settings={settings}
              onEditItem={handleOpenEdit}
            />
          )
        )}

        {currentTab === 'diet' && (
          <DietSavingsView
            items={items}
            onOpenCancelGuide={handleOpenCancelGuide}
          />
        )}

        {currentTab === 'items' && (
          <ItemsListView
            items={items}
            selectedCategoryFilter={selectedCategoryFilter}
            onSelectCategoryFilter={setSelectedCategoryFilter}
            onEditItem={handleOpenEdit}
            onDeleteItem={handleDeleteItem}
            onToggleActive={handleToggleActive}
            onOpenAddModal={handleOpenAdd}
          />
        )}

        {currentTab === 'guide' && (
          <GuideAndFaqPanel
            onOpenAddModal={handleOpenAdd}
            onGoToCalendar={() => handleTabChange('calendar')}
            onGoToDiet={() => handleTabChange('diet')}
            onOpenCancelGuide={handleOpenCancelGuide}
            onOpenSettingsModal={() => setIsSettingsOpen(true)}
          />
        )}
      </main>

      {/* 하단 푸터 (SEO 및 저작권, 빠른 링크) */}
      <footer className="max-w-xl mx-auto px-4 py-8 text-center text-xs text-slate-500 border-t border-slate-900 mt-4 space-y-3 pb-24">
        {/* 푸터 퀵 내비게이션 */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-slate-400">
          <button
            type="button"
            onClick={() => handleTabChange('dashboard')}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${currentTab === 'dashboard' ? 'text-emerald-400 font-bold' : ''}`}
          >
            대시보드
          </button>
          <span className="text-slate-700">·</span>
          <button
            type="button"
            onClick={() => handleTabChange('calendar')}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${currentTab === 'calendar' ? 'text-emerald-400 font-bold' : ''}`}
          >
            결제일 달력
          </button>
          <span className="text-slate-700">·</span>
          <button
            type="button"
            onClick={() => handleTabChange('diet')}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${currentTab === 'diet' ? 'text-emerald-400 font-bold' : ''}`}
          >
            고정비 다이어트
          </button>
          <span className="text-slate-700">·</span>
          <button
            type="button"
            onClick={() => handleTabChange('items')}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${currentTab === 'items' ? 'text-emerald-400 font-bold' : ''}`}
          >
            전체 목록
          </button>
          <span className="text-slate-700">·</span>
          <button
            type="button"
            onClick={() => handleTabChange('guide')}
            className={`hover:text-emerald-400 transition-colors cursor-pointer ${currentTab === 'guide' ? 'text-emerald-400 font-bold' : ''}`}
          >
            이용방법 &amp; FAQ
          </button>
        </div>

        <div className="space-y-1 text-[11px] text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-400 text-xs">
            고정비노트 (FixNote) · 숨은 고정비 &amp; 구독·통신·관리비·보험·대출 통합 관리기
          </p>
          <p>
            중복 구독 실시간 감지 | 1분 해지 바로가기 | 알뜰폰·대환대출 절약 계산기 | PWA 모바일 앱 지원
          </p>
          <p className="text-[10px] text-slate-600">
            &copy; 2026 FixNote. All rights reserved. 100% 브라우저 LocalStorage에만 안전하게 보관됩니다.
          </p>
        </div>
      </footer>

      {/* 하단 네비게이션 바 */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenAddModal={handleOpenAdd}
      />

      {/* 1분 퀵 도움말 모달 */}
      <QuickHelpModal
        open={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onGoToFullGuide={() => {
          setIsHelpModalOpen(false);
          handleTabChange('guide');
        }}
      />

      {/* 등록/수정 모달 */}
      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => {
          setIsExpenseModalOpen(false);
          setEditingItem(null);
          setPresetForModal(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
        initialPreset={presetForModal}
      />

      {/* 환경설정 및 백업 모달 */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        items={items}
        onSaveSettings={setSettings}
        onRestoreData={handleRestoreData}
        onClearAll={handleClearAll}
      />

      {/* PWA 홈 화면 추가 모달 */}
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
        deferredPrompt={deferredPrompt}
      />

      {/* 구독 해지 1분 가이드 모달 */}
      <CancelGuideModal
        isOpen={isCancelGuideOpen}
        onClose={() => setIsCancelGuideOpen(false)}
        initialServiceId={cancelGuideServiceId}
      />

    </div>
  );
}

export default App;
