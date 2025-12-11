/**
 * Central Data Registry for Global Search
 * 
 * This file aggregates all Q&A sections and Glossary terms into a single
 * data source. The QAViewer component imports this to perform client-side
 * searching across the entire knowledge base.
 */

import { QASection } from '../types';
import { glossaryData, Term } from './glossary';

// Q&A Data Sources
import { data as accountData } from './01-account';
import { data as enrollmentData } from './02-enrollment';
import { data as appsData } from './03-apps';
import { data as classroomData } from './04-classroom';
import { data as digitalLearningData } from './05-digital-learning';
import { data as hardwareData } from './06-hardware';
import { data as macData } from './07-mac';
import { educationQA as educationData } from './08-qa-education';

// Aggregate all Q&A data for search indexing
export const allQAData: { sections: QASection[], source: string }[] = [
  { sections: accountData, source: '帳號與伺服器' },
  { sections: enrollmentData, source: '裝置註冊' },
  { sections: appsData, source: 'App 管理' },
  { sections: classroomData, source: '課堂管理' },
  { sections: digitalLearningData, source: '數位精進' },
  { sections: hardwareData, source: '硬體排除' },
  { sections: macData, source: 'Mac 管理' },
  { sections: educationData, source: '教育實戰' },
];

export { glossaryData };
export type { Term };
