import React, { useState, useEffect } from 'react';
import { ExpenseItem, CategoryType, PresetItem, UserSettings } from './types';
import { loadExpenseItems, saveExpenseItems, loadUserSettings, saveUserSettings } from './utils/storage';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { CalendarTimelineView } from './components/CalendarTimelineView';
import { DietSavingsView } from './components/DietSavingsView';
import { ItemsListView } from './components/ItemsListView';
import { ExpenseModal } from './components/ExpenseModal';
import { SettingsModal } from './components/SettingsModal';
import { PwaInstallModal } from './components/PwaInstallModal';

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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 상단 고정 헤더 */}
      <Header
        onOpenAddModal={handleOpenAdd}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        onOpenPwaModal={() => setIsPwaModalOpen(true)}
        itemCount={items.length}
      />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 pt-4 pb-24">
        {currentTab === 'dashboard' && (
          <DashboardView
            items={items}
            settings={settings}
            onOpenAddModalWithPreset={handleOpenAddWithPreset}
            onOpenAddModal={handleOpenAdd}
            onSelectCategoryFilter={handleSelectCategoryFilterFromDashboard}
            onGoToDietTab={() => setCurrentTab('diet')}
            onEditItem={handleOpenEdit}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarTimelineView
            items={items}
            settings={settings}
            onEditItem={handleOpenEdit}
          />
        )}

        {currentTab === 'diet' && (
          <DietSavingsView
            items={items}
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
      </main>

      {/* 하단 네비게이션 바 */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAddModal={handleOpenAdd}
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
      />

      {/* PWA 홈 화면 추가 모달 */}
      <PwaInstallModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
        deferredPrompt={deferredPrompt}
      />

    </div>
  );
}

export default App;
