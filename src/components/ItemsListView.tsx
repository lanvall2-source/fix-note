import React, { useState } from 'react';
import { ExpenseItem, CategoryType } from '../types';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import { formatCurrency, getMonthlyEquivalent } from '../utils/formatters';
import { CategoryIcon } from './CategoryIcon';
import { 
  Search, SlidersHorizontal, Trash2, Edit2, Pause, Play, 
  Plus, Check, ArrowUpDown 
} from 'lucide-react';

interface ItemsListViewProps {
  items: ExpenseItem[];
  selectedCategoryFilter: CategoryType | 'all';
  onSelectCategoryFilter: (category: CategoryType | 'all') => void;
  onEditItem: (item: ExpenseItem) => void;
  onDeleteItem: (id: string) => void;
  onToggleActive: (id: string) => void;
  onOpenAddModal: () => void;
}

type SortOption = 'amount_desc' | 'payday_asc' | 'name_asc';

export const ItemsListView: React.FC<ItemsListViewProps> = ({
  items,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  onEditItem,
  onDeleteItem,
  onToggleActive,
  onOpenAddModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('amount_desc');

  // 필터링 적용
  const filteredItems = items.filter(item => {
    // 1. 카테고리 필터
    if (selectedCategoryFilter !== 'all' && item.category !== selectedCategoryFilter) {
      return false;
    }
    // 2. 검색어 필터
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(term);
      const matchMemo = item.memo?.toLowerCase().includes(term);
      const matchPayment = item.paymentMethod?.toLowerCase().includes(term);
      if (!matchName && !matchMemo && !matchPayment) return false;
    }
    return true;
  });

  // 정렬 적용
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'amount_desc') {
      return getMonthlyEquivalent(b) - getMonthlyEquivalent(a);
    }
    if (sortBy === 'payday_asc') {
      return a.payDay - b.payDay;
    }
    if (sortBy === 'name_asc') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // 활성 항목 월 환산 합계
  const filteredTotal = filteredItems
    .filter(it => it.isActive)
    .reduce((acc, it) => acc + getMonthlyEquivalent(it), 0);

  return (
    <div className="space-y-4 pb-6">
      
      {/* 1. 카테고리 필터 칩 바 */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectCategoryFilter('all')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedCategoryFilter === 'all'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          전체 ({items.length})
        </button>

        {CATEGORY_LIST.map(cat => {
          const count = items.filter(it => it.category === cat.id).length;
          const isSelected = selectedCategoryFilter === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategoryFilter(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
              <span>{cat.shortLabel}</span>
              <span className={`text-[10px] ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. 검색 및 정렬 바 */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="고정비 이름, 결제수단, 메모 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* 정렬 드롭다운 */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-2.5 py-2 focus:outline-none focus:border-emerald-500/50"
        >
          <option value="amount_desc">금액 높은순</option>
          <option value="payday_asc">결제일 빠른순</option>
          <option value="name_asc">이름 가나다순</option>
        </select>
      </div>

      {/* 3. 소계 안내 바 */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>선택 항목 {sortedItems.length}개</span>
        <span>
          활성 월 합계: <strong className="text-emerald-400">{formatCurrency(filteredTotal)}</strong>
        </span>
      </div>

      {/* 4. 고정비 카드 목록 */}
      {sortedItems.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-3">
          <p className="text-slate-400 text-xs">일치하는 고정비 항목이 없습니다.</p>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 bg-emerald-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>새 고정비 추가</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {sortedItems.map(item => {
            const meta = CATEGORIES[item.category];
            const monthlyAmount = getMonthlyEquivalent(item);

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.isActive
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-850 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  
                  {/* 좌측 아이콘 & 정보 */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
                    >
                      <CategoryIcon category={item.category} iconName={item.icon} className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-100">
                          {item.name}
                        </span>
                        {!item.isActive && (
                          <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                            일시정지
                          </span>
                        )}
                        {item.sharingCount && item.sharingCount > 1 && (
                          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/30">
                            {item.sharingCount}인 쉐어
                          </span>
                        )}
                      </div>

                      {/* 세부 메타 정보 */}
                      <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                        <span className="text-emerald-400 font-medium">매월 {item.payDay}일 결제</span>
                        {item.paymentMethod && <span>· {item.paymentMethod}</span>}
                        {item.interestRate && <span>· 금리 {item.interestRate}%</span>}
                      </div>

                      {/* 메모 */}
                      {item.memo && (
                        <p className="text-[11px] text-slate-400 mt-1.5 bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-700/40">
                          {item.memo}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 우측 금액 */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-white">
                      {formatCurrency(monthlyAmount)}
                      <span className="text-[10px] font-normal text-slate-400 ml-0.5">/월</span>
                    </div>
                    {item.billingCycle === 'yearly' && (
                      <div className="text-[10px] text-amber-400 mt-0.5">
                        연납 {formatCurrency(item.amount)}
                      </div>
                    )}
                  </div>
                </div>

                {/* 하단 액션 버튼 바 */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {meta.label}
                  </span>

                  <div className="flex items-center gap-1">
                    {/* 활성/일시정지 토글 */}
                    <button
                      onClick={() => onToggleActive(item.id)}
                      title={item.isActive ? "일시정지하기" : "다시 활성화하기"}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                    >
                      {item.isActive ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span className="text-[10px]">정지</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">활성화</span>
                        </>
                      )}
                    </button>

                    {/* 수정 버튼 */}
                    <button
                      onClick={() => onEditItem(item)}
                      aria-label="수정"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => {
                        if (confirm(`'${item.name}' 항목을 삭제하시겠습니까?`)) {
                          onDeleteItem(item.id);
                        }
                      }}
                      aria-label="삭제"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
