import React from 'react';
import {
  Shield,
  Lock,
  Scale,
  FileCheck,
  CheckCircle,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'services' | 'lab' | 'academy' | 'tracker') => void;
  onOpenIntake: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenIntake }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* 4 Pillars Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Our Non-Negotiable Forensic Commitments
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Confidential • Professional • Evidence-Based • Reliable
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-cyan-300 block mb-1">Confidential</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Strict attorney-client privilege handling, air-gapped forensic storage vaults, and cryptographic non-disclosure guarantees.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-blue-300 block mb-1">Professional</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Court-qualified examiners holding CCE, EnCE, CFE, and D-ABFDE certifications with extensive trial testimony experience.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-emerald-300 block mb-1">Evidence-Based</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Adherence to ISO/IEC 27037, NIST SP 800-86, and ASTM guidelines ensuring scientific repeatability and auditability.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-amber-300 block mb-1">Reliable</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clear, objective, and well-documented findings that can withstand rigorous cross-examination in court proceedings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-cyan-600 flex items-center justify-center text-white font-serif font-bold">
                CL
              </div>
              <span className="text-lg font-bold text-white font-serif tracking-wider">
                CRIME<span className="text-cyan-400">LENS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Forensic Investigation & Digital Evidence Services. Providing forensic analysis and education to help individuals, businesses, and legal professionals uncover facts and understand complex cases.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500">
              Lab Registration: #FR-2026-9810<br />
              ISO/IEC 27037:2012 Aligned
            </div>
          </div>

          {/* Investigation Divisions */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold block mb-2">
              Investigation Services
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Digital Forensics & Mobile Extraction
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Questioned Document Examination
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Financial Fraud & Forensic Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Audio & Video Authenticity (Deepfake Triage)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Incident Response & Ransomware
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Expert Witness Court Testimony
                </button>
              </li>
            </ul>
          </div>

          {/* Learning & Academy */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold block mb-2">
              Forensic Academy
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavClick('academy')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Forensic Webinars & Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('academy')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Forensic Week Intensive Bootcamps
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('academy')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Career Pathways in Forensic Science
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('academy')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Forensic Study Material & Protocols
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('lab')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Interactive Cryptographic Hash Tool
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tracker')} className="hover:text-cyan-400 text-left cursor-pointer">
                  Case Status & Hash Lock Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Intake Contact */}
          <div id="emergency-contact" className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold block mb-2">
              Evidence Intake & Contact
            </span>
            <p className="text-xs text-slate-400">
              For urgent incident response, court subpoenas, or immediate evidence preservation:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-mono">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+1 (800) 592-LENS (5367)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>intake@crimelens-forensics.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Metropolitan Forensic Cleanroom Suite 400</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenIntake}
                className="w-full py-2 px-3 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Submit Evidence Case
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CRIMELENS Forensic Investigation & Digital Evidence Services. All Rights Reserved.
          </div>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>ISO/IEC 27037:2012</span>
            <span>•</span>
            <span>ASTM E2290</span>
            <span>•</span>
            <span>SWGDE / SWGDOC</span>
            <span>•</span>
            <span>FRE 702 (Daubert Standard)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
