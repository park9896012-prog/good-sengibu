import React, { useState, useEffect } from 'react';
import { RoadmapItem, GradeNumber } from '../types';
import { 
  Compass, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Calendar, 
  Sparkles, 
  Clock,
  Layers
} from 'lucide-react';

export const RoadmapPlannerView: React.FC = () => {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber | '전체'>('전체');

  // Form State for new roadmap entry
  const [showAddForm, setShowAddForm] = useState(false);
  const [formGrade, setFormGrade] = useState<GradeNumber>(1);
  const [formSemester, setFormSemester] = useState<'1학기' | '2학기'>('1학기');
  const [formArea, setFormArea] = useState<'세특탐구' | '동아리' | '진로/창체' | '행특/태도'>('세특탐구');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Initial default presets if empty
  const defaultPresets: RoadmapItem[] = [
    {
      id: 'rm-1',
      grade: 1,
      semester: '1학기',
      area: '세특탐구',
      title: '통합과학-지질 이중층과 약물 전달 시스템 기초 조사',
      description: '약물 방출 속도를 제어하는 나노 입자 구조를 물리화학적 관점에서 탐구함.',
      status: 'completed',
      dateAdded: '2025-04-10'
    },
    {
      id: 'rm-2',
      grade: 1,
      semester: '2학기',
      area: '동아리',
      title: '과학실험동아리-친환경 생분해 소재 PLA 실험',
      description: '옥수수 전분 소재 플라스틱 분해 촉매 속도 적정 실험 수행.',
      status: 'completed',
      dateAdded: '2025-10-15'
    },
    {
      id: 'rm-3',
      grade: 2,
      semester: '1학기',
      area: '세특탐구',
      title: '수학II-자동차 서스펜션 감쇄 진동 미분방정식 모델링',
      description: '충격 흡수 매개변수를 구하고 가상 시뮬레이션 프로그램 구동.',
      status: 'in_progress',
      dateAdded: '2026-05-02'
    },
    {
      id: 'rm-4',
      grade: 2,
      semester: '2학기',
      area: '진로/창체',
      title: '인공지능 헬스케어 학술 논문 분석 및 카드뉴스 제작',
      description: '의학 지식과 AI 기술의 결합 지점을 정리하여 학급에 공유.',
      status: 'planned',
      dateAdded: '2026-08-01'
    }
  ];

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sangibu365_roadmap_items');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        setItems(defaultPresets);
      }
    } catch (e) {
      console.error(e);
      setItems(defaultPresets);
    }
  }, []);

  // Save to localStorage
  const saveItems = (newItems: RoadmapItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('sangibu365_roadmap_items', JSON.stringify(newItems));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newItem: RoadmapItem = {
      id: `rm-${Date.now()}`,
      grade: formGrade,
      semester: formSemester,
      area: formArea,
      title: formTitle,
      description: formDescription,
      status: 'planned',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    saveItems([newItem, ...items]);
    setFormTitle('');
    setFormDescription('');
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: string) => {
    saveItems(items.filter(i => i.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    const statusMap: Record<string, RoadmapItem['status']> = {
      planned: 'in_progress',
      in_progress: 'completed',
      completed: 'planned'
    };

    saveItems(
      items.map(i => i.id === id ? { ...i, status: statusMap[i.status] } : i)
    );
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `생기부365_3개년_로드맵_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            saveItems(parsed);
            alert('로드맵 데이터를 성공적으로 복원했습니다!');
          }
        } catch (err) {
          alert('올바른 JSON 파일 형식이 아닙니다.');
        }
      };
    }
  };

  const filteredItems = selectedGrade === '전체' 
    ? items 
    : items.filter(i => i.grade === selectedGrade);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30">
            <Compass className="h-3.5 w-3.5 text-indigo-300" />
            3개년 포트폴리오 스케치노트
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            3개년 생기부 스토리텔링 로드맵
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            1학년(탐색) → 2학년(심화) → 3학년(융합/결실)로 유기적으로 이어지는 자신만의 탐구 포트폴리오 스케치노트를 작성하고 백업해 두세요.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>새 탐구활동 추가</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            title="백업 다운로드"
          >
            <Download className="h-3.5 w-3.5" /> 백업
          </button>
          <label className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700">
            <Upload className="h-3.5 w-3.5" /> 복원
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>

      {/* Add New Form Modal / Inline */}
      {showAddForm && (
        <form onSubmit={handleAddItem} className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-600" /> 새 탐구활동/프로젝트 등록
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">학년</label>
              <select
                value={formGrade}
                onChange={(e) => setFormGrade(Number(e.target.value) as GradeNumber)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              >
                <option value={1}>1학년</option>
                <option value={2}>2학년</option>
                <option value={3}>3학년</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">학기</label>
              <select
                value={formSemester}
                onChange={(e) => setFormSemester(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              >
                <option value="1학기">1학기</option>
                <option value="2학기">2학기</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">활동 영역</label>
              <select
                value={formArea}
                onChange={(e) => setFormArea(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold bg-white"
              >
                <option value="세특탐구">교과 세특 탐구</option>
                <option value="동아리">동아리 프로젝트</option>
                <option value="진로/창체">진로/창체 활동</option>
                <option value="행특/태도">행특/기타 역량</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">탐구 주제명 / 프로젝트 제목</label>
            <input
              type="text"
              required
              placeholder="예: 미적분을 적용한 혈류 속도 수식 모델링"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-medium bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">세부 탐구 요약 및 핵심 아이디어</label>
            <textarea
              rows={2}
              placeholder="탐구 계기, 주요 적용 개념, 배운 점 등을 간략히 기술하세요."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-medium bg-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 cursor-pointer"
            >
              저장하기
            </button>
          </div>
        </form>
      )}

      {/* Grade Filter Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> 학년 보기:
          </span>
          {['전체', 1, 2, 3].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedGrade === g
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {g === '전체' ? '3개년 전체' : `${g}학년`}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-slate-500">
          총 {filteredItems.length}개 탐구 로드맵 카드
        </span>
      </div>

      {/* Roadmap Items List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            등록된 탐구 로드맵 카드가 없습니다. 상단의 '새 탐구활동 추가' 버튼을 눌러보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800">
                      {item.grade}학년 {item.semester}
                    </span>
                    <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-800">
                      {item.area}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                        item.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      title="클릭하여 상태 변경"
                    >
                      ● {item.status === 'completed' ? '완료' : item.status === 'in_progress' ? '진행중' : '계획중'}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400 self-end sm:self-center">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="h-3 w-3" /> {item.dateAdded}
                  </span>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
