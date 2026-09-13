import React from 'react';
import {
  Shield,
  FileCheck,
  Cpu,
  BookOpen,
  Lock,
  CheckCircle2,
  ArrowRight,
  Fingerprint,
  Scale,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onOpenLab: () => void;
  onOpenAcademy: () => void;
  onOpenIntake: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onOpenLab,
  onOpenAcademy,
  onOpenIntake
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
      {/* Subtle forensic grid lines in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-700/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Pillars Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="tracking-wide">CRIMELENS EVIDENCE LABS</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-semibold tracking-wider uppercase text-slate-300">
            <span className="text-cyan-400">Confidential</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400">Professional</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Evidence-Based</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400">Reliable</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-tight">
            CRIMELENS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 text-2xl sm:text-4xl lg:text-5xl mt-2 font-sans font-bold">
              Forensic Investigation & Digital Evidence Services
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We provide professional forensic investigation and full-spectrum learning departments and evidence analysis services designed to help individuals, businesses, and legal professionals uncover facts and understand complex cases. Our services focus on the <strong className="text-cyan-300 font-semibold">identification, preservation, examination, and documentation</strong> of evidence using systematic and reliable forensic methodologies.
          </p>

          <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto italic">
            "Committed to accuracy, confidentiality, integrity, and professional standards in every investigation. Whether you need assistance with digital evidence, document examination, fraud-related investigations, or forensic analysis, our goal is to provide clear, objective, and well-documented findings that can support informed decisions and legal proceedings."
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-intake-cta"
              onClick={onOpenIntake}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-900/40 hover:shadow-cyan-600/30 transition-all border border-cyan-400/40 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-cyan-200" />
              <span>Submit Case for Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-lab-cta"
              onClick={onOpenLab}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Launch Digital Evidence Lab Tools</span>
            </button>

            <button
              id="hero-academy-cta"
              onClick={onOpenAcademy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-200 font-semibold text-sm border border-blue-800/60 hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Forensic Academy & Webinars</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Highlight Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Confidential</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Air-gapped evidence lockers, strict attorney-client privilege workflows, and cryptographic non-disclosure protocols.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/50">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Professional</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Court-tested forensic examiners holding CCE, EnCE, CFE, and D-ABFDE certifications with trial testimony credentials.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <FileCheck className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Evidence-Based</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Systematic adherence to ISO/IEC 27037, NIST SP 800-86, and ASTM E2290 scientific verification methodologies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/50">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-white">Reliable</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dual-hash mathematical verification and unbroken chain of custody records withstanding intense cross-examination.
            </p>
          </div>
        </div>

        {/* Methodology Standards Banner */}
        <div className="mt-8 py-3 px-4 rounded-lg bg-slate-900/50 border border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase tracking-widest text-[10px]">Verified Standards:</span>
            <span className="text-slate-300 font-medium">ISO/IEC 27037:2012</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">NIST SP 800-86</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">ASTM E2290</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">FRE 702 (Daubert Standard)</span>
          </div>
          <div className="flex items-center gap-3 text-cyan-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Court-Admissible Evidence Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
