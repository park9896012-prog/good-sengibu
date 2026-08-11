import React, { useState, useMemo } from 'react';
import { topicIdeasData } from '../data/guideData';
import { MajorCategory, SubjectName, GradeNumber, TopicIdea } from '../types';
import { 
  Lightbulb, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Bot, 
  Bookmark, 
  Compass, 
  Tag,
  Search,
  Printer
} from 'lucide-react';

export const TopicGeneratorView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | '전체'>('전체');
  const [selectedMajor, setSelectedMajor] = useState<string>('전체');
  const [selectedSubject, setSelectedSubject] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic AI Topic State
  const [customKeyword, setCustomKeyword] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopics, setAiTopics] = useState<TopicIdea[]>([]);

  // Filter local DB topics
  const filteredLocalTopics = useMemo(() => {
    return topicIdeasData.filter((t) => {
      const matchGrade = selectedGrade === '전체' || t.targetGrade === selectedGrade;
      const matchMajor = selectedMajor === '전체' || t.majorCategory === selectedMajor;
      const matchSubject = selectedSubject === '전체' || t.subject === selectedSubject;
      const matchQuery = 
        t.topicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.motivation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.explorationDetails.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGrade && matchMajor && matchSubject && matchQuery;
    });
  }, [selectedGrade, selectedMajor, selectedSubject, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateAiTopics = async () => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai/topic-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade === '전체' ? '고등학교 전학년' : `${selectedGrade}학년`,
          major: selectedMajor === '전체' ? '자율 선택' : selectedMajor,
          subject: selectedSubject === '전체' ? '교과 공통' : selectedSubject,
          keywords: customKeyword || searchQuery || '최신 입시 트렌드 및 기술',
        }),
      });

      const data = await response.json();
      if (data.success && data.topics && Array.isArray(data.topics)) {
        const mapped: TopicIdea[] = data.topics.map((item: any, idx: number) => ({
          id: `ai-tp-${Date.now()}-${idx}`,
          subject: (selectedSubject === '전체' ? '통합과목' : selectedSubject) as SubjectName,
          majorCategory: (selectedMajor === '전체' ? '자율/공통' : selectedMajor) as MajorCategory,
          targetGrade: (selectedGrade === '전체' ? 2 : selectedGrade) as GradeNumber,
          topicTitle: item.topicTitle || '맞춤형 탐구 주제',
          motivation: item.motivation || '학문적 흥미 및 진로 탐색',
          explorationDetails: item.explorationDetails || '구체적 탐구 방법 및 자료',
          deepeningTip: item.deepeningTip || '교과 개념 심화 적용',
          linkedCompetency: (item.linkedCompetency || '진로역량') as any,
        }));
        setAiTopics(mapped);
      }
    } catch (err) {
      console.error(err);
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
    '사회문화'
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-indigo-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200 border border-amber-300/30">
            <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
            진로 연계 탐구주제 생성기
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            희망 전공 & 과목 연계 탐구주제 설계기
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            단순 조사를 넘어 지적 호기심과 교과 개념의 깊이가 드러나는 맞춤형 탐구 주제와 연구 가이드를 탐색해 보세요.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white border border-white/20 hover:bg-white/20 transition-all cursor-pointer self-start md:self-auto shrink-0 no-print"
        >
          <Printer className="h-4 w-4" />
          <span>추천서 프린트 / PDF 저장</span>
        </button>
      </div>

      {/* Filter & Custom AI Topic Generator Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Compass className="h-4 w-4 text-blue-600" /> 맞춤형 조건 선택 및 검색
        </h3>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">학년 선택</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value === '전체' ? '전체' : Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-500 focus:bg-white focus:outline-hidden"
            >
              <option value="전체">전학년 공통</option>
              <option value={1}>1학년 (기초/탐색)</option>
              <option value={2}>2학년 (심화/선택과목)</option>
              <option value={3}>3학년 (융합/결실)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">희망 계열/전공</label>
            <select
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-500 focus:bg-white focus:outline-hidden"
            >
              {majorsList.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">연계 과목</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold focus:border-amber-500 focus:bg-white focus:outline-hidden"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Prompt Input Bar */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="관심 키워드 또는 서적/이슈 입력 (예: AI 윤리, 자율주행, ESG, 마이크로바이옴)"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleGenerateAiTopics}
            disabled={aiLoading}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {aiLoading ? (
              <>
                <Bot className="h-4 w-4 animate-spin" />
                <span>AI 실시간 추천 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>AI 맞춤 주제 추천받기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Generated Topics Display */}
      {aiTopics.length > 0 && (
        <div className="space-y-4 rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-6">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <h3 className="text-base font-extrabold text-amber-950">AI 실시간 생성 맞춤형 탐구주제</h3>
            </div>
            <button
              onClick={() => setAiTopics([])}
              className="text-xs text-amber-800 hover:underline font-semibold cursor-pointer"
            >
              초기화
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {aiTopics.map((topic) => (
              <div key={topic.id} className="rounded-xl border border-amber-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                    AI 추천 | {topic.linkedCompetency}
                  </span>
                  <button
                    onClick={() => handleCopy(`${topic.topicTitle}\n\n[탐구동기]\n${topic.motivation}\n\n[탐구내용]\n${topic.explorationDetails}`, topic.id)}
                    className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                  >
                    {copiedId === topic.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedId === topic.id ? '복사완료' : '전체 복사'}</span>
                  </button>
                </div>

                <h4 className="text-lg font-bold text-slate-900">{topic.topicTitle}</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <p className="font-bold text-slate-700">탐구 동기 및 배경</p>
                    <p className="text-slate-600 leading-relaxed">{topic.motivation}</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <p className="font-bold text-slate-700">구체적 탐구 내용 및 서적 연계</p>
                    <p className="text-slate-600 leading-relaxed">{topic.explorationDetails}</p>
                  </div>
                </div>

                <div className="bg-amber-100/60 p-3 rounded-xl text-xs text-amber-950 font-medium">
                  💡 심화 팁: {topic.deepeningTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Curated Topics Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 text-blue-600" />
          입시 검증 블루프린트 DB ({filteredLocalTopics.length}개 추천 중)
        </h3>

        {filteredLocalTopics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500 space-y-2">
            <p className="text-sm font-semibold">선택한 조건에 해당하는 탐구 주제가 없습니다.</p>
            <p className="text-xs text-slate-400">위의 'AI 맞춤 주제 추천받기' 버튼을 클릭하여 새로 생성해 보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredLocalTopics.map((topic) => (
              <div key={topic.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 hover:border-amber-300 transition-all print-card">
                {/* Topic Card Top */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                      {topic.targetGrade}학년 | {topic.subject}
                    </span>
                    <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800">
                      계열: {topic.majorCategory}
                    </span>
                    <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                      {topic.linkedCompetency}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(`${topic.topicTitle}\n\n[탐구동기]\n${topic.motivation}\n\n[탐구내용]\n${topic.explorationDetails}`, topic.id)}
                    className="flex items-center gap-1 rounded bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedId === topic.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600">복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>내용 복사</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Topic Title */}
                <h3 className="text-lg font-bold text-slate-900">{topic.topicTitle}</h3>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      <Bookmark className="h-3.5 w-3.5 text-blue-600" /> 탐구 동기 및 배경
                    </p>
                    <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-blue-400">
                      {topic.motivation}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      <Compass className="h-3.5 w-3.5 text-amber-600" /> 구체적 탐구 방법 및 연구내용
                    </p>
                    <p className="text-slate-600 leading-relaxed pl-4 border-l-2 border-amber-400">
                      {topic.explorationDetails}
                    </p>
                  </div>
                </div>

                {/* Deepening Tip */}
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3.5 text-xs text-indigo-950 font-medium leading-relaxed">
                  <span className="font-bold text-indigo-800">💡 교과 연계 심화 확장 팁: </span>
                  {topic.deepeningTip}
                </div>

                {/* Recommended Books if present */}
                {topic.recommendedBooks && topic.recommendedBooks.length > 0 && (
                  <div className="flex items-center gap-2 text-xs pt-1">
                    <Tag className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-bold text-slate-600">연계 추천 도서:</span>
                    {topic.recommendedBooks.map((b, bIdx) => (
                      <span key={bIdx} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 font-mono">
                        📖 {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
