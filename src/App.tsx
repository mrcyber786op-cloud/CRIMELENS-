import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { EvidenceWorkbench } from './components/EvidenceWorkbench';
import { ForensicAcademy } from './components/ForensicAcademy';
import { CaseTracker } from './components/CaseTracker';
import { IntakeModal } from './components/IntakeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'services' | 'lab' | 'academy' | 'tracker'>('services');
  const [academySubTab, setAcademySubTab] = useState<'webinars' | 'courses' | 'careers' | 'materials' | 'quiz'>('webinars');
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [selectedServiceForIntake, setSelectedServiceForIntake] = useState<string>('Digital Forensics & Evidence Extraction');

  const handleOpenIntakeWithService = (serviceTitle: string) => {
    setSelectedServiceForIntake(serviceTitle);
    setIsIntakeModalOpen(true);
  };

  const handleOpenIntakeGeneral = () => {
    setSelectedServiceForIntake('Digital Forensics & Evidence Extraction');
    setIsIntakeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIntake={handleOpenIntakeGeneral}
        academySubTab={academySubTab}
        setAcademySubTab={(sub) => {
          setActiveTab('academy');
          setAcademySubTab(sub);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section shown on the primary view, or quick summary on sub-views */}
        {activeTab === 'services' && (
          <>
            <Hero
              onExploreServices={() => {
                const el = document.getElementById('services-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenLab={() => setActiveTab('lab')}
              onOpenAcademy={() => setActiveTab('academy')}
              onOpenIntake={handleOpenIntakeGeneral}
            />

            <ServicesSection
              onSelectServiceForIntake={handleOpenIntakeWithService}
            />

            {/* Teaser to Interactive Forensic Tools & Academy */}
            <div className="bg-slate-900/60 border-t border-slate-800 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                      Interactive Tool
                    </span>
                    <h3 className="text-lg font-bold text-white font-serif">
                      Digital Evidence & Hash Integrity Verifier
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      Upload target evidence files to calculate SHA-256 and MD5 hashes in your browser, check magic byte signatures, and generate tamper-evident acquisition certificates.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setActiveTab('lab')}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      Launch Lab Workbench
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-blue-500/50 transition-all">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block mb-1">
                      Education Hub
                    </span>
                    <h3 className="text-lg font-bold text-white font-serif">
                      Forensic Academy: Webinars, Courses & Careers
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      Participate in live forensic webinars, enroll in 5-day forensic week bootcamps, explore forensic career roadmaps, or access free study materials and test your knowledge.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => setActiveTab('academy')}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                    >
                      Visit Forensic Academy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'lab' && (
          <EvidenceWorkbench />
        )}

        {activeTab === 'academy' && (
          <ForensicAcademy initialSubTab={academySubTab} />
        )}

        {activeTab === 'tracker' && (
          <CaseTracker />
        )}
      </main>

      {/* Confidential Evidence Intake Modal */}
      <IntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
        preselectedService={selectedServiceForIntake}
      />

      {/* Footer */}
      <Footer
        onNavClick={setActiveTab}
        onOpenIntake={handleOpenIntakeGeneral}
      />
    </div>
  );
}
