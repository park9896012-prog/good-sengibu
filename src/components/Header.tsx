import React, { useState } from 'react';
import { ActiveNav, GradeNumber } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Lightbulb, 
  CheckSquare, 
  Compass, 
  BookMarked, 
  Menu, 
  X, 
  ChevronDown, 
  Search,
  Sparkles,
  Mail,
  Home
} from 'lucide-react';

interface HeaderProps {
  activeNav: ActiveNav;
  setActiveNav: (nav: ActiveNav) => void;
  selectedGrade: GradeNumber;
  setSelectedGrade: (grade: GradeNumber) => void;
  onOpenSearch?: () => void;
  onOpenPolicyModal?: (policy: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeNav,
  setActiveNav,
  setSelectedGrade,
  onOpenSearch,
  onOpenPolicyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleGradeNav = (grade: GradeNumber) => {
    setSelectedGrade(grade);
    setActiveNav(`grade${grade}` as ActiveNav);
    setMobileMenuOpen(false);
  };

  const handleToolNav = (nav: ActiveNav) => {
    setActiveNav(nav);
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-1.5 text-center text-xs font-medium text-white flex items-center justify-between">
        <div className="mx-auto flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold text-amber-200">
            2025/2026 대입 완벽대비
          </span>
          <span className="hidden sm:inline">고교학점제 & 학생부종합전형 365일 학년별 맞춤 전략가이드</span>
          <span className="sm:hidden">고등학생 학년별 생기부 솔루션</span>
        </div>
        <button 
          onClick={() => onOpenPolicyModal && onOpenPolicyModal('contact')}
          className="hidden md:flex items-center gap-1 text-[11px] text-blue-100 hover:text-white underline cursor-pointer"
        >
          <Mail className="h-3 w-3" />
          ju9896012@gmail.com
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => { setActiveNav('home'); setMobileMenuOpen(false); }} 
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">생기부 365</span>
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-300">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden xs:block">생활기록부 맞춤 전략 솔루션</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setActiveNav('home')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeNav === 'home' 
                ? 'bg-blue-50 text-blue-700 font-bold' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Home className="h-4 w-4" />
            홈
          </button>

          {/* Grade Tabs */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl mx-2 border border-slate-200/60">
            <button
              onClick={() => handleGradeNav(1)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeNav === 'grade1'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1학년 전략
            </button>
            <button
              onClick={() => handleGradeNav(2)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeNav === 'grade2'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2학년 전략
            </button>
            <button
              onClick={() => handleGradeNav(3)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeNav === 'grade3'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3학년 전략
            </button>
          </div>

          {/* Core Tools */}
          <button
            onClick={() => handleToolNav('templates')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeNav === 'templates' 
                ? 'bg-blue-50 text-blue-700 font-bold' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="h-4 w-4 text-blue-500" />
            세특 템플릿
          </button>

          <button
            onClick={() => handleToolNav('topics')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeNav === 'topics' 
                ? 'bg-amber-50 text-amber-700 font-bold' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="h-4 w-4 text-amber-500" />
            탐구주제 추천
          </button>

          <button
            onClick={() => handleToolNav('checklist')}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeNav === 'checklist' 
                ? 'bg-emerald-50 text-emerald-700 font-bold' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="h-4 w-4 text-emerald-500" />
            체크리스트
          </button>

          {/* More Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              더보기
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50">
                <button
                  onClick={() => handleToolNav('roadmap')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Compass className="h-4 w-4 text-indigo-500" />
                  3개년 생기부 로드맵
                </button>
                <button
                  onClick={() => handleToolNav('dictionary')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <BookMarked className="h-4 w-4 text-rose-500" />
                  입시 용어 사전
                </button>
                <div className="my-1 border-t border-slate-100"></div>
                <button
                  onClick={() => { onOpenPolicyModal && onOpenPolicyModal('about'); setToolsDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  생기부 365 서비스 소개
                </button>
                <button
                  onClick={() => { onOpenPolicyModal && onOpenPolicyModal('contact'); setToolsDropdownOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  문의하기 (ju9896012@gmail.com)
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              title="통합 검색"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="hidden sm:inline">세특 / 주제 검색</span>
            </button>
          )}

          <button
            onClick={() => handleToolNav('topics')}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI 주제추천기
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
            <button
              onClick={() => handleGradeNav(1)}
              className={`py-2 text-center text-xs font-bold rounded-lg ${
                activeNav === 'grade1' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              1학년 전략
            </button>
            <button
              onClick={() => handleGradeNav(2)}
              className={`py-2 text-center text-xs font-bold rounded-lg ${
                activeNav === 'grade2' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              2학년 전략
            </button>
            <button
              onClick={() => handleGradeNav(3)}
              className={`py-2 text-center text-xs font-bold rounded-lg ${
                activeNav === 'grade3' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              3학년 전략
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleToolNav('home')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Home className="h-4 w-4" />
              홈 메인
            </button>
            <button
              onClick={() => handleToolNav('templates')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'templates' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="h-4 w-4 text-blue-500" />
              과목별 세특 템플릿
            </button>
            <button
              onClick={() => handleToolNav('topics')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'topics' ? 'bg-amber-50 text-amber-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Lightbulb className="h-4 w-4 text-amber-500" />
              진로 연계 탐구주제 추천기
            </button>
            <button
              onClick={() => handleToolNav('checklist')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'checklist' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="h-4 w-4 text-emerald-500" />
              학기별 필수 체크리스트
            </button>
            <button
              onClick={() => handleToolNav('roadmap')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'roadmap' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Compass className="h-4 w-4 text-indigo-500" />
              3개년 생기부 로드맵
            </button>
            <button
              onClick={() => handleToolNav('dictionary')}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                activeNav === 'dictionary' ? 'bg-rose-50 text-rose-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookMarked className="h-4 w-4 text-rose-500" />
              입시 용어 사전
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">고객 지원 & 문의</p>
            <a href="mailto:ju9896012@gmail.com" className="text-blue-600 hover:underline flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> ju9896012@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
