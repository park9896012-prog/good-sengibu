import React, { useState, useMemo } from 'react';
import { setukTemplatesData, topicIdeasData, admissionsDictionaryData } from '../data/guideData';
import { ActiveNav } from '../types';
import { X, Search, BookOpen, Lightbulb, BookMarked, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveNav: (nav: ActiveNav) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, setActiveNav }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchResults = useMemo(() => {
    if (!query.trim()) return { templates: [], topics: [], terms: [] };

    const q = query.toLowerCase();

    const templates = setukTemplatesData.filter(
      t => t.title.toLowerCase().includes(q) || t.exampleText.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)
    ).slice(0, 5);

    const topics = topicIdeasData.filter(
      top => top.topicTitle.toLowerCase().includes(q) || top.explorationDetails.toLowerCase().includes(q) || top.subject.toLowerCase().includes(q)
    ).slice(0, 5);

    const terms = admissionsDictionaryData.filter(
      term => term.termName.toLowerCase().includes(q) || term.simpleDefinition.toLowerCase().includes(q)
    ).slice(0, 5);

    return { templates, topics, terms };
  }, [query]);

  const handleNavigate = (nav: ActiveNav) => {
    setActiveNav(nav);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 pt-16 px-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="relative flex-1 mr-3">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              autoFocus
              placeholder="세특 예시, 탐구주제, 입시용어 통합 검색... (예: 미적분, 넛지, 학업역량, 나노입자)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-semibold focus:border-blue-500 focus:bg-white focus:outline-hidden"
            />
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {query.trim() === '' ? (
          <div className="py-8 text-center text-xs text-slate-400 space-y-2">
            <p className="font-semibold text-slate-600">추천 검색어</p>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {['미적분', '통합과학', '약물전달', '넛지', '학업역량', 'CRISPR', '자율주행'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-lg bg-slate-100 px-3 py-1 text-slate-600 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Setuk Templates Results */}
            {searchResults.templates.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> 세특 템플릿 ({searchResults.templates.length})
                  </span>
                  <button onClick={() => handleNavigate('templates')} className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5">
                    전체보기 <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                {searchResults.templates.map(t => (
                  <div key={t.id} onClick={() => handleNavigate('templates')} className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl cursor-pointer transition-colors space-y-1">
                    <p className="text-xs font-bold text-slate-900">{t.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{t.exampleText}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Topic Ideas Results */}
            {searchResults.topics.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <Lightbulb className="h-3.5 w-3.5" /> 탐구주제 ({searchResults.topics.length})
                  </span>
                  <button onClick={() => handleNavigate('topics')} className="text-[11px] text-amber-600 font-bold hover:underline flex items-center gap-0.5">
                    전체보기 <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                {searchResults.topics.map(top => (
                  <div key={top.id} onClick={() => handleNavigate('topics')} className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl cursor-pointer transition-colors space-y-1">
                    <p className="text-xs font-bold text-slate-900">{top.topicTitle}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{top.explorationDetails}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Terms Results */}
            {searchResults.terms.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                    <BookMarked className="h-3.5 w-3.5" /> 입시 용어 사전 ({searchResults.terms.length})
                  </span>
                  <button onClick={() => handleNavigate('dictionary')} className="text-[11px] text-rose-600 font-bold hover:underline flex items-center gap-0.5">
                    전체보기 <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
                {searchResults.terms.map(term => (
                  <div key={term.id} onClick={() => handleNavigate('dictionary')} className="p-3 bg-slate-50 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors space-y-1">
                    <p className="text-xs font-bold text-slate-900">{term.termName}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{term.simpleDefinition}</p>
                  </div>
                ))}
              </div>
            )}

            {searchResults.templates.length === 0 && searchResults.topics.length === 0 && searchResults.terms.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500">
                "{query}"에 관한 검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
