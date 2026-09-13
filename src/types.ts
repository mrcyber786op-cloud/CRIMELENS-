export interface ForensicService {
  id: string;
  title: string;
  category: 'digital' | 'document' | 'fraud' | 'multimedia' | 'physical' | 'legal';
  shortDesc: string;
  fullDesc: string;
  methodologies: string[];
  standards: string[];
  keyTools: string[];
  deliverables: string[];
  turnaround: string;
  iconName: string;
  highlightBadge?: string;
}

export interface ForensicWebinar {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  speakerOrg: string;
  date: string;
  time: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  status: 'Upcoming' | 'On-Demand' | 'Live Soon';
  category: string;
  attendeesCount: number;
  description: string;
  learningOutcomes: string[];
  certificateOffered: boolean;
}

export interface CourseDay {
  day: string;
  topic: string;
  hours: string;
  labWork: string;
}

export interface ForensicWeekCourse {
  id: string;
  weekCode: string;
  title: string;
  subtitle: string;
  level: 'Foundation' | 'Professional' | 'Masterclass';
  duration: string;
  schedule: string;
  seatsLeft: number;
  totalSeats: number;
  tuition: string;
  overview: string;
  prerequisites: string;
  certification: string;
  syllabus: CourseDay[];
  toolsMastered: string[];
}

export interface CareerPath {
  id: string;
  role: string;
  department: string;
  summary: string;
  averageSalary: string;
  demandGrowth: string;
  requiredEducation: string[];
  keyCertifications: string[];
  coreCompetencies: string[];
  typicalWorkplaces: string[];
  dayInTheLife: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  category: 'First Responder Guide' | 'Digital Forensics Cheatsheet' | 'Questioned Documents' | 'Chain of Custody' | 'Legal & Evidence Law';
  pages: number;
  fileSize: string;
  format: string;
  summary: string;
  keyTopics: string[];
  readTime: string;
  contentMarkdown: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

export interface CaseStatusItem {
  id: string;
  caseRef: string;
  caseTitle: string;
  clientType: 'Law Firm' | 'Corporate' | 'Individual' | 'Law Enforcement';
  investigator: string;
  intakeDate: string;
  estimatedCompletion: string;
  currentStage: 'Evidence Intake' | 'Forensic Acquisition' | 'Lab Analysis' | 'Cross-Verification' | 'Report Issuance' | 'Court Testimony Prepared';
  evidenceType: string;
  hashVerified: boolean;
  sha256Hash: string;
  summary: string;
  steps: {
    title: string;
    date: string;
    completed: boolean;
    note: string;
  }[];
}
