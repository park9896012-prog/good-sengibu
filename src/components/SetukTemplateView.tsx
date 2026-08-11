import React, { useState, useMemo } from 'react';
import { setukTemplatesData } from '../data/guideData';
import { MajorCategory, SubjectName, GradeNumber } from '../types';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Tag, 
  Wand2, 
  Layers, 
  X, 
  Bot,
  FileText
} from 'lucide-react';

export const SetukTemplateView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<string>('전체');
  const [selectedSubject, setSelectedSubject] = useState<string>('전체');
  const [selectedGrade, setSelectedGrade] = useState<number | '전체'>('전체');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI Drafter Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiSubject, setAiSubject] = useState<SubjectName>('수학');
  const [aiGrade, setAiGrade] = useState<GradeNumber>(2);
  const [aiActivity, setAiActivity] = useState('');
  const [aiCompetency, setAiCompetency] = useState('학업역량 및 진로역량');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return setukTemplatesData.filter((item) => {
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exampleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchMajor = selectedMajor === '전체' || item.majorCategory === selectedMajor;
      const matchSubject = selectedSubject === '전체' || item.subject === selectedSubject;
      const matchGrade = selectedGrade === '전체' || item.grade === selectedGrade;

      return matchSearch && matchMajor && matchSubject && matchGrade;
    });
  }, [searchQuery, selectedMajor, selectedSubject, selectedGrade]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunAiDrafter = async () => {
    if (!aiActivity.trim()) return;
    setAiLoading(true);
    setAiResult('');

    try {
      const response = await fetch('/api/ai/setuk-drafter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: aiSubject,
          grade: aiGrade,
          activityDetails: aiActivity,
          competencyTarget: aiCompetency,
        }),
      });

      const data = await response.json();
      if (data.success && data.draftText) {
        setAiResult(data.draftText);
      } else {
        setAiResult('작성 결과를 생성하지 못했습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error(err);
      setAiResult('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setAiLoading(false);
    }
  };

  const majorsList: (MajorCategory | '전체')[] = [
    '전체',
    '의약학',
    '공학',
    '자연과학',
    '인문/사회',
    '경영/경제',
    '사범/교육',
    '예체능'
  ];

  const subjectsList: (SubjectName | '전체')[] = [
    '전체',
    '국어',
    '수학',
    '영어',
    '통합사회',
    '통합과학',
    '물리학',
    '화학',
    '생명과학',
    '정치와법',
    '경제',
    '사회문화',
    '정보/SW'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
            <BookOpen className="h-3.5 w-3.5 text-blue-400" />
            과목별/계열별 모범 데이터베이스
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            세특(세부능력 및 특기사항) 실무 작성 템플릿
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            대학 입학사정관이 높게 평가하는 '주제발굴 → 과정 및 적용 → 결과 및 성장' 4단계 구조로 작성된 과목별 모범 세특 문장을 탐색하고 활용해 보세요.
          </p>
        </div>

        <button
          onClick={() => setAiModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer self-start md:self-auto shrink-0"
        >
          <Wand2 className="h-4 w-4" />
          <span>AI 세특 초안 도우미 실행</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="키워드, 과목, 주제명, 핵심역량 검색 (예: 나노입자, 미분방정식, 넛지, 학업역량)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          {/* Major Category Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Layers className="h-3 w-3" /> 희망 계열 선택:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {majorsList.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMajor(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedMajor === m
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Pills */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> 과목 선택:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {subjectsList.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    selectedSubject === s
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grade Pills */}
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="font-bold text-slate-500">학년:</span>
            {[ '전체', 1, 2, 3 ].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g as any)}
                className={`px-3 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g === '전체' ? '전학년' : `${g}학년`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Template Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-600">
            총 <span className="text-blue-600 font-extrabold">{filteredTemplates.length}</span>개의 모범 세특 템플릿이 검색되었습니다.
          </p>
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 space-y-3">
            <p className="text-sm font-semibold">조건에 해당하는 세특 템플릿이 없습니다.</p>
            <p className="text-xs text-slate-400">다른 검색어나 필터를 선택하시거나 AI 세특 초안 도우미를 이용해 보세요.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedMajor('전체'); setSelectedSubject('전체'); setSelectedGrade('전체'); }}
              className="mt-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 hover:border-blue-300 transition-all">
                {/* Top Metadata Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                      {template.grade}학년 | {template.subject}
                    </span>
                    <span className="rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-bold text-indigo-800">
                      계열: {template.majorCategory}
                    </span>
                    <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                      유형: {template.activityType}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                    {template.keyCompetencies.map((comp, cIdx) => (
                      <span key={cIdx} className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                        #{comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{template.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                </div>

                {/* Example Text Box */}
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100 text-xs leading-relaxed font-mono relative space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <FileText className="h-3.5 w-3.5" /> 세특 서술형 문구 예시
                    </span>
                    <button
                      onClick={() => handleCopy(template.exampleText, template.id)}
                      className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs font-sans text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>문구 복사</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-200 leading-normal">"{template.exampleText}"</p>
                </div>

                {/* Keywords Tag Bar */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <Tag className="h-3.5 w-3.5 text-slate-400" />
                  {template.keywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      onClick={() => setSearchQuery(kw)}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Drafter Modal */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold">
                  <Wand2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AI 세특 초안 작성 도우미</h3>
                  <p className="text-xs text-slate-500">활동 내용을 간단히 적어주시면 입시용 서술형 세특 문단을 다듬어 드립니다.</p>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">대상 과목</label>
                <select
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value as SubjectName)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs font-medium focus:border-blue-500 focus:outline-hidden"
                >
                  {subjectsList.filter(s => s !== '전체').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">학년</label>
                <select
                  value={aiGrade}
                  onChange={(e) => setAiGrade(Number(e.target.value) as GradeNumber)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs font-medium focus:border-blue-500 focus:outline-hidden"
                >
                  <option value={1}>1학년</option>
                  <option value={2}>2학년</option>
                  <option value={3}>3학년</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">강조할 핵심 역량</label>
              <input
                type="text"
                value={aiCompetency}
                onChange={(e) => setAiCompetency(e.target.value)}
                placeholder="예: 학업역량, 진로적합성, 탐구력, 문제해결력"
                className="w-full rounded-xl border border-slate-300 p-2 text-xs font-medium focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">수업 시간 활동 요약 (키워드/상세 내용)</label>
              <textarea
                rows={4}
                value={aiActivity}
                onChange={(e) => setAiActivity(e.target.value)}
                placeholder="예: 미분 개념을 배운 후 자동차 충격 흡수 서스펜션의 진동 감쇄 방정식을 직접 계산해보고 시뮬레이션 보고서를 제출함."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs font-medium focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <button
              onClick={handleRunAiDrafter}
              disabled={aiLoading || !aiActivity.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 cursor-pointer"
            >
              {aiLoading ? (
                <>
                  <Bot className="h-4 w-4 animate-spin" />
                  <span>AI 입시 분석기 생성 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>세특 초안 생성하기</span>
                </>
              )}
            </button>

            {aiResult && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" /> 생성된 세특 초안 문단
                  </span>
                  <button
                    onClick={() => handleCopy(aiResult, 'ai-modal')}
                    className="flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    <Copy className="h-3 w-3" /> 복사하기
                  </button>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-mono bg-white p-3 rounded-lg border border-amber-200">
                  {aiResult}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
