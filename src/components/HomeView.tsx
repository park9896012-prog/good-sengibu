import React from 'react';
import { ActiveNav, GradeNumber } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Lightbulb, 
  CheckSquare, 
  Compass, 
  BookMarked, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Target, 
  CheckCircle2, 
  TrendingUp,
  FileText
} from 'lucide-react';

interface HomeViewProps {
  setActiveNav: (nav: ActiveNav) => void;
  setSelectedGrade: (grade: GradeNumber) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveNav, setSelectedGrade }) => {
  const handleGradeSelect = (grade: GradeNumber) => {
    setSelectedGrade(grade);
    setActiveNav(`grade${grade}` as ActiveNav);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3.5 py-1.5 text-xs font-bold text-blue-300 border border-blue-400/30">
            <Sparkles className="h-4 w-4 text-amber-300" />
            고교학점제 & 학생부종합전형 완벽 대비
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            고1부터 고3까지, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
              생활기록부 365일
            </span> 전략 솔루션
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            학년별 맞춤 전략 가이드, 과목별/계열별 세특 템플릿, 진로 연계 탐구주제 추천기, 분기별 체크리스트까지 한곳에서 스마트하게 관리하세요.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveNav('topics')}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-amber-300" />
              <span>AI 탐구주제 추천기</span>
            </button>

            <button
              onClick={() => setActiveNav('templates')}
              className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-5 py-3 text-xs sm:text-sm font-bold text-white border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-blue-300" />
              <span>세특 템플릿 탐색</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-12 -bottom-12 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Grade Quick Entrance Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            학년별 생기부 맞춤 관리 카테고리
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">학년 특성에 맞춘 이행 로드맵 제공</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Grade 1 Card */}
          <div
            onClick={() => handleGradeSelect(1)}
            className="group rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-sm hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-sm">
                고1
              </span>
              <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                가이드보기 <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">1학년: 진로 탐색 및 기초</h3>
              <p className="text-xs text-slate-500 mt-1">
                넓은 분야의 지적 호기심 발출 & 공통과목 성실성 증명
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-blue-100/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> 공통과목(통합사회/과학) 기본 세특
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" /> 학급 1인 1역 & 자율/동아리 첫 기획
              </li>
            </ul>
          </div>

          {/* Grade 2 Card */}
          <div
            onClick={() => handleGradeSelect(2)}
            className="group rounded-2xl border border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-sm">
                고2
              </span>
              <span className="text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                가이드보기 <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">2학년: 진로 심화 및 선택과목</h3>
              <p className="text-xs text-slate-500 mt-1">
                전공 연계 선택과목 심화 탐구 & 주도적 동아리 리더십
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-indigo-100/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" /> 일반선택과목 심화 탐구보고서
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" /> 동아리 부장/프로젝트 연구 총괄
              </li>
            </ul>
          </div>

          {/* Grade 3 Card */}
          <div
            onClick={() => handleGradeSelect(3)}
            className="group rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white p-6 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-sm">
                고3
              </span>
              <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                가이드보기 <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">3학년: 3개년 스토리 완결</h3>
              <p className="text-xs text-slate-500 mt-1">
                진로선택과목 A성취도 & 융합 주제 결실 및 보완
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-emerald-100/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 진로선택과목 고난도 융합 세특
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 3개년 스토리텔링 유기성 점검
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Core Feature Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          생기부 365 핵심 실무 솔루션
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => setActiveNav('templates')}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">세특 템플릿 DB</h3>
              <p className="text-xs text-slate-500 mt-1">과목별/계열별 30+ 모범 서술 예시 문구</p>
            </div>
          </div>

          <div
            onClick={() => setActiveNav('topics')}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">탐구주제 추천기</h3>
              <p className="text-xs text-slate-500 mt-1">전공 연계 교과 심화 연구 설계기</p>
            </div>
          </div>

          <div
            onClick={() => setActiveNav('checklist')}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">학기별 체크리스트</h3>
              <p className="text-xs text-slate-500 mt-1">분기별 필수 점검 사항 저장 관리</p>
            </div>
          </div>

          <div
            onClick={() => setActiveNav('roadmap')}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">3개년 로드맵</h3>
              <p className="text-xs text-slate-500 mt-1">나만의 생기부 스케치노트 작성</p>
            </div>
          </div>

          <div
            onClick={() => setActiveNav('dictionary')}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">입시 용어 사전</h3>
              <p className="text-xs text-slate-500 mt-1">사관관 서류 평가요소 완전 해설</p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Framework Guide Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            2024+ 개정 학생부종합전형 3대 평가 요소 해설
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            전국의 주요 대학 입학사정관들이 생활기록부 서류 평가 시 공동으로 적용하는 핵심 기준입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-blue-50/60 p-5 border border-blue-200/80 space-y-2">
            <span className="inline-block rounded bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
              01. 학업역량
            </span>
            <h3 className="font-bold text-slate-900 text-sm">학업성취도, 학업태도, 탐구력</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              교과 등급 숫자뿐만 아니라, 수업 시간 중 자발적으로 의문을 품고 탐구보고서를 작성하거나 관련 도서를 독파하는 '지적 탐구 태도'를 핵심 평가합니다.
            </p>
          </div>

          <div className="rounded-xl bg-indigo-50/60 p-5 border border-indigo-200/80 space-y-2">
            <span className="inline-block rounded bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
              02. 진로역량
            </span>
            <h3 className="font-bold text-slate-900 text-sm">권장 과목 이수, 관련 탐구 성과</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              직업명에 고착되는 대신, 해당 학문 전공에 요구되는 핵심 기초 선택과목(예: 공학은 물리학/미적분)을 이수하고 깊이 있게 탐구했는가를 봅니다.
            </p>
          </div>

          <div className="rounded-xl bg-emerald-50/60 p-5 border border-emerald-200/80 space-y-2">
            <span className="inline-block rounded bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
              03. 공동체의식
            </span>
            <h3 className="font-bold text-slate-900 text-sm">협동, 배려, 성실성, 리더십</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              학급 청소나 봉사를 솔선수범하거나, 동료 학생들과의 학업 스터디 모임을 주도하여 긍정적 시너지를 일으킨 에피소드가 행특에 서술되어야 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
