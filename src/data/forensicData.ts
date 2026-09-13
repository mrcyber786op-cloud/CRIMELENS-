import {
  ForensicService,
  ForensicWebinar,
  ForensicWeekCourse,
  CareerPath,
  StudyMaterial,
  QuizQuestion,
  CaseStatusItem
} from '../types';

export const FORENSIC_SERVICES: ForensicService[] = [
  {
    id: 'digital-evidence',
    title: 'Digital Forensics & Evidence Extraction',
    category: 'digital',
    shortDesc: 'Bit-stream image preservation, deleted file recovery, mobile phone extraction, and triage of volatile RAM and encrypted storages.',
    fullDesc: 'Using write-blocking hardware and scientifically validated forensics suites, we extract, reconstruct, and preserve electronic evidence without altering original metadata. We handle smartphones, encrypted drives, servers, cloud repositories, and IoT devices according to ISO/IEC 27037 standards.',
    methodologies: [
      'Write-blocked physical bit-stream image acquisition (E01 / RAW)',
      'Dual-hash integrity verification (SHA-256 & MD5 parity)',
      'File system parsing (NTFS MFT, APFS, EXT4, FAT32) & unallocated space carving',
      'Anti-forensic detection and volume shadow copy correlation'
    ],
    standards: ['ISO/IEC 27037:2012', 'NIST SP 800-86', 'SWGDE Digital Evidence Guidelines'],
    keyTools: ['EnCase Forensic', 'Autopsy SleuthKit', 'Cellebrite UFED', 'FTK Imager', 'Volatility Framework'],
    deliverables: ['Forensic Image Verification Certificate', 'Extracted Timeline Artifacts', 'Expert Court Report with Evidence Hashes'],
    turnaround: '3 - 7 Business Days',
    iconName: 'Cpu',
    highlightBadge: 'Most Requested'
  },
  {
    id: 'document-examination',
    title: 'Questioned Document & Handwriting Examination',
    category: 'document',
    shortDesc: 'Authenticity testing of disputed wills, contracts, signatures, ink age profiling, and detection of physical or digital alteration.',
    fullDesc: 'Our forensic document examiners employ non-destructive optical, microscopic, and spectral techniques to verify disputed signatures, identify traced or simulated forgery, analyze typewriter/printer output, and detect mechanical erasures or page substitutions.',
    methodologies: [
      'Side-by-side microscopic comparison with verified exemplars',
      'Video Spectral Comparator (VSC) multi-wavelength infrared/UV inspection',
      'Electrostatic Detection Apparatus (ESDA) for latent indented impressions',
      'Micro-spectrophotometry of ink dyes and paper composition analysis'
    ],
    standards: ['ASTM E2290', 'SWGDOC Guidelines for Forensic Document Examination'],
    keyTools: ['Stereomicroscopes', 'Infrared Luminescence VSC', 'Digital Caliper Micrometers', 'ESDA'],
    deliverables: ['Exemplar Comparison Chart with Annotations', 'Spectral Differentiation Proof', 'Sworn Notarized Affidavit of Findings'],
    turnaround: '5 - 10 Business Days',
    iconName: 'FileCheck',
    highlightBadge: 'Legal & Civil Cases'
  },
  {
    id: 'fraud-investigation',
    title: 'Financial Fraud & Corporate Forensic Audit',
    category: 'fraud',
    shortDesc: 'Uncovering asset misappropriation, embezzlement, vendor kickbacks, payroll manipulation, and illicit ledger adjustments.',
    fullDesc: 'We merge forensic accounting with digital transaction tracing to reconstruct financial journeys, identify internal control circumventions, uncover hidden beneficial ownership, and trace proceeds of corporate malfeasance for civil recovery or criminal prosecution.',
    methodologies: [
      'Benford’s Law analysis for anomalous journal entries and rounded invoices',
      'Cross-relational database reconciliation of vendor accounts and bank statements',
      'Electronic mail and metadata keyword correlation with financial anomalies',
      'Blockchain ledger transaction mapping and wallet address attribution'
    ],
    standards: ['ACFE Standards of Professional Conduct', 'AICPA Statement on Forensic Services No. 1'],
    keyTools: ['IDEA Data Analysis', 'Tableau Forensic Dashboards', 'Chainalysis Reactor', 'Maltego Graph Explorer'],
    deliverables: ['Funds Flow Visualization Chart', 'Identified Loss Quantification Schedule', 'Corporate Governance Vulnerability Matrix'],
    turnaround: '7 - 14 Business Days',
    iconName: 'TrendingDown'
  },
  {
    id: 'multimedia-forensics',
    title: 'Audio, Video & Photographic Authenticity',
    category: 'multimedia',
    shortDesc: 'Deepfake detection, surveillance enhancement, audio enhancement, frame tampering analysis, and EXIF camera sensor matching.',
    fullDesc: 'Comprehensive scientific scrutiny of surveillance camera footage, body-worn cameras, audio recordings, and contested photographic evidence. We isolate background noise, enhance biometric facial details, and detect synthetic generative tampering or frame-level splices.',
    methodologies: [
      'Electric Network Frequency (ENF) matching for timestamp verification',
      'Error Level Analysis (ELA) and JPEG compression artifact quantization',
      'Photometric consistency analysis and facial landmark deepfake detection',
      'Adaptive spectral denoising and voice formant biometric isolation'
    ],
    standards: ['SWGDE Standards for Image and Video Forensics', 'ENF Audio Authenticity Protocols'],
    keyTools: ['Amped FIVE', 'iZotope RX Advanced', 'Photoshop Forensics Suite', 'ExifTool Metadata Parser'],
    deliverables: ['Enhancement Audit Log (Mathematically Reversible)', 'Frame Authenticity Report', 'Lossless Rendered Master Copies'],
    turnaround: '2 - 5 Business Days',
    iconName: 'Video'
  },
  {
    id: 'incident-response',
    title: 'Cyber Crime Incident Response & Ransomware Triage',
    category: 'digital',
    shortDesc: 'Rapid breach containment, root-cause vector discovery, malware reverse engineering, and threat actor infrastructure attribution.',
    fullDesc: 'When systems are compromised, our incident responders deploy immediately to isolate lateral movement, capture volatile host memory, extract firewall/VPN authentication telemetry, and determine exact data exposure scopes to meet statutory breach notification mandates.',
    methodologies: [
      'Live volatile memory acquisition prior to host shutdown',
      'Event log timeline sequencing (Windows Event Log EVTX, Sysmon, Auditd)',
      'Static and dynamic malware disassembly in air-gapped sandboxes',
      'Attribution mapping using the MITRE ATT&CK Enterprise framework'
    ],
    standards: ['NIST SP 800-61 Rev. 2 (Incident Handling)', 'ISO/IEC 27035'],
    keyTools: ['Velociraptor', 'YARA Rules Engine', 'Ghidra Disassembler', 'Wireshark Network Triage'],
    deliverables: ['Containment Protocol Directive', 'Attacker Tactics, Techniques, and Procedures (TTP) Dossier', 'Statutory Disclosure Findings Brief'],
    turnaround: '24/7 Emergency Dispatch',
    iconName: 'ShieldAlert',
    highlightBadge: '24/7 Rapid Response'
  },
  {
    id: 'expert-witness',
    title: 'Expert Witness Testimony & Court Presentation',
    category: 'legal',
    shortDesc: 'Impartial, articulate testimony adhering to Federal Rule of Evidence 702 and Daubert/Frye admissibility standards.',
    fullDesc: 'Technical evidence is only as compelling as the court’s ability to understand it. Our certified examiners provide objective, peer-reviewed testimony in civil, criminal, and arbitration tribunals, supported by demonstrative trial graphics, chain-of-custody documentation, and deposition readiness.',
    methodologies: [
      'Daubert / Frye standard pre-trial evidentiary qualification packets',
      'Creation of high-clarity demonstrative trial exhibits and timeline flowcharts',
      'Cross-examination simulation and opposing expert report rebuttal critique',
      'Strict adherence to neutral, independent scientific codes of ethics'
    ],
    standards: ['Federal Rules of Evidence Rule 702 & 703', 'Civil Procedure Rule 26 Compliance'],
    keyTools: ['Demonstrative Courtroom Visualizers', 'Verifiable Hash Logs', 'Deposition Binders'],
    deliverables: ['Full Rule 26 Expert Witness Report', 'Curriculum Vitae with Past Testimony Record', 'Courtroom Trial Board Presentation'],
    turnaround: 'Scheduled with Trial Calendar',
    iconName: 'Scale'
  }
];

export const FORENSIC_WEBINARS: ForensicWebinar[] = [
  {
    id: 'webinar-1',
    title: 'Digital Evidence in the Age of AI & Deepfake Manipulation',
    speaker: 'Dr. Evelyn Vance, Ph.D., CCE',
    speakerRole: 'Chief Forensic Scientist & Former Cyber Crime Advisory Member',
    speakerOrg: 'CRIMELENS Digital Lab & National Forensics Council',
    date: 'Thursday, October 22, 2026',
    time: '18:00 - 19:30 UTC',
    duration: '90 Minutes',
    level: 'Intermediate',
    status: 'Upcoming',
    category: 'Digital & Multimedia',
    attendeesCount: 420,
    description: 'Learn how modern forensic laboratories detect deepfake media, synthetic audio clones, and AI-manipulated documents. Covers Error Level Analysis, acoustic spectral anomalies, and introducing generative evidence under Federal Rules of Evidence.',
    learningOutcomes: [
      'Recognizing generative AI artifacts in audio, video, and PDF documents',
      'Applying reverse compression analysis and EXIF metadata validation',
      'Establishing court admissibility standards for synthetic content triage'
    ],
    certificateOffered: true
  },
  {
    id: 'webinar-2',
    title: 'Mastering the Chain of Custody: From Crime Scene to Courtroom',
    speaker: 'Marcus Sterling, D-ABFDE',
    speakerRole: 'Senior Forensic Evidence Auditor & Criminal Trial Consultant',
    speakerOrg: 'Metropolitan Forensic Institute',
    date: 'Saturday, November 7, 2026',
    time: '15:00 - 16:30 UTC',
    duration: '90 Minutes',
    level: 'All Levels',
    status: 'Upcoming',
    category: 'Evidence Law & Standards',
    attendeesCount: 315,
    description: 'A comprehensive review of how evidence is challenged in criminal and civil litigation due to broken custody logs. Learn proper tamper-evident packaging, cryptographic hashing, and legal documentation practices.',
    learningOutcomes: [
      'Standard Operating Procedures under ISO/IEC 27037 for evidence seizure',
      'Creating tamper-evident physical and digital custody manifests',
      'Withstanding aggressive cross-examinations on evidence integrity'
    ],
    certificateOffered: true
  },
  {
    id: 'webinar-3',
    title: 'Mobile Device Forensics: Decrypting Encrypted Messaging Artifacts',
    speaker: 'Aria Thorne, EnCE, GCFA',
    speakerRole: 'Lead Mobile Forensics Specialist',
    speakerOrg: 'CRIMELENS Cyber Division',
    date: 'Recorded Masterclass (Available Now)',
    time: 'On-Demand Access',
    duration: '110 Minutes',
    level: 'Advanced',
    status: 'On-Demand',
    category: 'Mobile & Cloud Forensics',
    attendeesCount: 890,
    description: 'Deep dive into physical extraction of iOS and Android hardware, SQLite database carving, decoding encrypted Signal & WhatsApp local key vaults, and reconstructing ephemeral chat histories.',
    learningOutcomes: [
      'Bypassing passcode protections via chip-off and bootloader exploits',
      'SQLite WAL (Write-Ahead Logging) database forensics and deletion recovery',
      'Reconstructing deleted geolocation and ephemeral messaging logs'
    ],
    certificateOffered: true
  },
  {
    id: 'webinar-4',
    title: 'Forensic Document Examination: Detecting Signature & Will Forgery',
    speaker: 'Julianne Croft, M.Sc., CFE',
    speakerRole: 'Principal Questioned Document Examiner',
    speakerOrg: 'CRIMELENS Document Lab',
    date: 'Wednesday, November 18, 2026',
    time: '17:00 - 18:30 UTC',
    duration: '90 Minutes',
    level: 'Beginner',
    status: 'Upcoming',
    category: 'Document Examination',
    attendeesCount: 260,
    description: 'Explore the methods forensic scientists use to detect contested signatures on wills, deeds, and business contracts. Hands-on look at pen pressure dynamics, tremor analysis, and ink optical spectrometry.',
    learningOutcomes: [
      'Differentiating between natural signature variation and traced simulation',
      'Interpreting pen lift hesitations, stroke velocity, and line terminal taper',
      'Preparing comparative exemplar exhibits for civil litigation'
    ],
    certificateOffered: true
  }
];

export const FORENSIC_WEEK_COURSES: ForensicWeekCourse[] = [
  {
    id: 'fw-01',
    weekCode: 'FW-DIGITAL-101',
    title: 'Digital Forensics & Incident Triage Week',
    subtitle: '5-Day Intensive Hands-on Lab Bootcamp in Bit-Stream Acquisition & Artifact Reconstruction',
    level: 'Professional',
    duration: '5 Days (35 Contact Hours)',
    schedule: 'Mon - Fri | 09:00 - 17:00 UTC',
    seatsLeft: 6,
    totalSeats: 24,
    tuition: '$450 (Student / Early-Bird $275)',
    overview: 'An exhaustive, scenario-driven laboratory course simulating real-world cyber crime investigations. Participants receive mock seized hard drives, compromised memory dumps, and mobile phone backup images to investigate a corporate espionage breach from intake to final expert testimony.',
    prerequisites: 'Basic knowledge of operating systems (Windows/Linux) and file systems.',
    certification: 'Certified Digital Evidence Triage Specialist (CDETS) upon passing final practical exam.',
    syllabus: [
      { day: 'Day 1', topic: 'Evidence Seizure, Write-Blocking & Cryptographic Integrity', hours: '7 hrs', labWork: 'Seize NVMe SSDs, configure hardware write-blockers, compute dual SHA-256 hashes, generate ISO 27037 intake manifests.' },
      { day: 'Day 2', topic: 'Windows Artifacts & MFT File System Carving', hours: '7 hrs', labWork: 'Parse Master File Table ($MFT), USN Journal, Shellbags, LNK files, and Shimcache to reconstruct attacker execution timelines.' },
      { day: 'Day 3', topic: 'Volatile RAM Memory Forensics', hours: '7 hrs', labWork: 'Analyze raw memory dumps using Volatility 3, isolate injected DLLs, extract plaintext passwords, and map process injection.' },
      { day: 'Day 4', topic: 'Mobile Artifacts & Cloud Backup Decryption', hours: '7 hrs', labWork: 'Carve iOS Keychain artifacts, parse SQLite databases, and reconstruct geo-located photo EXIF timelines.' },
      { day: 'Day 5', topic: 'Final Mock Trial & Expert Witness Defense', hours: '7 hrs', labWork: 'Draft a court-admissible forensic report, withstand 30 minutes of hostile cross-examination in simulated court.' }
    ],
    toolsMastered: ['Autopsy', 'FTK Imager', 'Volatility 3', 'KAPE Triage', 'Eric Zimmerman Tools', 'Wireshark']
  },
  {
    id: 'fw-02',
    weekCode: 'FW-DOC-201',
    title: 'Questioned Document & Handwriting Analysis Week',
    subtitle: 'Comprehensive Physical & Spectral Analysis of Disputed Legal Documents & Forgeries',
    level: 'Professional',
    duration: '5 Days (30 Contact Hours)',
    schedule: 'Mon - Fri | 10:00 - 16:30 UTC',
    seatsLeft: 8,
    totalSeats: 20,
    tuition: '$420 (Student $250)',
    overview: 'Designed for legal professionals, aspiring document examiners, and private investigators. Learn microscopic, spectral, and biomechanical methods to evaluate contested signatures, altered promissory notes, obliterated text, and counterfeit security paper.',
    prerequisites: 'High school diploma or undergraduate coursework in physical or forensic sciences.',
    certification: 'Forensic Document Examination Certificate of Competency.',
    syllabus: [
      { day: 'Day 1', topic: 'Handwriting Biomechanics & Neuromuscular Motor Programs', hours: '6 hrs', labWork: 'Analyze pen pressure, line quality, rhythm, and natural variation across genuine handwriting exemplars.' },
      { day: 'Day 2', topic: 'Simulated, Traced & Freehand Signature Forgery', hours: '6 hrs', labWork: 'Microscopic examination of tremor, blunt beginnings, retouching, and guide-line pencil indentation under optics.' },
      { day: 'Day 3', topic: 'Video Spectral Comparison & Non-Destructive Ink Chemistry', hours: '6 hrs', labWork: 'Utilize infrared reflectance and UV luminescence to differentiate identical-appearing ballpoint and gel inks.' },
      { day: 'Day 4', topic: 'Latent Indentations & Electrostatic Detection (ESDA)', hours: '6 hrs', labWork: 'Recover indented writing from 4 layers beneath writing surface using electrostatic toner imaging.' },
      { day: 'Day 5', topic: 'Printing Processes, Alterations & Courtroom Exemplar Charts', hours: '6 hrs', labWork: 'Identify laser vs inkjet toner spatter, identify physical erasures, and create clear comparative demonstrative charts.' }
    ],
    toolsMastered: ['Stereomicroscopes', 'Digital Spectral Filters', 'Micrometer Gauges', 'Comparative Image Aligners']
  },
  {
    id: 'fw-03',
    weekCode: 'FW-FRAUD-301',
    title: 'Financial Crime & Crypto Asset Tracing Week',
    subtitle: 'Investigating Embezzlement, Shell Companies & Laundering Through On-Chain Forensics',
    level: 'Masterclass',
    duration: '5 Days (30 Contact Hours)',
    schedule: 'Mon - Fri | 12:00 - 18:30 UTC',
    seatsLeft: 4,
    totalSeats: 18,
    tuition: '$510 (Student $320)',
    overview: 'Bridging financial accounting and digital intelligence. Master data analysis scripts, Benford’s anomalies in multi-million dollar corporate ledgers, and tracing obfuscated cryptocurrency transactions across peel chains and mixers.',
    prerequisites: 'Familiarity with financial statements or spreadsheet analysis.',
    certification: 'Certified Financial Crime & Blockchain Investigator (CFCBI).',
    syllabus: [
      { day: 'Day 1', topic: 'Corporate Fraud Schemes & Internal Audit Red Flags', hours: '6 hrs', labWork: 'Detect ghost employee payroll fraud and unapproved vendor accounts in sample ERP database tables.' },
      { day: 'Day 2', topic: 'Statistical Audit with Benford’s Law & Anomaly Detection', hours: '6 hrs', labWork: 'Run algorithmic scripts across 250,000 corporate purchase orders to isolate anomalous manual overrides.' },
      { day: 'Day 3', topic: 'Public Ledger & Blockchain Tracing Foundations', hours: '6 hrs', labWork: 'Track Bitcoin and Ethereum transactions through UTXO clusters, peel chains, and decentralized bridge smart contracts.' },
      { day: 'Day 4', topic: 'De-anonymizing Threat Wallets & Exchange Subpoenas', hours: '6 hrs', labWork: 'Map IP hops, attribution clusters, and formulate international freezing orders and asset recovery demands.' },
      { day: 'Day 5', topic: 'Drafting the Forensic Asset Recovery Report', hours: '6 hrs', labWork: 'Compile an interactive funds-flow court presentation for civil injunctions and grand jury presentations.' }
    ],
    toolsMastered: ['IDEA Audit Suite', 'Chainalysis/Breadcrumbs', 'GraphViz Flowcharts', 'SQL for Auditors']
  }
];

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'digital-analyst',
    role: 'Digital Forensics Analyst & Incident Responder',
    department: 'Digital Crimes & Cyber Evidence',
    summary: 'Recovers, preserves, and deciphers electronic data from seized computers, cloud stores, smartphones, and compromised enterprise networks for court proceedings.',
    averageSalary: '$88,000 – $145,000 / year',
    demandGrowth: '+32% over 10 years (Much faster than average)',
    requiredEducation: [
      'B.S. in Cybersecurity, Computer Science, or Forensic Computing',
      'Alternative: B.S. in Information Systems with specialized forensic certifications'
    ],
    keyCertifications: ['CFCE (IACIS)', 'GCFE / GCFA (GIAC)', 'EnCE (OpenText)', 'CHFI (EC-Council)'],
    coreCompetencies: [
      'File System Internals (NTFS, EXT4, APFS)',
      'Volatile Memory Analysis & Malware Sandboxing',
      'Hardware Write-Blocking & Chain of Custody Protocols',
      'Expert Witness Testimony Preparation'
    ],
    typicalWorkplaces: [
      'Federal & State Law Enforcement Labs (FBI, Homeland Security, State Police)',
      'Private Forensic Consulting Firms & Big 4 Advisory',
      'Corporate Incident Response (CSIRT) Departments',
      'Defense & Prosecution Legal Support Practices'
    ],
    dayInTheLife: 'You start the morning imaging a RAID server seized under court warrant using write-blockers. After lunch, you analyze an Android device involved in an extortion ring, carve deleted messages from SQLite WAL logs, and spend the afternoon drafting a formal affidavit for a federal prosecutor.'
  },
  {
    id: 'document-examiner',
    role: 'Forensic Questioned Document Examiner (FDE)',
    department: 'Physical & Document Sciences',
    summary: 'Analyzes disputed signatures, altered contracts, counterfeit currency, typewriter/printer impressions, and obliterations to verify provenance and authenticity.',
    averageSalary: '$72,000 – $120,000 / year',
    demandGrowth: '+14% steady demand in civil, probate, and criminal courts',
    requiredEducation: [
      'B.S. in Forensic Science, Chemistry, Biology, or Physics',
      'Formal 2-year full-time apprenticeship under a certified examiner in an accredited lab'
    ],
    keyCertifications: ['D-ABFDE (American Board of Forensic Document Examiners)', 'Chartered Society of Forensic Sciences (CSFS)'],
    coreCompetencies: [
      'Handwriting & Signature Biomechanical Comparison',
      'Video Spectral Comparator (VSC) Multiband Analysis',
      'Electrostatic Detection of Indented Writing (ESDA)',
      'Ink Chemistry & Non-Destructive Spectrometry'
    ],
    typicalWorkplaces: [
      'Government Crime Labs (USPS Postal Inspection, ATF, Secret Service)',
      'Independent Private Forensic Consultancies',
      'Banking & Insurance Special Investigation Units (SIU)',
      'Probate & Estate Litigation Law Firms'
    ],
    dayInTheLife: 'You calibrate the stereomicroscope to inspect a contested $4.2M estate will. You measure pen stroke hesitations and microscopic ink tremors against 40 genuine exemplar signatures collected over 15 years, followed by UV fluorescence imaging to detect a chemically erased digit in a contract.'
  },
  {
    id: 'fraud-examiner',
    role: 'Certified Fraud Examiner & Forensic Accountant',
    department: 'Financial Forensics & White Collar Crime',
    summary: 'Investigates complex white-collar crimes, embezzlement, money laundering, bribery, bankruptcy fraud, and prepares damages quantification for civil and criminal trials.',
    averageSalary: '$85,000 – $150,000 / year',
    demandGrowth: '+22% growth fueled by digital financial schemes & regulatory scrutiny',
    requiredEducation: [
      'B.S. in Accounting, Finance, Economics, or Criminal Justice',
      'CPA designation highly recommended for court testimony eligibility'
    ],
    keyCertifications: ['CFE (Association of Certified Fraud Examiners)', 'CFF (AICPA Certified in Financial Forensics)', 'CAMS (Anti-Money Laundering)'],
    coreCompetencies: [
      'Auditing & Anomaly Detection (Benford’s Law)',
      'Asset Tracing & Shell Company De-cloaking',
      'Forensic Interviewing & Confession Elicitation',
      'Loss Quantification & Trial Graphics'
    ],
    typicalWorkplaces: [
      'Securities & Exchange Commission (SEC), IRS Criminal Investigation, DOJ',
      'Forensic Accounting Practices (Kroll, FTI, Alvarez & Marsal)',
      'Commercial Banks & FinTech Fraud Operations',
      'International NGO Anti-Corruption Taskforces'
    ],
    dayInTheLife: 'You audit an offshore vendor payment portal, write SQL queries to isolate matching bank routing numbers across supposedly competing suppliers, and interview a suspect controller to uncover a multi-year kickback operation.'
  },
  {
    id: 'csi-investigator',
    role: 'Crime Scene Investigator (CSI) / Evidence Technician',
    department: 'Forensic Field Operations',
    summary: 'Responds directly to crime scenes to locate, document, preserve, package, and catalog physical, biological, ballistic, and trace evidence.',
    averageSalary: '$58,000 – $96,000 / year',
    demandGrowth: '+16% continuous demand across municipal and state departments',
    requiredEducation: [
      'B.S. in Forensic Science, Criminal Justice, or Natural Science',
      'Post-academy sworn or civilian specialized crime scene training'
    ],
    keyCertifications: ['IAI Certified Crime Scene Investigator (CCSI)', 'IAI Forensic Photography Certification'],
    coreCompetencies: [
      'Forensic Photography & Alternate Light Source (ALS) Imaging',
      'Latent Print Development (Cyanoacrylate / Magnetic Powder)',
      'Bloodstain Pattern & Trajectory Reconstruction',
      'Strict Chain of Custody Maintenance'
    ],
    typicalWorkplaces: [
      'Municipal Police Departments & Sheriff Offices',
      'State Bureaus of Investigation (SBI)',
      'Medical Examiner / Coroner Offices',
      'Private Reconstruction Services'
    ],
    dayInTheLife: 'You receive an emergency call at 02:00 for a commercial burglary with structural breaches. You set up perimeter lighting, photograph entry points using scale markers, dust for latent fingerprint impressions, collect glass shards for refractive index matching, and seal all evidence with tamper-proof tape.'
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'study-01',
    title: 'ISO/IEC 27037: Digital Evidence First Responder Protocol',
    category: 'First Responder Guide',
    pages: 18,
    fileSize: '2.4 MB',
    format: 'Standardized SOP Document',
    readTime: '15 min read',
    summary: 'The essential field guide for identifying, collecting, acquiring, and preserving digital evidence without risking spoliation or court exclusion.',
    keyTopics: [
      'Live memory acquisition vs immediate cord pull decision tree',
      'Faraday shielding protocols for wireless/cellular devices',
      'Write-blocking verification prior to physical bit-stream imaging',
      'Standardized evidence bag labeling and transfer logs'
    ],
    contentMarkdown: `### 1. Scope & Primary Principles
ISO/IEC 27037 provides guidance on handling digital evidence. The paramount objective is that the evidence presented in court is an identical, unaltered representation of what was present on the target device at the moment of seizure.

#### Principle 1: Auditability & Repeatability
Every tool, command, and procedure used during digital evidence acquisition must be documented with such specificity that an independent expert of equal competence can replicate the exact procedure and arrive at identical findings.

#### Principle 2: Minimal Interference
Investigators must never alter data stored on a computer or storage media which may subsequently be relied upon in court. If touching volatile storage is necessary, the person must be competent and able to give evidence explaining the relevance and the implication of their actions.

---

### 2. Live System vs. Powered-Down System Decision Tree
- **If the machine is OFF**: Do NOT power it on. Remove the power cord directly from the back of the computer (not the wall, to prevent UPS signals). Tag all cable connections.
- **If the machine is ON and UNLOCKED**:
  1. Photograph screen contents including visible open windows, clock, and network state.
  2. If Full Disk Encryption (BitLocker, FileVault, LUKS) is active, do NOT pull power! Volatile RAM holds the decryption keys.
  3. Attach a dedicated, forensically sterile external drive. Run a trusted command-line RAM collector (e.g., FTK Imager CLI or WinPmem) to capture volatile memory.
  4. Perform normal hard power termination only after RAM acquisition finishes.

---

### 3. Faraday Isolation for Mobile Devices
Any seized smartphone, smartwatch, or tablet must immediately be placed into Airplane Mode and powered down if unlocked. If locked, insert it directly into a verified RF-shielded Faraday bag to prevent remote wipe signals (e.g., Apple Find My or Google Find My Device) from executing.`
  },
  {
    id: 'study-02',
    title: 'Forensic Hash Algorithms & Cryptographic Integrity Cheatsheet',
    category: 'Digital Forensics Cheatsheet',
    pages: 12,
    fileSize: '1.8 MB',
    format: 'Reference Guide',
    readTime: '12 min read',
    summary: 'Comprehensive breakdown of SHA-256, SHA-1, and MD5 algorithms, collision resistance, mathematical proof of non-tampering, and court admissibility standards.',
    keyTopics: [
      'Mathematical basis of one-way cryptographic hash functions',
      'Dual-hash standard in criminal and civil litigation',
      'Detecting bit flips and sector bad-block errors',
      'Chain of custody hash certification statement templates'
    ],
    contentMarkdown: `### What is a Forensic Cryptographic Hash?
A cryptographic hash function transforms arbitrary-length input data into a fixed-size alphanumeric string. In digital forensics, hashes serve as a "digital fingerprint" proving that a master copy has not undergone even a single bit-flip alteration.

### Core Properties Required:
1. **Deterministic**: The same file will *always* generate the exact same hash value.
2. **One-Way (Pre-image Resistance)**: Infeasible to reverse the hash output back into original data.
3. **Avalanche Effect**: Changing 1 single bit in a 10-terabyte disk image alters approximately 50% of the resulting hash bits.
4. **Collision Resistance**: Impossible for two different files to produce identical hash digests.

### Comparative Table:
| Algorithm | Digest Length (Bits) | Legal Status | Recommendation |
| :--- | :--- | :--- | :--- |
| **MD5** | 128-bit (32 hex characters) | Known theoretical collisions | Use only in dual pairing with SHA-256 |
| **SHA-1** | 160-bit (40 hex characters) | Shattered collision proven | Transitioning to legacy status |
| **SHA-256** | 256-bit (64 hex characters) | Gold standard worldwide | Mandatory primary court hash |
| **SHA-512** | 512-bit (128 hex characters) | Extreme security margin | Used for high-classification investigations |

### Best Practice: The Dual-Hash Mandate
Standard operating procedure in accredited forensics labs requires generating both **MD5 and SHA-256** simultaneously at acquisition time and verifying them against the post-acquisition image.`
  },
  {
    id: 'study-03',
    title: 'Questioned Document Examination: 12 Handwriting Characteristics',
    category: 'Questioned Documents',
    pages: 24,
    fileSize: '3.1 MB',
    format: 'Illustrated Technical Manual',
    readTime: '20 min read',
    summary: 'The standard 12 points of handwriting comparison used by court-certified document examiners to differentiate genuine signatures from forged simulations.',
    keyTopics: [
      'Line quality, speed, and continuous pen pressure dynamics',
      'Spacing between letters, words, and baseline alignment',
      'Pen lifts, hesitations, tremor, and patchings',
      'Connecting strokes, flourishes, and terminal stroke tapers'
    ],
    contentMarkdown: `### Introduction to Biomechanical Comparison
Handwriting is a complex motor skill acquired through years of habituation. It is governed by central nervous system motor programs and fine musculature in the hand and wrist. A person cannot write better than their natural ability, and simulated forgeries almost inevitably exhibit micro-hesitations.

### The 12 Fundamental Handwriting Characteristics:
1. **Line Quality**: Smooth, continuous strokes indicate natural speed. Shaky, jerky strokes often indicate conscious, slow drawing (simulation).
2. **Spacing of Words & Letters**: The ratio of space between words to the size of the letters.
3. **Ratio of Relative Height & Width**: Proportions of upper loops (l, h, k) and descenders (g, y, p) relative to lowercase vowels (a, e, o).
4. **Pen Lifts & Separations**: Unusual pauses where the writer lifted the pen from paper in the middle of a continuous word structure.
5. **Connecting Strokes**: How uppercase letters link to lowercase characters (angular, garland, arcade, or disjointed).
6. **Beginning & Ending Strokes (Taper)**: Natural handwriting exhibits tapered, flying starts and flying finishes as the hand moves before and after touching the paper. Forgeries feature blunt, deliberate dots at start and end.
7. **Pen Pressure**: Heavy downstrokes vs light upstrokes. Forgers usually exert uniform, heavy pressure throughout.
8. **Slant**: Angle of writing relative to the baseline (left-slant, vertical, right-slant).
9. **Baseline Alignment**: Whether words ride above, dip below, or curve along the baseline.
10. **Placement of Diacritics**: Punctuation habits, such as the exact dot placement of 'i' and crossbar height of 't'.
11. **Flourishes & Embellishments**: Unique stylistic loops and personal idiosyncrasies.
12. **Retouching & Patching**: Going back with a pen to "correct" or darken a stroke—a major hallmark of fraudulent manipulation.`
  },
  {
    id: 'study-04',
    title: 'Evidentiary Admissibility: Daubert vs Frye Standards in Forensics',
    category: 'Legal & Evidence Law',
    pages: 15,
    fileSize: '1.5 MB',
    format: 'Legal Practice Monograph',
    readTime: '15 min read',
    summary: 'Understanding Federal Rule of Evidence 702, the Daubert trilogy, peer review requirements, and how forensic scientific findings are admitted into evidence.',
    keyTopics: [
      'Evolution from the Frye general acceptance test to Daubert',
      'The 5 Daubert factors every forensic methodology must satisfy',
      'Kumho Tire extension to non-scientific technical expertise',
      'Overcoming motions in limine to strike expert witness testimony'
    ],
    contentMarkdown: `### The Threshold of Scientific Reliability
Before an expert witness can testify in front of a jury, the judge acts as a "gatekeeper" to ensure that the scientific methodology used is reliable, valid, and properly applied to the facts.

### The Historic Frye Standard (1923)
Under *Frye v. United States*, expert testimony is admissible only if the scientific principle or discovery from which the deduction is made has gained **"general acceptance"** in the particular field in which it belongs.

### The Modern Daubert Standard (1993)
In *Daubert v. Merrell Dow Pharmaceuticals*, the Supreme Court replaced Frye in federal courts with a flexible 5-factor inquiry:
1. **Empirical Testing**: Has the theory or technique been tested empirically? (Falsifiability)
2. **Peer Review & Publication**: Has the technique been subjected to peer review and published in reputable scientific journals?
3. **Known or Potential Error Rate**: What is the established mathematical error rate of the technique?
4. **Standards & Controls**: Are there recognized standards, protocols, and maintenance controls governing the technique’s operation?
5. **General Acceptance**: Does the technique enjoy broad acceptance within the relevant scientific community?

### Rule 702 Checklist for Forensic Reports:
- [x] Methodology published in standard (e.g. NIST, ASTM, ISO)
- [x] Tool validation studies cited
- [x] Dual-analyst peer review completed
- [x] Unbroken chain of custody verified by cryptographic hash`
  }
];

export const FORENSIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Under ISO/IEC 27037 standards, what is the FIRST action when responding to an active, powered-on workstation containing potential Full Disk Encryption (BitLocker/FileVault)?',
    options: [
      'Immediately yank the wall power cord to freeze disk sectors',
      'Capture volatile RAM memory using forensically validated tools before shutting down',
      'Log out of the operating system to prevent further user actions',
      'Connect the computer to an external internet connection to backup data to the cloud'
    ],
    correctIndex: 1,
    explanation: 'If a computer has full disk encryption, pulling the power will lock the drive and purge the volatile RAM memory where encryption keys reside. Capturing RAM preserves live keys, active processes, and network connections.',
    domain: 'Digital Forensics'
  },
  {
    id: 2,
    question: 'Which of the following handwriting characteristics is most indicative of a slow, simulated forgery rather than genuine handwriting?',
    options: [
      'Tapered "flying" entry and exit strokes',
      'Natural variation between individual signatures signed on the same day',
      'Blunt stroke beginnings, micro-tremors, and uniform heavy pen pressure',
      'Rapid rhythmic loops and clean continuous ascenders'
    ],
    correctIndex: 2,
    explanation: 'A forger attempting to trace or copy another person’s signature must draw slowly. This causes hesitation, blunt starts/stops (instead of natural flying tapers), and unnatural tremor from lack of muscle fluidity.',
    domain: 'Questioned Documents'
  },
  {
    id: 3,
    question: 'In digital forensics, what does the "Avalanche Effect" describe in cryptographic hash functions like SHA-256?',
    options: [
      'Multiple servers backing up files simultaneously across a network',
      'A minor single-bit modification in the input file dramatically alters approximately 50% of the output hash bits',
      'The speed at which SSD drives purge deleted data via TRIM commands',
      'The accumulation of corrupted sectors on an aging magnetic hard drive'
    ],
    correctIndex: 1,
    explanation: 'The avalanche effect guarantees that any tampering—even flipping a single bit from 0 to 1—results in a radically different hash output, making subtle undetected tampering mathematically impossible.',
    domain: 'Evidence Integrity'
  },
  {
    id: 4,
    question: 'Under the landmark Daubert standard (Federal Rule of Evidence 702), which of the following is NOT one of the primary factors evaluated by a judge?',
    options: [
      'Whether the theory or technique has been empirically tested',
      'Whether the expert witness is being paid on a contingency fee based on trial outcome',
      'The known or potential error rate of the scientific methodology',
      'Whether the technique has been subjected to peer review and publication'
    ],
    correctIndex: 1,
    explanation: 'The Daubert factors focus strictly on scientific validity: empirical testing, peer review, known error rate, standard controls, and general acceptance. (Paying an expert witness on contingency is actually an ethical violation, not a scientific test factor).',
    domain: 'Forensic Evidence Law'
  },
  {
    id: 5,
    question: 'What is the primary function of a hardware write-blocker during digital evidence acquisition?',
    options: [
      'It encrypts the suspect hard drive so unauthorized parties cannot open it',
      'It intercepts write commands from the forensic host computer and permits only read commands to pass to the evidence media',
      'It accelerates USB data transfer speeds by 400%',
      'It recovers physically broken drive heads using magnetic pulses'
    ],
    correctIndex: 1,
    explanation: 'A hardware write-blocker physically intercepts any OS or software commands that attempt to alter, write timestamps to, or modify the source evidence drive, guaranteeing that the original evidence remains 100% untouched.',
    domain: 'Digital Forensics'
  }
];

export const DEMO_CASE_RECORDS: CaseStatusItem[] = [
  {
    id: 'case-1',
    caseRef: 'CLM-2026-0912',
    caseTitle: 'Apex Global – Corporate Intellectual Property Exfiltration',
    clientType: 'Law Firm',
    investigator: 'Specialist Aria Thorne (GCFA, EnCE)',
    intakeDate: 'September 08, 2026',
    estimatedCompletion: 'September 18, 2026',
    currentStage: 'Lab Analysis',
    evidenceType: 'NVMe SSD (1TB) & Company iPhone 15 Pro',
    hashVerified: true,
    sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    summary: 'Investigation into suspected exfiltration of proprietary engineering blueprints via encrypted cloud storage prior to executive resignation.',
    steps: [
      { title: 'Chain of Custody Intake & Tamper Seal Check', date: 'Sept 08, 2026', completed: true, note: 'Tamper seal #88192 verified unbroken. Signed by intake officer.' },
      { title: 'Write-Blocked Physical Bit-Stream Imaging', date: 'Sept 09, 2026', completed: true, note: 'E01 forensic image generated with hardware write-blocker. Dual SHA-256 hash verified.' },
      { title: 'MFT & Shellbag Execution Reconstruction', date: 'Sept 11, 2026', completed: true, note: 'USB drive insertion history identified at 23:14 UTC on Aug 29. 14.2 GB files staged in temp folder.' },
      { title: 'Mobile Device Encrypted SQLite Parsing', date: 'Sept 13, 2026', completed: false, note: 'In progress: extracting deleted messaging chats from database journal.' },
      { title: 'Final Peer-Reviewed Expert Court Report', date: 'Expected Sept 18, 2026', completed: false, note: 'Scheduled for Rule 26 court filing.' }
    ]
  },
  {
    id: 'case-2',
    caseRef: 'CLM-2026-0481',
    caseTitle: 'Estate of M. Harrington – Disputed Codicil & Signature Authenticity',
    clientType: 'Individual',
    investigator: 'Julianne Croft (M.Sc., CFE, D-ABFDE candidate)',
    intakeDate: 'September 02, 2026',
    estimatedCompletion: 'September 15, 2026',
    currentStage: 'Report Issuance',
    evidenceType: 'Original Paper Codicil & 35 Historical Exemplar Signatures',
    hashVerified: true,
    sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    summary: 'Forensic microscopic examination of disputed $2.5M will amendment. Evaluation of pen pressure, line tremors, and ink spectral composition.',
    steps: [
      { title: 'Physical Document Inspection & Non-Destructive Packaging', date: 'Sept 02, 2026', completed: true, note: 'Document encased in anti-static archival polyester sleeve.' },
      { title: 'Comparative Microscopic Analysis with Exemplars', date: 'Sept 04, 2026', completed: true, note: 'Identified significant hesitation points, blunt terminal strokes, and tremor.' },
      { title: 'Video Spectral Comparator (VSC) Ink Analysis', date: 'Sept 07, 2026', completed: true, note: 'Infrared reflectance confirmed the signature ink dye matches pen chemistry from 2025, not 2018.' },
      { title: 'Internal Blind Peer Review by Senior Examiner', date: 'Sept 10, 2026', completed: true, note: 'Findings validated by secondary laboratory examiner.' },
      { title: 'Issuance of Sworn Affidavit & Demonstrative Trial Chart', date: 'Sept 13, 2026', completed: true, note: 'Formal expert report delivered to probate court counsel.' }
    ]
  }
];
