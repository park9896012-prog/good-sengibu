/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveNav, GradeNumber } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { GradeGuideView } from './components/GradeGuideView';
import { SetukTemplateView } from './components/SetukTemplateView';
import { TopicGeneratorView } from './components/TopicGeneratorView';
import { ChecklistView } from './components/ChecklistView';
import { RoadmapPlannerView } from './components/RoadmapPlannerView';
import { DictionaryView } from './components/DictionaryView';
import { PolicyModal } from './components/PolicyModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activeNav, setActiveNav] = useState<ActiveNav>('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeNumber>(1);
  const [policyModalType, setPolicyModalType] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeNav, selectedGrade]);

  const renderActiveView = () => {
    switch (activeNav) {
      case 'home':
        return <HomeView setActiveNav={setActiveNav} setSelectedGrade={setSelectedGrade} />;
      case 'grade1':
        return <GradeGuideView grade={1} setSelectedGrade={setSelectedGrade} setActiveNav={setActiveNav} />;
      case 'grade2':
        return <GradeGuideView grade={2} setSelectedGrade={setSelectedGrade} setActiveNav={setActiveNav} />;
      case 'grade3':
        return <GradeGuideView grade={3} setSelectedGrade={setSelectedGrade} setActiveNav={setActiveNav} />;
      case 'templates':
        return <SetukTemplateView />;
      case 'topics':
        return <TopicGeneratorView />;
      case 'checklist':
        return <ChecklistView />;
      case 'roadmap':
        return <RoadmapPlannerView />;
      case 'dictionary':
        return <DictionaryView />;
      default:
        return <HomeView setActiveNav={setActiveNav} setSelectedGrade={setSelectedGrade} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenPolicyModal={(type) => setPolicyModalType(type)}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-12">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <Footer
        setActiveNav={setActiveNav}
        onOpenPolicyModal={(type) => setPolicyModalType(type)}
      />

      {/* Policy and Legal Modals */}
      <PolicyModal
        type={policyModalType}
        onClose={() => setPolicyModalType(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        setActiveNav={setActiveNav}
      />
    </div>
  );
}
