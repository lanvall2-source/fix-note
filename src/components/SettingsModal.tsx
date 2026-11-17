import React, { useState, useRef } from 'react';
import { UserSettings, ExpenseItem } from '../types';
import { exportDataAsJson, importDataFromJson, INITIAL_DEMO_ITEMS } from '../utils/storage';
import { X, Download, Upload, RotateCcw, ShieldCheck, Check, DollarSign } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  items: ExpenseItem[];
  onSaveSettings: (settings: UserSettings) => void;
  onRestoreData: (items: ExpenseItem[], settings: UserSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  items,
  onSaveSettings,
  onRestoreData
}) => {
  const [salaryDay, setSalaryDay] = useState<number>(settings.salaryDay || 25);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSaveSalaryDay = () => {
    onSaveSettings({
      ...settings,
      salaryDay: Number(salaryDay)
    });
    alert('설정이 저장되었습니다.');
  };

  const handleExport = () => {
    exportDataAsJson(items, settings);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = importDataFromJson(content);
      if (parsed) {
        onRestoreData(parsed.items, parsed.settings);
        alert(`성공적으로 ${parsed.items.length}개의 고정비 데이터를 복원했습니다!`);
        onClose();
      } else {
        alert('올바른 FixNote 백업 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDemo = () => {
    if (confirm('기본 예시 데이터(11개 항목)로 복원하시겠습니까? 현재 입력된 내용은 덮어씌워집니다.')) {
      onRestoreData(INITIAL_DEMO_ITEMS, settings);
      alert('예시 데이터로 복원되었습니다.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full sm:max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* 헤더 */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">환경설정 및 데이터 관리</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* 1. 급여일 설정 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-slate-200 block">
              내 급여일 설정 (캘린더 연동)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">매월</span>
              <input
                type="number"
                min={1}
                max={31}
                value={salaryDay}
                onChange={(e) => setSalaryDay(Number(e.target.value))}
                className="w-20 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white text-right font-bold"
              />
              <span className="text-xs text-slate-400">일</span>
              <button
                type="button"
                onClick={handleSaveSalaryDay}
                className="ml-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg"
              >
                저장
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              결제일 캘린더에서 급여일 기준 전후 지출 흐름을 파악할 수 있습니다.
            </p>
          </div>

          {/* 2. 데이터 백업 및 복원 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
            <span className="text-xs font-bold text-slate-200 block">
              데이터 백업 및 기기 변경
            </span>
            <p className="text-[11px] text-slate-400">
              스마트폰을 바꾸거나 PC와 동기화할 때 JSON 파일로 안전하게 이동할 수 있습니다.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold py-2.5 rounded-xl border border-slate-600 transition-all active:scale-98"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>백업 파일 저장</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold py-2.5 rounded-xl border border-slate-600 transition-all active:scale-98"
              >
                <Upload className="w-4 h-4 text-blue-400" />
                <span>백업 불러오기</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* 3. 예시 데이터 초기화 */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleResetDemo}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/40 hover:bg-slate-800 rounded-xl border border-slate-700/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 예시 데이터(11개 항목) 다시 불러오기</span>
            </button>
          </div>

          {/* 4. 안심 보안 안내 */}
          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-300 leading-relaxed">
              <strong>100% 개인정보 안심 보장</strong>: 고정비노트는 로그인이나 은행 인증 없이 내 폰 브라우저(LocalStorage)에만 안전하게 보관되며 외부 서버로 절대 전송되지 않습니다.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
