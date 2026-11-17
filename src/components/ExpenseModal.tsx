import React, { useState, useEffect } from 'react';
import { ExpenseItem, CategoryType, BillingCycle, PresetItem } from '../types';
import { CATEGORIES, CATEGORY_LIST } from '../data/categories';
import { POPULAR_PRESETS } from '../data/presets';
import { CategoryIcon } from './CategoryIcon';
import { X, Sparkles, Check, HelpCircle } from 'lucide-react';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ExpenseItem) => void;
  editingItem: ExpenseItem | null;
  initialPreset?: PresetItem | null;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
  initialPreset
}) => {
  const [tab, setTab] = useState<'preset' | 'custom'>('custom');

  // 폼 상태
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>('digital');
  const [amount, setAmount] = useState<number>(10000);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [payDay, setPayDay] = useState<number>(25);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sharingCount, setSharingCount] = useState<number>(1);
  const [memo, setMemo] = useState('');
  
  // 대출/금융 전용
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanBalance, setLoanBalance] = useState<string>('');

  // 모달 열릴 때 상태 초기화
  useEffect(() => {
    if (editingItem) {
      setTab('custom');
      setName(editingItem.name);
      setCategory(editingItem.category);
      setAmount(editingItem.amount);
      setBillingCycle(editingItem.billingCycle || 'monthly');
      setPayDay(editingItem.payDay || 25);
      setPaymentMethod(editingItem.paymentMethod || '');
      setSharingCount(editingItem.sharingCount || 1);
      setMemo(editingItem.memo || '');
      setInterestRate(editingItem.interestRate ? String(editingItem.interestRate) : '');
      setLoanBalance(editingItem.loanBalance ? String(editingItem.loanBalance) : '');
    } else if (initialPreset) {
      setTab('custom');
      setName(initialPreset.name);
      setCategory(initialPreset.category);
      setAmount(initialPreset.defaultAmount);
      setBillingCycle(initialPreset.defaultCycle);
      setPayDay(25);
      setPaymentMethod('');
      setSharingCount(1);
      setMemo(initialPreset.tip || '');
      setInterestRate('');
      setLoanBalance('');
    } else {
      setTab('preset');
      setName('');
      setCategory('digital');
      setAmount(10000);
      setBillingCycle('monthly');
      setPayDay(25);
      setPaymentMethod('');
      setSharingCount(1);
      setMemo('');
      setInterestRate('');
      setLoanBalance('');
    }
  }, [editingItem, initialPreset, isOpen]);

  if (!isOpen) return null;

  // 프리셋 클릭 시 값 자동 주입 후 직접 입력 탭으로 이동
  const handleSelectPreset = (preset: PresetItem) => {
    setName(preset.name);
    setCategory(preset.category);
    setAmount(preset.defaultAmount);
    setBillingCycle(preset.defaultCycle);
    setMemo(preset.tip || '');
    setTab('custom');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('고정비 이름을 입력해주세요.');
      return;
    }
    if (amount <= 0) {
      alert('0원 이상의 올바른 금액을 입력해주세요.');
      return;
    }

    const itemToSave: ExpenseItem = {
      id: editingItem ? editingItem.id : `fix-${Date.now()}`,
      name: name.trim(),
      category,
      amount: Math.round(amount),
      billingCycle,
      payDay: Number(payDay),
      paymentMethod: paymentMethod.trim() || undefined,
      sharingCount: sharingCount > 1 ? Number(sharingCount) : undefined,
      memo: memo.trim() || undefined,
      interestRate: interestRate ? parseFloat(interestRate) : undefined,
      loanBalance: loanBalance ? parseInt(loanBalance, 10) : undefined,
      isActive: editingItem ? editingItem.isActive : true,
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(itemToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full sm:max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* 헤더 */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white">
              {editingItem ? '고정비 항목 수정' : '고정비 등록'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 (신규 등록일 때만 프리셋/직접입력 전환) */}
        {!editingItem && (
          <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 pt-2">
            <button
              onClick={() => setTab('preset')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all relative ${
                tab === 'preset'
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              인기 프리셋 1초 선택
            </button>
            <button
              onClick={() => setTab('custom')}
              className={`pb-2.5 px-3 text-xs font-bold transition-all relative ${
                tab === 'custom'
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              직접 상세 입력
            </button>
          </div>
        )}

        {/* 내용 스크롤 본체 */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* 프리셋 선택 뷰 */}
          {tab === 'preset' && !editingItem ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                자주 등록하는 구독·생활고정비를 누르면 기본 정보가 자동 완성됩니다:
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
                {POPULAR_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all active:scale-98 flex items-start gap-2.5"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${preset.color}20`, color: preset.color }}
                    >
                      <CategoryIcon category={preset.category} iconName={preset.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-200 truncate">{preset.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {preset.defaultAmount.toLocaleString()}원 / {preset.defaultCycle === 'yearly' ? '연' : '월'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* 직접 상세 입력 폼 */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 카테고리 선택 */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  카테고리 분류
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORY_LIST.map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                        category === cat.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                      <span>{cat.shortLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 고정비 이름 */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  고정비 이름 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 넷플릭스 프리미엄, 아파트 관리비, 아반떼 리스"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* 금액 & 납부 주기 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    금액 (원) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold text-right focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    납부 주기
                  </label>
                  <select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="monthly">매월 납부 (월납)</option>
                    <option value="yearly">매년 1회 (연납 - 자동차보험 등)</option>
                    <option value="quarterly">3개월마다 (분기납)</option>
                  </select>
                </div>
              </div>

              {/* 금액 빠른 추가 버튼 */}
              <div className="flex gap-1.5">
                {[10000, 50000, 100000, 500000].map(add => (
                  <button
                    type="button"
                    key={add}
                    onClick={() => setAmount(prev => prev + add)}
                    className="flex-1 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700/50"
                  >
                    +{add >= 10000 ? `${add / 10000}만` : add}
                  </button>
                ))}
              </div>

              {/* 매월 결제일 & 결제수단 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    결제일 (매월 몇 일?)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={payDay}
                      onChange={(e) => setPayDay(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white text-right focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-xs text-slate-400 shrink-0">일</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    결제 수단 (선택)
                  </label>
                  <input
                    type="text"
                    placeholder="예: 신한카드, 국민은행"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* 구독 쉐어 (N분의 1) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  쉐어 인원수 (파티원 분할 시)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map(count => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => setSharingCount(count)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        sharingCount === count
                          ? 'bg-purple-600/30 border-purple-500 text-purple-300 font-bold'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                      }`}
                    >
                      {count === 1 ? '본인 전액' : `${count}인 N빵`}
                    </button>
                  ))}
                </div>
              </div>

              {/* 대출 카테고리일 때만 대출 상세 정보 표시 */}
              {category === 'finance' && (
                <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-500/30 space-y-2.5">
                  <span className="text-[11px] font-bold text-indigo-300 block">
                    대출 추가 정보 (선택 - 금리 비교용)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">대출 금리 (%)</span>
                      <input
                        type="number"
                        step={0.01}
                        placeholder="예: 4.15"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">대출 잔액 (원)</span>
                      <input
                        type="number"
                        step={1000000}
                        placeholder="예: 150000000"
                        value={loanBalance}
                        onChange={(e) => setLoanBalance(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 메모 */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  메모 / 약정 만료일 (선택)
                </label>
                <input
                  type="text"
                  placeholder="예: 2027년 11월 3년 약정 만료, 가족 결합 할인 중"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* 저장 버튼 */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/20 text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{editingItem ? '고정비 수정 완료' : '고정비 등록하기'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
