import React, { useState } from 'react';
import { FORENSIC_SERVICES } from '../data/forensicData';
import { ForensicService } from '../types';
import {
  Cpu,
  FileCheck,
  TrendingDown,
  Video,
  ShieldAlert,
  Scale,
  Clock,
  CheckCircle,
  Wrench,
  Shield,
  FileText,
  ArrowRight,
  Sparkles,
  Info,
  X
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForIntake: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForIntake
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ForensicService | null>(null);

  const categories = [
    { id: 'all', label: 'All Forensic Divisions' },
    { id: 'digital', label: 'Digital & Mobile Forensics' },
    { id: 'document', label: 'Questioned Documents' },
    { id: 'fraud', label: 'Financial Fraud & Audit' },
    { id: 'multimedia', label: 'Audio / Video Authenticity' },
    { id: 'legal', label: 'Expert Witness & Court' }
  ];

  const filteredServices = activeCategory === 'all'
    ? FORENSIC_SERVICES
    : FORENSIC_SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <section id="services-section" className="py-12 md:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>CASE INVESTIGATION & EVIDENCE SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Systematic & Reliable Forensic Methodologies
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Our casework focuses on the strict four-stage protocol: <strong className="text-white">Identification, Preservation, Examination, and Documentation</strong>. We uncover actionable facts for corporate general counsels, criminal litigators, government entities, and private individuals.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-950/20 group p-6 relative overflow-hidden"
            >
              {service.highlightBadge && (
                <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  {service.highlightBadge}
                </span>
              )}

              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-950 group-hover:text-cyan-300 transition-all">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Methodologies Snippet */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                    Core Protocols:
                  </span>
                  <ul className="space-y-1.5">
                    {service.methodologies.slice(0, 2).map((meth, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{meth}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{service.turnaround}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedServiceModal(service)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Forensic Standards Accordion Banner */}
        <div className="mt-12 rounded-xl bg-slate-900/60 border border-slate-800 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                Evidence Admissibility & Daubert Standard Compliance
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Every forensic examination performed by CRIMELENS adheres strictly to scientific repeatability, peer-reviewed procedures, validated tool inventories, and sworn expert testimony guidelines under Federal Rules of Evidence 702.
              </p>
            </div>
            <button
              onClick={() => onSelectServiceForIntake('General Forensic Case Consultation')}
              className="shrink-0 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/50 text-xs font-semibold cursor-pointer transition-all"
            >
              Consult with a Forensic Examiner
            </button>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300">
                {getIcon(selectedServiceModal.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Forensic Division
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {selectedServiceModal.fullDesc}
            </p>

            {/* Systematic Methodologies */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                Validated Forensic Methodologies
              </h4>
              <div className="space-y-2 bg-slate-950/60 rounded-lg p-3.5 border border-slate-800">
                {selectedServiceModal.methodologies.map((meth, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="font-mono text-cyan-400 font-bold">{i + 1}.</span>
                    <span>{meth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standards & Tools */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Accredited Standards:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedServiceModal.standards.map((std, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Scientific Hardware & Software:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedServiceModal.keyTools.map((tool, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-800/40">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables & Turnaround */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Court Deliverables:
                </span>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedServiceModal.deliverables.join(' • ')}
                </p>
              </div>
              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4 shrink-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Turnaround:
                </span>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  {selectedServiceModal.turnaround}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const title = selectedServiceModal.title;
                  setSelectedServiceModal(null);
                  onSelectServiceForIntake(title);
                }}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/40 cursor-pointer flex items-center gap-1.5"
              >
                <span>Initiate Intake For This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
