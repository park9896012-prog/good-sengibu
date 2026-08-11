import React, { useState } from 'react';
import { X, Mail, ShieldCheck, FileText, Info, Send, CheckCircle2 } from 'lucide-react';

interface PolicyModalProps {
  type: 'about' | 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGrade, setFormGrade] = useState('고등학교 1학년');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!type) return null;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMessage) return;
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <ShieldCheck className="h-6 w-6 text-amber-500" />}
            {type === 'terms' && <FileText className="h-6 w-6 text-blue-500" />}
            {type === 'about' && <Info className="h-6 w-6 text-indigo-500" />}
            {type === 'contact' && <Mail className="h-6 w-6 text-emerald-500" />}
            <h2 className="text-xl font-bold text-slate-900">
              {type === 'privacy' && '개인정보처리방침 (Privacy Policy)'}
              {type === 'terms' && '서비스 이용약관 (Terms of Service)'}
              {type === 'about' && '생기부 365 서비스 소개'}
              {type === 'contact' && '1:1 문의하기 및 제휴 안내'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="text-xs text-slate-600 leading-relaxed space-y-4">
          {type === 'privacy' && (
            <div className="space-y-4">
              <p className="font-semibold text-slate-800">
                생기부 365(이하 '서비스')는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 개인정보처리방침은 서비스가 수집하는 개인정보와 활용 목적, 쿠키 사용 등에 대해 안내합니다.
              </p>

              <div className="space-y-2 border-l-2 border-amber-400 pl-3">
                <h4 className="font-bold text-slate-900 text-sm">1. 수집하는 개인정보 항목 및 방법</h4>
                <p>• 문의하기 이용 시: 성명, 이메일 주소, 학년 정보, 문의 내용</p>
                <p>• 서비스 이용 과정에서 자동으로 생성되는 정보: IP 주소, 쿠키, 방문 일시, 기기 및 브라우저 정보</p>
              </div>

              <div className="space-y-2 border-l-2 border-amber-400 pl-3">
                <h4 className="font-bold text-slate-900 text-sm">2. Google AdSense 및 제3자 쿠키(Cookie) 안내</h4>
                <p>• 본 서비스는 Google AdSense를 통해 타사 광고를 게재합니다.</p>
                <p>• Google 및 타사 광고 게시자는 이용자의 이전 웹사이트 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(DART 쿠키 등)를 사용할 수 있습니다.</p>
                <p>• 이용자는 Google 광고 설정(https://www.google.com/settings/ads)을 방문하여 맞춤형 광고 게재를 거부할 수 있습니다.</p>
              </div>

              <div className="space-y-2 border-l-2 border-amber-400 pl-3">
                <h4 className="font-bold text-slate-900 text-sm">3. 개인정보의 보유 및 파기</h4>
                <p>수집된 개인정보는 이용자의 문의 답변 및 처리 완료 후 최대 1년간 보관되며, 이후 지체 없이 파기됩니다.</p>
              </div>

              <div className="space-y-2 border-l-2 border-amber-400 pl-3">
                <h4 className="font-bold text-slate-900 text-sm">4. 개인정보 보호책임자 및 문의처</h4>
                <p>• 이메일: ju9896012@gmail.com</p>
                <p>• 문의 사항은 위 이메일로 연락주시면 신속하게 답변해 드리겠습니다.</p>
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">제 1 조 (목적)</h4>
              <p>본 약관은 생기부 365가 제공하는 생활기록부 전략 가이드, 세특 템플릿, 탐구주제 추천 등 제반 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.</p>

              <h4 className="font-bold text-slate-900 text-sm">제 2 조 (지식재산권의 귀속)</h4>
              <p>생기부 365가 작성한 모든 가이드라인, 템플릿, 데이터베이스의 저작권은 서비스 운영자에게 귀속되며, 상업적 무단 전재 및 재배포를 금합니다. 개인적 학습 및 입시 참고 용도로는 자유롭게 활용할 수 있습니다.</p>

              <h4 className="font-bold text-slate-900 text-sm">제 3 조 (서비스의 제공 및 변경)</h4>
              <p>본 서비스는 고교학점제 및 대입 정책 변경에 따라 컨텐츠를 정기적으로 업데이트하며, 사전 고지 후 일부 기능이 변경될 수 있습니다.</p>

              <h4 className="font-bold text-slate-900 text-sm">제 4 조 (책임의 한계)</h4>
              <p>본 서비스가 제공하는 예시 및 탐구 가이드는 학생 참고용 자료이며, 각 대학 입학사정관의 절대적인 합격 보증을 의미하지 않습니다.</p>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
                <h3 className="text-sm font-bold text-blue-900">생기부 365 (생활기록부 365) 미션</h3>
                <p className="mt-1 text-slate-700">
                  고교학점제 도입과 학생부종합전형의 변화 속에서, 고등학생들이 1학년부터 3학년까지 자신의 학업적 열정과 진로 역량을 차근차근 생기부에 담아낼 수 있도록 돕는 교육 가이드 플랫폼입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">🎯 학년별 맞춤 전략</h4>
                  <p className="text-slate-500 text-[11px]">1학년 탐색부터 3학년 스토리텔링 완결까지 학년별 관리 목표 제시</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">✍️ 실무 세특 템플릿</h4>
                  <p className="text-slate-500 text-[11px]">4단계 서술 구조로 입증된 계열별/과목별 작성 예시 제공</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">💡 AI/DB 탐구주제</h4>
                  <p className="text-slate-500 text-[11px]">지적 호기심과 교과 개념을 연계한 차별화된 연구 아이디어 추천</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <h4 className="font-bold text-slate-900">✅ 학기별 체크리스트</h4>
                  <p className="text-slate-500 text-[11px]">분기별 서류 제출 및 관찰 포인트 점검 인터랙티브 툴</p>
                </div>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 space-y-1">
                <p className="font-bold text-emerald-950 text-xs">대표 문의 이메일</p>
                <a href="mailto:ju9896012@gmail.com" className="text-sm font-bold text-emerald-700 hover:underline font-mono">
                  ju9896012@gmail.com
                </a>
                <p className="text-[11px] text-emerald-800 pt-1">
                  * 생기부 컨텐츠 제휴, 피드백, 학교 및 컨설팅 문의는 위 메일로 편하게 보내주세요.
                </p>
              </div>

              {formSubmitted ? (
                <div className="rounded-xl border border-emerald-300 bg-white p-6 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">문의가 성공적으로 접수되었습니다.</h4>
                  <p className="text-xs text-slate-500">
                    입력해주신 메일({formEmail})로 조속히 답변드리겠습니다. 감사합니다!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                  >
                    새 문의 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">이름 / 닉네임</label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">답변받을 이메일주소 *</label>
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">구분</label>
                    <select
                      value={formGrade}
                      onChange={(e) => setFormGrade(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:border-emerald-500 focus:outline-hidden"
                    >
                      <option value="고등학교 1학년">고등학교 1학년</option>
                      <option value="고등학교 2학년">고등학교 2학년</option>
                      <option value="고등학교 3학년">고등학교 3학년</option>
                      <option value="학부모">학부모</option>
                      <option value="교사 및 컨설턴트">교사 및 컨설턴트</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">문의 내용 *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="생기부 작성에 대한 피드백이나 문의 사항을 적어주세요."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-md hover:bg-emerald-700 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>문의 메일 전송하기</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
