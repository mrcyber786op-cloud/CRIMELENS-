import React, { useState } from 'react';
import { DEMO_CASE_RECORDS } from '../data/forensicData';
import { CaseStatusItem } from '../types';
import {
  Search,
  FileCheck,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Hash,
  Download,
  Lock,
  UserCheck,
  Calendar
} from 'lucide-react';

export const CaseTracker: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [activeCase, setActiveCase] = useState<CaseStatusItem>(DEMO_CASE_RECORDS[0]);
  const [notFoundError, setNotFoundError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    const found = DEMO_CASE_RECORDS.find(c => c.caseRef.toUpperCase() === query);
    if (found) {
      setActiveCase(found);
      setNotFoundError(false);
    } else {
      setNotFoundError(true);
    }
  };

  const handleSelectPreset = (preset: CaseStatusItem) => {
    setActiveCase(preset);
    setSearchInput(preset.caseRef);
    setNotFoundError(false);
  };

  return (
    <section id="case-tracker-section" className="py-12 md:py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 text-xs font-mono mb-2">
            <FileCheck className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL CLIENT & LEGAL PORTAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            Evidence Case Progress & Hash Lock Tracker
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Monitor real-time laboratory stage, examiner verification milestones, and unbroken chain of custody records for active cases.
          </p>
        </div>

        {/* Search Bar & Quick Presets */}
        <div className="mt-8 p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Case Reference ID (e.g. CLM-2026-0912)..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setNotFoundError(false);
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs cursor-pointer shadow"
            >
              Verify & Lookup Case
            </button>
          </form>

          {notFoundError && (
            <div className="p-3 rounded bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                Case ID not located in current active registry. Try a demo active docket below:
              </span>
            </div>
          )}

          {/* Quick Demo Dockets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Active Casework Dockets:</span>
            {DEMO_CASE_RECORDS.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectPreset(c)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] transition-all cursor-pointer ${
                  activeCase.id === c.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c.caseRef} ({c.clientType})
              </button>
            ))}
          </div>
        </div>

        {/* Case Dossier View */}
        <div className="mt-8 rounded-xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                  {activeCase.caseRef}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Client: {activeCase.clientType}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif">
                {activeCase.caseTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {activeCase.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-[10px] text-slate-500 uppercase block">Current Phase</span>
                <span className="text-emerald-400 font-bold text-sm block mt-0.5">
                  {activeCase.currentStage}
                </span>
              </div>
              <button
                onClick={() => {
                  const content = `CRIMELENS FORENSIC CASE STATUS BRIEF\nCase Reference: ${activeCase.caseRef}\nTitle: ${activeCase.caseTitle}\nStage: ${activeCase.currentStage}\nAssigned Examiner: ${activeCase.investigator}\nPrimary Evidence: ${activeCase.evidenceType}\nSHA-256 Hash Lock: ${activeCase.sha256Hash}\nIntake Date: ${activeCase.intakeDate}\nEstimated Delivery: ${activeCase.estimatedCompletion}\n\nAll procedures conform to ISO/IEC 27037 and Federal Rule of Evidence 702.`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Case_Status_${activeCase.caseRef}.txt`;
                  a.click();
                }}
                className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Status Brief</span>
              </button>
            </div>
          </div>

          {/* Evidence Details & Examiner Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Assigned Lead Examiner</span>
              <div className="font-semibold text-white flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeCase.investigator}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Target Evidence Media</span>
              <span className="font-medium text-slate-200 block">{activeCase.evidenceType}</span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Timeline</span>
              <div className="text-slate-300 font-mono">
                Intake: {activeCase.intakeDate} • Due: <span className="text-cyan-300">{activeCase.estimatedCompletion}</span>
              </div>
            </div>
          </div>

          {/* SHA-256 Hash Lock Banner */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/90 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-cyan-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Cryptographic Evidence Seizure Hash (Master Image Lock):
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Verified Unaltered
              </span>
            </div>
            <code className="block font-mono text-[11px] text-emerald-400 break-all select-all bg-slate-900 p-2 rounded">
              {activeCase.sha256Hash}
            </code>
          </div>

          {/* Investigation Milestone Steps */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-bold">
              Procedural Milestone Log:
            </span>
            <div className="space-y-3">
              {activeCase.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-lg border text-xs flex items-start gap-3 transition-all ${
                    step.completed
                      ? 'bg-slate-950/80 border-slate-800 text-slate-200'
                      : 'bg-slate-950/30 border-slate-800/50 text-slate-400 opacity-70'
                  }`}
                >
                  <div className="mt-0.5">
                    {step.completed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className={step.completed ? 'text-white' : 'text-slate-400'}>
                        {step.title}
                      </strong>
                      <span className="font-mono text-[10px] text-slate-500">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1">
                      {step.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
