import React from 'react';
import { GraduationCap, Mail, ShieldCheck, FileText, Info, ExternalLink } from 'lucide-react';
import { ActiveNav } from '../types';

interface FooterProps {
  onOpenPolicyModal: (policy: 'about' | 'privacy' | 'terms' | 'contact') => void;
  setActiveNav: (nav: ActiveNav) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicyModal, setActiveNav }) => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white">생기부 365</span>
                <p className="text-xs text-slate-400">생활기록부 365일 전략가이드</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              고교학점제 및 최신 대입 학생부종합전형에 최적화된 고등학생 1~3학년 맞춤형 생활기록부 관리, 세특 템플릿, 탐구주제 추천 플랫폼입니다.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <Mail className="h-4 w-4 text-amber-400" />
              <span>문의처: </span>
              <a href="mailto:ju9896012@gmail.com" className="hover:underline text-white font-mono">
                ju9896012@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">학년별 전략가이드</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveNav('grade1')} className="hover:text-white transition-colors cursor-pointer">
                  • 1학년: 진로 탐색 및 기본 학업역량
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('grade2')} className="hover:text-white transition-colors cursor-pointer">
                  • 2학년: 진로 심화 및 선택과목 탐구
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('grade3')} className="hover:text-white transition-colors cursor-pointer">
                  • 3학년: 3개년 스토리텔링 완결
                </button>
              </li>
            </ul>
          </div>

          {/* Core Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">핵심 기능 도구</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveNav('templates')} className="hover:text-white transition-colors cursor-pointer">
                  • 과목별/계열별 세특 템플릿 DB
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('topics')} className="hover:text-white transition-colors cursor-pointer">
                  • 진로 연계 탐구주제 추천기 (AI/DB)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('checklist')} className="hover:text-white transition-colors cursor-pointer">
                  • 학기별/분기별 필수 체크리스트
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('roadmap')} className="hover:text-white transition-colors cursor-pointer">
                  • 3개년 생기부 로드맵 스케치노트
                </button>
              </li>
              <li>
                <button onClick={() => setActiveNav('dictionary')} className="hover:text-white transition-colors cursor-pointer">
                  • 입시 평가요소 용어 사전
                </button>
              </li>
            </ul>
          </div>

          {/* AdSense Policy & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">정책 및 애드센스 준수</h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenPolicyModal('privacy')} className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 font-semibold cursor-pointer">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  개인정보처리방침 (Privacy Policy)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicyModal('terms')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <FileText className="h-3.5 w-3.5" />
                  이용약관 (Terms of Service)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicyModal('about')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <Info className="h-3.5 w-3.5" />
                  서비스 소개 (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicyModal('contact')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <Mail className="h-3.5 w-3.5" />
                  1:1 문의 및 제휴 (Contact)
                </button>
              </li>
            </ul>
            <p className="mt-4 text-[11px] leading-tight text-slate-500">
              * 생기부 365는 Google AdSense 게시자 정책을 철저히 준수하며 저작권을 침해하지 않는 고품질 입시 교육 컨텐츠를 지속적으로 제공합니다.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} 생기부 365 (생활기록부 365). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-slate-400 flex items-center gap-1">
              Sitemap.xml <ExternalLink className="h-3 w-3" />
            </a>
            <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-slate-400 flex items-center gap-1">
              Robots.txt <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
