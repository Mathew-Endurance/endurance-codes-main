import { Github, Linkedin, type LucideIcon } from "lucide-react";

export const heroStack = ["REACT.JS", "NEXT.JS", "TYPESCRIPT", "ARCHITECTURE", "PERFORMANCE"];

export interface HeroSocial {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const heroSocials: HeroSocial[] = [
  { label: "GITHUB", href: "https://github.com/Mathew-Endurance", icon: Github },
  { label: "LINKEDIN", href: "https://linkedin.com/in/endurance-mathew", icon: Linkedin },
];
