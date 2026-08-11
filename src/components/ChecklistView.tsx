import React, { useState, useEffect, useMemo } from 'react';
import { checklistsData } from '../data/guideData';
import { GradeNumber, ChecklistItem } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  Square, 
  Trophy, 
  CheckCircle2, 
  Printer, 
  Filter, 
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(1);
  const [selectedTerm, setSelectedTerm] = useState<string>('전체');
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sangibu365_checklist_state');
      if (saved) {
        setCompletedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save state to localStorage
  const toggleTask = (id: string) => {
    const nextState = { ...completedIds, [id]: !completedIds[id] };
    setCompletedIds(nextState);
    try {
      localStorage.setItem('sangibu365_checklist_state', JSON.stringify(nextState));
    } catch (e) {
      console.error(e);
    }

    // Trigger confetti if item is completed
    if (!completedIds[id]) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const handleResetGrade = () => {
    if (window.confirm(`${selectedGrade}학년 체크리스트 진행도를 초기화하시겠습니까?`)) {
      const nextState = { ...completedIds };
      checklistsData.filter(item => item.targetGrade === selectedGrade).forEach(item => {
        delete nextState[item.id];
      });
      setCompletedIds(nextState);
      localStorage.setItem('sangibu365_checklist_state', JSON.stringify(nextState));
    }
  };

  // Filter items
  const gradeItems = useMemo(() => {
    return checklistsData.filter(item => item.targetGrade === selectedGrade);
  }, [selectedGrade]);

  const displayedItems = useMemo(() => {
    if (selectedTerm === '전체') return gradeItems;
    return gradeItems.filter(item => item.term === selectedTerm);
  }, [gradeItems, selectedTerm]);

  // Calculate Progress percentage
  const totalCount = gradeItems.length;
  const completedCount = gradeItems.filter(item => completedIds[item.id]).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
            <CheckSquare className="h-3.5 w-3.5 text-emerald-400" />
            학기별 필수 점검 체크리스트
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {selectedGrade}학년 분기별 생기부 관리 체크리스트
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            놓치기 쉬운 학기별 교과 세특, 창체 프로젝트, 행특 관찰 서류 제출 시기별 필수 과업을 체크하고 이행률을 점검하세요. (자동 저장됨)
          </p>
        </div>

        {/* Grade Buttons */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 shrink-0 self-start md:self-auto">
          <button
            onClick={() => { setSelectedGrade(1); setSelectedTerm('전체'); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedGrade === 1 ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            1학년
          </button>
          <button
            onClick={() => { setSelectedGrade(2); setSelectedTerm('전체'); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedGrade === 2 ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            2학년
          </button>
          <button
            onClick={() => { setSelectedGrade(3); setSelectedTerm('전체'); }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              selectedGrade === 3 ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            3학년
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-800">
              {selectedGrade}학년 전체 생기부 달성률
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">
              {completedCount} / {totalCount}개 과업 완료 ({progressPercent}%)
            </span>
            <button
              onClick={handleResetGrade}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-600 cursor-pointer"
              title="완료 내역 초기화"
            >
              <RotateCcw className="h-3 w-3" /> 초기화
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {progressPercent === 100 && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            축하합니다! {selectedGrade}학년 필수 생기부 점검 과업을 100% 완수하셨습니다!
          </div>
        )}
      </div>

      {/* Filter Tabs & Print */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="h-3.5 w-3.5" /> 학기/분기:
          </span>
          {['전체', '1학기 1차(봄)', '1학기 2차(여름)', '2학기 1차(가을)', '2학기 2차(겨울)'].map((term) => (
            <button
              key={term}
              onClick={() => setSelectedTerm(term)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedTerm === term
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {term}
            </button>
          ))}
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer no-print self-end sm:self-auto"
        >
          <Printer className="h-3.5 w-3.5 text-slate-500" />
          체크리스트 출력하기
        </button>
      </div>

      {/* Checklist Task Items */}
      <div className="space-y-4">
        {displayedItems.map((item) => {
          const isDone = !!completedIds[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleTask(item.id)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer flex items-start gap-4 ${
                isDone
                  ? 'border-emerald-200 bg-emerald-50/40 opacity-80'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Checkbox Icon */}
              <div className="pt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="h-6 w-6 text-slate-300 hover:text-slate-400" />
                )}
              </div>

              {/* Task Details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                    {item.term}
                  </span>
                  <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                    {item.category}
                  </span>
                  {item.isEssential && (
                    <span className="flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                      <AlertCircle className="h-3 w-3" /> 필수 과업
                    </span>
                  )}
                </div>

                <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {item.taskTitle}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
