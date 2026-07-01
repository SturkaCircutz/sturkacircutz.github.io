import { ContactInfo, PersonalInfo, Project, Skill } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Jiawen Sun',
  title: 'Computer Science Honors Student & ML Engineer',
  subtitle: 'Machine Learning | ASR | Systems | Web Engineering',
  description:
    'I build machine-learning, speech, systems, and web projects across Python, C/C++, CUDA, TypeScript, React, Next.js, Express, and MongoDB.',
  about:
    'I am an Honors Computer Science student at the University of Alberta focused on machine learning, automatic speech recognition, reinforcement learning, GPU programming, and practical software systems. My recent work spans Mandarin pronunciation analysis, neural networks in C, programmatic-policy RL experiments, CUDA extension practice, and full-stack web applications.',
  image: '/IMG_2391.jpeg',
  stats: {
    projects: 3,
    experience: '2024-2028 CS',
    satisfaction: 100
  }
};

export const projects: Project[] = [
  {
    id: 'see-my-voice',
    title: 'See My Voice',
    description:
      'Mandarin pronunciation-practice prototype for foreign learners with a Next.js/React frontend, Express API, MongoDB users, JWT authentication, recording flows, pronunciation feedback screens, and a Python ASR/pronunciation-analysis pipeline.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Express', 'MongoDB', 'JWT', 'Python', 'FunASR'],
    liveUrl: 'https://see-my-voice-backend.vercel.app',
    githubUrl: 'https://github.com/SturkaCircutz/see-my-voice',
    status: 'Featured'
  },
  {
    id: 'sppig',
    title: 'SPPIG',
    description:
      'Simplified implementation of Synthesizing Programmatic Policies that Inductively Generalize for a continuous-control parking benchmark, including deterministic task generation, policy-state-machine adapters, adaptive teacher-student training, and experiment tooling.',
    technologies: ['Python', 'NumPy', 'Reinforcement Learning', 'Program Synthesis', 'Simulation'],
    githubUrl: 'https://github.com/SturkaCircutz/SPPIG',
    status: 'Research'
  },
  {
    id: 'ml-c',
    title: 'ml_c',
    description:
      'Neural-network learning project in C with matrix storage, random initialization, matrix multiplication, sigmoid activation, forward propagation, cost calculation, finite-difference gradients, gradient updates, and logic-gate/XOR examples.',
    technologies: ['C', 'Neural Networks', 'Matrix Math', 'Numerical Gradients'],
    githubUrl: 'https://github.com/SturkaCircutz/ml_c',
    status: 'Systems ML'
  }
];

export const skills: Skill[] = [
  { name: 'Automatic Speech Recognition', level: 90, category: 'machine-learning' },
  { name: 'ASR Model Application', level: 88, category: 'machine-learning' },
  { name: 'Model Training', level: 86, category: 'machine-learning' },
  { name: 'Neural Networks', level: 86, category: 'machine-learning' },
  { name: 'Reinforcement Learning', level: 82, category: 'machine-learning' },
  { name: 'Python', level: 90, category: 'languages' },
  { name: 'C++', level: 86, category: 'languages' },
  { name: 'C', level: 85, category: 'languages' },
  { name: 'CUDA', level: 78, category: 'languages' },
  { name: 'Triton', level: 72, category: 'languages' },
  { name: 'TypeScript', level: 84, category: 'languages' },
  { name: 'RISC-V', level: 70, category: 'languages' },
  { name: 'Emacs Lisp', level: 68, category: 'languages' },
  { name: 'React', level: 86, category: 'web-backend' },
  { name: 'Next.js', level: 86, category: 'web-backend' },
  { name: 'Express', level: 82, category: 'web-backend' },
  { name: 'MongoDB', level: 80, category: 'web-backend' },
  { name: 'JWT Authentication', level: 78, category: 'web-backend' },
  { name: 'Low-level Programming', level: 84, category: 'systems' },
  { name: 'Git/GitHub', level: 88, category: 'systems' },
  { name: 'GPU Programming', level: 76, category: 'systems' },
  { name: 'Linux Tooling', level: 82, category: 'systems' }
];

export const contactInfo: ContactInfo = {
  email: '313721325sjw@gmail.com',
  phone: '+1 825-963-1088',
  location: 'Edmonton, Alberta, Canada',
  social: {
    github: 'https://github.com/SturkaCircutz',
    linkedin: 'https://www.linkedin.com/in/jiawen-sun-952a02408/'
  }
};
