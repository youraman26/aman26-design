/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, type FC } from 'react';
import Lenis from 'lenis';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useInView,
  useMotionValue
} from 'motion/react';
import { 
  ArrowUpRight, 
  FileText,
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Code,
  Palette,
  Layout,
  Cpu,
  Zap,
  MessageSquare,
  Instagram,
  Globe,
  Search,
  Sparkles,
  Wrench,
  Layers,
  Monitor,
  Users,
  Users2,
  MousePointer2,
  BookOpen,
  BarChart3,
  Dribbble,
  Trello,
  Code2,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Type,
  X,
  Framer,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  FlaskConical,
  Tally3,
  ArrowLeft,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Quote,
  User,
  Workflow,
  Loader2,
  Brain,
  Activity,
  PieChart,
  Database,
  Settings2,
  Bell,
  Bug,
  UserCircle,
  ClipboardList,
  Eye,
  Shield,
  Maximize2,
  Lightbulb,
  Phone
} from 'lucide-react';

// --- Types ---
interface Project {
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

interface Skill {
  category: string;
  items: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  type: "FULL-TIME" | "INTERN";
  tags: string[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// --- Data ---
const PROJECTS: Project[] = [
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

const SKILLS = [
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

const TOOLS = [
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

const EXPERIENCES: Experience[] = [
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

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Shibin John",
    role: "Tech Lead @ Hackerkernel",
    content: "Worked together on the same project, and it was a great experience. He understands requirements deeply and focuses on what actually matters for the client. Collaborative, easy to work with, and always open to feedback.",
    avatar: "/image/shibin_jhon_img_3x.webp"
  },
  {
    name: "Lokesh Mali",
    role: "Flutter Developer @ Hackerkernel",
    content: "Highly motivated and takes strong ownership of his work. Has a sharp eye for detail, especially in user journeys and overall experience. Great collaborator; reliable, proactive, and always brings a positive attitude to the team.",
    avatar: "/image/lokesh_mali_3x.webp"
  },
  {
    name: "Aditya Pratap Singh",
    role: "Lead Designer @ Techdome",
    content: "Aman takes time to truly understand the problem before designing. His work is thoughtful, structured, and never overcomplicated. He’s also someone you can collaborate with openly and honestly.",
    avatar: "/image/aditya_singh_3x.webp"
  },
  {
    name: "Sahiba Jain",
    role: "HR Manager @ Engineersahab Education",
    content: "Very dependable and easy to work with. He takes ownership, communicates well, and connects naturally with people around him . He brings a calm and positive energy to the team.",
    avatar: "/image/sahiba_jain_img_3x.webp"
  },
  {
    name: "Monika Nagwani",
    role: "UI/UX Designer & Mentor @ Engineersahab Education",
    content: "Aman has a very grounded approach to design. He doesn’t get carried away by trends and focuses more on what actually works for users. I’ve noticed he’s quite consistent with his process and puts real thought into even small decisions",
    avatar: "/image/monika_nagwani_3x.webp"
  }
];

const GALLERY_ITEMS = [
  {
    image: "/image/story_one_img_3x.webp",
    caption: "Design thinking often starts with observing people, good environment and better experiences.",
    position: "top"
  },
  {
    image: "/image/story_two_img_3x.webp",
    caption: "Every climb teaches something new in places & in thinking.",
    position: "bottom"
  },
  {
    image: "/image/story_three_img_3x.webp",
    caption: "Where ideas cook and get messy before they make sense.",
    position: "top"
  },
  {
    image: "/image/story_four_img_3x.webp",
    caption: "Believing in cosmos and the controller of the cosmos.",
    position: "bottom"
  },
  {
    image: "/image/story_five_img_3x.webp",
    caption: "Curiosity goes beyond, always questioning universe & exploring its effects on life.",
    position: "top"
  },
  {
    image: "/image/story_six_img_3x.webp",
    caption: "Zooming out helps me see things differently in life & in design.",
    position: "bottom"
  },
  {
    image: "/image/story_seven_img_3x.webp",
    caption: "A lot of thoughts gets sorted out while chasing daily caffeine dose.",
    position: "top"
  },
  {
    image: "/image/story_eight_img_3x.webp",
    caption: "Not just designing also shaping new energies in the field.",
    position: "bottom"
  }
];

// --- Brand Icons (Outline Style) ---
const BrandIcon = ({ path, size = 24, className = "" }: { path: string, size?: number, className?: string }) => (
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

const BRAND_PATHS = {
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

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);

  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, hasMoved]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-start"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: hasMoved ? 1 : 0,
      }}
    >
      <div className="relative flex items-start">
        {/* Figma-style Arrow (Refined shape and size) */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path 
            d="M5.5 3.5L19 12.5L12.5 14L16 20.5L13.5 22L10 15.5L5.5 19.5V3.5Z" 
            fill="#4D85FF" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* "You" Label (White text, blue background) */}
        <div className="ml-1 mt-4 px-2 py-0.5 bg-[#4D85FF] text-white text-[12px] font-bold whitespace-nowrap rounded-full drop-shadow-sm">
          You
        </div>
      </div>
    </motion.div>
  );
};

const WorkPage = ({ onClose, onSelectProject }: { onClose: () => void, onSelectProject: (p: Project) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[200] bg-white overflow-y-auto"
      data-lenis-prevent
    >
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-6 py-6">
        <div className="container-wide flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">All case studies</h2>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-bg flex items-center justify-center hover:bg-border transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="container-wide px-6 py-20">
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (project.hasCaseStudy || project.pdfUrl) {
                  onSelectProject(project);
                }
              }}
              className={`group flex flex-col md:flex-row gap-8 bg-bg rounded-[40px] p-6 md:p-8 hover:shadow-xl transition-all border border-transparent hover:border-border ${project.hasCaseStudy || project.pdfUrl ? 'cursor-pointer' : ''}`}
            >
              <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 aspect-[16/10] rounded-[24px] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform rounded-[24px]"
                  
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-accent/20">
                    {project.category || "Case Study"}
                  </div>
                  <div className="h-px w-8 bg-border"></div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-ink/80 text-base md:text-lg font-normal leading-relaxed mb-6 max-w-2xl whitespace-pre-line">
                  {project.description}
                </p>
                {project.role && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-ink/10 border border-ink/10 text-ink text-[10px] uppercase tracking-wider rounded-full mb-5 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-ink/5 flex items-center justify-center">
                      <User size={10} className="text-ink" />
                    </div>
                    <span className="font-bold text-ink">{project.role}</span>
                  </div>
                )}
                <div className="flex items-center gap-6">
                  {project.pdfUrl ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-2 text-sm font-black hover:gap-3 transition-all text-ink group/link"
                    >
                      View PDF Case Study <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  ) : project.hasCaseStudy ? (
                    <button 
                      className="flex items-center gap-2 text-sm font-black hover:gap-3 transition-all text-ink"
                    >
                      View Case Study <ChevronRight size={16} />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-muted italic">Case study coming soon</span>
                  )}
                  <a 
                    href="#" 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm font-bold text-muted hover:text-ink transition-colors"
                  >
                    Live Link <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Story', href: '#story' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-bg/80 backdrop-blur-md border-b border-border' : 'py-8 bg-transparent'}`}>
        <div className="container-wide flex items-center justify-between px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-accent group-hover:border-accent transition-all duration-300 shadow-sm">
              <img 
                src="/image/mascot_img_3x.webp" 
                alt="Mascot" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl font-black text-accent tracking-tighter">ac.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target && window.lenis) {
                    (window.lenis as any).scrollTo(target);
                  }
                }}
                className="relative text-sm font-medium text-ink/70 hover:text-accent transition-colors group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block px-6 py-2 bg-gradient-to-r from-accent to-blue-600 text-white text-sm font-semibold rounded-full shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              <span className="relative z-10 flex items-center gap-2">Resume <ArrowUpRight size={16} /></span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div 
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-ink rounded-full origin-center"
              />
              <motion.div 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-ink rounded-full"
              />
              <motion.div 
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-ink rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center p-6 md:hidden"
            data-lenis-prevent
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector(item.href);
                    if (target && window.lenis) {
                      (window.lenis as any).scrollTo(target);
                    }
                  }}
                  className="text-4xl font-black text-ink hover:text-accent transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-10 py-4 bg-gradient-to-r from-accent to-blue-600 text-white text-lg font-bold rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 relative overflow-hidden group text-center inline-block"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-2 justify-center">View Resume <ArrowUpRight size={18} /></span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onViewWork }: { onViewWork: () => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Background Large Text - Subtle Product Designer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[15vw] font-black text-ink uppercase whitespace-nowrap text-center leading-none"
        >
          Product <br /> Designer
        </motion.h1>
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container-wide text-center z-10 px-6 mt-32 md:mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Centered Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-4 md:mb-6"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent bg-white shadow-lg relative z-10">
              <img 
                src="/image/mascot_img_3x.webp" 
                alt="Aman's Mascot" 
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-500 [image-rendering:auto]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Name Text below Mascot */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[14px] md:text-[18px] font-medium text-accent tracking-tight mb-8"
          >
            Hey, I am Aman Chourasiya
          </motion.h2>

          {/* New Tabs Section - 2x2 Grid on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-[340px] md:max-w-none mx-auto"
          >
            {[
              "Product First Thinking",
              "Systems & Workflows",
              "Agile Design Process",
              "AI First Design"
            ].map((tab, i) => (
              <motion.div
                key={tab}
                whileHover={{ y: -2, scale: 1.02 }}
                className="px-3 md:px-5 py-2.5 bg-white border border-border rounded-xl text-[11px] md:text-[13px] font-medium text-muted hover:text-accent hover:border-accent transition-all cursor-default shadow-sm text-center flex items-center justify-center"
              >
                {tab}
              </motion.div>
            ))}
          </motion.div>

          {/* New Main Heading with Micro-animations - Editorial Style */}
          <h1 className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-serif leading-[1.15] mb-8 max-w-4xl mx-auto tracking-tight text-ink text-center">
            <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-4">
              {"I design products and the systems behind them across SaaS, enterprise, mobile, and B2B.".split(" ").map((word, i) => {
                let color = "inherit";
                if (word.includes("SaaS")) color = "#8B5CF6";
                else if (word.includes("enterprise")) color = "#10B981";
                else if (word.includes("mobile")) color = "#F97316";
                else if (word.includes("B2B")) color = "#D946EF";
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.4 + (i * 0.04),
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="italic-serif inline-block hover:text-accent transition-colors duration-500 cursor-default"
                    style={{ color }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="italic-serif inline-block cursor-default"
                style={{ color: "#111111" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -2,
                  transition: { duration: 0.3 }
                }}
              >
                Powered by <span className="text-[#2F6BFF] font-bold">AI-Assisted Workflow</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                className="italic-serif inline-block"
              >
                and built for real operational scale.
              </motion.span>
            </div>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-to-r from-ink to-zinc-800 text-white rounded-full font-bold hover:from-accent hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/10 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              <span className="relative z-10 flex items-center gap-2">Say Hi 👋 <ArrowRight size={18} /></span>
            </a>
            <a href="mailto:chourasiyaaman76@gmail.com" className="hidden md:flex px-8 py-3 bg-white text-ink border border-ink rounded-full font-bold hover:bg-ink hover:text-white transition-colors items-center justify-center gap-2">
              Get in touch <Mail size={18} />
            </a>
            <a href="tel:+917225905369" className="flex md:hidden px-8 py-3 bg-white text-ink border border-ink rounded-full font-bold hover:bg-ink hover:text-white transition-colors items-center justify-center gap-2">
              Get On A Call <Phone size={18} />
            </a>
          </div>

        </motion.div>
      </motion.div>

      {/* Floating Visual Panels */}
      <motion.div 
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: -12 }}
        whileHover={{ 
          rotate: -5,
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-[-5%] top-[20%] w-64 h-80 rounded-[40px] border border-accent/20 hidden lg:block backdrop-blur-sm overflow-hidden group cursor-pointer shadow-2xl z-20"
      >
        <img 
          src="/image/mock_hero_img_3x.webp" 
          alt="Aman Chourasiya" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 12 }}
        whileHover={{ 
          rotate: 5,
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-[-5%] bottom-[20%] w-72 h-96 rounded-[40px] border border-accent/20 hidden lg:block backdrop-blur-sm overflow-hidden group cursor-pointer shadow-2xl z-20"
      >
        <img 
          src="/image/my_hero_img_3x.webp" 
          alt="Aman Chourasiya Work" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>
      
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const AboutSection = () => {
  return (
    <section id="about" className="bg-ink py-24 md:py-32 px-6 md:px-12 lg:px-24 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container-wide relative z-10">
        {/* Full Width Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight max-w-4xl mx-auto text-white">
            If users are <span className="italic-serif font-normal text-accent">confused</span>, it’s not them it’s the <span className="italic-serif font-normal text-accent">product</span> & I can <span className="italic-serif font-normal text-accent">fix</span> that.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <motion.div 
              whileHover={{ 
                rotate: -2,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
            >
              {/* Internal Blue Outline */}
              <div className="absolute inset-3 border-2 border-accent/20 rounded-[24px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img 
                src="/image/my_main_img_3x.webp" 
                alt="Aman Chourasiya" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-accent to-accent/80 rounded-full flex flex-col items-center justify-center p-4 text-white text-center shadow-2xl border-4 border-ink z-20 cursor-default"
            >
              <span className="text-2xl md:text-4xl font-bold tracking-tighter leading-none mb-1">3+</span>
              <span className="text-[7px] md:text-[9px] font-medium uppercase tracking-[0.2em] leading-tight opacity-90">years of<br/>experience</span>
            </motion.div>
          </motion.div>

          {/* Description Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <div className="space-y-6 text-white/70 text-lg md:text-xl font-light leading-relaxed">
              <p>
                I’m a <span className="text-white font-medium">Product & UX/UI Designer</span> with 3+ years of experience working across <span className="text-accent">SaaS, enterprise, and mobile products</span>.
                I started with an interest in how things are built, but over time, my focus shifted to how they actually work for people.
              </p>
              <p>
                Today, I design with <span className="text-white font-medium">structure in mind</span> simplifying complex workflows, improving how products perform, and building systems that keep things consistent as they grow.
                Now actively using <span className="text-accent">AI</span> as part of my workflow to move faster, iterate better, and think more clearly.
              </p>
              <p>
                I work closely with <span className="text-white font-medium">product, engineering, and stakeholder teams</span> to turn ideas into solutions that are <span className="text-accent">practical, thoughtful, and built to last</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const CaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Content for Design File Management (id: 2)
  const isTechBayLeaf = project.id === 1;
  const isDesignFileManagement = project.id === 2;
  const isMeroMedClinic = project.id === 9;
  const isSparrow = project.id === 10;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-white overflow-y-auto no-scrollbar"
      data-lenis-prevent
    >
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <span className="text-[10px] md:text-[12px] font-medium uppercase tracking-widest text-muted">Case Study</span>
          <div className="hidden md:block w-px h-4 bg-border" />
          <span className="text-xs md:text-sm font-medium tracking-tight truncate max-w-[200px] md:max-w-none">{project.title}</span>
        </div>
        <button 
          onClick={onClose}
          className="group flex items-center justify-center gap-2 rounded-full transition-all duration-300 w-10 h-10 bg-bg hover:bg-border text-ink md:w-auto md:h-auto md:px-4 md:py-2 md:bg-transparent md:border md:border-red-200 md:text-red-500 md:hover:bg-red-500 md:hover:text-white md:hover:border-red-500 shrink-0"
        >
          <X size={20} className="md:w-4 md:h-4" />
          <span className="hidden md:inline text-sm font-medium">Close Case Study</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            {isTechBayLeaf && (
              <div className="max-w-5xl mx-auto pt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-8 border border-accent/20 max-w-full text-center leading-relaxed">
                  B2B Website Design · Digital Marketing
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Building a Website <br />
                  <span className="text-accent italic-serif font-normal">That Converts</span>
                </h1>
                <div className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12 space-y-4">
                  <p>Tech Bay Leaf is a Mumbai-based high-performing digital marketing agency with 10+ years of experience managing over $20M in ad spend. Despite their success, their website was a static template that failed to reflect their premium status or drive inbound growth.</p>
                  <p>I re-architected their entire digital presence into a 15+ page conversion system designed to build trust in under 5 seconds and turn curious visitors into warm leads through data-driven information architecture.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12 mb-16">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Client</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Tech Bay Leaf</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product Designer</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Tool</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Figma</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Timeline</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">2-3 Weeks</p>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-bg mb-10">
                  <img src="/image/tbl_top_mockup_3x.webp" alt="Tech Bay Leaf Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            )}

            {isDesignFileManagement && (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-8 border border-accent/20 max-w-full text-center leading-relaxed">
                  Design Operations · Systems Thinking
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-[9rem] font-bold text-ink leading-[0.85] tracking-tighter mb-10 max-w-5xl">
                  Design file <br /><span className="text-accent italic-serif font-normal">management</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-3xl mb-12 whitespace-pre-line">
                  Scaling design collaboration for multi-designer teams
    Reducing file confusion by 70% and accelerating handoff efficiency
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      70% <span className="text-accent text-lg md:text-xl font-medium">Reduction</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">in file confusion</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Speed</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      3× <span className="text-accent text-lg md:text-xl font-medium">Faster</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">dev handoff</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Structure</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      7 <span className="text-accent text-lg md:text-xl font-medium">Pages</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">standardized types</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Status</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink">Active</p>
                    <p className="text-sm text-muted font-normal mt-1">system-wide use</p>
                  </div>
                </div>
              </>
            )}

            {isMeroMedClinic && (
              <>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                    Navigation & UX Redesign · Mero Med Clinic Admin
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Navigation as <br />
                  <span className="text-accent italic-serif font-normal">Infrastructure</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12">
                  Increased feature discoverability by 40% and reduced task completion time by 30% by re-architecting Mero Med’s clinic admin navigation into a workflow-aligned command system, which also accelerated onboarding for new staff.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product Designer</p>
                    <p className="text-sm text-muted font-normal mt-1">End-to-end redesign</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Duration</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">4 Weeks</p>
                    <p className="text-sm text-muted font-normal mt-1">Research to Handoff</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink flex items-baseline gap-1">
                      40% <span className="text-accent text-lg md:text-xl font-medium">Lower</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">cognitive load</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Tools</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Figma + AI</p>
                    <p className="text-sm text-muted font-normal mt-1">AI-Assisted Research</p>
                  </div>
                </div>
              </>
            )}

            {isSparrow && (
              <>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                    Enterprise AI · Sparrow
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Sparrow : <br />
                  <span className="text-accent italic-serif font-normal">Generate Variable</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12">
                  Designing an intuitive, AI-powered feature for intelligent variable extraction and environment management
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product designer</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Timeline</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">4 Weeks</p>
                    <p className="text-sm text-muted font-normal mt-1">Design Sprint</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink flex items-baseline gap-1">
                      8x <span className="text-accent text-lg md:text-xl font-medium">Faster</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">productivity gain</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Status</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Live</p>
                    <p className="text-sm text-muted font-normal mt-1">Shipped in Production</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="pb-32">
        {isTechBayLeaf && (
          <>
            {/* Background & The Problem */}
            <section className="section-padding bg-white">
              <div className="container-wide max-w-5xl mx-auto">
                
                {/* The Brief */}
                <div className="mb-24 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-px bg-accent" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">The Brief</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight leading-tight">
                      The brief, and what it <span className="text-accent italic-serif font-normal">really</span> meant
                    </h2>
                    <div className="space-y-6 text-lg text-ink/80 leading-relaxed">
                      <p>When Tech Bay Leaf came to us, they had a problem most growing agencies face. The business was performing well: real clients, real results, solid credibility. But their website told a completely different story.</p>
                      <p>It looked like a template, not a team. It didn't communicate the depth of their services, the scale of their work, or the confidence of a 10-year-old agency that had managed over $20M in ad spends for brands across the US, Europe, and India.</p>
                      <p>The brief was simple on paper: redesign the website. But what it really meant was to build a digital presence that matches the actual quality of the agency. One that converts a curious visitor into a warm lead without a single sales call. That's a very different problem to solve.</p>
                    </div>
                  </div>
                  <div className="bg-ink p-10 md:p-12 rounded-[32px] text-white shadow-xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-8 block">The Core Insight</span>
                    <p className="text-2xl md:text-3xl font-medium italic-serif leading-relaxed mb-8 text-white/90">
                      "The business was winning clients through referrals and relationships. The website wasn't helping. In fact, it was probably costing them deals."
                    </p>
                    <p className="text-sm text-white/50 font-medium">
                      - Aman Chourasiya, Product Designer
                    </p>
                  </div>
                </div>

                {/* The Problem */}
                <div>
                  <h3 className="text-accent font-medium text-lg mb-4">The Problem</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                    Where Business and Experience <span className="text-accent italic-serif font-normal">Break</span>
                  </h2>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
                    <p>The website was not supporting the business in converting new visitors because three critical systems were missing.</p>
                    <p><strong>First, there was no clear service structure.</strong> Users could not quickly understand what the agency offers or which service was relevant to them.</p>
                    <p><strong>Second, there was no defined conversion path.</strong> The website did not guide users from initial interest to taking action. Calls to action were weak and inconsistent.</p>
                    <p><strong>Third, there was no visible credibility system.</strong> Proof existed in the form of client work, certifications, and results, but it was not surfaced in a way that builds trust early.</p>
                    <p>Because of this, new visitors were forced to figure things out on their own. Most of them left before reaching a decision.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reframing the Challenge */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-6xl mx-auto">
                <div className="max-w-4xl mx-auto mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 text-center">Reframing the Problem</h3>
                  <div className="text-xl md:text-2xl text-white/80 leading-relaxed space-y-6 text-center mb-12">
                    <p>This was not a visual redesign problem. The issue was not about improving aesthetics.</p>
                    <p>The real problem was that the website was not designed to support how users make decisions in a B2B context.</p>
                    <p>The question became:</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <p className="text-xl md:text-2xl text-white font-medium leading-tight">
                      "How can we help a first-time visitor understand the offering, trust the agency, and decide to reach out without relying on external validation?"
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">01</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No clear service architecture</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      A visitor couldn't quickly understand what Tech Bay Leaf offered, how the services connected, or which one was right for them. Navigation was flat. Content was scattered. Every service looked the same.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">02</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No conversion logic</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      No clear journey from "I'm interested" to "let me talk to someone." Weak CTAs, invisible social proof, and no structured path to a proposal request meant real revenue was leaking quietly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">03</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No credibility architecture</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      Incredible proof existed: client names, case studies, Google/Meta/Amazon certifications, real results. None of it was surfaced in a way that built trust with a skeptical first-time visitor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Research & Discovery */}
            <section className="section-padding bg-bg">
              <div className="container-wide max-w-4xl mx-auto">
                <div className="mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4">Research & Discovery</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                    Understanding the <span className="text-accent italic-serif font-normal">Business</span>
                  </h2>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
                    <p>Before I started on full process, I evaluate more to understand the proper content and requirement of the business that need to be fulfill in the first case, So instead of directly jumping on the designs I understand the core of the business and its requirements.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-20">
                  <div className="bg-[#8B5CF6]/5 rounded-2xl p-4 border border-[#8B5CF6]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What is the primary goal of redesigning the website?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      The goal was to turn the website into a working sales touchpoint. It needed to communicate value clearly, establish credibility quickly, and guide users toward starting a conversation.
                    </p>
                  </div>
                  <div className="bg-[#10B981]/5 rounded-2xl p-4 border border-[#10B981]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">Why was a redesign needed?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      There was a clear gap between the agency’s actual capability and how it was perceived online. The website lacked structure, did not highlight real outcomes, and gave users no clear next step. As a result, it was not contributing to inbound growth.
                    </p>
                  </div>
                  <div className="bg-[#F97316]/5 rounded-2xl p-4 border border-[#F97316]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What are the brand’s mission, vision, and goals?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      The agency’s mission is to help brands grow through performance-led marketing. Its vision is to become a long-term partner for scaling businesses.
                      <br/><br/>
                      From a product perspective, this translated into three clear goals for the website. Increase inbound leads, build trust quickly for new visitors, and clearly communicate services along with outcomes.
                    </p>
                  </div>
                  <div className="bg-[#D946EF]/5 rounded-2xl p-4 border border-[#D946EF]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What would a user do after landing on the website?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      A user does not explore randomly. They try to make a decision quickly.
                      <br/><br/>
                      First, they check whether the agency looks credible. Then they look for a service that matches their need. After that, they validate through past work or case studies. If they find enough confidence, they take action. If not, they leave.
                    </p>
                  </div>
                </div>

                <div className="mb-20">
                  <h3 className="text-3xl font-bold text-ink mb-6">User-Side <span className="text-accent italic-serif font-normal">Research Questions</span></h3>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6 mb-10">
                    <p>I started by evaluating the existing website from a user’s point of view and mapping expected behavior. Instead of assuming what needed to be fixed, I framed the problem through a set of user-driven questions.</p>
                    <p>Two primary user flows were defined.</p>
                    
                    <div className="p-6 md:p-8 bg-accent/5 border-l-4 border-accent rounded-r-2xl space-y-4 my-8">
                      <p className="text-ink font-medium">For a decision maker, the journey starts on the homepage, moves to a relevant service page, then to case studies for validation, and finally to a call to action.</p>
                      <p className="text-ink font-medium">For a job seeker, the journey moves from the homepage to the careers page, where culture and values are presented before open roles, followed by the application process.</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-border shadow-sm">
                      <h4 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
                        <span className="text-2xl">🧑‍💼</span> From a Decision Maker’s Perspective:
                      </h4>
                      <ul className="space-y-4 text-ink/70 font-medium text-lg">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What does this company actually do?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Can they solve my specific problem?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Have they done this before?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Can I trust them with my budget?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What results have they delivered?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What should I do next?</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-border shadow-sm">
                      <h4 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
                        <span className="text-2xl">🧑‍💻</span> From a Job Seeker’s Perspective:
                      </h4>
                      <ul className="space-y-4 text-ink/70 font-medium text-lg">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What kind of company is this?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What is their culture?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Why should I work here?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What roles are available?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> How easy is the application process?</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-10 p-6 md:p-8 bg-accent/5 border border-accent/20 rounded-2xl text-center">
                    <p className="text-lg md:text-xl text-ink/80 font-medium">
                      The key principle here was that no page should feel like a dead end. Every page needed to guide the user toward the next logical step.
                    </p>
                  </div>
                </div>

                <div className="mb-20 bg-accent/5 p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px] border border-accent/20">
                  <div className="text-center mb-16">
                    <h3 className="text-accent font-medium text-lg mb-4">Strategy</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">
                      Insights to <span className="text-accent italic-serif font-normal">Action</span>
                    </h2>
                    <p className="text-xl text-ink/70">From our analysis, clear patterns emerged that directly informed our design decisions.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                    {/* Insight 1 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Trust is Immediate</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users form an opinion within the first few seconds.</span> If credibility is not visible immediately, they do not continue.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Lead with metrics & logos
                        </div>
                      </div>
                    </div>
                    {/* Insight 2 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Quick Identification</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users do not want to read through all services.</span> They want to quickly identify what is relevant to them.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Structured architecture
                        </div>
                      </div>
                    </div>
                    {/* Insight 3 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Proof Drives Decisions</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users rely heavily on proof.</span> Case studies, results, and recognizable clients influence their decisions more than descriptive text.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Proof embedded everywhere
                        </div>
                      </div>
                    </div>
                    {/* Insight 4 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Need Direction</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users need direction.</span> If the next step is not obvious, they drop off.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Guided journey + CTAs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 05. User Flow & IA */}
                <section className="section-padding bg-bg">
                  <div className="container-wide max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <h3 className="text-accent font-medium text-lg mb-4">Architecture</h3>
                      <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                        <span className="text-accent italic-serif font-normal">User flow</span> and Information <span className="text-accent italic-serif font-normal">Architecture</span>
                      </h2>
                      <p className="text-xl text-ink/70 mb-12">
                        Services were grouped into five clear categories. Navigation was simplified so users could move between services, case studies, and company info without confusion.
                      </p>
                    </div>

                    {/* User Flow Placeholder */}
                    <div className="mb-20">
                      <h3 className="text-2xl font-bold text-ink mb-8 text-center">User Flow</h3>
                      <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white border border-border shadow-sm mb-8 cursor-zoom-in" onClick={() => setSelectedImage("/image/common_user_flow_3x.webp")}>
                        <img src="/image/common_user_flow_3x.webp" alt="User Flow" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Two Visitors Section */}
                <div className="mb-20 bg-ink p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px]">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    Two visitors. One <span className="text-accent italic-serif font-normal">website.</span>
                  </h2>
                  <p className="text-lg text-white/70 mb-12 max-w-2xl">
                    Two primary visitor types with distinct intent, different entry points, different conversion goals. No dead ends; every page carried a persistent "Talk to our expert" CTA.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Decision Maker */}
                    <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
                      <h4 className="text-accent font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span> THE DECISION MAKER
                      </h4>
                      <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/20 -z-0"></div>
                        {[
                          { step: "1", title: "Lands on homepage", desc: "Sees $20M+ and client logos. Credibility in 5 seconds." },
                          { step: "2", title: "Navigates to service page", desc: "Finds the service relevant to their business need." },
                          { step: "3", title: "Reads case studies", desc: "Sees proof of results in their industry." },
                          { step: "4", title: "Checks About page", desc: "Validates the team, offices, and company story." },
                          { step: "✓", title: "Requests a proposal", desc: "Converts via \"Talk to our expert\" CTA.", highlight: true }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 relative z-10 items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${item.highlight ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                              {item.step}
                            </div>
                            <div>
                              <h5 className={`font-bold text-lg ${item.highlight ? 'text-accent' : 'text-white'}`}>{item.title}</h5>
                              <p className="text-white/60 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job Seeker */}
                    <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
                      <h4 className="text-accent font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span> THE JOB SEEKER
                      </h4>
                      <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/20 -z-0"></div>
                        {[
                          { step: "1", title: "Lands on homepage", desc: "Sees agency brand and culture signals." },
                          { step: "2", title: "Goes to Careers page", desc: "Reads values and benefits before listings." },
                          { step: "3", title: "Browses open roles", desc: "Filtered by department." },
                          { step: "4", title: "Clicks a role", desc: "Clean job detail with requirements." },
                          { step: "✓", title: "Completes application", desc: "Multi-step form with resume + portfolio upload.", highlight: true }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 relative z-10 items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${item.highlight ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                              {item.step}
                            </div>
                            <div>
                              <h5 className={`font-bold text-lg ${item.highlight ? 'text-accent' : 'text-white'}`}>{item.title}</h5>
                              <p className="text-white/60 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information Architecture Image */}
                <div className="mb-20">
                  <h3 className="text-2xl font-bold text-ink mb-8 text-center">Information Architecture</h3>
                  <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white border border-border shadow-sm mb-8 cursor-zoom-in" onClick={() => setSelectedImage("/image/information_architecture_3x.webp")}>
                    <img src="/image/information_architecture_3x.webp" alt="Information Architecture" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                  </div>
                </div>

                {/* 15 Pages Logic */}
                <div className="mb-20 bg-ink p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px]">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    15 pages. One clear <span className="text-blue-500 italic-serif font-normal">logic.</span>
                  </h2>
                  <p className="text-lg text-white/70 mb-12 max-w-3xl">
                    Every page followed the same structural rule: hero establishes context fast → service or content detail → social proof → CTA. Three navigation clusters kept the hierarchy legible in seconds.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Homepage", sections: "8 sections", items: "Intro · Our Work · Scale CTA · Clients · Testimonials · Certifications · Blog · Footer" },
                      { title: "Service Pages", sections: "8 sections × 5", items: "Hero · Services · Case Studies · Clients · Testimonials · Certifications · Blog · Footer" },
                      { title: "About Us", sections: "7 sections", items: "Hero · Who we are · Why us · Clients · Offices · Team · Footer" },
                      { title: "Careers", sections: "6 sections", items: "Hero · Team values · Benefits · Current openings · Who we are · CTA · Footer" },
                      { title: "Case Study Single", sections: "7 sections", items: "Hero · Intro · What we did · How we did it · Value provided · Related cases · Footer" },
                      { title: "Blog System", sections: "6 sections", items: "Blog listing · Categories · Featured · Single post · Related posts · Footer" }
                    ].map((page, i) => (
                      <div key={i} className="border border-white/10 rounded-3xl p-6 bg-white/5">
                        <div className="inline-block px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs font-medium mb-4">
                          {page.sections}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">{page.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{page.items}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="mb-20 bg-white p-8 md:p-12 rounded-[40px] border border-border shadow-sm">
                  <p className="text-lg text-ink/80 mb-12 max-w-3xl">
                    Tech Bay Leaf isn't a generalist agency. Five distinct service areas, each with its own metrics, talent structure, and client outcomes. I had to understand all of it before designing a single screen.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Ad Operations</h4>
                      <p className="text-ink/70 text-sm mb-6">End-to-end campaign management across Meta, Google, TikTok, Pinterest, LinkedIn, and Snapchat. Not just running ads; acting as a full extension of the brand's marketing team.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Performance</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Strategy</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Paid Creatives</h4>
                      <p className="text-ink/70 text-sm mb-6">Performance-led static, video, and motion creatives built around CTR, CTA, conversion, and funnel metrics. Every creative is rooted in campaign goals, not aesthetics.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">CTR</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Conversion</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-orange-500 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Email Automation + CRM</h4>
                      <p className="text-ink/70 text-sm mb-6">From onboarding sequences to retention flows, built around open rates, CTR, conversion, and list growth. Email marketing that drives revenue, not just opens.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Lifecycle</span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Retention</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-amber-600 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Managed Services</h4>
                      <p className="text-ink/70 text-sm mb-6">A complete outsourced marketing function: strategy, planning, content, analytics, and ongoing optimization. The full package for brands that want to move fast without building in-house.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Strategy</span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 07. Design */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl mx-auto text-center">
                <div className="mb-24">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Wireframing & <span className="text-accent italic-serif font-normal">Iteration</span></h2>
                  <p className="text-white/70 text-xl mb-12 max-w-3xl mx-auto">The majority of time was spent on structure rather than visuals. Low-fidelity wireframes were used to define layout and hierarchy. Multiple variations were explored, answering one question: Does the structure make it easy for users to understand and move forward?</p>
                  <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/wireframe_3x.webp")}>
                    <img src="/image/wireframe_3x.webp" alt="Wireframes" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                  </div>
                </div>
                
                <div className="mb-24">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Final <span className="text-accent italic-serif font-normal">Design</span></h2>
                  <p className="text-white/70 text-xl mb-12 max-w-3xl mx-auto">The final output included a complete website system covering over 15 pages. The homepage acts as the primary entry point, focusing on credibility and quick understanding. Service pages provide detailed breakdowns while maintaining consistency. Case studies support validation and decision-making. The blog system supports content and SEO. The careers page focuses on culture and hiring.</p>
                  <div className="flex flex-col gap-8">
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/tbl_final_ui_mock_3x.webp")}>
                      <img src="/image/tbl_final_ui_mock_3x.webp" alt="Final UI" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/tbl_ui_design_one_3x.webp")}>
                      <img src="/image/tbl_ui_design_one_3x.webp" alt="UI Mockup 1" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/tbl_ui_design_two_3x.webp")}>
                      <img src="/image/tbl_ui_design_two_3x.webp" alt="UI Mockup 2" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/tbl_all_ui_design_3x.webp")}>
                      <img src="/image/tbl_all_ui_design_3x.webp" alt="UI Mockup 3" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 06. Key Design Decisions */}
            <section className="section-padding bg-white">
              <div className="container-wide max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 tracking-wider uppercase">Key Design Decisions</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">
                    The choices that shaped the <span className="text-accent italic-serif font-normal">product.</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Leading with numbers, not words",
                      desc: 'The homepage hero leads with $20M+ Ad Spends, not "We are a digital marketing agency." Numbers make the claim for you. Every key page surfaces the most relevant metric first. Credibility before pitch.'
                    },
                    {
                      title: "Consistent structure across all 5 service pages",
                      desc: "Each service page follows the exact same section order. Intentional; a visitor exploring two services should feel oriented, not lost. In B2B, consistency is a trust signal, not laziness."
                    },
                    {
                      title: "Case study page as a sales tool",
                      desc: "Case studies were structured exactly how a sales conversation works: challenge → what we did → how → result. Ends with related cases and a soft proposal CTA. Evidence first. Ask second."
                    },
                    {
                      title: "Careers as a brand page, not a jobs board",
                      desc: 'Team values and benefits came before job listings. "Who we are" before "what we\'re hiring for." Great candidates choose culture before they choose a job description.'
                    },
                    {
                      title: "Making the Managed Services process visible",
                      desc: 'The managed services page included a step-by-step onboarding flow. Making the process visible removes the biggest B2B objection: "but how does it actually work?" Transparency converts.'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="group bg-bg p-8 md:p-10 rounded-[32px] border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-ink mb-4 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-ink/70 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 tracking-wider uppercase">Impact</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    What changed after the <span className="text-accent italic-serif font-normal">launch.</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-16">
                  {[
                    { top: "15+", bottom: "Pages designed & shipped" },
                    { top: "5", bottom: "Dedicated service pages" },
                    { top: "3x", bottom: "Average CTAs per page" },
                    { top: "100%", bottom: "Consistent design system" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-between h-full">
                      <h4 className="text-4xl font-bold text-accent mb-4">{item.top}</h4>
                      <p className="text-white/70 font-medium">{item.bottom}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 p-10 rounded-[32px] border border-white/10">
                  <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12 text-center">
                    The redesign improves how quickly users understand the offering, builds trust within the first interaction, and creates a clear path to action. Structuring services, surfacing proof early, and guiding users through a defined flow reduces friction and increases conversion readiness.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Users can now identify relevant services within the first 10–15 seconds, reducing confusion and improving decision speed.",
                      "Early visibility of credibility signals reduces initial drop-offs and improves user confidence within the first interaction.",
                      "Clear and repeated CTAs ensure users always have a defined next step, improving conversion intent.",
                      "A structured flow reduces friction and helps users move from exploration to decision with fewer steps.",
                      "Positioning case studies before CTAs increases user confidence and supports conversion decisions.",
                      "Consistent page structure helps users navigate and compare services without relearning layouts.",
                      "Presenting culture and values before roles improves candidate engagement and application quality."
                    ].map((point, index) => (
                      <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
                        <p className="text-white/80 text-lg leading-relaxed">
                          {point.split(" ").map((word, i) => {
                            if (["10–15", "seconds,", "credibility", "CTAs", "structured", "case", "studies", "Consistent", "culture", "values"].includes(word.replace(/[.,]/g, ""))) {
                              return <span key={i} className="text-accent font-semibold">{word} </span>;
                            }
                            return <span key={i}>{word} </span>;
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 08. Epilogue */}
            <section className="section-padding bg-bg">
              <div className="container-wide max-w-4xl mx-auto">
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 border border-border shadow-sm text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-16 tracking-tight">
                    What this project changed <br/>in how I <span className="text-accent italic-serif font-normal">design.</span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-16 text-left">
                    {[
                      {
                        num: "01",
                        title: "B2B websites are sales tools, not brochures",
                        desc: "Every design decision had to be evaluated through one lens: does this move a visitor closer to a proposal request? In B2B, structure matters more than style."
                      },
                      {
                        num: "02",
                        title: "Content architecture is the real design work",
                        desc: "The IA and wireframe phase took longer than the visual design phase. Getting information hierarchy right is where the actual design thinking lives."
                      },
                      {
                        num: "03",
                        title: "Consistency is a trust signal",
                        desc: "When every service page follows the same structure, the visitor feels in control. Predictability in B2B isn't boring; it's reassuring."
                      },
                      {
                        num: "04",
                        title: "Social proof is a design element",
                        desc: "Client logos, testimonials, certifications, and case studies were structural parts of every page from wireframe stage. Show good proof early and often."
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-bg p-8 rounded-3xl border border-border">
                        <div className="text-4xl font-bold text-accent/30 mb-4">{item.num}</div>
                        <h4 className="text-xl font-bold text-ink mb-3">{item.title}</h4>
                        <p className="text-ink/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-8 text-lg text-ink/70 leading-relaxed mb-12 text-left">
                    <div>
                      <h4 className="font-bold text-ink mb-2">Challenges</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Balancing the amount of content. The agency had a lot to say, but presenting everything at once created confusion.</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Structuring multiple services without making the website feel complex.</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Constantly aligning business expectations with user needs, ensuring the design supports both.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-8 bg-ink rounded-3xl border border-blue-900/50 text-center">
                    <p className="text-2xl text-blue-400 font-medium italic-serif mb-4">
                      "A visually good design attracts attention. A structured system converts that attention into action."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Reflection */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl mx-auto text-center">
                <h3 className="text-accent font-medium text-lg mb-8 tracking-wider uppercase">Final Reflection</h3>
                <p className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  "Tech Bay Leaf didn't need a trendy design. They needed a website that worked as hard as they do — <span className="text-accent italic-serif font-normal">structured, credible, and built to turn a curious visitor into a client conversation.</span>"
                </p>
                <div className="w-20 h-1 bg-accent mx-auto mt-12" />
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isDesignFileManagement && (
          <>
            {/* The Problem */}
            <section className="section-padding bg-white">
              <div className="container-wide grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    The problem nobody talks about <span className="italic-serif font-normal text-accent">design file chaos.</span>
                  </h2>
                  <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                    <p>When you're working solo in Figma, almost any file structure seems to work.</p>
                    <p>But the moment a second designer joins or a PM, developer, or new team member steps in that informal system breaks down instantly.</p>
                    <p>I’ve seen it happen too often:</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Pages named “Final_v3_ACTUAL_FINAL”.</li>
                      <li>Wireframes mixed with shipped designs.</li>
                      <li>No clear indication of what’s approved.</li>
                      <li>Developers picking up the wrong screens and building from outdated versions.</li>
                    </ul>
                    <p>What once felt manageable quickly turns into confusion, misalignment, and costly mistakes.</p>
                  </div>
                </div>
                <div className="bg-ink p-10 md:p-14 rounded-[32px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageSquare size={120} />
                  </div>
                  <p className="text-xl md:text-3xl font-display italic leading-relaxed relative z-10 mb-8">
                    "Design files were becoming a bottleneck instead of an enabler. Every hour lost to file confusion is an hour stolen from actual design work."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold">AC</div>
                    <div>
                      <p className="font-bold text-lg">Aman Chourasiya</p>
                      <p className="text-[12px] text-white/40 uppercase tracking-[0.2em] font-medium">Product Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Before & After Comparison */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent mb-4 block">Transformation</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    From scattered pages to a <span className="italic-serif font-normal text-accent">structured system.</span>
                  </h2>
                  <p className="text-muted text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                    The transformation wasn't just visual. Every page in the new structure has a clear purpose, a defined lifecycle stage, and a specific audience.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Before */}
                  <div className="bg-white rounded-[40px] border border-border overflow-hidden shadow-sm flex flex-col">
                    <div className="bg-red-50 px-8 py-5 border-b border-red-100 flex justify-between items-center">
                      <span className="text-[12px] font-medium text-red-600 uppercase tracking-[0.2em]">Old Structure</span>
                      <span className="px-2 py-1 bg-red-100 text-[10px] font-medium text-red-600 rounded uppercase">Unstructured</span>
                    </div>
                    <div className="p-6 md:p-10 bg-bg flex-1 flex items-center justify-center">
                      <img 
                        src="/image/old_file_img_3x.webp" 
                        alt="Before" 
                        className="w-full block cursor-zoom-in" 
                        
                        referrerPolicy="no-referrer" 
                        onClick={() => setSelectedImage("/image/old_file_img_3x.webp")}
                      />
                    </div>
                    <div className="p-8 md:p-10 bg-white border-t border-border">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          No hierarchy or lifecycle logic
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          WIP mixed with final references
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          Ambiguous page naming
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-white rounded-[40px] border border-accent/20 overflow-hidden shadow-xl shadow-accent/5 flex flex-col">
                    <div className="bg-accent/5 px-8 py-5 border-b border-accent/10 flex justify-between items-center">
                      <span className="text-[12px] font-medium text-accent uppercase tracking-[0.2em]">New System</span>
                      <span className="px-2 py-1 bg-accent/10 text-[10px] font-medium text-accent rounded uppercase">System-Driven</span>
                    </div>
                    <div className="p-6 md:p-10 bg-bg flex-1 flex items-center justify-center">
                      <img 
                        src="/image/new_file_img_3x.webp" 
                        alt="After" 
                        className="w-full block cursor-zoom-in" 
                        
                        referrerPolicy="no-referrer" 
                        onClick={() => setSelectedImage("/image/new_file_img_3x.webp")}
                      />
                    </div>
                    <div className="p-8 md:p-10 bg-white border-t border-border">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Three-layer architecture (Entry, Exec, Support)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Clear "Locked" vs "WIP" separation
                        </div>
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Index page as single source of truth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Deep Dive */}
            <section className="section-padding bg-ink text-white overflow-hidden">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-32">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Deep Dive 01</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The index <span className="italic-serif font-normal text-accent">the file's control panel.</span>
                    </h2>
                    <div className="space-y-10">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Search className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Single source of truth</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Navigation dashboard linking to all pages, status tracking, Jira references, and ownership in one place.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Clock className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Status progression</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Visual tracking from Planned → Design Locked → Development. Zero ambiguity on what's ready to build.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/file_index_img_3x.webp")}
                  >
                    <img 
                      src="/image/file_index_img_3x.webp" 
                      alt="Deep Dive 1" 
                      className="w-full h-auto block" 
                      
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl order-2 lg:order-1 cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/desigb_checklist_img_3x.webp")}
                  >
                    <img 
                      src="/image/desigb_checklist_img_3x.webp" 
                      alt="Deep Dive 2" 
                      className="w-full h-auto block" 
                      
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                  <div className="order-1 lg:order-2">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Deep Dive 02</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Design checklist <span className="italic-serif font-normal text-accent">the quality gate.</span>
                    </h2>
                    <div className="space-y-10">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <ShieldCheck className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Three-gate validation</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Required checks before starting, before review, and before handoff. Removes dependence on memory.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Workflow className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Handoff readiness</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Confirms specs are complete, assets are exported, and Jira tickets are updated. Handoff becomes a non-event.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Workflow Steps */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Process</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    How a design moves from <span className="italic-serif font-normal text-accent">idea to shipped.</span>
                  </h2>
                </div>

                <div className="space-y-0">
                  {[
                    { num: "01", title: "Start with context", desc: "Before designing anything, the Index is updated with project scope and Jira links. The Thumbnail is set for immediate identification." },
                    { num: "02", title: "Validate before designing", desc: "The Pre-design checklist is completed. This forces alignment on requirements and constraints before a single pixel is moved." },
                    { num: "03", title: "Design in WIP", desc: "All active work happens in WIP Designs, organized by feature. This is the safe zone for creativity and exploration." },
                    { num: "04", title: "Quality check", desc: "The review and handoff checklists are completed. UX validation and component consistency are verified." },
                    { num: "05", title: "Lock and mark", desc: "Approved designs move to Locked. Status is updated in Index. No further edits are made to locked screens." }
                  ].map((step, i) => (
                    <div key={i} className="group grid md:grid-cols-[120px_1fr] gap-12 py-16 border-b border-border last:border-none">
                      <div className="text-5xl md:text-7xl font-black text-border group-hover:text-accent transition-colors duration-500">{step.num}</div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h4>
                        <p className="text-muted text-lg md:text-xl font-normal leading-relaxed max-w-4xl">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">70%</div>
                    <p className="text-xl font-bold mb-3">Reduction in confusion</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      Fewer "where is the latest version?" questions from cross-functional partners.
                    </p>
                  </div>
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">3×</div>
                    <p className="text-xl font-bold mb-3">Faster Onboarding</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      New designers can navigate complex files in under 30 seconds without a guided tour.
                    </p>
                  </div>
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">0</div>
                    <p className="text-xl font-bold mb-3">Version Errors</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      Zero instances of developers building from outdated or exploratory design versions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-ink text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full -mb-64" />
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Sparkles size={40} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight">
                  "This is not just a file structure. It's a <span className="italic-serif font-normal text-accent">design operations system</span> one that lets designers focus on solving problems instead of managing chaos."
                </h2>
                <div className="w-16 h-1 bg-accent mx-auto mb-10" />
                <p className="text-white/40 text-[12px] font-medium uppercase tracking-[0.2em] mb-16">Designed by Aman Chourasiya · Product Designer</p>
                <button 
                  onClick={onClose}
                  className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                  <span className="relative z-10">Back to Portfolio</span>
                </button>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isMeroMedClinic && (
          <>
            {/* The Context */}
            <section className="section-padding bg-white">
              <div className="container-wide grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Building the command layer <span className="italic-serif font-normal text-accent">behind fast paced clinical operations.</span>
                  </h2>
                  <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                    <p className="text-muted text-lg font-normal leading-relaxed">
                      Mero Med's Clinic Admin panel is the operational nervous system for clinical practices running on the platform. Every day, administrators use it to move patients through encounter and prescription workflows, configure staff and clinic entities, manage communication queues, review schedules, and track revenue often simultaneously.
                    </p>
                    <p className="text-muted text-lg font-normal leading-relaxed">
                      In this environment, the sidebar is not a menu. It is infrastructure. It determines how fast staff can act, how much mental effort each workflow costs, and whether new team members can be onboarded without weeks of friction. When infrastructure is poorly designed, every user pays a tax invisibly, repeatedly, across every session.
                    </p>
                  </div>
                </div>
                <div className="bg-ink p-10 md:p-14 rounded-[32px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageSquare size={120} />
                  </div>
                  <p className="text-xl md:text-3xl font-display italic leading-relaxed relative z-10 mb-8">
                    "The sidebar felt like a junk drawer. Everything was there, but finding what you needed took too many clicks and too much thinking."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold">AC</div>
                    <div>
                      <p className="font-bold text-lg">Aman Chourasiya</p>
                      <p className="text-[12px] text-white/40 uppercase tracking-[0.2em] font-medium">Product Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Challenge */}
            <section className="section-padding bg-bg border-y border-border">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                  {/* Left Side: Heading and Text */}
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Challenge</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The navigation that <span className="italic-serif font-normal text-accent">grew, not designed.</span>
                    </h2>
                    <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                      <p>As Mero Med grew, the sidebar didn’t really get redesigned it just kept expanding. Every time a new feature shipped, it found a place in the navigation. Over time, this turned the sidebar into a collection of modules rather than a system.</p>
                      <p>What we ended up with was something that reflected how the product evolved internally, not how clinics actually operate day to day. Related workflows were scattered, some actions took longer to reach than they should.</p>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-6 p-6 bg-white rounded-3xl border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-white shrink-0">AC</div>
                      <p className="text-ink/60 text-base italic font-display leading-relaxed">
                        "The navigation was a reflection of our internal team structure, not the user's workflow."
                      </p>
                    </div>
                  </div>

                  {/* Right Side: UX Visualization */}
                  <div className="bg-ink rounded-[40px] p-0 border border-white/10 relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10">
                      <img 
                        src="/image/old_navbar_img_3x.webp" 
                        alt="Legacy Sidebar UX Visualization" 
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>

                {/* Below them: 3x2 Grid of Pointers */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "No Logical Grouping", 
                      icon: <Layers size={20} />,
                      desc: "Clinical actions scattered with no clustering staff hunt the full sidebar for one workflow." 
                    },
                    { 
                      title: "Flat Hierarchy", 
                      icon: <BarChart3 size={20} />,
                      desc: "Dashboard and Settings at equal visual weight. No signal for what matters most in a busy clinic." 
                    },
                    { 
                      title: "Inconsistent Sub-nav", 
                      icon: <MousePointer2 size={20} />,
                      desc: "Some items expand on click, others don't. Users re-discover behavior every session." 
                    },
                    { 
                      title: "Workflow-Irrelevant", 
                      icon: <Zap size={20} />,
                      desc: "Ordered by when built, not how used by the administrators or clinical staff." 
                    },
                    { 
                      title: "Weak Icon Differentiation", 
                      icon: <Search size={20} />,
                      desc: "Icons lacked silhouette distinction. Fast-paced sessions need instant recognition." 
                    },
                    { 
                      title: "Scalability Dead End", 
                      icon: <AlertCircle size={20} />,
                      desc: "The flat structure had no room to grow. Every new module simply extended an already-long list." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-3xl border border-border hover:border-red-500/30 transition-all group flex flex-col gap-4 items-start shadow-sm hover:shadow-md">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink mb-2 group-hover:text-red-500 transition-colors">{item.title}</h4>
                        <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Operational Friction Quote */}
                <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border-l-4 border-blue-600 shadow-sm flex flex-col gap-6">
                  <p className="text-xl md:text-2xl italic-serif text-ink leading-relaxed">
                    "In a clinic seeing 40+ patients a day, a 10-second navigation delay costs over 6 minutes per staff member, invisible, but compounding every single session."
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    <span>Operational friction cost</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>Daily impact</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Reframing the Problem */}
            <section className="section-padding bg-white overflow-hidden">
              <div className="container-wide">
                <div className="w-full">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Reframing the Problem</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Not visual but <span className="italic-serif font-normal text-blue-600">structural.</span>
                  </h2>
                  <p className="text-muted text-lg font-normal leading-relaxed mb-16 max-w-3xl">
                    Before sketching any new structure, I needed to reframe what the problem actually was. The instinct in most navigation redesigns is to ask "how do we make this look cleaner?" That framing leads to cosmetic fixes. I needed a structural answer which required a completely different question.
                  </p>

                  <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden mb-16 group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>
                    
                    <div className="relative z-10">
                      <span className="bg-white text-blue-900 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 inline-block shadow-sm">The Design Question</span>
                      <h3 className="text-2xl md:text-5xl italic-serif font-normal leading-tight mb-12 max-w-4xl">
                        "How does a clinic administrator actually think about their day and how should the navigation reflect that mental model?"
                      </h3>
                      
                      <div className="bg-white rounded-[32px] p-8 md:p-12 mt-12 shadow-xl relative z-10">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <span className="text-red-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 block">Old Thinking</span>
                            <ul className="space-y-6 text-ink/70 font-medium text-base md:text-lg">
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Organize by feature
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Built for the roadmap
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Static list
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Navigate to explore
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span className="text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 block">New Thinking</span>
                            <ul className="space-y-6 text-ink/70 font-medium text-base md:text-lg">
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Organize by workflow
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Built for clinic rhythm
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Intent-clustered system
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Navigate to execute
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-l-4 border-blue-600 p-8 md:p-12 rounded-3xl mt-12 shadow-sm flex flex-col gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">The key behavioral insight:</span>
                    <p className="text-xl md:text-2xl italic-serif text-ink leading-relaxed">
                      Clinic admins don't navigate to <span className="text-blue-600">explore</span>. They navigate to <span className="text-blue-600">execute</span>. Every click is goal-directed. The system's job is to get out of their way as fast as possible.
                    </p>
                  </div>
                </div>
              </div>
            </section>




            {/* Problem vs. Solution Mapping */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent mb-4 block">Problem vs. Solution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    Mapping <span className="italic-serif font-normal text-accent">pain to progress.</span>
                  </h2>
                  <p className="text-muted text-lg font-normal max-w-2xl mx-auto">
                    We didn't just redesign the UI; we re-engineered the operational flow of the clinic.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <AlertCircle className="text-red-500" />
                      The Problems
                    </h3>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Cognitive Overload</h4>
                      <p className="text-muted text-sm">14+ flat items forced users to scan the entire list for every task, causing "decision paralysis" during busy hours.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Hidden Critical Tasks</h4>
                      <p className="text-muted text-sm">Billing and Patient Records were buried under less important settings, leading to operational bottlenecks.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Inconsistent Patterns</h4>
                      <p className="text-muted text-sm">Icons and labels didn't follow a unified system, increasing the time taken to recognize and click the right tool.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Lack of Scalability</h4>
                      <p className="text-muted text-sm">New features were added haphazardly, making the interface feel cluttered and "bolted together."</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <CheckCircle2 className="text-accent" />
                      The Solutions
                    </h3>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Hierarchical UX</h4>
                      <p className="text-muted text-sm">Grouped items into 3 logical buckets (Core, Management, System), reducing primary nav to 6 items.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Priority Anchoring</h4>
                      <p className="text-muted text-sm">Placed 'Appointments' and 'Patients' at the top for instant access, reducing click depth for 80% of tasks.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Unified Design System</h4>
                      <p className="text-muted text-sm">Built a custom icon library and standardized interaction states, improving visual recognition speed by 30%.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Modular Architecture</h4>
                      <p className="text-muted text-sm">Created a flexible sidebar component that can accommodate new modules without disrupting the core workflow.</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Navigation Application Anatomy */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="bg-bg p-4 md:p-8 rounded-[32px] border border-border">
                  <img 
                    src="/image/navigation_application_img_3x.webp" 
                    alt="Navigation application anatomy" 
                    className="w-full h-auto rounded-2xl" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* Interaction & UX Evolution: Full Audit & Redesign (Dark Theme) */}
            <section className="section-padding bg-ink text-white overflow-hidden relative border-t border-white/5">
              <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                <Workflow size={600} />
              </div>
              
              <div className="container-wide relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mb-24">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.3em] mb-4 block">INFORMATION ARCHITECTURE & DESIGN DECISION</span>
                  <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                    From Features to <span className="italic-serif font-normal text-accent">Workflows.</span>
                  </h2>
                  <p className="text-white/80 text-xl font-normal leading-relaxed max-w-3xl mb-8">
                    The redesign transformed a fragmented navigation into a structured, workflow-aligned system reducing friction, improving discoverability, and enabling faster execution of high-frequency clinical tasks.
                  </p>
                  <div className="inline-flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="p-4 bg-accent rounded-2xl">
                      <Brain size={32} className="text-ink" />
                    </div>
                    <div>
                      <p className="text-lg font-bold italic">"I didn’t reorganize the menu, I restructured how the product is accessed, aligning navigation with real clinical workflows instead of feature growth."</p>
                    </div>
                  </div>
                </div>

                {/* UX Comparison: Old vs New */}
                <div className="grid lg:grid-cols-12 gap-12 mb-32">
                  {/* Old Navigation (Left) */}
                  <div className="lg:col-span-4">
                    <div className="p-10 bg-white/5 rounded-[48px] border border-white/10 h-full">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Old Interaction Model</h3>
                      </div>
                      <div className="space-y-2 opacity-40">
                        {[
                          "Dashboard", "GFE Review", "ePrescription", "New Order", "SmarterRx", "Clinics", "Staff", "Communication", "Support", "Clients", "Schedule", "  - Appointments", "  - Calendar", "  - Events", "Commerce", "Sales", "Reports", "Tools", "Logout"
                        ].map((item, i) => (
                          <div key={i} className="text-sm font-medium py-1.5 border-b border-white/5 last:border-0">{item}</div>
                        ))}
                      </div>
                      <div className="mt-10 p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Nature of Old UX</p>
                        <p className="text-xs text-red-400/70 leading-relaxed">Flat, feature-accumulated list. No clear domain separation. High cognitive load due to lack of hierarchy.</p>
                      </div>
                    </div>
                  </div>

                  {/* New Navigation (Right) */}
                  <div className="lg:col-span-8">
                    <div className="p-10 bg-accent/5 rounded-[48px] border border-accent/20 h-full">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent),0.4)]" />
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">New UX Framework</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {[
                          { id: "01", group: "Overview", items: ["Dashboard"], icon: Layout },
                          { id: "02", group: "Clinical Operations", items: ["Encounter", "Patients", "Orders"], icon: Activity },
                          { id: "03", group: "Communication", items: ["Patient Chat", "Support Tickets"], icon: MessageSquare },
                          { id: "04", group: "Scheduling", items: ["Appointments", "Calendar", "Events"], icon: Clock },
                          { id: "05", group: "Financial System", items: ["Transactions", "Funding", "Invoicing", "Customers"], icon: Database },
                          { id: "06", group: "Analytics", items: ["Encounter Reports", "Transaction Reports"], icon: PieChart },
                          { id: "07", group: "Products & Ecosystem", items: ["Products & Services", "Wizlo Marketplace"], icon: Globe },
                          { id: "08", group: "Data Capture", items: ["Forms"], icon: ClipboardList },
                          { id: "09", group: "System Configuration", items: ["Clinics", "Staff", "Patient Portal", "Integrations", "Roles & Permissions", "Activity Logs"], icon: Settings2 },
                          { id: "10", group: "Utilities", items: ["Notifications", "Bug Reporting", "Profile / Controls"], icon: Bell }
                        ].map((zone) => (
                          <div key={zone.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/30 transition-colors group/zone">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-1 rounded">{zone.id}</span>
                                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{zone.group}</h4>
                              </div>
                              <zone.icon size={16} className="text-white/20 group-hover/zone:text-accent transition-colors" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {zone.items.map(item => (
                                <span key={item} className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/70">{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 1 Image */}
                <div className="mb-32 w-full">
                  <div className="bg-bg p-4 md:p-8 rounded-[32px] border border-border">
                    <img 
                      src="/image/ia_mindmap_img_3x.webp" 
                      alt="Deep Dive 01" 
                      className="w-full h-auto rounded-2xl block" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Decision Making Pointers */}
                <div className="mb-32">
                  <div className="text-center mb-16">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Decision Making Pointers</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-white">
                      The strategic logic behind every <span className="italic-serif font-normal text-accent">structural shift.</span>
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {/* Column Headers */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4 px-2">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={18} className="text-red-500" />
                        <h4 className="text-[12px] font-medium uppercase tracking-[0.3em] text-red-500">The Problem</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-accent" />
                        <h4 className="text-[12px] font-medium uppercase tracking-[0.3em] text-accent">The Resolution</h4>
                      </div>
                    </div>

                    {[
                      { prob: "Flat, undifferentiated module list", res: "6 intent-based operational zones with visual groupings" },
                      { prob: "Inconsistent, unpredictable sub-navigation", res: "Nesting only where structurally justified (Schedule only)" },
                      { prob: "No visual hierarchy, everything equal weight", res: "Weight, indentation, and group labels create clear tiers" },
                      { prob: "Ordered by product roadmap, not user workflow", res: "Ordered by operational frequency and clinical phase" },
                      { prob: "Generic icons with poor differentiation", res: "Distinct silhouette-based icon system for recognition" },
                      { prob: "No spatial orientation in deep workflows", res: "Breadcrumb anchors context across all multi-step flows" },
                      { prob: "Dead end, every feature extends the flat list", res: "Zone-based architecture absorbs new modules without disruption" }
                    ].map((item, i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                          <p className="text-lg font-medium text-white/70">{item.prob}</p>
                        </div>
                        <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20">
                          <p className="text-lg font-medium text-white">{item.res}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Metrics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
                  {[
                    { val: "3.2s", label: "Average navigation speed" },
                    { val: "92%", label: "Task success rate" },
                    { val: "14", label: "Fewer clicks per workflow" },
                    { val: "Top 5", label: "Most used clinical modules" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-4xl md:text-6xl font-black text-accent mb-2">{stat.val}</p>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* IA Summary Comparison Bar */}
            <section className="py-24 bg-white border-y border-border">
              <div className="container-wide">
                <div className="bg-white rounded-[40px] border border-border overflow-hidden flex flex-col md:flex-row items-stretch">
                  {/* Left: Unstructured */}
                  <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-black text-[#E54D4D] mb-3 uppercase tracking-tighter whitespace-nowrap">Unstructured</h3>
                    <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-muted flex flex-wrap gap-x-2">
                      <span>25+ ITEMS</span>
                      <span className="opacity-30">·</span>
                      <span>FLAT LIST</span>
                      <span className="opacity-30">·</span>
                      <span>NO INTENT GROUPING</span>
                    </p>
                  </div>
                  
                  {/* Middle: Redesigned */}
                  <div className="border-y md:border-y-0 md:border-x border-border p-6 sm:p-10 md:p-16 flex flex-col items-center justify-center text-center min-w-[240px] text-accent">
                    <ArrowRight size={32} className="mb-3" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">Redesigned</span>
                  </div>
                  
                  {/* Right: 6 Intent Zones */}
                  <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center md:items-end md:text-right">
                    <h3 className="text-2xl md:text-3xl font-black text-accent mb-3 uppercase tracking-tighter whitespace-nowrap">6 Intent Zones</h3>
                    <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-muted flex flex-wrap gap-x-2 md:justify-end">
                      <span>WORKFLOW-ORDERED</span>
                      <span className="opacity-30">·</span>
                      <span>1 JUSTIFIED NESTING LEVEL</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How the System Behaves */}
            <section className="section-padding bg-bg overflow-hidden">
              <div className="container-wide">
                <div className="max-w-4xl mb-24">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.3em] mb-4 block">Interaction Strategy</span>
                  <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                    How the system <span className="italic-serif font-normal text-accent">behaves.</span>
                  </h2>
                  <p className="text-muted text-xl font-normal leading-relaxed max-w-3xl">
                    The architecture defined what to show. These design decisions defined how, and how the interface scales from a new staff member's first session to an expert's hundredth.
                  </p>
                </div>

                {/* Navigation States Images */}
                <div className="mb-32">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="rounded-[32px] overflow-hidden border border-border shadow-sm bg-bg p-6 cursor-zoom-in"
                        onClick={() => setSelectedImage("/image/collapse_navbar_img_3x.webp")}
                      >
                        <img 
                          src="/image/collapse_navbar_img_3x.webp" 
                          alt="Collapsed State: Icon Only" 
                          className="w-full h-auto rounded-[24px] block" 
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Collapsed State: Icon Only</h3>
                        <p className="text-muted leading-relaxed">
                          Distinct silhouette-based icons. After one week, staff navigate by visual memory alone, no reading required.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="rounded-[32px] overflow-hidden border border-border shadow-sm bg-bg p-6 cursor-zoom-in"
                        onClick={() => setSelectedImage("/image/expanded_navbar_img_3x.webp")}
                      >
                        <img 
                          src="/image/expanded_navbar_img_3x.webp" 
                          alt="Expanded State: Full Labels" 
                          className="w-full h-auto rounded-[24px] block" 
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Expanded State: Full Labels</h3>
                        <p className="text-muted leading-relaxed">
                          Labels, hierarchy, and nesting visible. Schedule expands, the only justified nested group.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principles List Wrapped in Container */}
                <div className="bg-white p-6 md:p-20 rounded-[32px] md:rounded-[48px] border border-border shadow-sm overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-x-24 gap-y-12 md:gap-y-20">
                    {[
                      {
                        num: "1",
                        title: "Dual-State Navigation: Collapsed & Expanded",
                        desc: "Power users get icon-only speed. New staff get labels and hierarchy. The interface grows with the user; no one is forced into the wrong mode."
                      },
                      {
                        num: "2",
                        title: "Recognition Over Recall",
                        desc: "Every item bound to a consistent, distinctive icon. After a week of use, staff stop reading labels; they navigate by visual muscle memory alone."
                      },
                      {
                        num: "3",
                        title: "Progressive Disclosure: Nest Only What Belongs Together",
                        desc: "Nesting introduced in exactly one place: Schedule. The rule: nest only when sub-items are genuine variants of a parent concept, not independent features."
                      },
                      {
                        num: "4",
                        title: "Breadcrumb System: Contextual Orientation",
                        desc: "Enables non-linear backward navigation. Critical for staff managing multiple patients simultaneously.",
                        extra: (
                          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3 px-4 md:px-5 py-3 bg-bg rounded-2xl border border-border w-fit shadow-sm">
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-muted">Dashboard</span>
                            <ChevronRight size={10} className="text-muted/30 md:w-3 md:h-3" />
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-muted">Schedule</span>
                            <ChevronRight size={10} className="text-muted/30 md:w-3 md:h-3" />
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Calendar</span>
                          </div>
                        )
                      },
                      {
                        num: "5",
                        title: "Active State & Visual Hierarchy",
                        desc: "In high-speed clinical environments, the cost of unnoticed wrong navigation is significant. Active states, indentation, and grouping eliminate that ambiguity."
                      }
                    ].map((principle, i) => (
                      <div key={i} className="flex gap-4 md:gap-10">
                        <div className="text-4xl md:text-5xl font-black text-accent/10 shrink-0 leading-none">{principle.num}</div>
                        <div className="min-w-0">
                          <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 tracking-tight leading-snug break-words">{principle.title}</h4>
                          <p className="text-muted leading-relaxed text-base md:text-lg break-words">{principle.desc}</p>
                          {principle.extra}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* Design System */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="flex flex-col items-center justify-center gap-10 md:gap-16">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-full rounded-3xl overflow-hidden border border-border shadow-xl cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/navigation_system_img_3x.webp")}
                  >
                    <img src="/image/navigation_system_img_3x.webp" alt="Design System" className="w-full h-auto block" referrerPolicy="no-referrer" />
                  </motion.div>
                  <div className="max-w-3xl text-center flex flex-col items-center">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Visual Language</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Consistency through <span className="italic-serif font-normal text-accent">design systems.</span>
                    </h2>
                    <p className="text-muted text-lg font-normal mb-8 leading-relaxed">
                      This wasn't just a rearrangement of tabs; it was the creation of a reusable navigation system with consistent iconography, clear active states, and responsive behavior.
                    </p>
                    <ul className="flex flex-wrap justify-center gap-6 text-left">
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Standardized Icon Library
                      </li>
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Clear Visual Hierarchy
                      </li>
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Accessible Contrast Ratios
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Before & After */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    The <span className="italic-serif font-normal text-accent">Transformation.</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-center font-bold text-muted uppercase tracking-widest text-sm">Before</p>
                    <div className="bg-bg p-6 rounded-3xl border border-border shadow-sm">
                      <img src="/image/before_new_nav_img_3x.webp" alt="Before" className="w-full h-auto rounded-2xl" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-center font-bold text-accent uppercase tracking-widest text-sm">After</p>
                    <div className="bg-bg p-6 rounded-3xl border border-accent/20 shadow-xl shadow-accent/5">
                      <img src="/image/after_new_nav_img_3x.webp" alt="After" className="w-full h-auto rounded-2xl" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Metrics & Results */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Result</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Quantifiable improvements in <span className="italic-serif font-normal text-accent">clinic efficiency.</span>
                    </h2>
                    <p className="text-muted text-lg mb-12 leading-relaxed">
                      The redesign wasn't just about aesthetics; it was about operational efficiency. By aligning the system with clinical workflows, we transformed the interface into a tool for speed and precision.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="p-8 bg-bg rounded-3xl border border-border">
                        <div className="text-4xl font-black text-accent mb-2">40%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">Reduction</p>
                        <p className="text-xs text-muted mt-1">in cognitive load (NASA-TLX)</p>
                      </div>
                      <div className="p-8 bg-bg rounded-3xl border border-border">
                        <div className="text-4xl font-black text-accent mb-2">25%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">Faster</p>
                        <p className="text-xs text-muted mt-1">task completion rate</p>
                      </div>
                      <div className="p-8 bg-bg rounded-3xl border border-border col-span-2">
                        <div className="text-4xl font-black text-accent mb-2">85%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">SUS Score</p>
                        <p className="text-xs text-muted mt-1">System Usability Scale</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-ink p-12 rounded-[40px] text-white">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-4 block">Impact & Outcomes</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-10 leading-tight">Measurable changes to how clinics operate.</h3>
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Zap className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Faster access to critical workflows</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Core clinical actions require zero sub-navigation; one click from anywhere in the system.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Brain className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Reduced cognitive load</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Grouped, labeled, and consistently iconified navigation removes the overhead of "where do I go for this?" from every session.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Users2 className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Improved onboarding</h4>
                          <p className="text-white/40 text-sm leading-relaxed">New staff can read the navigation as a map of clinic operations; the structure teaches the system. Zone names function as orientation guides, not just labels.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Layers className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Scalable foundation</h4>
                          <p className="text-white/40 text-sm leading-relaxed">New modules slot into the appropriate zone without disrupting existing navigation patterns. The architecture absorbs growth rather than resisting it.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-center">
                  Beyond Links: Designing for <span className="text-blue-600 italic font-serif">Mental Models.</span>
                </h2>
                <div className="space-y-8 text-white/60 text-lg font-normal leading-relaxed text-center">
                  <p>Navigation is not about links—it’s about shaping a system that mirrors the user’s mental model. This project demonstrated that when structure aligns with user cognition, complexity dissolves into clarity. Reframing the sidebar around real administrative workflows significantly reduced friction and enabled faster task execution. AI played a critical role in compressing the research cycle. By accelerating transcript analysis and surfacing patterns early, it created more space for deeper exploration, rapid iteration, and higher-quality design decisions.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isSparrow && (
          <div className="bg-white font-sans text-zinc-900 selection:bg-zinc-100">
            {/* NDA Info Banner */}
            <section className="bg-zinc-900 py-12 md:py-16 border-b border-white/5">
              <div className="container-wide">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-6 max-w-3xl">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                      <Shield size={28} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">NDA Protected Project</h3>
                      <p className="text-zinc-400 text-lg leading-relaxed">
                        This is a high-level overview of the feature I built. Due to confidentiality agreements, I am providing an overview of my work here. For detailed information on UI designs, proper user flows, and research, please feel free to connect.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <a 
                      href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-center"
                    >
                      Let's connect
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* What is Sparrow & The Context Side-by-Side */}
            <section className="section-padding bg-white border-b border-zinc-100">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-0 rounded-[48px] overflow-hidden border border-zinc-100 shadow-2xl">
                  {/* What is Sparrow Column */}
                  <div className="bg-zinc-900 p-6 sm:p-10 md:p-16 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                          <Brain size={24} className="text-accent" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-blue-500">What is Sparrow?</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
                        A lightweight, <span className="italic-serif font-normal text-accent">AI-powered</span> API platform.
                      </h3>
                      <p className="text-zinc-400 text-xl leading-relaxed mb-10">
                        Sparrow is an open-source API development and testing platform designed as a lightweight and secure alternative to legacy tools. It helps developers build, test, and document APIs with high speed and minimal resource consumption.
                      </p>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <p className="text-lg text-zinc-300 italic leading-relaxed">
                          "I led the design of an intelligent variable management system, exploring how to solve complex technical workflows through human-centered AI."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Context Column */}
                  <div className="bg-white p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-px bg-accent" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-zinc-900">
                      Variables are the <span className="italic-serif font-normal text-accent">backbone</span> of scalable API testing.
                    </h2>
                    <div className="space-y-6 text-zinc-600 text-lg font-normal leading-relaxed">
                      <p>
                        Variables are the backbone of scalable API testing workflows. Yet in most API tools, managing them feels like a chore—developers manually extract values from responses, type them into environment files, and pray they don't break their test workflows.
                      </p>
                      <p>
                        At Sparrow, we recognized an opportunity: what if extracting and managing variables could be as effortless as the API calls themselves?
                      </p>
                      <p>
                        In enterprise API testing, developers don't just send single requests; they build complex chains of interactions. A value from one response (like a session token or user ID) must be captured and passed into the next request.
                      </p>
                      <p>
                        Managing these variables manually is a high-friction task that breaks the developer's flow. My goal was to leverage AI to automate this "connective tissue," making the platform feel intelligent and proactive rather than just a passive tool.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Centralized Image Placeholder */}
            <section className="section-padding bg-zinc-50 border-b border-zinc-100">
              <div className="container-wide">
                <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border border-zinc-200 bg-white p-4 md:p-8">
                  <img 
                    src="/image/genetratd_variables_2x.webp" 
                    alt="Sparrow Platform Overview" 
                    className="w-full h-auto rounded-[24px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* The Problem */}
            <section className="section-padding bg-zinc-900 text-white border-y border-white/10">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center mb-24">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Problem</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The manual <span className="italic-serif font-normal text-accent">bottleneck.</span>
                    </h2>
                    <div className="space-y-6 text-zinc-400 text-lg mb-10 leading-relaxed">
                      <p>
                        API testing workflows rely on dynamic values. An authentication token from Login returns a user ID. That user ID goes into the next request. Then a session token becomes part of the header. Traditional tools treat this as manual work:
                      </p>
                      <p>
                        Developers faced a critical bottleneck: manual variable management. Every variable required a cycle of copy-pasting, naming, and configuration that added up to significant time loss across a test suite.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Inconsistent Naming", desc: "Confusing patterns across team members." },
                        { title: "Scope Confusion", desc: "Unclear persistence and availability." },
                        { title: "Debugging Complexity", desc: "Manual scanning for variable sources." },
                        { title: "Team Coordination", desc: "Conflicts in shared environment files." }
                      ].map((prob, i) => (
                        <div key={i} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                            <Zap size={14} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{prob.title}</h4>
                            <p className="text-zinc-500 text-xs">{prob.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border border-blue-500/20">
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-blue-500">
                      <Layers size={120} />
                    </div>
                    <h4 className="font-bold mb-8 uppercase text-[10px] tracking-[0.3em] text-blue-400">Manual Workflow</h4>
                    <div className="space-y-6 relative z-10">
                      {[
                        "Execute API request",
                        "Identify value in response",
                        "Copy value manually",
                        "Paste into next request",
                        "Type variable name",
                        "Configure scope"
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <span className="w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-[10px] font-mono text-blue-400">{i+1}</span>
                          <p className="text-zinc-300 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Time Investment</span>
                      <span className="text-xl font-bold text-white">15 mins / suite</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Research Section */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Research Phase</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    How Developers <span className="italic-serif font-normal text-accent">Extract</span> Variables Today.
                  </h2>
                  <p className="text-zinc-500 text-xl leading-relaxed mb-12">
                    We interviewed 12 API testers across backend, full-stack, and QA roles. Here's what we learned about their current workflows:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Workflow 1: The Manual Copier",
                      quote: "I just look at the response, find the value I need, and paste it into the next request's body. Sometimes I write it in the environment file, but honestly, I usually forget.",
                      stats: "Represents ~40% of users. Works for small test suites, fails catastrophically at scale.",
                      icon: <Search className="text-blue-500" />
                    },
                    {
                      title: "Workflow 2: The Script Writer",
                      quote: "I write test scripts in the tool's scripting language to extract values using JSONPath. It works, but I have to learn their syntax and debug scripts when they break.",
                      stats: "Represents ~35% of users. Powerful but high barrier to entry. Discourages casual testers.",
                      icon: <Layers className="text-purple-500" />
                    },
                    {
                      title: "Workflow 3: The Environment Manager",
                      quote: "We have a shared environment file that everyone updates, but we're always stepping on each other's toes. And when we move between dev, staging, and prod, half the variables don't exist in the new environment.",
                      stats: "Represents ~25% of teams. Scales to teams but creates synchronization headaches.",
                      icon: <Shield className="text-green-500" />
                    }
                  ].map((wf, i) => (
                    <div key={i} className="p-10 bg-zinc-100 rounded-[32px] border border-zinc-200 flex flex-col shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-md border border-zinc-100">
                        {wf.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-6 tracking-tight text-zinc-900">{wf.title}</h4>
                      <div className="mb-8 p-6 bg-white rounded-2xl border border-zinc-200 italic text-zinc-600 text-sm leading-relaxed relative shadow-inner">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-zinc-100" />
                        "{wf.quote}"
                      </div>
                      <p className="mt-auto text-xs font-bold text-zinc-500 uppercase tracking-widest leading-loose">
                        {wf.stats}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Insights Section */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                  <div className="max-w-2xl">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Key Insights</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                      Insights from <span className="italic-serif font-normal text-accent">User Research.</span>
                    </h2>
                  </div>
                  <div className="text-zinc-500 text-lg max-w-sm">
                    Synthesizing raw data into actionable design opportunities for the Sparrow platform.
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Variable Extraction is Hidden Work",
                      desc: "Developers spend 10-15 minutes per test suite manually mapping response paths to variable names. This shouldn't be visible effort—it's mechanical and error-prone."
                    },
                    {
                      num: "02",
                      title: "Variable Scope Confusion",
                      desc: "Teams argue about where variables live. Should userId be set globally? For one test run? Just one request? With no clear mental model, everyone invents their own system, breaking consistency across the team."
                    },
                    {
                      num: "03",
                      title: "Debugging Variable Dependencies",
                      desc: "When a test fails, developers can't easily see which variables were used, what values they held, or which requests set them. Debugging becomes detective work—tracing through request history manually."
                    }
                  ].map((insight, i) => (
                    <div key={i} className="group flex flex-col md:flex-row gap-8 p-10 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all duration-500">
                      <div className="text-5xl font-black text-accent/20 group-hover:text-accent transition-colors duration-500 shrink-0">
                        {insight.num}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-4 tracking-tight">{insight.title}</h4>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">{insight.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Problem Statement */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-5xl mx-auto text-center">
                  <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 block">Problem Statement</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-12 leading-relaxed tracking-tight text-zinc-900 italic-serif">
                    - Developers want to extract dynamic values effortlessly—but current tools force a compromise. -
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    {[
                      "Manual copy-paste (error-prone, time-consuming, no audit trail)",
                      "Complex syntax learning (JSON path? XPath? Different for each tool)",
                      "Environmental lock-in (switching environments means recreating variables)"
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-1">
                          <Check size={10} />
                        </div>
                        <p className="font-bold text-sm leading-tight text-zinc-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Design Strategy */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Design Strategy</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Human-Centered <span className="italic-serif font-normal text-accent">Automation.</span></h2>
                  <p className="text-zinc-400 text-lg">My strategy focused on three pillars to transform the developer experience from manual to magical.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Zero-Friction", 
                      icon: <Zap size={24} />,
                      desc: "Reduce management from 15 minutes to near-instant automation through proactive AI suggestions." 
                    },
                    { 
                      title: "Visual Clarity", 
                      icon: <Search size={24} />,
                      desc: "Make variable scope and relationships immediately obvious through color-coding and clear badges." 
                    },
                    { 
                      title: "Intelligent Defaults", 
                      icon: <Brain size={24} />,
                      desc: "Use AI to suggest names based on context, but always keep the developer in the driver's seat." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-10 bg-white/5 rounded-[32px] border border-white/10 hover:border-accent/30 transition-all group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 text-accent flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Ideation Section */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Ideation Phase</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    From "Right-Click" to <span className="italic-serif font-normal text-accent">Smart Extraction.</span>
                  </h2>
                  <p className="text-zinc-600 text-xl leading-relaxed">
                    Initially, we explored a simple solution: right-click a response value, select 'Save as Variable,' name it, done. It worked, but felt mechanical. The breakthrough came from asking: "What if Sparrow AI could suggest variable names and warn about conflicts?"
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      label: "Approach 1",
                      title: "Response Variable Picker",
                      steps: ["Click value", "Inline modal", "Name variable", "Choose scope", "Done"],
                      pros: "Direct, visual, immediate feedback",
                      cons: "Modal fatigue for multiple variables; doesn't suggest names; no conflict detection",
                      icon: <MousePointer2 size={24} />
                    },
                    {
                      label: "Approach 2",
                      title: "Sidebar Variable Dashboard",
                      steps: ["Open panel", "Drag fields", "Batch edit", "Save all"],
                      pros: "Batch operations; clear overview; easy to see all response fields at once",
                      cons: "Takes screen real estate; users might miss it; requires context switching",
                      icon: <Layout size={24} />
                    },
                    {
                      label: "Approach 3",
                      title: "Inline Smart Extraction (Final)",
                      steps: ["Hover value", "AI Suggests", "One-click save", "Live variable"],
                      pros: "Non-intrusive; discovers naturally; smart defaults save time; instant visual feedback",
                      cons: "Hover states on desktop; requires mobile touch adaptation",
                      icon: <Sparkles size={24} />
                    }
                  ].map((approach, i) => (
                    <div key={i} className={`p-10 rounded-[40px] border flex flex-col h-full ${i === 2 ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-zinc-50 border-zinc-100 text-zinc-900'}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${i === 2 ? 'bg-accent text-white' : 'bg-white text-accent shadow-sm'}`}>
                        {approach.icon}
                      </div>
                      <div className="mb-6">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block ${i === 2 ? 'text-zinc-500' : 'text-zinc-400'}`}>{approach.label}</span>
                        <h4 className="text-xl font-bold tracking-tight leading-tight">{approach.title}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-10">
                        {approach.steps.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              i === 2 
                                ? 'bg-white/5 border-white/10 text-zinc-300' 
                                : 'bg-white border-zinc-200 text-zinc-600'
                            }`}>
                              {step}
                            </span>
                            {idx < approach.steps.length - 1 && (
                              <div className={`flex items-center ${i === 2 ? 'text-zinc-700' : 'text-zinc-300'}`}>
                                <ChevronRight size={12} />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div className="mt-auto space-y-6">
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${i === 2 ? 'text-emerald-400' : 'text-emerald-600'}`}>Advantages</p>
                          <p className="text-sm font-medium">{approach.pros}</p>
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${i === 2 ? 'text-red-400' : 'text-red-600'}`}>Drawbacks</p>
                          <p className="text-sm font-medium">{approach.cons}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Design Evolution Section */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Design Evolution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Solving Real <span className="italic-serif font-normal text-accent">Complexity.</span>
                  </h2>
                  <p className="text-zinc-400 text-xl leading-relaxed">
                    Approach 3 won because it mirrors GitHub Copilot's philosophy: intelligence appears where and when you need it. But implementing it required solving three critical engineering and UX challenges.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      label: "Challenge 1",
                      title: "Naming Variables Intelligently",
                      problem: "Users face naming paralysis. Is it 'userId', 'user_id', or 'id'?",
                      solution: "AI analyzes the JSON path (e.g., response.user.profile.id → suggests 'userId'). Users can override in one click, but smart defaults reduce friction. Test result: developers accepted AI suggestions 82% of the time.",
                      icon: <Type size={24} />
                    },
                    {
                      label: "Challenge 2",
                      title: "Variable Scope Clarity",
                      problem: "Developers didn't understand the difference between request-scoped and environment-scoped variables.",
                      solution: (
                        <div className="space-y-4">
                          <p>Three-tier visual system:</p>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-purple-500/30">
                              <p className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">Request Scope</p>
                              <p className="text-xs text-zinc-400">Available only within this request.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-blue-500/30">
                              <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">Test Flow Scope</p>
                              <p className="text-xs text-zinc-400">Available across requests in current sequence.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-emerald-500/30">
                              <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">Environment Scope</p>
                              <p className="text-xs text-zinc-400">Persists across all test runs; exportable.</p>
                            </div>
                          </div>
                        </div>
                      ),
                      icon: <Globe size={24} />
                    },
                    {
                      label: "Challenge 3",
                      title: "Conflict Detection & Collision Warnings",
                      problem: "Teams using shared environment files often had duplicate variable names with different values, breaking tests.",
                      solution: (
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-amber-500/30">
                            <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">Warning</p>
                            <p className="text-xs text-zinc-400">Is this name already used in this environment?</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-red-500/30">
                            <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Error</p>
                            <p className="text-xs text-zinc-400">Would this value conflict with another variable in flow?</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-blue-500/30">
                            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">Suggestion</p>
                            <p className="text-xs text-zinc-400">Is there a similar variable name already?</p>
                          </div>
                        </div>
                      ),
                      icon: <AlertTriangle size={24} />
                    }
                  ].map((challenge, i) => (
                    <div key={i} className="group p-10 bg-white/5 rounded-[48px] border border-white/10 hover:bg-white/10 transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/3">
                          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                            {challenge.icon}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block">{challenge.label}</span>
                          <h4 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{challenge.title}</h4>
                        </div>
                        <div className="lg:w-2/3 space-y-8">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">The Problem</p>
                            <p className="text-base md:text-lg text-zinc-300 font-medium leading-relaxed">{challenge.problem}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">The Solution</p>
                            <div className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed">
                              {challenge.solution}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THE SOLUTION: The Variable Extraction Flow */}
            <section className="section-padding bg-white text-zinc-900 overflow-hidden">
              <div className="container-wide">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Solution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    The Variable <span className="italic-serif font-normal text-accent">Extraction Flow.</span>
                  </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    {
                      step: "Step 1",
                      title: "Hover Detection",
                      desc: "As the cursor hovers over any value in the response JSON, a subtle highlight appears (light blue background) with a small 'Save as Variable' icon button (💾 or checkmark).",
                      insight: "Why this interaction? Hover states don't interrupt; they're discoverable but non-intrusive. First-time users see the affordance naturally.",
                      icon: <MousePointer2 className="text-accent" size={24} />
                    },
                    {
                      step: "Step 2",
                      title: "Smart Extraction Modal",
                      desc: "Click the button. A compact modal appears with AI-suggested names, scope selectors (Request | Test Flow | Environment), and proactive conflict warnings.",
                      insight: "Red banner: 'userId already exists in Environment. This will override it.' Action Buttons: 'Create Variable' (primary) | 'Cancel'",
                      icon: <Layout className="text-accent" size={24} />
                    },
                    {
                      step: "Step 3",
                      title: "Instant Feedback",
                      desc: "After clicking 'Create Variable,' the modal closes with a toast notification. The extracted value now shows with a blue badge: 'userId' to indicate it's tracked.",
                      insight: "A Variables Panel opens on the right (or updates if already visible) showing the new variable instantly.",
                      icon: <Sparkles className="text-accent" size={24} />
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{item.step}</span>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                      <div className="p-4 bg-white rounded-xl border border-zinc-200">
                        <p className="text-xs text-zinc-500 italic leading-relaxed">{item.insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Variables Management Panel */}
            <section className="section-padding bg-zinc-900 text-white overflow-hidden">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Management</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Variables <span className="italic-serif font-normal text-accent">Management Panel.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                      A dedicated right sidebar shows all variables in the current context, providing a clear overview and batch operations for power users.
                    </p>
                    
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">
                        Panel Structure
                      </h4>
                      <ul className="space-y-4 text-sm md:text-base text-zinc-300">
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Scope Filter Tabs:</strong> 'All' | 'Environment' | 'Test Flow' | 'Request'</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Variable List:</strong> Rows showing [Icon] [Name] [Value] [Scope Badge] [Actions]</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Actions per Variable:</strong> Copy Value | Edit | Delete | View Usage (shows which requests use this variable)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Bulk Operations:</strong> Export as .json | Import from .json | Delete All in Scope</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-4 bg-accent/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 bg-zinc-800 rounded-3xl border border-white/10 p-6 shadow-2xl">
                      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <h5 className="font-bold text-sm tracking-tight">Variables Panel</h5>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'userId', val: '12345', scope: 'Env', color: 'text-emerald-400' },
                          { name: 'authToken', val: 'eyJh...', scope: 'Flow', color: 'text-blue-400' },
                          { name: 'orderId', val: 'ord_99', scope: 'Req', color: 'text-purple-400' }
                        ].map((v, i) => (
                          <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold">V</div>
                              <div>
                                <p className="text-xs font-bold text-white">{v.name}</p>
                                <p className="text-[10px] text-zinc-500 font-mono">{v.val}</p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/10 ${v.color}`}>{v.scope}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing & Validation */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "AI Adoption", value: "82%", desc: "Accepted suggestions without editing" },
                        { label: "Comprehension", value: "78%", desc: "Correctly understood scope system" },
                        { label: "Safety", value: "100%", desc: "Conflict warnings prevented failures" },
                        { label: "Efficiency", value: "8x", desc: "Faster than manual extraction" }
                      ].map((stat, i) => (
                        <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 text-center">
                          <p className="text-4xl font-bold mb-2 tracking-tighter text-accent">{stat.value}</p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{stat.label}</p>
                          <p className="text-xs text-zinc-600 leading-tight">{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Validation</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Internal User <span className="italic-serif font-normal text-accent">Testing.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                      We ran unmoderated tests with 8 backend developers using early prototypes. The results confirmed our hypothesis that AI-assisted extraction significantly reduces mental load.
                    </p>
                    <div className="space-y-4">
                      {[
                        "82% of users accepted AI-suggested variable names without editing",
                        "78% correctly understood scope through icon/color system (after brief intro)",
                        "Conflict warnings prevented 3/3 test failure scenarios in simulation",
                        "Time to extract and use 5 variables: 45 seconds (vs. ~6 minutes in manual mode)"
                      ].map((finding, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-zinc-200">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                            <Check size={14} />
                          </div>
                          <p className="font-medium text-zinc-700 text-sm leading-relaxed">
                            {finding}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact (Early Feedback) */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Impact</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Early <span className="italic-serif font-normal text-accent">Feedback.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg">
                    From private beta and internal testing, developers reported:
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "I can now set up dynamic test flows in minutes instead of 30 minutes manually extracting values.",
                      author: "Backend Engineer",
                      company: "Fintech"
                    },
                    {
                      quote: "The conflict warning saved us from a production incident—we were about to deploy a test using an old token variable.",
                      author: "QA Lead",
                      company: "SaaS Platform"
                    },
                    {
                      quote: "Finally, variables feel like a first-class feature, not an afterthought.",
                      author: "Full-stack Developer",
                      company: "Startup"
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white/5 rounded-[32px] border border-white/10 relative flex flex-col h-full">
                      <Quote className="text-white/5 w-16 h-16 absolute top-6 right-6" />
                      <p className="text-zinc-300 text-lg leading-relaxed mb-8 relative z-10 flex-grow">"{item.quote}"</p>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.author}</p>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest">{item.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Lessons Learned */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Retrospective</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Lessons <span className="italic-serif font-normal text-accent">Learned.</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Context is Everything", 
                      desc: "Variables don't exist in a vacuum. Success required understanding the entire request lifecycle: where values come from, how they flow through test sequences, and where they can be reused. Designing in isolation failed; designing in context succeeded." 
                    },
                    { 
                      title: "AI Doesn't Replace Clarity—It Enables It", 
                      desc: "Smart suggestions were nice, but visual mental models mattered more. The color-coded scope system and conflict warnings transformed variables from 'technical noise' to 'obvious workflow.'" 
                    },
                    { 
                      title: "Batch Operations Matter", 
                      desc: "We initially designed for single-variable extraction. But teams needed to extract 5-10 variables per request. Batch operations and export/import became critical to avoid modal fatigue." 
                    }
                  ].map((lesson, i) => (
                    <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
                      <span className="text-accent font-bold text-sm mb-4 block">Lesson {i + 1}</span>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{lesson.title}</h4>
                      <p className="text-zinc-600 leading-relaxed text-sm">{lesson.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Next Steps: Roadmap */}
            <section className="section-padding bg-zinc-50 text-zinc-900 border-t border-zinc-100">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto mb-16 text-center">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Future Vision</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Next Steps: <span className="italic-serif font-normal text-accent">Roadmap.</span>
                  </h2>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    {[
                      { title: "Cross-request variable dependencies", desc: "Visualize a graph showing which variables depend on which requests. Helps teams understand test flow risk." },
                      { title: "Template variables & interpolation", desc: "Support variables that reference other variables (e.g., baseUrl = 'https://api.{{environment}}.com')" },
                      { title: "Encrypted variables", desc: "For secrets (API keys, tokens), offer encryption at rest + audit logs for access" },
                      { title: "Variable type inference", desc: "Auto-detect if a variable is a number, string, date, and suggest transformations (e.g., 'Add 1 day to this date')" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border border-zinc-200 items-start">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold shrink-0 mt-1">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-zinc-900">{item.title}</h4>
                          <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section className="section-padding bg-white border-t border-zinc-100">
              <div className="container-wide">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-accent" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Key Achievements</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        "Non-Intrusive AI Integration",
                        "Intelligent Naming Automation",
                        "Clear Variable Mental Models",
                        "Proactive Conflict Detection",
                        "8x Productivity Improvement"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-zinc-200">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <Check size={14} />
                          </div>
                          <p className="font-bold text-zinc-900 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-zinc-900" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-900">Skills Demonstrated</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Complex Workflow Redesign",
                        "AI/ML Feature Strategy",
                        "Technical User Research",
                        "Enterprise System Design",
                        "Stakeholder Alignment",
                        "Rapid Prototyping"
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <p className="text-xs font-bold uppercase tracking-wider">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Closing Thoughts */}
            <section className="section-padding bg-zinc-900 text-white text-center">
              <div className="container-wide max-w-4xl mx-auto">
                <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Conclusion</span>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight">
                  Closing <span className="italic-serif font-normal text-accent">Thoughts.</span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-300 leading-relaxed text-left md:text-center">
                  <p>
                    Generate Variables transformed how developers think about dynamic values in API testing. It's not just a feature—it's a philosophical shift: from viewing variables as a burden to viewing them as a natural, intelligent part of the workflow.
                  </p>
                  <p>
                    For teams managing complex API dependencies, handling environment sprawl, or scaling test automation, this module unlocks a level of productivity that wasn't possible before.
                  </p>
                  <p className="text-accent font-medium italic">
                    Coming next: How we built Sparrow's design system from the ground up to scale intelligent automation across the entire product.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  Interested in the <span className="italic-serif font-normal text-accent">full case study?</span>
                </h2>
                <p className="text-zinc-500 text-lg mb-12 max-w-2xl mx-auto">
                  Due to NDA restrictions, I can only share detailed UI designs, research findings, and user flows in a private conversation.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[2000] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VideoPreview = () => {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a0b2e_0%,#0a0a0a_100%)]" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"
      />

      {/* Phone Mockup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-[200px] aspect-[9/19.5] bg-[#121212] rounded-[40px] border-[6px] border-[#222] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />
          
          {/* Screen Content */}
          <div className="absolute inset-0 p-5 flex flex-col gap-4">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-2 pt-1">
              <div className="w-8 h-2 bg-white/20 rounded-full" />
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/20 rounded-full" />
                <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Header */}
            <div className="h-8 w-2/3 bg-white/10 rounded-lg" />
            
            {/* Main Card */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-[4/5] w-full bg-gradient-to-br from-accent/40 to-purple-600/40 rounded-2xl border border-white/10 shadow-lg"
            />
            
            {/* List Items */}
            <div className="space-y-3">
              <div className="h-3 w-full bg-white/5 rounded-full" />
              <div className="h-3 w-4/5 bg-white/5 rounded-full" />
              <div className="h-3 w-1/2 bg-white/5 rounded-full" />
            </div>

            {/* Bottom Nav */}
            <div className="mt-auto flex justify-around py-2 border-t border-white/5">
              <div className="w-6 h-6 rounded-lg bg-white/10" />
              <div className="w-6 h-6 rounded-lg bg-accent/40" />
              <div className="w-6 h-6 rounded-lg bg-white/10" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 blur-[1px]" />
          </div>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-4 w-24 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-30"
        />
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 -left-4 w-20 h-20 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-xl z-30"
        />
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project, index: number, onClick: (p: Project) => void }> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        top: `${80 + (index * 24)}px`, 
        zIndex: index + 1,
        scale,
        opacity,
        transformOrigin: "top center"
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        backgroundColor: project.hoverColor,
        y: -5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="md:sticky relative group bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-stretch cursor-pointer overflow-hidden p-6 md:p-10 border border-ink/5"
    >
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-between py-4 relative z-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-accent/20 mb-6">
            {project.category || "Case Study"}
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-ink mb-4 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-ink/80 text-base md:text-lg font-normal leading-relaxed mb-6 max-w-xl">
            {project.description}
          </p>
          {project.role && (
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-ink/10 border border-ink/10 text-ink text-[11px] uppercase tracking-wider rounded-full mb-6 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center">
                <User size={12} className="text-ink" />
              </div>
              <span className="font-bold text-ink">{project.role}</span>
            </div>
          )}
        </div>
        
        <div className="bg-white text-ink px-8 py-4 rounded-full flex items-center justify-between w-full max-w-[280px] border border-ink/10 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-0.5 transition-all duration-300 group/btn">
          <span className="font-bold text-base tracking-wide">Open Case Study</span>
          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover/btn:bg-ink group-hover/btn:text-white transition-colors duration-300">
            <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-[60%] aspect-[4/3] md:aspect-auto rounded-3xl overflow-hidden relative shadow-inner">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

const WorkSection = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
  const handleProjectClick = (project: Project) => {
    if (project.pdfUrl) {
      window.open(`${project.pdfUrl}#toolbar=0`, '_blank');
    } else {
      onSelectProject(project);
    }
  };

  return (
    <section id="work" className="relative z-20 bg-bg py-24 md:py-40 px-6 overflow-x-clip">
      <div className="container-wide">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight max-w-4xl mx-auto mb-8"
          >
            A peek into my <span className="italic-serif font-normal text-accent">recent work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ink/60 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Solutions built at the intersection of user needs, business impact, and system complexity.
          </motion.p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 md:gap-24 relative pb-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={handleProjectClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MoreWorkBanner = () => {
  return (
    <section className="py-12 md:py-24 bg-bg relative z-10 px-6">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm border border-border max-w-5xl mx-auto"
        >
          {/* Left colored part */}
          <div className="w-full md:w-1/3 bg-accent flex items-center justify-center min-h-[200px] md:min-h-[280px] relative overflow-hidden">
            <span className="text-[200px] md:text-[280px] font-black text-white leading-[0.75] tracking-tighter select-none -mt-6 md:-mt-8">
              a
            </span>
          </div>
          {/* Right text part */}
          <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center items-start">
            <h3 className="text-2xl md:text-3xl font-black text-ink mb-3">
              This is just a part of my work.
            </h3>
            <p className="text-muted text-base mb-6 max-w-xl">
              There’s more to explore. You’ll find more projects, flows, and explorations here.
            </p>
            <a 
              href="https://www.figma.com/design/ZE2zBJKz1u6qJPuIkZtGC6/Aman-s-All-Work-file?node-id=136-2212&t=qsSuV2jRqm8mzsmU-1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-border text-ink font-bold hover:border-accent hover:text-accent transition-colors flex items-center gap-2 text-sm"
            >
              Explore more work <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'tools'>('skills');

  return (
    <section id="skills" className="bg-ink py-20 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden relative text-white">
      <div className="container-wide">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6 text-white"
          >
            What I bring to <span className="italic-serif font-normal text-accent">the table</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            The mix of design, thinking, and tools I use to build products that make sense and scale.
          </motion.p>

          {/* Minimal Tabs */}
          <div className="flex justify-center gap-8 md:gap-12 border-b border-white/10 w-fit mx-auto mb-16">
            <button
              onClick={() => setActiveTab('skills')}
              className={`pb-4 text-sm md:text-base font-bold tracking-wider uppercase transition-all relative group ${
                activeTab === 'skills' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Core design skills
              {activeTab === 'skills' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                />
              )}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`pb-4 text-sm md:text-base font-bold tracking-wider uppercase transition-all relative group ${
                activeTab === 'tools' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Tools & software
              {activeTab === 'tools' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                />
              )}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'skills' ? (
            <motion.div
              key="skills-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {SKILLS.map((group, i) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white/5 p-6 md:p-10 rounded-[32px] border-l-4 ${group.color} border-white/5 flex flex-col gap-6 group hover:bg-white/[0.08] transition-all duration-500`}
                >
                  <div className="flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-xl ${group.iconBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                      <group.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{group.category}</h3>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {group.items.map(item => (
                      <div 
                        key={item}
                        className="px-4 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border bg-white/5 text-white/50 border-white/5 hover:border-white/20 hover:text-white/80"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="tools-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {TOOLS.map((categoryGroup, categoryIndex) => (
                <div key={categoryGroup.category} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-white/90 tracking-tight">{categoryGroup.category}</h3>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {categoryGroup.items.map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)" }}
                        className="bg-white/5 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/10 flex flex-col items-center justify-center text-center gap-4 group transition-all duration-500"
                      >
                        <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 group-hover:bg-accent/10 transition-all duration-500 group-hover:rotate-6 text-accent">
                          <tool.icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-white/90 group-hover:text-accent transition-colors">{tool.name}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

interface ExperienceCardProps {
  exp: Experience;
  i: number;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ exp, i }) => {
  const isEven = i % 2 === 0;
  
  // Subtle rotations for the "scattered" look from the image
  const rotations = [-2, 1.5, -1, 2];
  const rotation = rotations[i % rotations.length];

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: i * 0.1,
        type: "spring",
        stiffness: 50
      }}
      className={`relative w-full flex ${isEven ? 'justify-start' : 'justify-end'} mb-8 md:mb-12 lg:mb-14`}
    >
      {/* Connecting Dot on the Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full z-30 hidden lg:block shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" />
      
      <div className={`w-full lg:w-[40%] bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-border shadow-xl shadow-ink/5 flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
        {/* Card Header */}
        <div className="mb-6">
          <div className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            {exp.period}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-ink mb-4 leading-tight">{exp.role}</h3>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-muted/60 font-medium">Company:</span>
              <span className="text-ink/80 font-bold">{exp.company}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
          <div className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted/40 uppercase">
            {exp.location}
          </div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
          </div>
        </div>

        {/* Subtle texture overlay to match the "physical card" feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-[#F8F8F8] py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="container-wide relative">
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">The Journey</span>
            <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.1] tracking-tight max-w-4xl mx-auto mb-8">
              My growth through <span className="italic-serif font-normal text-accent">experience</span>
            </h2>
            <p className="text-muted text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              From early explorations to building scalable products. Each role sharpened my approach to product thinking, systems, and real-world problem solving.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Vertical Journey Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
          
          <div className="flex flex-col relative z-10">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 md:mt-32 text-center"
        >
          <motion.a
            href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-ink text-white font-bold rounded-full shadow-2xl hover:bg-accent transition-colors duration-300 text-sm md:text-base"
          >
            View Full Resume
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const XLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
);

const LinkedInLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="white"/>
    <path d="M9.42857 18.8571V10.2857H6.57143V18.8571H9.42857ZM8 9.14286C8.94286 9.14286 9.71429 8.37143 9.71429 7.42857C9.71429 6.48571 8.94286 5.71429 8 5.71429C7.05714 5.71429 6.28571 6.48571 6.28571 7.42857C6.28571 8.37143 7.05714 9.14286 8 9.14286ZM18.8571 18.8571V13.8571C18.8571 11.4 17.5429 10.2571 15.7714 10.2571C14.3429 10.2571 13.7143 11.0286 13.3429 11.6H13.3714V10.2857H10.5143C10.5429 11.0857 10.5143 18.8571 10.5143 18.8571H13.3714V14.0571C13.3714 13.8 13.3714 13.5429 13.4571 13.3429C13.6857 12.7714 14.2 12.1714 15.0857 12.1714C16.2571 12.1714 16.7143 13.0571 16.7143 14.3429V18.8571H19.5714L18.8571 18.8571Z" fill="#0077B5"/>
  </svg>
);

const OwnershipSection = () => {
  const cards = [
    {
      id: 'linkedin',
      type: 'social',
      title: 'LinkedIn',
      description: 'Let\'s connect professionally and share insights.',
      icon: <LinkedInLogo />,
      color: 'bg-[#0077B5]',
      link: 'https://www.linkedin.com/in/amanux26',
      rotation: -6
    },
    {
      id: 'x',
      type: 'social',
      title: 'X',
      description: 'Follow my design journey and daily thoughts.',
      icon: <XLogo />,
      color: 'bg-black',
      link: 'https://x.com/aman26ux',
      rotation: 4
    },
    {
      id: 'image',
      type: 'image',
      image: '/image/my_bottom_img_3x.webp',
      rotation: -2
    },
    {
      id: 'puzzle',
      type: 'puzzle',
      rotation: 5
    },
    {
      id: 'resume',
      type: 'resume',
      title: 'Product Designer',
      experience: '3+ years of experience',
      description: 'I work at the intersection of systems and AI-assisted design',
      color: 'bg-accent',
      rotation: -3
    }
  ];

  const puzzleLetters = [
    ['A', 'W', 'I', 'L', 'L', 'Y', 'W', 'X', 'Z'],
    ['D', 'E', 'S', 'L', 'O', 'V', 'E', 'D', 'A'],
    ['Q', 'E', 'D', 'T', 'O', 'F', 'E', 'N', 'E'],
    ['F', 'X', 'C', 'O', 'N', 'N', 'E', 'C', 'T'],
    ['C', 'L', 'A', 'I', 'W', 'I', 'T', 'H', 'M'],
    ['A', 'X', 'F', 'Y', 'O', 'U', 'O', 'U', 'R'],
    ['Q', 'Z', 'M', 'E', 'N', 'J', 'I', 'T', 'S'],
  ];

  const highlightedCells = [
    [0, 1], [0, 2], [0, 3], [0, 4], // WILL
    [1, 3], [1, 4], [1, 5], [1, 6], // LOVE
    [2, 3], [2, 4],                 // TO
    [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], // CONNECT
    [4, 4], [4, 5], [4, 6], [4, 7], // WITH
    [5, 3], [5, 4], [5, 5]          // YOU
  ];

  const isHighlighted = (r: number, c: number) => {
    return highlightedCells.some(([row, col]) => row === r && col === c);
  };

  return (
    <section id="story" className="bg-ink py-16 md:py-32 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-8">
              A journey from execution to <span className="italic-serif font-normal text-accent">product ownership</span>
            </h2>
            <p className="text-white/70 text-base md:text-xl font-light leading-relaxed">
              I began as an engineer learning design fundamentals, quickly moving into roles where I owned product decisions through research and data. Over time, I grew into mentoring designers while working on real products, which strengthened how I think and communicate design. Today, my focus is on building systems that bring consistency, scalability, and clarity to products going beyond screens to design how things actually work.
            </p>
          </motion.div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="flex flex-nowrap lg:flex-row justify-start lg:justify-center items-center gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 px-4 md:px-0 no-scrollbar perspective-1000">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotation }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 50,
                y: -10,
                transition: { duration: 0.2 }
              }}
              className={`relative shrink-0 w-[180px] md:w-[210px] h-[240px] md:h-[280px] rounded-[24px] md:rounded-[32px] shadow-2xl cursor-pointer overflow-hidden flex flex-col p-4 md:p-6 transition-shadow hover:shadow-accent/20`}
            >
              {card.type === 'social' && (
                <div className={`absolute inset-0 ${card.color} opacity-90`} />
              )}
              {card.type === 'resume' && (
                <div className={`absolute inset-0 ${card.color}`} />
              )}
              
              {card.type === 'social' && (
                <div className="relative h-full flex flex-col justify-between z-10">
                  <div>
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 backdrop-blur-md
                      ${card.id === 'linkedin' ? 'bg-[#0077B5] rounded-lg' : ''}
                      ${card.id === 'x' ? 'bg-black border border-white/20 rounded-full' : ''}
                      ${card.id !== 'linkedin' && card.id !== 'x' ? 'bg-white/20 rounded-xl md:rounded-2xl' : ''}
                    `}>
                      {React.cloneElement(card.icon as React.ReactElement, { size: card.id === 'x' ? 24 : 28 })}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">{card.title}</h3>
                    <p className="text-white/80 text-[10px] md:text-sm font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 md:py-3 bg-white text-ink rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 hover:bg-opacity-90 transition-all"
                  >
                    {card.id === 'linkedin' ? 'Open LinkedIn' : card.id === 'x' ? 'Open X' : 'Check this out'} <ArrowUpRight size={14} />
                  </a>
                </div>
              )}

              {card.type === 'image' && (
                <div className="absolute inset-0">
                  <img 
                    src={card.image} 
                    alt="Profile" 
                    width={630}
                    height={840}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
              )}

              {card.type === 'puzzle' && (
                <div className="absolute inset-0 bg-[#FDFCF8] p-3 md:p-4 flex flex-col justify-center items-center">
                  <div className="grid grid-cols-9 gap-0.5 md:gap-1 w-full">
                    {puzzleLetters.map((row, rIdx) => 
                      row.map((letter, cIdx) => (
                        <div 
                          key={`${rIdx}-${cIdx}`}
                          className={`
                            aspect-square flex items-center justify-center text-[7px] md:text-[9px] font-bold rounded-full transition-colors
                            ${isHighlighted(rIdx, cIdx) 
                              ? 'bg-accent/20 text-accent scale-110 z-10' 
                              : 'text-ink/10'}
                          `}
                        >
                          {letter}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 md:mt-6 text-ink/40 text-[6px] md:text-[8px] font-bold uppercase tracking-widest text-center">
                    Will love to connect with you
                  </div>
                </div>
              )}

              {card.type === 'resume' && (
                <div className="relative h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 backdrop-blur-md">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-base md:text-xl font-bold mb-0.5 md:mb-1">{card.title}</h3>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-2 md:mb-4 opacity-80">
                      {card.experience}
                    </p>
                    <p className="text-white/80 text-[10px] md:text-xs font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 md:py-3 bg-white text-ink rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 hover:bg-opacity-90 transition-all"
                  >
                    View Resume <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="container-wide px-6 mb-12 md:mb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          A few words from <span className="italic-serif font-normal text-accent">people I’ve worked with</span>
        </h2>
        <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
          A few words from people I’ve worked with
        </p>
      </div>
      
      <div className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div key={i} className="inline-block w-[300px] md:w-[400px] p-6 md:p-8 bg-bg rounded-[24px] md:rounded-[32px] border border-border whitespace-normal">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-xs md:text-sm">{t.name}</h4>
                <p className="text-[10px] md:text-xs text-muted">{t.role}</p>
              </div>
            </div>
            <p className="text-ink/80 text-xs md:text-sm italic leading-relaxed">"{t.content}"</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section id="story" className="bg-white py-20 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container-wide mb-16 md:mb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.1] tracking-tight max-w-5xl mx-auto">
          Beyond design files and conversations that start with <span className="italic-serif font-normal text-accent">“just one tweak”</span>
        </h2>
      </div>

      <div className="flex gap-6 md:gap-12 animate-marquee-gallery items-center hover:[animation-play-state:paused] cursor-pointer">
        {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col gap-4 md:gap-6 w-[200px] md:w-[280px] group/item">
            {item.position === 'top' && (
              <motion.p 
                whileHover={{ y: -2, color: 'var(--color-accent)' }}
                className="text-[10px] md:text-xs font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="rounded-[20px] md:rounded-[28px] overflow-hidden border border-border shadow-sm aspect-[3/4] relative"
            >
              <img 
                src={item.image} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>

            {item.position === 'bottom' && (
              <motion.p 
                whileHover={{ y: 2, color: 'var(--color-accent)' }}
                className="text-[10px] md:text-xs font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-gallery {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-gallery {
          display: flex;
          width: fit-content;
          animation: marquee-gallery 50s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee-gallery {
            animation: marquee-gallery 35s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="bg-ink relative overflow-hidden py-32 md:py-60 px-6">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-24 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border border-white/50 relative overflow-hidden"
        >
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-accent/5 pointer-events-none" />

          <div className="relative z-10 text-center">
            <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-6 block">Let's Connect</span>
            <h2 className="text-3xl md:text-5xl font-black text-ink mb-10 leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Let’s build something that <span className="italic-serif font-normal text-accent">actually works.</span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg font-normal leading-[1.6] text-ink/80 tracking-tight">
                Looking to <span className="text-accent">improve your product experience</span>? I <span className="text-accent">design and freelance</span> and when I step away from screens, I’m often exploring new environments, observing behavior, and finding patterns in everyday moments that shape how I think about design. <span className="text-accent">Let’s chat.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.a
                href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 md:px-16 py-[18px] md:py-[22px] bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 shadow-lg shadow-accent/20 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 group text-lg relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-2">Say Hello 👋</span>
              </motion.a>
              
              <motion.a
                href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 md:px-16 py-[18px] md:py-[22px] bg-white border-2 border-ink/10 text-ink font-bold rounded-full shadow-xl shadow-ink/5 hover:shadow-2xl transition-all flex items-center justify-center text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">View Resume <ArrowUpRight size={18} /></span>
              </motion.a>
            </div>
            <div className="mt-8 text-ink/60 font-medium text-lg">
              Mail Me : <a href="mailto:chourasiyaaman76@gmail.com" className="text-accent hover:underline">chourasiyaaman76@gmail.com</a>
            </div>
          </div>
        </motion.div>

        {/* Rotating "Back to Top" Button */}
        <div className="flex flex-col items-center mt-20 md:mt-32">
          <div className="relative w-40 h-40 flex items-center justify-center group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-medium uppercase tracking-[0.2em] fill-white/40 group-hover:fill-accent transition-colors">
                  <textPath xlinkHref="#circlePath">
                    Thanks for your time • 
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <button
              onClick={scrollToTop}
              className="relative z-10 w-20 h-20 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-ink hover:bg-accent hover:text-white hover:border-accent transition-all shadow-xl shadow-ink/5 text-center leading-tight"
            >
              Back to top
            </button>
          </div>
        </div>

        {/* Huge Background Text at Bottom */}
        <div className="absolute bottom-10 left-0 right-0 w-full text-center pointer-events-none select-none z-0">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.03, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-[30vw] font-black text-white leading-none lowercase tracking-tighter inline-block"
          >
            aman
          </motion.h2>
        </div>
      </div>

      <style>{`
        .font-script {
          font-family: var(--font-script);
        }
      `}</style>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg py-12 border-t border-border relative">
      <div className="container-wide px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="text-2xl font-black text-accent">ac.</div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <p className="text-xs text-muted font-medium text-center md:text-left">
              I design with systems in mind, so products don’t break as they grow.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/amanux26" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <LinkedInLogo size={20} />
            </a>
            <a href="https://x.com/aman26ux" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <XLogo size={18} />
            </a>
            <a href="https://medium.com/@chourasiyaaman76" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <MediumLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showWorkPage, setShowWorkPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop/Start Lenis based on overlay state
    if (showWorkPage || selectedProject) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [showWorkPage, selectedProject]);

  const handleSelectProject = (project: Project) => {
    if (project.hasCaseStudy) {
      setSelectedProject(project);
    } else if (project.pdfUrl) {
      // Directly open in new tab and hide toolbar to discourage downloading
      window.open(project.pdfUrl + '#toolbar=0', '_blank');
    }
  };

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      
      <AnimatePresence>
        {showWorkPage && (
          <WorkPage 
            onClose={() => setShowWorkPage(false)} 
            onSelectProject={handleSelectProject}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudy 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <main>
        <Hero onViewWork={() => setShowWorkPage(true)} />
        <AboutSection />
        <WorkSection onSelectProject={handleSelectProject} />
        <MoreWorkBanner />
        <SkillsSection />
        <ExperienceSection />
        <OwnershipSection />
        <TestimonialsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
      />
    </div>
  );
}
