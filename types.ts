
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  socials: {
    facebook?: string;
    youtube?: string;
    odooStore?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Education {
  period: string;
  school: string;
  major: string;
  specialization: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: number;
  period: string;
  company: string;
  website?: string;
  summary?: string;
  role: string;
  responsibilities: string[];
}

export interface Project {
  id: number;
  name: string;
  period: string;
  customer: string;
  description: string;
  teamSize: string;
  position: string;
  responsibilities: string[];
  technologies: string;
}

export interface SkillCategory {
  name: string;
  skills: string;
}

export interface Activity {
  period: string;
  title: string;
  role?: string;
  description: string;
}

export interface UILabels {
  sections: {
    experience: string;
    skills: string;
    projects: string;
    education: string;
    activities: string;
    careerPath: string; // Added
    competency: string; // Added
  };
  labels: { // New section for generic labels
    mobile: string;
    email: string;
    location: string;
    gender: string;
    dob: string;
    address: string;
    specialization: string;
    gpa: string;
    totalProjects: string;
    filter: string;
    searchPlaceholder: string;
    clearFilters: string;
    noResults: string;
    time: string;
    customer: string;
    description: string;
    responsibilities: string;
    technologies: string;
  };
  common: {
    viewAll: string;
    showLess: string;
    techStack: string;
    teamSize: string;
    role: string;
    moreTasks: string;
    present: string;
    downloadCV: string;
    basicInfo: string;
    close: string;
    visitWebsite: string;
    companyInfo: string;
    projectDetails: string;
    relatedProjects: string;
    contactForAccess: string;
    documents: {
        diploma: string;
        transcript: string;
        englishCert: string;
    }
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

export interface CVData {
  personal: {
    name: string;
    dob: string;
    gender: string;
    role: string;
  };
  contact: ContactInfo;
  education: Education;
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  activities: Activity[];
  ui: UILabels;
}
