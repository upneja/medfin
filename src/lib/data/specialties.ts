// ---------------------------------------------------------------------------
// MedFin – Specialty Data
// ---------------------------------------------------------------------------

import type { SpecialtyData } from '../types';

export const SPECIALTIES: SpecialtyData[] = [
  // -------------------------------------------------------------------------
  // Anesthesiology
  // -------------------------------------------------------------------------
  {
    id: 'anesthesiology',
    name: 'Anesthesiology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 300000, median: 370000, high: 450000 },
      privatePractice: { low: 350000, median: 430000, high: 550000 },
      hospitalEmployed: { low: 330000, median: 400000, high: 500000 },
    },
    fellowships: [
      { name: 'Cardiac Anesthesiology', additionalYears: 1, salaryImpactPercent: 10, description: 'Focus on cardiac and thoracic surgical cases; high acuity TEE skills.' },
      { name: 'Critical Care Medicine', additionalYears: 1, salaryImpactPercent: 5, description: 'ICU management, multi-organ failure, sepsis, ventilator management.' },
      { name: 'Pain Medicine', additionalYears: 1, salaryImpactPercent: 15, description: 'Interventional pain procedures, chronic pain management, neuromodulation.' },
      { name: 'Pediatric Anesthesiology', additionalYears: 1, salaryImpactPercent: 5, description: 'Anesthesia for neonates through adolescents; congenital anomalies.' },
      { name: 'Regional Anesthesia & Acute Pain', additionalYears: 1, salaryImpactPercent: 8, description: 'Ultrasound-guided nerve blocks, ERAS pathways, acute pain service.' },
      { name: 'Obstetric Anesthesiology', additionalYears: 1, salaryImpactPercent: 3, description: 'Labor epidurals, C-section anesthesia, high-risk OB.' },
      { name: 'Neuroanesthesiology', additionalYears: 1, salaryImpactPercent: 8, description: 'Craniotomies, spine surgery, neuromonitoring.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year; required for medical licensure.' },
      { name: 'ABA BASIC Exam', typicalPgyYear: 2, month: 'June', description: 'First part of ABA board certification; covers basic sciences.' },
      { name: 'ABA ADVANCED Exam', typicalPgyYear: 4, month: 'September', description: 'Second part of ABA certification; clinical anesthesia knowledge.' },
      { name: 'ABA APPLIED Exam (OSCE)', typicalPgyYear: 5, month: 'Variable', description: 'Standardized oral/simulation exam; taken after residency completion.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Internal Medicine
  // -------------------------------------------------------------------------
  {
    id: 'internal_medicine',
    name: 'Internal Medicine',
    trainingLength: 3,
    salaryRanges: {
      academic: { low: 220000, median: 270000, high: 340000 },
      privatePractice: { low: 250000, median: 310000, high: 400000 },
      hospitalEmployed: { low: 260000, median: 300000, high: 370000 },
    },
    fellowships: [
      { name: 'Cardiology', additionalYears: 3, salaryImpactPercent: 60, description: 'Interventional, electrophysiology, or general cardiology tracks.' },
      { name: 'Gastroenterology', additionalYears: 3, salaryImpactPercent: 50, description: 'Endoscopy, hepatology, IBD management.' },
      { name: 'Pulmonary & Critical Care', additionalYears: 3, salaryImpactPercent: 25, description: 'Ventilator management, bronchoscopy, pulmonary function.' },
      { name: 'Hematology/Oncology', additionalYears: 3, salaryImpactPercent: 40, description: 'Cancer treatment, bone marrow transplant, clinical trials.' },
      { name: 'Endocrinology', additionalYears: 2, salaryImpactPercent: 5, description: 'Diabetes, thyroid, adrenal, and pituitary disorders.' },
      { name: 'Nephrology', additionalYears: 2, salaryImpactPercent: 15, description: 'Dialysis, transplant nephrology, glomerular disease.' },
      { name: 'Rheumatology', additionalYears: 2, salaryImpactPercent: 15, description: 'Autoimmune diseases, biologics, musculoskeletal disorders.' },
      { name: 'Infectious Disease', additionalYears: 2, salaryImpactPercent: 5, description: 'Antimicrobial stewardship, HIV, transplant ID.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABIM Internal Medicine Boards', typicalPgyYear: 3, month: 'August', description: 'Initial certification exam after PGY-3.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Surgery (General)
  // -------------------------------------------------------------------------
  {
    id: 'general_surgery',
    name: 'General Surgery',
    trainingLength: 5,
    salaryRanges: {
      academic: { low: 320000, median: 400000, high: 500000 },
      privatePractice: { low: 350000, median: 450000, high: 600000 },
      hospitalEmployed: { low: 340000, median: 420000, high: 530000 },
    },
    fellowships: [
      { name: 'Surgical Oncology', additionalYears: 2, salaryImpactPercent: 15, description: 'Complex cancer resections, multidisciplinary oncology.' },
      { name: 'Trauma/Surgical Critical Care', additionalYears: 1, salaryImpactPercent: 5, description: 'Level I trauma center, surgical ICU.' },
      { name: 'Minimally Invasive / Bariatric', additionalYears: 1, salaryImpactPercent: 20, description: 'Laparoscopic/robotic surgery, weight loss surgery.' },
      { name: 'Transplant Surgery', additionalYears: 2, salaryImpactPercent: 20, description: 'Liver, kidney, and multi-organ transplantation.' },
      { name: 'Colorectal Surgery', additionalYears: 1, salaryImpactPercent: 10, description: 'IBD surgery, proctology, pelvic floor.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABS Qualifying Exam (Written)', typicalPgyYear: 5, month: 'July', description: 'Written board exam after chief year.' },
      { name: 'ABS Certifying Exam (Oral)', typicalPgyYear: 6, month: 'Variable', description: 'Oral exam taken ~1 year after qualifying.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Pediatrics
  // -------------------------------------------------------------------------
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    trainingLength: 3,
    salaryRanges: {
      academic: { low: 190000, median: 230000, high: 290000 },
      privatePractice: { low: 210000, median: 260000, high: 330000 },
      hospitalEmployed: { low: 220000, median: 265000, high: 320000 },
    },
    fellowships: [
      { name: 'Neonatology', additionalYears: 3, salaryImpactPercent: 25, description: 'NICU, premature infant care, congenital conditions.' },
      { name: 'Pediatric Cardiology', additionalYears: 3, salaryImpactPercent: 40, description: 'Congenital heart disease, echo, catheterization.' },
      { name: 'Pediatric Emergency Medicine', additionalYears: 3, salaryImpactPercent: 20, description: 'Pediatric ED, trauma, resuscitation.' },
      { name: 'Pediatric Critical Care', additionalYears: 3, salaryImpactPercent: 25, description: 'PICU, mechanical ventilation, ECMO.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABP General Pediatrics Exam', typicalPgyYear: 3, month: 'October', description: 'Board certification after PGY-3.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Emergency Medicine
  // -------------------------------------------------------------------------
  {
    id: 'emergency_medicine',
    name: 'Emergency Medicine',
    trainingLength: 3,
    salaryRanges: {
      academic: { low: 280000, median: 330000, high: 400000 },
      privatePractice: { low: 300000, median: 370000, high: 470000 },
      hospitalEmployed: { low: 290000, median: 350000, high: 430000 },
    },
    fellowships: [
      { name: 'Sports Medicine', additionalYears: 1, salaryImpactPercent: 0, description: 'Sideline coverage, MSK ultrasound, concussion management.' },
      { name: 'Toxicology', additionalYears: 2, salaryImpactPercent: 5, description: 'Poison center, overdose management, envenomation.' },
      { name: 'Ultrasound', additionalYears: 1, salaryImpactPercent: 5, description: 'Point-of-care ultrasound, education, research.' },
      { name: 'Critical Care', additionalYears: 2, salaryImpactPercent: 10, description: 'Surgical/medical ICU, resuscitation science.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABEM Qualifying Exam', typicalPgyYear: 3, month: 'October', description: 'Written qualifying exam.' },
      { name: 'ABEM Oral Exam', typicalPgyYear: 4, month: 'Variable', description: 'Oral boards after passing qualifying.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Radiology
  // -------------------------------------------------------------------------
  {
    id: 'radiology',
    name: 'Diagnostic Radiology',
    trainingLength: 5,
    salaryRanges: {
      academic: { low: 340000, median: 410000, high: 500000 },
      privatePractice: { low: 400000, median: 500000, high: 650000 },
      hospitalEmployed: { low: 370000, median: 450000, high: 560000 },
    },
    fellowships: [
      { name: 'Interventional Radiology', additionalYears: 1, salaryImpactPercent: 25, description: 'Vascular access, embolization, drain placement.' },
      { name: 'Neuroradiology', additionalYears: 1, salaryImpactPercent: 10, description: 'Brain/spine imaging, stroke intervention.' },
      { name: 'Musculoskeletal Radiology', additionalYears: 1, salaryImpactPercent: 5, description: 'MRI interpretation, joint injections.' },
      { name: 'Breast Imaging', additionalYears: 1, salaryImpactPercent: 5, description: 'Mammography, breast MRI, biopsies.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABR Core Exam', typicalPgyYear: 4, month: 'June', description: 'Comprehensive core radiology exam.' },
      { name: 'ABR Certifying Exam', typicalPgyYear: 6, month: 'October', description: 'Final certifying exam, 15 months after training.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Orthopedic Surgery
  // -------------------------------------------------------------------------
  {
    id: 'orthopedic_surgery',
    name: 'Orthopedic Surgery',
    trainingLength: 5,
    salaryRanges: {
      academic: { low: 400000, median: 500000, high: 650000 },
      privatePractice: { low: 500000, median: 650000, high: 900000 },
      hospitalEmployed: { low: 450000, median: 570000, high: 750000 },
    },
    fellowships: [
      { name: 'Sports Medicine', additionalYears: 1, salaryImpactPercent: 10, description: 'Arthroscopy, ligament reconstruction, team coverage.' },
      { name: 'Spine Surgery', additionalYears: 1, salaryImpactPercent: 20, description: 'Degenerative disease, deformity correction, fusion.' },
      { name: 'Hand & Upper Extremity', additionalYears: 1, salaryImpactPercent: 5, description: 'Microsurgery, trauma, joint replacement.' },
      { name: 'Total Joint Arthroplasty', additionalYears: 1, salaryImpactPercent: 15, description: 'Hip/knee replacement, revision surgery.' },
      { name: 'Trauma', additionalYears: 1, salaryImpactPercent: 5, description: 'Fracture fixation, polytrauma, pelvic surgery.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABOS Part I (Written)', typicalPgyYear: 5, month: 'July', description: 'Written board exam.' },
      { name: 'ABOS Part II (Oral)', typicalPgyYear: 7, month: 'Variable', description: 'Oral exam with case lists.' },
    ],
  },

  // -------------------------------------------------------------------------
  // OB/GYN
  // -------------------------------------------------------------------------
  {
    id: 'obgyn',
    name: 'Obstetrics & Gynecology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 270000, median: 340000, high: 420000 },
      privatePractice: { low: 300000, median: 380000, high: 500000 },
      hospitalEmployed: { low: 290000, median: 350000, high: 440000 },
    },
    fellowships: [
      { name: 'Maternal-Fetal Medicine', additionalYears: 3, salaryImpactPercent: 15, description: 'High-risk pregnancies, fetal diagnosis.' },
      { name: 'Gynecologic Oncology', additionalYears: 3, salaryImpactPercent: 30, description: 'Ovarian, uterine, cervical cancer surgery.' },
      { name: 'Reproductive Endocrinology', additionalYears: 3, salaryImpactPercent: 40, description: 'IVF, fertility treatment, hormonal disorders.' },
      { name: 'Urogynecology', additionalYears: 3, salaryImpactPercent: 20, description: 'Pelvic floor disorders, incontinence surgery.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABOG Written Qualifying Exam', typicalPgyYear: 4, month: 'Variable', description: 'Written boards near end of residency.' },
      { name: 'ABOG Oral Certifying Exam', typicalPgyYear: 6, month: 'Variable', description: 'Oral case-based exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Psychiatry
  // -------------------------------------------------------------------------
  {
    id: 'psychiatry',
    name: 'Psychiatry',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 240000, median: 290000, high: 360000 },
      privatePractice: { low: 270000, median: 340000, high: 450000 },
      hospitalEmployed: { low: 260000, median: 310000, high: 380000 },
    },
    fellowships: [
      { name: 'Child & Adolescent Psychiatry', additionalYears: 2, salaryImpactPercent: 10, description: 'Youth mental health, ADHD, autism, developmental disorders.' },
      { name: 'Forensic Psychiatry', additionalYears: 1, salaryImpactPercent: 15, description: 'Legal evaluations, criminal and civil competency.' },
      { name: 'Addiction Psychiatry', additionalYears: 1, salaryImpactPercent: 10, description: 'Substance use disorders, MAT, dual diagnosis.' },
      { name: 'Consultation-Liaison Psychiatry', additionalYears: 1, salaryImpactPercent: 5, description: 'Psychiatric care in medical/surgical settings.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABPN Psychiatry Boards', typicalPgyYear: 4, month: 'Variable', description: 'Computer-based certification exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Dermatology
  // -------------------------------------------------------------------------
  {
    id: 'dermatology',
    name: 'Dermatology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 340000, median: 400000, high: 500000 },
      privatePractice: { low: 400000, median: 550000, high: 800000 },
      hospitalEmployed: { low: 360000, median: 430000, high: 540000 },
    },
    fellowships: [
      { name: 'Dermatopathology', additionalYears: 1, salaryImpactPercent: 10, description: 'Skin biopsy interpretation, melanoma diagnosis.' },
      { name: 'Mohs Surgery', additionalYears: 1, salaryImpactPercent: 30, description: 'Skin cancer excision with margin control.' },
      { name: 'Pediatric Dermatology', additionalYears: 1, salaryImpactPercent: 0, description: 'Pediatric skin conditions, genodermatoses.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABD Certification Exam', typicalPgyYear: 4, month: 'November', description: 'American Board of Dermatology exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Ophthalmology
  // -------------------------------------------------------------------------
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 280000, median: 350000, high: 440000 },
      privatePractice: { low: 350000, median: 470000, high: 700000 },
      hospitalEmployed: { low: 300000, median: 380000, high: 480000 },
    },
    fellowships: [
      { name: 'Retina', additionalYears: 2, salaryImpactPercent: 40, description: 'Vitreoretinal surgery, AMD, diabetic eye disease.' },
      { name: 'Glaucoma', additionalYears: 1, salaryImpactPercent: 10, description: 'Medical and surgical glaucoma management.' },
      { name: 'Oculoplastics', additionalYears: 2, salaryImpactPercent: 20, description: 'Eyelid surgery, orbital disease, lacrimal.' },
      { name: 'Cornea', additionalYears: 1, salaryImpactPercent: 10, description: 'Corneal transplant, refractive surgery, external disease.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABO Written Qualifying Exam', typicalPgyYear: 4, month: 'Variable', description: 'Written board exam.' },
      { name: 'ABO Oral Exam', typicalPgyYear: 5, month: 'Variable', description: 'Oral certification exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Neurology
  // -------------------------------------------------------------------------
  {
    id: 'neurology',
    name: 'Neurology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 250000, median: 310000, high: 390000 },
      privatePractice: { low: 280000, median: 350000, high: 450000 },
      hospitalEmployed: { low: 270000, median: 330000, high: 410000 },
    },
    fellowships: [
      { name: 'Stroke / Vascular Neurology', additionalYears: 1, salaryImpactPercent: 10, description: 'Acute stroke, thrombectomy, neurocritical care.' },
      { name: 'Epilepsy', additionalYears: 2, salaryImpactPercent: 10, description: 'EEG monitoring, epilepsy surgery evaluation.' },
      { name: 'Movement Disorders', additionalYears: 1, salaryImpactPercent: 5, description: 'Parkinson disease, DBS, dystonia.' },
      { name: 'Neuromuscular Medicine', additionalYears: 1, salaryImpactPercent: 5, description: 'EMG/NCS, ALS, myasthenia gravis, neuropathy.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABPN Neurology Boards', typicalPgyYear: 4, month: 'Variable', description: 'Certification exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Family Medicine
  // -------------------------------------------------------------------------
  {
    id: 'family_medicine',
    name: 'Family Medicine',
    trainingLength: 3,
    salaryRanges: {
      academic: { low: 200000, median: 240000, high: 300000 },
      privatePractice: { low: 220000, median: 275000, high: 350000 },
      hospitalEmployed: { low: 230000, median: 270000, high: 330000 },
    },
    fellowships: [
      { name: 'Sports Medicine', additionalYears: 1, salaryImpactPercent: 10, description: 'MSK medicine, sideline coverage, ultrasound.' },
      { name: 'Geriatrics', additionalYears: 1, salaryImpactPercent: 0, description: 'Elderly care, nursing home, palliative.' },
      { name: 'Hospice & Palliative', additionalYears: 1, salaryImpactPercent: 5, description: 'End-of-life care, symptom management.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABFM Certification Exam', typicalPgyYear: 3, month: 'Variable', description: 'Board certification exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Urology
  // -------------------------------------------------------------------------
  {
    id: 'urology',
    name: 'Urology',
    trainingLength: 6,
    salaryRanges: {
      academic: { low: 350000, median: 430000, high: 550000 },
      privatePractice: { low: 420000, median: 550000, high: 750000 },
      hospitalEmployed: { low: 380000, median: 480000, high: 620000 },
    },
    fellowships: [
      { name: 'Urologic Oncology', additionalYears: 1, salaryImpactPercent: 10, description: 'Prostate, bladder, kidney cancer surgery.' },
      { name: 'Female Pelvic / Reconstructive', additionalYears: 1, salaryImpactPercent: 5, description: 'Incontinence, pelvic organ prolapse.' },
      { name: 'Pediatric Urology', additionalYears: 1, salaryImpactPercent: 0, description: 'Congenital anomalies, hypospadias, reflux.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABU Qualifying Exam', typicalPgyYear: 6, month: 'Variable', description: 'Written board exam.' },
      { name: 'ABU Certifying Exam', typicalPgyYear: 7, month: 'Variable', description: 'Oral certification exam.' },
    ],
  },

  // -------------------------------------------------------------------------
  // Pathology
  // -------------------------------------------------------------------------
  {
    id: 'pathology',
    name: 'Pathology',
    trainingLength: 4,
    salaryRanges: {
      academic: { low: 250000, median: 310000, high: 390000 },
      privatePractice: { low: 300000, median: 380000, high: 500000 },
      hospitalEmployed: { low: 270000, median: 340000, high: 430000 },
    },
    fellowships: [
      { name: 'Surgical Pathology', additionalYears: 1, salaryImpactPercent: 5, description: 'Tissue diagnosis, frozen sections.' },
      { name: 'Cytopathology', additionalYears: 1, salaryImpactPercent: 5, description: 'FNA, Pap smears, body fluid cytology.' },
      { name: 'Hematopathology', additionalYears: 1, salaryImpactPercent: 10, description: 'Lymphoma, leukemia, bone marrow.' },
      { name: 'Molecular Pathology', additionalYears: 1, salaryImpactPercent: 15, description: 'NGS, precision medicine, companion diagnostics.' },
    ],
    boardExamTimeline: [
      { name: 'USMLE Step 3', typicalPgyYear: 1, month: 'Variable', description: 'Complete during intern year.' },
      { name: 'ABP Primary Certification', typicalPgyYear: 4, month: 'Variable', description: 'AP/CP board examination.' },
    ],
  },
];

/**
 * Look up a specialty by ID.
 */
export function getSpecialtyById(id: string): SpecialtyData | undefined {
  return SPECIALTIES.find((s) => s.id === id);
}

/**
 * Get the total training years including a specific fellowship.
 */
export function getTotalTrainingYears(specialtyId: string, fellowshipName?: string): number {
  const specialty = getSpecialtyById(specialtyId);
  if (!specialty) return 0;

  let years = specialty.trainingLength;
  if (fellowshipName) {
    const fellowship = specialty.fellowships.find((f) => f.name === fellowshipName);
    if (fellowship) years += fellowship.additionalYears;
  }
  return years;
}
