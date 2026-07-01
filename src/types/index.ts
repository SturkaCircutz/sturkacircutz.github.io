export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  status?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'machine-learning' | 'languages' | 'web-backend' | 'systems';
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  about: string;
  image?: string;
  stats: {
    projects: number;
    experience: string;
    satisfaction: number;
  };
}
