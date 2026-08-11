import React, { useState, useMemo } from 'react';
import { admissionsDictionaryData } from '../data/guideData';
import { BookMarked, Search, HelpCircle, Tag, Lightbulb } from 'lucide-react';

export const DictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const filteredTerms = useMemo(() => {
    return admissionsDictionaryData.filter(term => {
      const matchCat = selectedCategory === '전체' || term.category === selectedCategory;
      const matchQuery = 
        term.termName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.simpleDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.deepExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.relatedKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ['전체', '평가역량', '생기부구조', '고교학점제'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-900 via-rose-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl space-y-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-400/30">
          <BookMarked className="h-3.5 w-3.5 text-rose-400" />
          입학사정관 평가용어 표준 해설
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          학생부종합전형 핵심 입시 용어 사전
        </h1>
        <p className="text-xs sm:text-sm text-rose-100 leading-relaxed max-w-2xl">
          학업역량, 진로역량, 공동체의식 등 2024+ 개정 대입 평가 요소의 명확한 정의와 대학 입학사정관의 세특/행특 서류 평가 노하우를 확인하세요.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="입시 용어, 키워드 검색 (예: 학업역량, 세특, 진로역량, 192학점, 권장과목)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500">카테고리:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((term) => (
          <div key={term.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 hover:border-rose-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800">
                  {term.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{term.termName}</h3>

              <div className="rounded-xl bg-slate-50 p-3.5 text-xs font-semibold text-slate-800 border border-slate-200/80">
                📌 한 줄 요약: {term.simpleDefinition}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {term.deepExplanation}
              </p>

              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-950 font-medium space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-600" /> 사관관 서류 평가 팁
                </p>
                <p className="leading-relaxed">{term.evaluatorTip}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              <Tag className="h-3 w-3" />
              {term.relatedKeywords.map((kw, i) => (
                <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
