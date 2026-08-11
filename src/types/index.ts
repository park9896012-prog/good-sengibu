export type GradeNumber = 1 | 2 | 3;

export type MajorCategory = 
  | '의약학'
  | '공학'
  | '자연과학'
  | '인문/사회'
  | '경영/경제'
  | '사범/교육'
  | '예체능'
  | '자율/공통';

export type SubjectName = 
  | '국어'
  | '수학'
  | '영어'
  | '한국사'
  | '통합사회'
  | '통합과학'
  | '물리학'
  | '화학'
  | '생명과학'
  | '지구과학'
  | '정치와법'
  | '경제'
  | '사회문화'
  | '윤리와사상'
  | '정보/SW'
  | '기타/공통';

export type ActiveNav = 
  | 'home'
  | 'grade1'
  | 'grade2'
  | 'grade3'
  | 'templates'
  | 'topics'
  | 'checklist'
  | 'roadmap'
  | 'dictionary'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'contact';

export interface SetukTemplate {
  id: string;
  subject: SubjectName;
  majorCategory: MajorCategory;
  grade: GradeNumber;
  title: string;
  activityType: '수업발표' | '탐구보고서' | '토론활동' | '실험/실습' | '독서연계';
  description: string;
  exampleText: string;
  keyCompetencies: string[];
  keywords: string[];
}

export interface TopicIdea {
  id: string;
  subject: SubjectName;
  majorCategory: MajorCategory;
  targetGrade: GradeNumber;
  topicTitle: string;
  motivation: string;
  explorationDetails: string;
  deepeningTip: string;
  linkedCompetency: '학업역량' | '진로역량' | '공동체의식';
  recommendedBooks?: string[];
}

export interface ChecklistItem {
  id: string;
  targetGrade: GradeNumber;
  term: '1학기 1차(봄)' | '1학기 2차(여름)' | '2학기 1차(가을)' | '2학기 2차(겨울)';
  category: '교과(세특)' | '창체(자율/동아리/진로)' | '행특' | '학업관리';
  taskTitle: string;
  explanation: string;
  isEssential: boolean;
}

export interface AdmissionsTerm {
  id: string;
  termName: string;
  category: '평가역량' | '고교학점제' | '생기부구조' | '대입전형';
  simpleDefinition: string;
  deepExplanation: string;
  evaluatorTip: string;
  relatedKeywords: string[];
}

export interface RoadmapItem {
  id: string;
  grade: GradeNumber;
  semester: '1학기' | '2학기';
  area: '세특탐구' | '동아리' | '진로/창체' | '행특/태도';
  title: string;
  description: string;
  status: 'planned' | 'in_progress' | 'completed';
  dateAdded: string;
}

export interface GradeGuideStrategy {
  grade: GradeNumber;
  title: string;
  subtitle: string;
  coreGoal: string;
  keyStrategy: string;
  evaluationFocus: string[];
  sections: {
    title: string;
    description: string;
    items: {
      area: string;
      actionPlan: string;
      checklistPoint: string;
      example: string;
    }[];
  }[];
}
