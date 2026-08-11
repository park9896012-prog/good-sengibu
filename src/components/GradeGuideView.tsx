import React, { useState } from 'react';
import { GradeNumber, ActiveNav } from '../types';
import { gradeGuidesData } from '../data/guideData';
import { 
  CheckCircle2, 
  Target, 
  Sparkles, 
  BookOpen, 
  Printer, 
  ArrowRight, 
  Award, 
  Zap, 
  ShieldAlert,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface GradeGuideViewProps {
  grade: GradeNumber;
  setSelectedGrade: (grade: GradeNumber) => void;
  setActiveNav: (nav: ActiveNav) => void;
}

export const GradeGuideView: React.FC<GradeGuideViewProps> = ({
  grade,
  setSelectedGrade,
  setActiveNav
}) => {
  const guide = gradeGuidesData[grade] || gradeGuidesData[1];
  const [activeTab, setActiveTab] = useState<'all' | 'setuk' | 'changche' | 'haengteuk'>('all');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Grade Selector Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              학년별 전략 로드맵
            </span>
            <span className="text-xs text-slate-300">| 2025/2026 학생부종합전형</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {guide.title}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {guide.subtitle}
          </p>
        </div>

        {/* Grade Quick Switch Buttons */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 self-start md:self-auto">
          <button
            onClick={() => setSelectedGrade(1)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              grade === 1
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            1학년
          </button>
          <button
            onClick={() => setSelectedGrade(2)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              grade === 2
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            2학년
          </button>
          <button
            onClick={() => setSelectedGrade(3)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              grade === 3
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            3학년
          </button>
        </div>
      </div>

      {/* Core Objectives Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
            <Target className="h-5 w-5 text-blue-600" />
            핵심 관리 목표
          </div>
          <p className="text-sm text-blue-950 font-semibold leading-snug">
            {guide.coreGoal}
          </p>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
            <Zap className="h-5 w-5 text-indigo-600" />
            핵심 이행 전략
          </div>
          <p className="text-xs text-indigo-950 leading-relaxed">
            {guide.keyStrategy}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <Sparkles className="h-5 w-5 text-emerald-600" />
            입학사정관 평가 포인트
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {guide.evaluationFocus.map((focus, i) => (
              <span key={i} className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                ✓ {focus}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Filter Tabs & Print Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 영역 보기
          </button>
          <button
            onClick={() => setActiveTab('setuk')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'setuk'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            교과 세특
          </button>
          <button
            onClick={() => setActiveTab('changche')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'changche'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            창체(자율/동아리/진로)
          </button>
          <button
            onClick={() => setActiveTab('haengteuk')}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'haengteuk'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            행특 관리 팁
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer no-print self-end sm:self-auto"
        >
          <Printer className="h-3.5 w-3.5 text-slate-500" />
          전략가이드 인쇄/PDF 저장
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-8">
        {guide.sections.map((section, idx) => {
          // Tab filtering logic
          if (activeTab === 'setuk' && !section.title.includes('세특')) return null;
          if (activeTab === 'changche' && !section.title.includes('창의적')) return null;
          if (activeTab === 'haengteuk' && !section.title.includes('행동특성')) return null;

          return (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6 print-card">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                    0{idx + 1}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500 pl-9">{section.description}</p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 gap-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 space-y-4 hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 bg-blue-100/80 px-3 py-1 rounded-lg">
                        <Bookmark className="h-3.5 w-3.5" />
                        {item.area}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {grade}학년 맞춤 로드맵
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Action Plan */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          실행 액션 플랜 (Action Plan)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed pl-5 bg-white p-3 rounded-lg border border-slate-200/60">
                          {item.actionPlan}
                        </p>
                      </div>

                      {/* Checklist Point */}
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          <ShieldAlert className="h-4 w-4 text-amber-500" />
                          기록 점검 핵심 가이드 (Check Point)
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed pl-5 bg-amber-50/60 p-3 rounded-lg border border-amber-200/60 text-amber-950 font-medium">
                          {item.checklistPoint}
                        </p>
                      </div>
                    </div>

                    {/* Example Box */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                        실무 생기부 모범 문구 작성 예시
                      </h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs leading-relaxed font-mono relative">
                        <p>"{item.example}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Actions for Next Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 no-print">
        <button
          onClick={() => setActiveNav('templates')}
          className="flex items-center justify-between p-5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md cursor-pointer group"
        >
          <div>
            <p className="text-[11px] text-blue-200 font-semibold">과목별 예시 데이터베이스</p>
            <p className="text-sm font-bold">세특 템플릿 보러가기</p>
          </div>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setActiveNav('topics')}
          className="flex items-center justify-between p-5 rounded-2xl bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-md cursor-pointer group"
        >
          <div>
            <p className="text-[11px] text-amber-200 font-semibold">진로 연계 아이디어</p>
            <p className="text-sm font-bold">탐구주제 추천기 바로가기</p>
          </div>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => setActiveNav('checklist')}
          className="flex items-center justify-between p-5 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-md cursor-pointer group"
        >
          <div>
            <p className="text-[11px] text-emerald-200 font-semibold">분기별 점검표</p>
            <p className="text-sm font-bold">{grade}학년 필수 체크리스트</p>
          </div>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
