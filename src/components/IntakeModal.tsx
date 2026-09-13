import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Lock,
  Shield,
  FileCheck,
  AlertTriangle,
  X,
  Check,
  Phone,
  Mail,
  Building,
  ArrowRight
} from 'lucide-react';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  preselectedService = 'Digital Forensics & Evidence Extraction'
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    organization: '',
    clientType: 'Law Firm',
    email: '',
    phone: '',
    serviceRequested: preselectedService,
    urgency: 'Standard (3-7 Business Days)',
    evidenceDescription: '',
    ndaAcknowledged: true
  });

  const [submittedCaseRef, setSubmittedCaseRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomDocket = 'CLM-2026-' + Math.floor(1000 + Math.random() * 9000);
    setSubmittedCaseRef(randomDocket);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
  };

  const handleReset = () => {
    setSubmittedCaseRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl relative">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedCaseRef ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  Strict Confidentiality Assured
                </span>
                <h3 className="text-xl font-bold text-white font-serif">
                  Confidential Evidence & Case Intake
                </h3>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                All inquiries are covered by standard pre-engagement Attorney-Client / Examiner non-disclosure confidentiality. Your transmission is processed across encrypted channels.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Attorney Sarah Jenkins"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Client Classification *
                </label>
                <select
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Law Firm">Law Firm / Trial Counsel</option>
                  <option value="Corporate">Corporate In-House Counsel / Risk</option>
                  <option value="Law Enforcement">Law Enforcement / Prosecution</option>
                  <option value="Individual">Private Individual / Litigant</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Secure Email Address *
                </label>
                <input
                  required
                  type="email"
                  placeholder="sarah@jenkinslegal.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Direct Telephone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Primary Forensic Division *
                </label>
                <select
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Digital Forensics & Evidence Extraction">Digital Forensics & Evidence Extraction</option>
                  <option value="Questioned Document & Handwriting Examination">Questioned Document & Handwriting Examination</option>
                  <option value="Financial Fraud & Corporate Audit">Financial Fraud & Corporate Audit</option>
                  <option value="Audio / Video Authenticity Analysis">Audio / Video Authenticity Analysis</option>
                  <option value="Cyber Incident Response & Ransomware">Cyber Incident Response & Ransomware</option>
                  <option value="Expert Witness Testimony & Court Report">Expert Witness Testimony & Court Report</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-mono mb-1">
                  Required Urgency / Turnaround *
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Standard (3-7 Business Days)">Standard (3-7 Business Days)</option>
                  <option value="Urgent (48-Hour Rapid Triage)">Urgent (48-Hour Rapid Triage)</option>
                  <option value="Emergency 24/7 Deployment">Emergency 24/7 Critical Incident</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-300 font-mono mb-1">
                Summary of Matter & Known Physical/Digital Evidence Items *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe suspected incident, hardware makes/models (e.g. 1x iPhone 15, 2x NVMe SSDs), disputed documents (e.g. 2025 Will codicil), or financial ledgers..."
                value={formData.evidenceDescription}
                onChange={(e) => setFormData({ ...formData, evidenceDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* NDA Checkbox */}
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.ndaAcknowledged}
                  onChange={(e) => setFormData({ ...formData, ndaAcknowledged: e.target.checked })}
                  className="mt-0.5 accent-cyan-400"
                />
                <span className="text-slate-300 text-[11px]">
                  I confirm that all provided details are true to the best of my knowledge and acknowledge that CRIMELENS operates under strict ISO/IEC 27037 and court-admissible chain of custody mandates.
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-900/40 flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Submit Confidential Intake Docket</span>
              </button>
            </div>
          </form>
        ) : (
          /* Intake Confirmation View */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
              Case Docket Initialized
            </span>

            <h3 className="text-2xl font-bold text-white font-serif">
              Intake Reference: <span className="text-cyan-400">{submittedCaseRef}</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your intake docket has been assigned to a Senior Forensic Examiner. A secure PGP-encrypted transfer portal link and formal engagement agreement have been dispatched to <strong className="text-white">{formData.email}</strong>.
            </p>

            {/* Crucial Evidence Preservation Instructions */}
            <div className="text-left bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2 mt-4">
              <span className="text-[11px] font-mono uppercase text-amber-400 font-bold block flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                CRITICAL EVIDENCE PRESERVATION INSTRUCTIONS (DO NOT COMPROMISE):
              </span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li>• <strong>Computers / Hard Drives:</strong> If currently powered OFF, do NOT turn on. Do not connect to power or internet.</li>
                <li>• <strong>Mobile Devices:</strong> Keep in Airplane Mode or place in an RF-shielded Faraday bag to prevent remote wipes.</li>
                <li>• <strong>Questioned Paper Documents:</strong> Do not touch with bare fingers (use cotton/nitrile gloves). Do not fold or write on evidence envelopes.</li>
              </ul>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs cursor-pointer"
              >
                Done & Return to Laboratory
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
