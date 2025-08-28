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
  sourceDocument?: string;
  sourcePage?: string;
  userComments?: UserComment[];
  flaggedIncorrect?: boolean;
  assignedTasks?: Task[];
}

export interface UserComment {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: Date;
  type: 'feedback' | 'correction' | 'clarification';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedTeam: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  dueDate?: Date;
  ruleId: string;
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
  completeness: RuleCompleteness;
}

export interface RuleCompleteness {
  withTariffs: number;
  withLimits: number;
  withExclusions: number;
  withSourceCitation: number;
  missingTariffs: number;
  missingLimits: number;
  missingExclusions: number;
  missingSourceCitation: number;
}

export interface FilterState {
  service: string;
  package: string;
  contradictionFlag: string;
  search: string;
}