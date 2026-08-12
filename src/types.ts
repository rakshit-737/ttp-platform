export type Category =
  | 'Business & Entrepreneurship'
  | 'Marketing & Sales'
  | 'Finance'
  | 'Operations & Management'
  | 'Technology & AI';

export type CurriculumKind = 'lesson' | 'quiz' | 'assignment';

export interface CurriculumItem {
  kind: CurriculumKind;
  name: string;
}

export interface CurriculumTopic {
  title: string;
  items: CurriculumItem[];
}

export interface Course {
  id: string;
  /** Catalogue code, e.g. BE-101 — category prefix + level number. */
  code: string;
  title: string;
  category: Category;
  price: number;
  hours: number;
  rating: number;
  lessons: number;
  level: 'Beginner' | 'Intermediate';
  excerpt: string;
  learn: string[];
  reqs: string[];
  curriculum: CurriculumTopic[];
}

export interface ProjectTask {
  id: string;
  milestone: string;
  title: string;
  brief: string;
  due: string;
  points: number;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  status: 'open' | 'soon';
  problem: string;
  objective: string;
  skills: string[];
  duration: string;
  mentor: string;
  role: string;
  currentProblem: string;
  tasks: ProjectTask[];
}

export interface Mentor {
  name: string;
  title: string;
  bio: string;
  focus: string;
}

export interface Review {
  name: string;
  stars: number;
  text: string;
}

export interface TaskRecord {
  status: 'submitted' | 'approved';
  submission: string;
  feedback?: string;
  marks?: string;
}

export interface QaMessage {
  from: 'me' | 'mentor';
  text: string;
}

export interface ContactEntry {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface AppState {
  user: { name: string; email: string } | null;
  enrolled: string[];
  progress: Record<string, number>;
  allocated: string[];
  projProgress: Record<string, number>;
  tasks: Record<string, TaskRecord>;
  qa: QaMessage[];
  entries: ContactEntry[];
}
