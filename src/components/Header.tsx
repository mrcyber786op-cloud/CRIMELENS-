import React, { useState } from 'react';
import {
  Shield,
  Search,
  BookOpen,
  FileCheck,
  PhoneCall,
  Activity,
  Menu,
  X,
  Lock,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'services' | 'lab' | 'academy' | 'tracker';
  setActiveTab: (tab: 'services' | 'lab' | 'academy' | 'tracker') => void;
  onOpenIntake: () => void;
  academySubTab?: 'webinars' | 'courses' | 'careers' | 'materials' | 'quiz';
  setAcademySubTab?: (tab: 'webinars' | 'courses' | 'careers' | 'materials' | 'quiz') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenIntake,
  setAcademySubTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academyDropdownOpen, setAcademyDropdownOpen] = useState(false);

  const handleNavClick = (tab: 'services' | 'lab' | 'academy' | 'tracker') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setAcademyDropdownOpen(false);
  };

  const handleAcademySubClick = (sub: 'webinars' | 'courses' | 'careers' | 'materials' | 'quiz') => {
    setActiveTab('academy');
    if (setAcademySubTab) {
      setAcademySubTab(sub);
    }
    setAcademyDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top emergency & standards ribbon */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs text-slate-400 bg-slate-900/60 border-b border-slate-800/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ISO/IEC 27037 & NIST Aligned Evidence Laboratory
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">Chain of Custody Guaranteed • Court-Admissible Findings</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-cyan-400" />
            Air-Gapped Forensic Storage
          </span>
          <span className="text-slate-600">|</span>
          <a href="#emergency-contact" className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-cyan-400">
            <PhoneCall className="w-3 h-3" />
            Emergency Incident Hotline: +1 (800) 592-LENS
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div
            id="nav-brand-logo"
            onClick={() => handleNavClick('services')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-800 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center relative overflow-hidden">
                {/* Forensic reticle / crosshair graphic */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <div className="w-8 h-8 rounded-full border border-cyan-400 border-dashed"></div>
                  <div className="absolute w-full h-[1px] bg-cyan-400"></div>
                  <div className="absolute h-full w-[1px] bg-cyan-400"></div>
                </div>
                <Shield className="w-5 h-5 text-cyan-400 relative z-10 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-wider text-slate-100 font-serif">
                  CRIME<span className="text-cyan-400">LENS</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  Forensic Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-tight hidden sm:block">
                Forensic Investigation & Digital Evidence Services
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              id="nav-services-btn"
              onClick={() => handleNavClick('services')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'services'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Investigation Services
            </button>

            <button
              id="nav-lab-btn"
              onClick={() => handleNavClick('lab')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'lab'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Activity className="w-4 h-4 text-cyan-400" />
              Digital Lab & Tools
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                Interactive
              </span>
            </button>

            {/* Academy dropdown */}
            <div className="relative">
              <button
                id="nav-academy-btn"
                onClick={() => setAcademyDropdownOpen(!academyDropdownOpen)}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                  activeTab === 'academy'
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                Forensic Academy
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${academyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {academyDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-lg bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1">
                    Learning Departments
                  </div>
                  <button
                    onClick={() => handleAcademySubClick('webinars')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>Forensic Webinars</span>
                    <span className="text-[10px] font-mono text-emerald-400">Live</span>
                  </button>
                  <button
                    onClick={() => handleAcademySubClick('courses')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>Forensic Week Courses</span>
                    <span className="text-[10px] font-mono text-cyan-400">Bootcamps</span>
                  </button>
                  <button
                    onClick={() => handleAcademySubClick('careers')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-md transition-colors"
                  >
                    Career in Forensic Science
                  </button>
                  <button
                    onClick={() => handleAcademySubClick('materials')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-md transition-colors"
                  >
                    Study Material & Protocols
                  </button>
                  <button
                    onClick={() => handleAcademySubClick('quiz')}
                    className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-cyan-400 rounded-md transition-colors flex items-center justify-between"
                  >
                    <span>Forensic Knowledge Quiz</span>
                    <span className="text-[10px] font-mono text-amber-400">Test Skills</span>
                  </button>
                </div>
              )}
            </div>

            <button
              id="nav-tracker-btn"
              onClick={() => handleNavClick('tracker')}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Case Tracker
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-intake-btn"
              onClick={onOpenIntake}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-900/40 hover:shadow-cyan-700/50 transition-all cursor-pointer border border-cyan-400/30 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-200" />
              Confidential Evidence Intake
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenIntake}
              className="px-2.5 py-1.5 text-xs font-semibold rounded bg-cyan-600 text-white"
            >
              Intake
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick('services')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'services' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Investigation Services
          </button>
          <button
            onClick={() => handleNavClick('lab')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'lab' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Digital Lab & Forensic Tools
          </button>
          <div className="pl-3 py-1 border-l-2 border-slate-800 space-y-1">
            <div className="text-[11px] font-mono text-slate-500 uppercase px-2">Forensic Academy:</div>
            <button
              onClick={() => handleAcademySubClick('webinars')}
              className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400"
            >
              • Forensic Webinars
            </button>
            <button
              onClick={() => handleAcademySubClick('courses')}
              className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400"
            >
              • Forensic Week Courses (Bootcamps)
            </button>
            <button
              onClick={() => handleAcademySubClick('careers')}
              className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400"
            >
              • Career in Forensic Science
            </button>
            <button
              onClick={() => handleAcademySubClick('materials')}
              className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400"
            >
              • Study Material & SOPs
            </button>
            <button
              onClick={() => handleAcademySubClick('quiz')}
              className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-cyan-400"
            >
              • Forensic Knowledge Quiz
            </button>
          </div>
          <button
            onClick={() => handleNavClick('tracker')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'tracker' ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Case Status Tracker
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntake();
              }}
              className="w-full py-2.5 px-4 text-center font-semibold text-xs uppercase tracking-wider rounded bg-cyan-600 text-white"
            >
              Submit Confidential Case Intake
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
