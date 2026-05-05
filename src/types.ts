export type ProjectStatus = "Active" | "Complete" | "Portfolio";

export type TabId = "profile" | "stats" | "quests" | "contact";

export interface TabConfig {
  id: TabId;
  label: string;
  status: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  stack: string[];
  summary: string;
  status: ProjectStatus;
  signal: string;
  highlights: string[];
  links: ProjectLink[];
  tags: string[];
}

export interface SkillGroup {
  label: string;
  level: number;
  skills: string[];
}

export interface ExperienceItem {
  organisation: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface EducationItem {
  credential: string;
  institution: string;
  duration: string;
  result?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  type: "email" | "phone" | "github" | "linkedin" | "cv";
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  summary: string;
  headlineStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}
