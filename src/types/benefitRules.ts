export interface BenefitRule {
  id: string;
  service: string;
  package: string;
  scope: string;
  facilityLevel: string;
  tariff: string;
  coverageCondition: string;
  exclusion: string;
  accessRules: string;
  contradictionFlag: boolean;
  contradictionReason?: string;
}

export interface Contradiction {
  id: string;
  service: string;
  rowALevels: string;
  rowBLevels: string;
  reason: string;
}

export interface DiseaseMapping {
  disease: string;
  mappedServices: string[];
  isMapped: boolean;
}

export interface Summary {
  totalRules: number;
  contradictions: number;
  diseasesMapped: number;
  diseasesUnmapped: number;
}

export interface FilterState {
  service: string;
  package: string;
  contradictionFlag: string;
  search: string;
}