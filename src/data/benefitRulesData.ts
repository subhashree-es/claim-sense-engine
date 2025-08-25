import { BenefitRule, Contradiction, DiseaseMapping } from "@/types/benefitRules";

// Extracted rules from the uploaded benefit package documents
export const benefitRules: BenefitRule[] = [
  // Primary Healthcare Fund - Outpatient Care Services
  {
    id: "PHF-001",
    service: "Health Education and Wellness",
    package: "Primary Healthcare Fund",
    scope: "Health education and wellness, counselling, and ongoing support as needed",
    facilityLevel: "Level 2, 3 and Level 4 primary health care referral facility",
    tariff: "KES 900 per person per annum",
    coverageCondition: "Each facility will be mapped to a Primary Care Network",
    exclusion: "",
    accessRules: "All registered households will be mapped to a PCN. The Global budget shall be allocated based on the population in the PCN.",
    contradictionFlag: false
  },
  {
    id: "PHF-002",
    service: "Consultation, Diagnosis, and Treatment",
    package: "Primary Healthcare Fund",
    scope: "Consultation, diagnosis, and treatment",
    facilityLevel: "Level 2, 3 and Level 4 primary health care referral facility",
    tariff: "PPM: Global Budget",
    coverageCondition: "Primary Care Network allocation",
    exclusion: "",
    accessRules: "Distribution of the Funds shall be done at the end of the quarter based on patient visits, weighted by disease treated.",
    contradictionFlag: false
  },
  {
    id: "PHF-003",
    service: "ARVs and HIV Testing",
    package: "Primary Healthcare Fund",
    scope: "ARVs, HIV testing and follow up tests, family planning commodities, anti-malarial medication and testing, anti TBs and testing, KEPI vaccines",
    facilityLevel: "Level 2, 3 and Level 4 primary health care referral facility",
    tariff: "No cost to patient",
    coverageCondition: "As provided in the guidelines",
    exclusion: "",
    accessRules: "ARVs, antimalarials, anti TBs, and associated tests, family planning, commodities, KEPI vaccines will be provided at public facilities, and faith based & private facilities that report to the health information system.",
    contradictionFlag: false
  },
  {
    id: "PHF-004",
    service: "Prescribed Laboratory Investigations",
    package: "Primary Healthcare Fund",
    scope: "Prescribed laboratory investigations",
    facilityLevel: "Level 2, 3 and Level 4 primary health care referral facility",
    tariff: "PPM: Global Budget",
    coverageCondition: "Primary Care Network allocation",
    exclusion: "",
    accessRules: "Distribution of the Funds shall be done at the end of the quarter based on patient visits, weighted by disease treated.",
    contradictionFlag: false
  },
  {
    id: "PHF-005",
    service: "Basic Radiological Examinations",
    package: "Primary Healthcare Fund",
    scope: "Basic radiological examinations including X-rays, ultrasounds",
    facilityLevel: "Level 2, 3 and Level 4 primary health care referral facility",
    tariff: "PPM: Global Budget",
    coverageCondition: "Primary Care Network allocation",
    exclusion: "",
    accessRules: "Distribution of the Funds shall be done at the end of the quarter based on patient visits, weighted by disease treated.",
    contradictionFlag: false
  },
  // Maternity, Newborn and Child Health Services
  {
    id: "MNCH-001",
    service: "Normal Delivery",
    package: "Maternity, Newborn and Child Health",
    scope: "Ante-natal care, delivery by ways of normal delivery, assisted delivery and caesarean section as necessitated",
    facilityLevel: "Level 2-3",
    tariff: "Normal Delivery - KES. 12,500",
    coverageCondition: "Normal delivery - maximum stay of 48 hours",
    exclusion: "",
    accessRules: "Normal delivery - maximum stay of 48 hours. C-section - maximum stay of 72 hours",
    contradictionFlag: false
  },
  {
    id: "MNCH-002",
    service: "Caesarean Section",
    package: "Maternity, Newborn and Child Health",
    scope: "Ante-natal care, delivery by ways of normal delivery, assisted delivery and caesarean section as necessitated",
    facilityLevel: "Level 2-3",
    tariff: "Caesarean Section - KES. 32,600",
    coverageCondition: "C-section - maximum stay of 72 hours",
    exclusion: "",
    accessRules: "Pregnancy emergency medicines such as Tranexamic acid and magnesium sulphate are included.",
    contradictionFlag: false
  },
  // Screening & Management of Pre-cancerous Lesions
  {
    id: "SMPL-001",
    service: "Cancer Screening",
    package: "Screening & Management of Pre-cancerous Lesions",
    scope: "Screening for common cancers (breast, cervix, prostate, and colon)",
    facilityLevel: "Level 2-6 with capacity",
    tariff: "HPV - KES. 3,600, PSA - KES. 1,500, Stool for occult blood - KES. 400, Cryotherapy - KES. 3,000",
    coverageCondition: "Prostate cancer screening will only be covered in males over 55 years. Colon cancer screening will only be covered in males over 40 years.",
    exclusion: "",
    accessRules: "Prostate cancer screening will only be covered in males over 55 years. Colon cancer screening will only be covered in males over 40 years.",
    contradictionFlag: false
  },
  // Social Health Insurance Fund - Outpatient Care Services
  {
    id: "SHIF-001",
    service: "Health Education and Wellness",
    package: "Social Health Insurance Fund",
    scope: "Health education and wellness, counselling, and ongoing support as needed",
    facilityLevel: "Level 4-6",
    tariff: "KES 2,000, PPM: Fee for Service - Fixed Fee",
    coverageCondition: "Limit: 4 Visits per year per person",
    exclusion: "",
    accessRules: "ARVs, antimalarials, anti TBs, and associated tests, family planning commodities, KEPI vaccines will be provided at public facilities, and faith based & private facilities that report to the health information system.",
    contradictionFlag: true,
    contradictionReason: "Different tariff structure compared to PHF for same service"
  },
  // Medical Inpatient Services
  {
    id: "MIS-001",
    service: "Inpatient Services",
    package: "Medical Inpatient Services",
    scope: "Inpatient services shall include management of disease/condition while admitted",
    facilityLevel: "Level 4-6",
    tariff: "Level 4 - KES 3,500, Level 5 - KES 4,000, Level 6 - KES 5,000, PPM: Per Diem",
    coverageCondition: "Limit: Up to 50 days per Household",
    exclusion: "",
    accessRules: "Days above that charged to EOCHI",
    contradictionFlag: false
  },
  // Optical Health Services
  {
    id: "OHS-001",
    service: "Eye Health Services",
    package: "Optical Health Services",
    scope: "Services covered include consultation and diagnosis, preventive, restorative, and treatment services as necessary",
    facilityLevel: "Level 2-3",
    tariff: "KES. 935 for Consultation and dispensing of eyeglasses",
    coverageCondition: "Limit: KES. 1,000 per Household. Pre-authorized service. Limited to beneficiaries below 18 years.",
    exclusion: "Replacement of eyeglasses only after every two years if indicated.",
    accessRules: "Limit: KES. 1,000 per Household. Pre-authorized service. Limited to beneficiaries below 18 years.",
    contradictionFlag: false
  }
];

// Detected contradictions in the benefit rules
export const contradictions: Contradiction[] = [
  {
    id: "CONTRA-001",
    service: "Health Education and Wellness",
    rowALevels: "PHF: Level 2, 3, 4 - KES 900 per person per annum",
    rowBLevels: "SHIF: Level 4-6 - KES 2,000, Fee for Service",
    reason: "Same service has different pricing models and facility levels between PHF and SHIF packages"
  },
  {
    id: "CONTRA-002",
    service: "Cancer Screening Coverage",
    rowALevels: "HPV screening for cervical cancer (no age restriction mentioned)",
    rowBLevels: "Prostate cancer screening only for males over 55 years",
    reason: "Inconsistent age restrictions across different cancer screening types"
  }
];

// Disease and service mapping analysis
export const diseaseMappings: DiseaseMapping[] = [
  { disease: "HIV/AIDS", mappedServices: ["ARVs and HIV Testing", "Basic Radiological Examinations"], isMapped: true },
  { disease: "Tuberculosis", mappedServices: ["ARVs and HIV Testing", "Basic Radiological Examinations"], isMapped: true },
  { disease: "Malaria", mappedServices: ["ARVs and HIV Testing", "Prescribed Laboratory Investigations"], isMapped: true },
  { disease: "Hypertension", mappedServices: ["Consultation, Diagnosis, and Treatment"], isMapped: true },
  { disease: "Diabetes", mappedServices: ["Consultation, Diagnosis, and Treatment"], isMapped: true },
  { disease: "Breast Cancer", mappedServices: ["Cancer Screening"], isMapped: true },
  { disease: "Cervical Cancer", mappedServices: ["Cancer Screening"], isMapped: true },
  { disease: "Prostate Cancer", mappedServices: ["Cancer Screening"], isMapped: true },
  { disease: "Colon Cancer", mappedServices: ["Cancer Screening"], isMapped: true },
  { disease: "Pregnancy Complications", mappedServices: ["Normal Delivery", "Caesarean Section"], isMapped: true },
  { disease: "Eye Conditions", mappedServices: ["Eye Health Services"], isMapped: true },
  // Unmapped diseases
  { disease: "Mental Health Disorders", mappedServices: [], isMapped: false },
  { disease: "Kidney Disease", mappedServices: [], isMapped: false },
  { disease: "Heart Disease", mappedServices: [], isMapped: false },
  { disease: "Stroke", mappedServices: [], isMapped: false },
  { disease: "Asthma", mappedServices: [], isMapped: false },
  { disease: "Chronic Obstructive Pulmonary Disease", mappedServices: [], isMapped: false }
];