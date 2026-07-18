export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectTimelinePhase {
  phase: string;
  /** Optional lead-in paragraph shown above the bullet points. */
  description?: string;
  /** Optional bullet points describing the work in this phase. */
  points?: string[];
}

export interface ProjectCodeSnippet {
  title: string;
  description: string;
  code: string;
  language: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface RelatedPost {
  title: string;
  href: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  tag: string;
  image: string;
  imageAlt: string;
  /** Optional slideshow of screens shown on the case-study page. */
  gallery?: ProjectImage[];
  /** Live project URL; clicking a gallery slide opens this in a new tab. */
  liveUrl?: string;
  overview: string;
  role: string;
  problem: string;
  decisions: string;
  impact: string;
  stack: string[];
  links: ProjectLink[];
  reverse?: boolean;
  timeline?: ProjectTimelinePhase[];
  codeSnippets?: ProjectCodeSnippet[];
  metrics?: ProjectMetric[];
  lessonsLearned?: string[];
  relatedPosts?: RelatedPost[];
}
