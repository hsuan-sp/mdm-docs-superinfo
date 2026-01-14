export interface QAItem {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  important?: boolean;
}

export interface QASection {
  title: string;
  items: QAItem[];
}

export interface Term {
  term: string;
  definition: string;
  analogy: string;
  category: string;
  tags: string[];
}
export interface QAModule {
  source: string;
  sections: QASection[];
}
