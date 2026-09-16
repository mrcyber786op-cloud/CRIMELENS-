import React, { useState } from 'react';
import { submitEnquiry } from '../api';
import confetti from 'canvas-confetti';
import {
  FORENSIC_WEBINARS,
  FORENSIC_WEEK_COURSES,
  CAREER_PATHS,
  STUDY_MATERIALS,
  FORENSIC_QUIZ_QUESTIONS
} from '../data/forensicData';
import {
  ForensicWebinar,
  ForensicWeekCourse,
  CareerPath,
  StudyMaterial,
  QuizQuestion
} from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  Users,
  Video,
  ChevronRight,
  Download,
  CheckCircle,
  Briefcase,
  GraduationCap,
  FileText,
  HelpCircle,
  DollarSign,
  TrendingUp,
  Search,
  X,
  Sparkles,
  ExternalLink,
  Shield,
  Check
} from 'lucide-react';

interface ForensicAcademyProps {
  initialSubTab?: 'webinars' | 'courses' | 'careers' | 'materials' | 'quiz';
}

export const ForensicAcademy: React.FC<ForensicAcademyProps> = ({
  initialSubTab = 'webinars'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'webinars' | 'courses' | 'careers' | 'materials' | 'quiz'>(initialSubTab);

  // Webinar Registration Modal State
  const [selectedWebinar, setSelectedWebinar] = useState<ForensicWebinar | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '', role: 'Student' });

  // Course Syllabus / Enroll Modal State
  const [selectedCourse, setSelectedCourse] = useState<ForensicWeekCourse | null>(null);
  const [courseEnrolled, setCourseEnrolled] = useState(false);

  // Study Material Reader Modal State
  const [selectedStudyMaterial, setSelectedStudyMaterial] = useState<StudyMaterial | null>(null);
  const [studySearchTerm, setStudySearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Career Explorer State
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(CAREER_PATHS[0]);

  const handleWebinarRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedWebinar) return;

  try {
    await submitEnquiry({
      name: regForm.name,
      email: regForm.email,
      service: 'Webinar Registration',
      message: `Webinar Registration

Webinar: ${selectedWebinar.title}
Date: ${selectedWebinar.date}
Time: ${selectedWebinar.time}
Role: ${regForm.role}`,
    });

    setRegistrationSuccess(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  } catch (error) {
    console.error('Webinar registration failed:', error);
    alert('Registration submit nahi ho paayi. Please try again.');
  }
};

  const [selectedCourse, setSelectedCourse] = useState<ForensicWeekCourse | null>(null);
const [courseEnrolled, setCourseEnrolled] = useState(false);
const [courseForm, setCourseForm] = useState({
  name: '',
  email: '',
  affiliation: ''
});
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < FORENSIC_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const filteredStudyMaterials = STUDY_MATERIALS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(studySearchTerm.toLowerCase()) ||
      m.summary.toLowerCase().includes(studySearchTerm.toLowerCase()) ||
      m.keyTopics.some(t => t.toLowerCase().includes(studySearchTerm.toLowerCase()));
    const matchesCategory = selectedCategoryFilter === 'All' || m.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="forensic-academy-section" className="py-12 md:py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-300 text-xs font-mono mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>FORENSIC EDUCATION & CAREER DEVELOPMENT HUB</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif tracking-tight">
            CRIMELENS Forensic Science Academy
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Professional learning departments for university students, law enforcement personnel, private investigators, and legal advocates. Master real casework tools through specialized webinars, intensive forensic week bootcamps, curated study materials, and career guidance.
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveSubTab('webinars')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'webinars'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Forensic Webinars</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950 text-blue-200 border border-blue-800 font-mono">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'courses'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Forensic Week Courses</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-200 border border-cyan-800 font-mono">
              Bootcamps
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('careers')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'careers'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career in Forensic Science</span>
          </button>

          <button
            onClick={() => setActiveSubTab('materials')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'materials'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Study Material & SOPs</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-950'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Forensic Knowledge Quiz</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SUBTAB 1: WEBINARS */}
        {/* ========================================================================= */}
        {activeSubTab === 'webinars' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FORENSIC_WEBINARS.map((webinar) => (
                <div
                  key={webinar.id}
                  className="rounded-xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {webinar.category}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        webinar.status === 'Upcoming'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {webinar.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                      {webinar.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {webinar.description}
                    </p>

                    {/* Speaker Info */}
                    <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                      <div className="text-xs font-semibold text-white">
                        {webinar.speaker}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {webinar.speakerRole} • {webinar.speakerOrg}
                      </div>
                    </div>

                    {/* Key Learning Outcomes */}
                    <div className="mt-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                        Core Takeaways:
                      </span>
                      <ul className="space-y-1">
                        {webinar.learningOutcomes.map((out, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="text-xs text-slate-400 font-mono">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {webinar.duration} • Level: {webinar.level}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedWebinar(webinar);
                        setRegistrationSuccess(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Register Free</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 2: FORENSIC WEEK COURSES */}
        {/* ========================================================================= */}
        {activeSubTab === 'courses' && (
          <div className="mt-8 space-y-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                ⭐ <strong>CRIMELENS Forensic Weeks</strong> are intensive 5-day immersive bootcamps with practical virtual labs, write-blocked hard drive exercises, and accredited certificates of completion.
              </span>
              <span className="font-mono text-cyan-400 shrink-0 font-bold">
                Student & Early-Bird Grants Available
              </span>
            </div>

            <div className="space-y-6">
              {FORENSIC_WEEK_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl bg-slate-900/80 border border-slate-800 p-6 hover:border-cyan-500/50 transition-all shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                          {course.weekCode}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {course.duration} • {course.schedule}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white font-serif">
                        {course.title}
                      </h3>
                      <p className="text-xs text-cyan-300 font-medium mt-0.5">
                        {course.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-mono">Tuition:</span>
                        <span className="text-sm font-bold text-emerald-400 font-mono">{course.tuition}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setCourseEnrolled(false);
                        }}
                        className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md cursor-pointer"
                      >
                        Enroll in Course
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                    {course.overview}
                  </p>

                  {/* 5-Day Interactive Syllabus Cards */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      5-Day Practical Syllabus & Laboratory Exercises:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                      {course.syllabus.map((day, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                            {day.day} ({day.hours})
                          </span>
                          <strong className="text-white block mt-1 line-clamp-1">
                            {day.topic}
                          </strong>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            Lab: {day.labWork}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Certification Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-mono">Tools Taught:</span>
                      <div className="flex flex-wrap gap-1">
                        {course.toolsMastered.map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                      <Award className="w-3.5 h-3.5" />
                      <span>{course.certification}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 3: CAREER IN FORENSIC SCIENCE */}
        {/* ========================================================================= */}
        {activeSubTab === 'careers' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Role Picker List */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Specialized Forensic Professions:
                </span>
                {CAREER_PATHS.map((career) => (
                  <div
                    key={career.id}
                    onClick={() => setSelectedCareer(career)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedCareer.id === career.id
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-semibold">{career.department}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {career.role}
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 mt-1 block">
                      {career.averageSalary}
                    </span>
                  </div>
                ))}

                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    Student Mentorship Program
                  </h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    CRIMELENS pairs university forensic students with active casework examiners for mock trial prep and thesis data collection.
                  </p>
                </div>
              </div>

              {/* Detailed Career Dossier */}
              <div className="lg:col-span-8 rounded-xl bg-slate-900/80 border border-slate-800 p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {selectedCareer.department}
                    </span>
                    <h3 className="text-xl font-bold text-white font-serif">
                      {selectedCareer.role}
                    </h3>
                  </div>
                  <div className="text-right sm:text-right">
                    <div className="text-sm font-bold text-emerald-400 font-mono">{selectedCareer.averageSalary}</div>
                    <span className="text-[11px] text-cyan-300 font-mono flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      {selectedCareer.demandGrowth}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCareer.summary}
                </p>

                {/* Day in the Life Snippet */}
                <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold mb-1">
                    Typical Day in the Casework Lab:
                  </span>
                  <p className="text-slate-300 italic">
                    "{selectedCareer.dayInTheLife}"
                  </p>
                </div>

                {/* Education & Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                      Academic Requirements:
                    </span>
                    <ul className="space-y-1.5">
                      {selectedCareer.requiredEducation.map((edu, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                      Essential Certifications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCareer.keyCertifications.map((cert, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Employers */}
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                    Primary Hiring Sectors & Agencies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.typicalWorkplaces.map((place, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 4: STUDY MATERIAL & SOPS */}
        {/* ========================================================================= */}
        {activeSubTab === 'materials' && (
          <div className="mt-8 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search protocols, Daubert law, handwriting points, hash guides..."
                  value={studySearchTerm}
                  onChange={(e) => setStudySearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Topics</option>
                <option value="First Responder Guide">First Responder Guide</option>
                <option value="Digital Forensics Cheatsheet">Digital Forensics Cheatsheet</option>
                <option value="Questioned Documents">Questioned Documents</option>
                <option value="Legal & Evidence Law">Legal & Evidence Law</option>
              </select>
            </div>

            {/* Study Materials Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStudyMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="rounded-xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {mat.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {mat.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {mat.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {mat.summary}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                        Highlighted Points:
                      </span>
                      <ul className="space-y-1">
                        {mat.keyTopics.slice(0, 3).map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <Check className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      {mat.pages} Pages • {mat.format}
                    </span>

                    <button
                      onClick={() => setSelectedStudyMaterial(mat)}
                      className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Study Guide</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBTAB 5: FORENSIC KNOWLEDGE QUIZ */}
        {/* ========================================================================= */}
        {activeSubTab === 'quiz' && (
          <div className="mt-8 max-w-3xl mx-auto">
            {!quizFinished ? (
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Question {currentQuestionIdx + 1} of {FORENSIC_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Current Score: {score}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    {FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].domain}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-2">
                  {FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].question}
                </h3>

                {/* Options List */}
                <div className="mt-6 space-y-3">
                  {FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].options.map((option, idx) => {
                    let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (isAnswerSubmitted) {
                      if (idx === FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (selectedOption === idx) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-blue-950 border-blue-500 text-white';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box after Submit */}
                {isAnswerSubmitted && (
                  <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-mono text-[10px] uppercase text-cyan-400 block font-bold mb-1">
                      Forensic Rationale:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {FORENSIC_QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                  {!isAnswerSubmitted ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={handleAnswerSubmit}
                      className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-8 text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif">
                  Assessment Complete!
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  You scored <strong className="text-cyan-400 text-lg">{score}</strong> out of {FORENSIC_QUIZ_QUESTIONS.length} on the Forensic Standards Self-Assessment.
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                  {score >= 4
                    ? 'Outstanding! You have a solid grasp of ISO/IEC 27037, Daubert standards, and forensic methodology.'
                    : 'Good effort! Review our Study Material and Forensic Week syllabi to strengthen evidentiary fundamentals.'}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setActiveSubTab('materials')}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer"
                  >
                    Explore Study Guides
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: WEBINAR REGISTRATION */}
      {/* ========================================================================= */}
      {selectedWebinar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedWebinar(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!registrationSuccess ? (
              <form onSubmit={handleWebinarRegister} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-blue-950 border border-blue-700 text-blue-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-blue-400">Webinar Registration</span>
                    <h4 className="text-base font-bold text-white line-clamp-1">{selectedWebinar.title}</h4>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  <div>Date: <strong className="text-cyan-300">{selectedWebinar.date}</strong></div>
                  <div>Time: {selectedWebinar.time} ({selectedWebinar.duration})</div>
                  <div>Speaker: {selectedWebinar.speaker}</div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Mercer"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Official / Educational Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@university.edu"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Current Role</label>
                    <select
                      value={regForm.role}
                      onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white"
                    >
                      <option value="Student">Forensic Science / Law Student</option>
                      <option value="Investigator">Law Enforcement / Detective</option>
                      <option value="Legal">Attorney / Paralegal</option>
                      <option value="Private">Private Investigator / Examiner</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWebinar(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow"
                  >
                    Confirm Free Registration
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Seat Confirmed!</h4>
                <p className="text-xs text-slate-300">
                  We have dispatched your access credentials and digital calendar invite to <strong className="text-cyan-300">{regForm.email}</strong>.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setSelectedWebinar(null)}
                    className="px-5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: COURSE ENROLLMENT */}
      {/* ========================================================================= */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!courseEnrolled ? (
              <form onSubmit={handleCourseEnroll} className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400">
                    Forensic Week Bootcamp Enrollment
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {selectedCourse.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedCourse.subtitle}
                  </p>
                </div>

                <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                  <div>Tuition: <strong className="text-emerald-400">{selectedCourse.tuition}</strong></div>
                  <div>Duration: {selectedCourse.duration}</div>
                  <div>Spots Remaining: <span className="text-amber-400">{selectedCourse.seatsLeft} of {selectedCourse.totalSeats}</span></div>
                  <div>Certification: {selectedCourse.certification}</div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Student / Registrant Name *</label>
                    <input required type="text" placeholder="Full legal name" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Email Address *</label>
                    <input required type="email" placeholder="examiner@lab.org" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Affiliation / Organization</label>
                    <input type="text" placeholder="University, Police Dept, or Private Practice" className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-white" />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow"
                  >
                    Submit Enrollment Request
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Enrollment Reserved!</h4>
                <p className="text-xs text-slate-300">
                  Your seat in <strong className="text-cyan-300">{selectedCourse.weekCode}</strong> is reserved. The onboarding packet, hardware write-blocker lab download links, and syllabus guide have been dispatched.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-5 py-2 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: STUDY MATERIAL READER */}
      {/* ========================================================================= */}
      {selectedStudyMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">
                  Forensic Reference Guide
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                  {selectedStudyMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudyMaterial(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap gap-4">
                <span>Category: <strong className="text-cyan-300">{selectedStudyMaterial.category}</strong></span>
                <span>Format: {selectedStudyMaterial.format}</span>
                <span>Est. Reading: {selectedStudyMaterial.readTime}</span>
              </div>

              <div className="whitespace-pre-line font-mono text-xs text-slate-200 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
                {selectedStudyMaterial.contentMarkdown}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60 text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                Authorized for educational, law enforcement & legal research use.
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const blob = new Blob([selectedStudyMaterial.contentMarkdown], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedStudyMaterial.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
                    a.click();
                  }}
                  className="px-3.5 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guide (.md)</span>
                </button>
                <button
                  onClick={() => setSelectedStudyMaterial(null)}
                  className="px-3.5 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
