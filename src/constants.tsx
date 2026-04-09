import React from 'react';
import { Layout, Users, Sparkles, Palette, MessageSquare, BarChart3, Cpu, Layers, Code2 } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  hoverColor?: string;
  category?: string;
  hasCaseStudy?: boolean;
  pdfUrl?: string;
  role?: string;
  problem?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  type: "FULL-TIME" | "INTERN";
  tags: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Tech Bay Leaf",
    description: "Redesigning the digital presence for a global agency managing $20M+ in ad spend. By re-architecting 15+ pages with a performance-led conversion system, I transformed the website into a high-trust sales tool that builds credibility in under 5 seconds.",
    tags: ["UX/UI", "Conversion", "B2B"],
    category: "Marketing Agency",
    image: "/image/techbayleaf_thumbnail_2x.webp",
    color: "#F3E8FF",
    hoverColor: "#D9DEFF",
    hasCaseStudy: true,
    role: "Product Designer (UX/UI)",
  },
  {
    id: 10,
    title: "Sparrow: AI Powered Generate Variables",
    description: "Designing an intuitive, AI-powered feature for intelligent variable extraction and environment management in API testing workflows. The solution achieved an 8x productivity improvement and an 82% AI adoption rate among developers.",
    tags: ["AI Integration", "Developer Tools", "UX/UI"],
    category: "API Testing",
    image: "/image/sparrow_thumbnail_2x.webp",
    color: "#F0FDF4",
    hoverColor: "#D9E4FF",
    hasCaseStudy: true,
    role: "Product Designer",
    problem: "Manual variable extraction is error-prone and time-consuming."
  },
  {
    id: 9,
    title: "Mero med clinic sidebar navigation redesign",
    description: "Improved telehealth navigation, increasing efficiency by 30% and discoverability by 40%, reducing cognitive load for admins.",
    tags: ["UX Research", "Information Architecture", "Product Design"],
    category: "Telehealth",
    image: "/image/admin_navigation_thumbnail_2x.webp",
    color: "#E8F0FF",
    hoverColor: "#EFE3FF",
    hasCaseStudy: true,
    role: "Product Designer",
    problem: "High cognitive load and operational inefficiency for clinic admins."
  },
  {
    id: 2,
    title: "Design file management",
    description: `Scaling design collaboration for multi-designer teams
Reducing file confusion by 70% and accelerating handoff efficiency`,
    tags: ["UI Design", "Interaction", "AI Tools"],
    category: "Design operations",
    image: "/image/figma_file_casestudy_thumbnail_2x.webp",
    color: "#F0FFE8",
    hoverColor: "#FCEBFF",
    hasCaseStudy: true,
    role: "Lead Designer",
    problem: "Scaling design collaboration and reducing file confusion."
  },
  {
    id: 3,
    title: "Qix : Digital networking partner",
    description: "Reimagining networking through digital-first identity sharing. Qix eliminates friction, making connections instant, trackable, and meaningful.",
    tags: ["Networking", "Product Strategy", "UX"],
    category: "Networking",
    image: "/image/qix_thumbnail_2x.webp",
    color: "#FFF0E8",
    hoverColor: "#D6F0FF",
    pdfUrl: "/QIX_Casestudy.pdf",
    role: "UX Research & UI Design",
    problem: "Friction in networking and identity sharing."
  },
];

export const SKILLS = [
  { 
    category: "Product Design & UX", 
    icon: Layout,
    color: "border-blue-500",
    iconBg: "bg-blue-500/10 text-blue-500",
    description: "End-to-end ownership from brief to handoff, with a systems-thinking approach to every screen.",
    items: ["End-to-End Product Design", "Design Systems & Component Libraries", "Design Tokens", "User Flows & Journey Mapping", "Wireframing & Prototyping", "Interaction Design", "Mobile-First & Responsive Design", "Accessibility (WCAG 2.1)"],
    highlighted: []
  },
  { 
    category: "UX Research & Strategy", 
    icon: Users,
    color: "border-emerald-500",
    iconBg: "bg-emerald-500/10 text-emerald-500",
    description: "Mixed-method research that connects real user behaviour to design decisions not just gut feel.",
    items: ["User Research (Qualitative & Quantitative)", "User Interviews", "Usability Testing & Heuristic Evaluation", "A/B Testing", "Competitive Analysis", "Data-Driven Design", "Product Thinking & Problem Framing"],
    highlighted: []
  },
  { 
    category: "AI-Assisted Design", 
    icon: Sparkles,
    color: "border-cyan-500",
    iconBg: "bg-cyan-500/10 text-cyan-500",
    description: "Leveraging generative AI and automation to accelerate design cycles and explore new interaction paradigms.",
    items: ["AI-Assisted Design Workflows", "Generative AI for Ideation & Prototyping", "AI-Driven UX Research", "Prompt Engineering", "Design Automation & Rapid Iteration", "Human-AI Interaction Design"],
    highlighted: []
  },
  { 
    category: "UI & Visual Design", 
    icon: Palette,
    color: "border-purple-500",
    iconBg: "bg-purple-500/10 text-purple-500",
    description: "Pixel-considered visual work layouts that are clean, accessible, and actually get built as designed.",
    items: ["High-Fidelity Design", "Visual Systems", "Typography & Color Systems", "Microinteractions", "Branding & Visual Consistency"],
    highlighted: []
  },
  { 
    category: "Collaboration & Delivery", 
    icon: MessageSquare,
    color: "border-orange-500",
    iconBg: "bg-orange-500/10 text-orange-500",
    description: "Comfortable working across product, engineering, and leadership and keeping handoff clean enough that devs don't have to guess.",
    items: ["Developer Handoff & Documentation", "Stakeholder Management", "Cross-Functional Collaboration", "Agile/Scrum Workflows", "Design Critique & Workshops"],
    highlighted: []
  }
];

export const TOOLS = [
  {
    category: "Design & Analytics",
    items: [
      { name: "Figma", icon: (props: any) => <BrandIcon path={BRAND_PATHS.figma} {...props} /> },
      { name: "Framer", icon: (props: any) => <BrandIcon path={BRAND_PATHS.framer} {...props} /> },
      { name: "Maze", icon: (props: any) => <BrandIcon path={BRAND_PATHS.maze} {...props} /> },
      { name: "Google Analytics", icon: BarChart3 },
      { name: "Miro", icon: (props: any) => <BrandIcon path={BRAND_PATHS.miro} {...props} /> }
    ]
  },
  {
    category: "Collaboration & Documentation",
    items: [
      { name: "Notion", icon: (props: any) => <BrandIcon path={BRAND_PATHS.notion} {...props} /> },
      { name: "Jira", icon: (props: any) => <BrandIcon path={BRAND_PATHS.jira} {...props} /> },
      { name: "Confluence", icon: (props: any) => <BrandIcon path={BRAND_PATHS.confluence} {...props} /> },
      { name: "Slack", icon: (props: any) => <BrandIcon path={BRAND_PATHS.slack} {...props} /> },
      { name: "Teams", icon: Users }
    ]
  },
  {
    category: "AI Generative Tools",
    items: [
      { name: "Google AI Studio", icon: Cpu },
      { name: "Google Stitch", icon: Layers },
      { name: "Base44", icon: Code2 },
      { name: "Claude", icon: (props: any) => <BrandIcon path={BRAND_PATHS.claude} {...props} /> },
      { name: "Google Gemini", icon: (props: any) => <BrandIcon path={BRAND_PATHS.gemini} {...props} /> },
      { name: "Chatgpt", icon: (props: any) => <BrandIcon path={BRAND_PATHS.chatgpt} {...props} /> },
      { name: "Figma AI & Figma Make", icon: Sparkles }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Techdome Solutions Pvt. Ltd.",
    role: "Product Designer",
    period: "May 2025 to Present",
    location: "Indore, MP · On-site",
    type: "FULL-TIME",
    description: "Leading end-to-end UX design for 4+ international products across gaming, telehealth, technology, and typography owning the full feature lifecycle from discovery to developer handoff. Improved task completion by 30%, reduced dev rework by 25%.",
    tags: ["4+ International Projects", "Full Feature Lifecycle", "Design Systems", "10K+ Users"]
  },
  {
    company: "Engineer Sahab Education",
    role: "Sr. UI/UX Designer & Design Mentor",
    period: "Feb 2024 to May 2025",
    location: "Indore, MP · On-site",
    type: "FULL-TIME",
    description: "Designed 6+ real-world web & mobile products. Mentored 40+ designers in UX fundamentals, Figma, design laws, and portfolio building. Improved onboarding completion by 35%.",
    tags: ["6+ Products Shipped", "40+ Designers Mentored", "Curriculum Development"]
  },
  {
    company: "HackerKernel Pvt. Ltd.",
    role: "UI/UX Designer",
    period: "Mar 2023 to Feb 2024",
    location: "Bhopal, MP · On-site",
    type: "FULL-TIME",
    description: "Led UX for 6+ SaaS and enterprise products. Improved navigation efficiency by 28%, reduced usability issues by 40%, created 50+ high-fidelity prototypes, helped close 3+ major client deals through design demos.",
    tags: ["6+ SaaS Products", "Client Demos", "Multi-industry"]
  },
  {
    company: "Umpteen Innovations",
    role: "UI/UX Design Intern",
    period: "Jul 2022 to Jan 2023",
    location: "Bhopal, MP · On-site",
    type: "INTERN",
    description: "Contributed to 3 live client projects in the first 5 months. Designed 40+ wireframes and UI screens, improved usability scores by 15% through iterative testing.",
    tags: ["3 Live Projects", "40+ Wireframes"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Shibin John",
    role: "Tech Lead @ Hackerkernel",
    content: "Worked together on the same project, and it was a great experience. He understands requirements deeply and focuses on what actually matters for the client. Collaborative, easy to work with, and always open to feedback.",
    avatar: "/image/shibin_jhon_img_2x.webp"
  },
  {
    name: "Lokesh Mali",
    role: "Flutter Developer @ Hackerkernel",
    content: "Highly motivated and takes strong ownership of his work. Has a sharp eye for detail, especially in user journeys and overall experience. Great collaborator; reliable, proactive, and always brings a positive attitude to the team.",
    avatar: "/image/lokesh_mali_2x.webp"
  },
  {
    name: "Aditya Pratap Singh",
    role: "Lead Designer @ Techdome",
    content: "Aman takes time to truly understand the problem before designing. His work is thoughtful, structured, and never overcomplicated. He’s also someone you can collaborate with openly and honestly.",
    avatar: "/image/aditya_singh_2x.webp"
  },
  {
    name: "Sahiba Jain",
    role: "HR Manager @ Engineersahab Education",
    content: "Very dependable and easy to work with. He takes ownership, communicates well, and connects naturally with people around him . He brings a calm and positive energy to the team.",
    avatar: "/image/sahiba_jain_img_2x.webp"
  },
  {
    name: "Monika Nagwani",
    role: "UI/UX Designer & Mentor @ Engineersahab Education",
    content: "Aman has a very grounded approach to design. He doesn’t get carried away by trends and focuses more on what actually works for users. I’ve noticed he’s quite consistent with his process and puts real thought into even small decisions",
    avatar: "/image/monika_nagwani_2x.webp"
  }
];

export const GALLERY_ITEMS = [
  {
    image: "/image/story_one_img_2x.webp",
    caption: "Design thinking often starts with observing people, good environment and better experiences.",
    position: "top"
  },
  {
    image: "/image/story_two_img_2x.webp",
    caption: "Every climb teaches something new in places & in thinking.",
    position: "bottom"
  },
  {
    image: "/image/story_three_img_2x.webp",
    caption: "Where ideas cook and get messy before they make sense.",
    position: "top"
  },
  {
    image: "/image/story_four_img_2x.webp",
    caption: "Believing in cosmos and the controller of the cosmos.",
    position: "bottom"
  },
  {
    image: "/image/story_five_img_2x.webp",
    caption: "Curiosity goes beyond, always questioning universe & exploring its effects on life.",
    position: "top"
  },
  {
    image: "/image/story_six_img_2x.webp",
    caption: "Zooming out helps me see things differently in life & in design.",
    position: "bottom"
  },
  {
    image: "/image/story_seven_img_2x.webp",
    caption: "A lot of thoughts gets sorted out while chasing daily caffeine dose.",
    position: "top"
  },
  {
    image: "/image/story_eight_img_2x.webp",
    caption: "Not just designing also shaping new energies in the field.",
    position: "bottom"
  }
];

// --- Brand Icons (Outline Style) ---
export const BrandIcon = ({ path, size = 24, className = "" }: { path: string, size?: number, className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d={path} />
  </svg>
);

export const BRAND_PATHS = {
  figma: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z",
  miro: "M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z",
  framer: "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z",
  notion: "M4 7l8-4 8 4v10l-8 4-8-4V7z M12 3v10 M4 7l8 4 8-4 M8 12v4 M8 12l4 4 M12 12v4",
  jira: "M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z",
  confluence: "M.87 18.257c-.248.382-.53.875-.763 1.245a.764.764 0 0 0 .255 1.04l4.965 3.054a.764.764 0 0 0 1.058-.26c.199-.332.454-.763.733-1.221 1.967-3.247 3.945-2.853 7.508-1.146l4.957 2.337a.764.764 0 0 0 1.028-.382l2.364-5.346a.764.764 0 0 0-.382-1 599.851 599.851 0 0 1-4.965-2.361C10.911 10.97 5.224 11.185.87 18.257zM23.131 5.743c.249-.405.531-.875.764-1.25a.764.764 0 0 0-.256-1.034L18.675.404a.764.764 0 0 0-1.058.26c-.195.335-.451.763-.734 1.225-1.966 3.246-3.945 2.85-7.508 1.146L4.437.694a.764.764 0 0 0-1.027.382L1.046 6.422a.764.764 0 0 0 .382 1c1.039.49 3.105 1.467 4.965 2.361 6.698 3.246 12.392 3.029 16.738-4.04z",
  gemini: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
  claude: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
  maze: "M1.126 16.547c-1.5013-1.4881-1.5013-3.9009 0-5.389l4.0778-4.042c1.2692-1.258 3.205-1.4525 4.6803-.5836.4564.2687.4524.8852.077 1.2573-.3753.372-.988.34-1.4975.1923-.6524-.1891-1.386-.0287-1.9006.4813l-4.0777 4.0419a1.8935 1.8935 0 0 0 0 2.6945c.7506.744 1.9678.744 2.7184 0l8.1555-8.0836c1.5014-1.4882 3.9355-1.4882 5.437 0l4.0778 4.0418c1.5013 1.4881 1.5013 3.901 0 5.389-1.5014 1.4882-3.9356 1.4882-5.437 0l-1.3593-1.3472-1.699 1.684c-1.2692 1.258-3.205 1.4526-4.6804.5837-.4563-.2687-.4523-.8852-.077-1.2573.3754-.372.988-.34 1.4975-.1923.6524.1892 1.386.0287 1.9006-.4813l1.7476-1.7322c.724-.7175 1.8975-.7175 2.6214 0l1.4078 1.3954c.7507.744 1.9678.744 2.7186 0a1.8936 1.8936 0 0 0 0-2.6945l-4.0779-4.0419c-.7507-.744-1.9678-.744-2.7185 0L6.563 16.5471c-1.5014 1.4882-3.9356 1.4881-5.437 0",
  slack: "M5 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2v-2H5zm1.2 0c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v6zm5.8-8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2h2V5zm0 1.2c-1.1 0-2 .9-2 2s.9 2 2 2h6c1.1 0 2-.9 2-2s-.9-2-2-2h-6zm8 5.8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2v2h2zm-1.2 0c0-1.1-.9-2-2-2s-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2v-6zm-5.8 8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2h-2v2zm0-1.2c1.1 0 2-.9 2-2s-.9-2-2-2h6z",
  chatgpt: "M22.28 7.59c-.2-.45-.45-.85-.75-1.25a6.03 6.03 0 0 0-4.5-2.5c-.45 0-.9.05-1.35.15a6.03 6.03 0 0 0-4.3 3.4c-.1.3-.15.6-.2.9a6.03 6.03 0 0 0 .5 4.9c.2.4.45.8.75 1.15a6.03 6.03 0 0 0 4.5 2.5c.45 0 .9-.05 1.35-.15a6.03 6.03 0 0 0 4.3-3.4c.1-.3.15-.6.2-.9a6.03 6.03 0 0 0-.5-4.9zM12 12l0-6M12 12l5.2 3M12 12l-5.2 3",
  lovable: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  teams: "M11.42 13.17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5.5 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5.5-3.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5.5 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm11 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
};

// --- Components ---
