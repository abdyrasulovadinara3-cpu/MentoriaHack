export type Category = 'STEM' | 'Programming' | 'Business' | 'Social Impact' | 'Finance' | 'Science' | 'Arts & Humanities';

export type OpportunityFormat = 'Online' | 'Offline' | 'Hybrid';

export interface Opportunity {
  id: string;
  title: string;
  category: Category;
  format: OpportunityFormat;
  deadline: string; 
  description: string;
  requirements: string;
  targetGrades: string[]; 
  organization: string;
  link?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; 
  videoPlaceholder: string; 
  videoUrl?: string; 
  content: string; 
  quiz?: QuizQuestion;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Легкий' | 'Средний' | 'Продвинутый';
  category: Category;
  duration: string; 
  lessons: Lesson[];
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  grade: string; 
  interests: Category[];
  goals: string[];
  hasOnboarded: boolean;
  role: 'student' | 'admin';
}

export interface EnrollmentState {
  courseId: string;
  completedLessons: string[]; 
  quizAnswers: Record<string, number>; 

export interface AppState {
  opportunities: Opportunity[];
  courses: Course[];
  userProfile: UserProfile;
  enrollments: EnrollmentState[];
  savedOpportunities: string[]; 
}
