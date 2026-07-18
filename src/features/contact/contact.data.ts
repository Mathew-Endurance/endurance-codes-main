import resumePdf from "@/assets/Endurance-Mathew-CV.pdf";

export interface FooterLink {
  label: string;
  href: string;
}

export const contactEmail = "endurancemurray@gmail.com";

export const contactMailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contactEmail,
)}`;

export const socialLinks: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/Mathew-Endurance" },
  { label: "LinkedIn", href: "https://linkedin.com/in/endurance-mathew" },
];

export const resourceLinks: FooterLink[] = [
  { label: "Resume PDF", href: resumePdf },
  { label: "Design System", href: "#system" },
  { label: "Tech Stack", href: "#skills" },
];
