import { BenefitRule, Contradiction, DiseaseMapping } from "@/types/benefitRules";

export const benefitRules: BenefitRule[] = [
  // --- existing PHF and MNCH kept as you had ---
  {
    id: "REN-001",
    service: "Renal Care: Dialysis",
    package: "Renal Care Package",
    scope: "Haemodialysis, haemodiafiltration, peritoneal dialysis including consults, labs, meds",
    facilityLevel: "Level 4–6 (renal capable, ICU within 10km)",
    tariff: "HD/HDF: KES 10,650 per session; PD: KES 180,000 per month",
    coverageCondition: "HD max 3/week; HDF max 2/week; PD max 12 sessions annually",
    exclusion: "",
    accessRules: "Payments from SHIF + ECCIF",
    contradictionFlag: true,
    contradictionReason: "PD tariff given monthly vs limit expressed in sessions per year (unit mismatch)",
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "62",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "MENT-001",
    service: "Mental Wellness",
    package: "Mental Wellness Benefit Package",
    scope: "OP counselling, screening, inpatient admission, rehab for substance disorders",
    facilityLevel: "Level 3–6",
    tariff: "OP: KES 1,200/visit (max 7 visits); IP per diem: L4 KES 3,500, L5 KES 4,000, L6 KES 5,000; Detox: KES 14,000; Rehab: KES 125,000",
    coverageCondition: "OP max 7 visits; IP limit 35 days; rehab pre-auth; partial reimbursement if <45 days stay",
    exclusion: "",
    accessRules: "Paid-up SHIF members only; financed via SHIF + ECCI",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "66",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "ONC-001",
    service: "Oncology Services",
    package: "Oncology Package",
    scope: "Screening & treatment incl. chemo, radiotherapy, surgery, imaging, blood products",
    facilityLevel: "Level 4–6",
    tariff: "Chemo KES 5,000/session; PET KES 53,500; MRI KES 11,000; Radiotherapy KES 3,600/session; Brachytherapy up to 40,000",
    coverageCondition: "Diagnosis & staging KES 100k; 1st line limit KES 400k (SHIF) + 250k (ECCIF); 2nd line limit KES 650k (ECCIF)",
    exclusion: "",
    accessRules: "Includes consumables, stoma, pumps, supportive meds",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "74",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "IMG-001",
    service: "Specialized Imaging",
    package: "Imaging Package",
    scope: "MRI, CT, Angio, Fluoro, Mammography, Doppler, ECHO, EEG",
    facilityLevel: "Facilities with imaging capability; some procured from GoK L4–5",
    tariff: "MRI KES 11,000; CT KES 9,600; Angio KES 8,000; Mammography KES 3,000; Doppler KES 5,000; ECHO KES 3,500",
    coverageCondition: "Max 2 scans per HH/year per modality; all pre-authorized",
    exclusion: "",
    accessRules: "Procured services where not available",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "80",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "PHARM-001",
    service: "Pharmacy Package",
    package: "Pharmacy",
    scope: "Medicines for chronic diseases (Diabetes, Hypertension, Asthma, COPD, Sickle Cell, Oncology, Mental Health, Epilepsy)",
    facilityLevel: "Public, FBO, or contracted community pharmacies",
    tariff: "Quarterly limit: KES 5,000 per person",
    coverageCondition: "As captured in chronic disease registry",
    exclusion: "",
    accessRules: "Fee-for-service through PBM model",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "86",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "CRIT-001",
    service: "Critical Illness: ICU/HDU",
    package: "Critical Illness Package",
    scope: "ICU, HDU, NICU, PICU, Burns Unit",
    facilityLevel: "Level 4–6",
    tariff: "ICU KES 35,000/day; HDU KES 10,000/day",
    coverageCondition: "ICU up to 14 days; HDU up to 10 days",
    exclusion: "",
    accessRules: "Co-payment above per diem",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "102",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "PAL-001",
    service: "Palliative Care",
    package: "Palliative Care Package",
    scope: "Symptom mgmt, psychosocial support, caregiver support, end-of-life",
    facilityLevel: "Level 4–6",
    tariff: "KES 5,000 per diem",
    coverageCondition: "Limit up to 60 days",
    exclusion: "",
    accessRules: "Co-payment for above daily rate",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "105",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  },
  {
    id: "ASSIST-001",
    service: "Assistive Devices",
    package: "Assistive Devices Package",
    scope: "Hearing aids, crutches, clubfoot braces, walking frames, therapeutic footwear",
    facilityLevel: "Level 4–6",
    tariff: "Hearing aids KES 55,000; Crutches KES 900; Footwear KES 1,000",
    coverageCondition: "One device per HH/year; hearing aids only once per lifetime <18 yrs",
    exclusion: "",
    accessRules: "Devices for permanent disability (NCPWD recognition)",
    contradictionFlag: false,
    sourceDocument: "SHA Benefits Package 2024",
    sourcePage: "110",
    userComments: [],
    flaggedIncorrect: false,
    assignedTasks: []
  }
];

// --- contradictions (added renal + inpatient day mismatch) ---
export const contradictions: Contradiction[] = [
  {
    id: "CONTRA-001",
    service: "Outpatient Education",
    rowALevels: "PHF L2–4 capitation KES 900",
    rowBLevels: "SHIF L4–6 FFS KES 2,000 (4 visits)",
    reason: "Same service, different payment model and tiers"
  },
  {
    id: "CONTRA-002",
    service: "Cancer Screening",
    rowALevels: "HPV screening females 35, 45 yrs",
    rowBLevels: "Prostate males >55 yrs, Colon >40 yrs",
    reason: "Inconsistent age criteria across cancers"
  },
  {
    id: "CONTRA-003",
    service: "Renal Care",
    rowALevels: "Tariff PD: KES 180,000 per month",
    rowBLevels: "Limit PD: 12 sessions annually",
    reason: "Unit mismatch (per-month vs per-session/year)"
  },
  {
    id: "CONTRA-004",
    service: "Inpatient Limits",
    rowALevels: "Level 3: admission up to 50 days",
    rowBLevels: "SHIF L4–6: up to 50 days per household",
    reason: "Counting unit mismatch (admission vs household)"
  }
];

// --- extended disease mappings ---
export const diseaseMappings: DiseaseMapping[] = [
  { disease: "HIV/AIDS", mappedServices: ["ARVs and HIV Testing"], isMapped: true },
  { disease: "Tuberculosis", mappedServices: ["ARVs and HIV Testing"], isMapped: true },
  { disease: "Malaria", mappedServices: ["Prescribed Laboratory Investigations"], isMapped: true },
  { disease: "Hypertension", mappedServices: ["Consultation, Diagnosis, and Treatment","Pharmacy Package"], isMapped: true },
  { disease: "Diabetes", mappedServices: ["Consultation, Diagnosis, and Treatment","Pharmacy Package"], isMapped: true },
  { disease: "Breast Cancer", mappedServices: ["Cancer Screening","Oncology Services"], isMapped: true },
  { disease: "Cervical Cancer", mappedServices: ["Cancer Screening","Oncology Services"], isMapped: true },
  { disease: "Prostate Cancer", mappedServices: ["Cancer Screening","Oncology Services"], isMapped: true },
  { disease: "Colon Cancer", mappedServices: ["Cancer Screening","Oncology Services"], isMapped: true },
  { disease: "COPD", mappedServices: ["Pharmacy Package"], isMapped: true },
  { disease: "Asthma", mappedServices: ["Pharmacy Package"], isMapped: true },
  { disease: "Epilepsy", mappedServices: ["Pharmacy Package"], isMapped: true },
  { disease: "Mental Health Disorders", mappedServices: ["Mental Wellness"], isMapped: true },
  { disease: "Kidney Disease", mappedServices: ["Renal Care"], isMapped: true },
  { disease: "Stroke", mappedServices: ["Emergency & A&E","Imaging"], isMapped: true },
  { disease: "Sickle Cell", mappedServices: ["Pharmacy Package"], isMapped: true },
  // unmapped examples
  { disease: "Parkinson’s Disease", mappedServices: [], isMapped: false },
  { disease: "Multiple Sclerosis", mappedServices: [], isMapped: false },
  { disease: "Heart Failure", mappedServices: [], isMapped: false }
];
