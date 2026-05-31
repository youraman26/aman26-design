import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ExternalLink, AlertTriangle, AlertCircle, Lightbulb, Shield, Zap, CheckCircle2, Sparkles, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';
import { InteractiveMarqueeSlider } from './components/InteractiveMarqueeSlider';
import CaseStudyContactCard from './CaseStudyContactCard';
import { Project } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const ZoomableImage = ({ 
  src, 
  alt, 
  setZoomedImage, 
  className = "bg-white border border-gray-200 rounded-2xl md:rounded-3xl", 
  sizes = "100vw",
  imgClassName = "",
  imgStyle = {}
}: { 
  src: string, 
  alt: string, 
  setZoomedImage: (s: string) => void, 
  className?: string, 
  sizes?: string,
  imgClassName?: string,
  imgStyle?: React.CSSProperties
}) => (
  <div 
    className={`w-full overflow-hidden cursor-zoom-in transition-opacity duration-200 hover:opacity-95 ${className}`}
    onClick={() => setZoomedImage(src)}
  >
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-auto block animate-fade-in ${imgClassName}`} 
      style={{ 
        imageRendering: 'auto',
        ...imgStyle 
      }}
      loading="eager"
      referrerPolicy="no-referrer"
    />
  </div>
);

const stepsData = [
  {
    step: "Step 01",
    title: "Discover (Hover Detection)",
    description: "The user hovers over any response value. A subtle light blue background highlight appears, along with a small non-intrusive \"Save as Variable\" (💾) button.",
    image: "/image/step_01_4x.webp",
    alt: "Inline Hover State"
  },
  {
    step: "Step 02",
    title: "Stage & Review (Smart Extraction Modal)",
    description: "Clicking the button opens a compact, contextual split-view staging modal. It displays the AI-prefilled Name field, the Scope selector radio buttons, and any applicable conflict warnings.",
    image: "/image/step_02_4x.webp",
    alt: "Review and Staging Interface"
  },
  {
    step: "Step 03",
    title: "Commit",
    description: "Nothing is written to the workspace until the user explicitly clicks the primary \"Create Variable\" button, keeping the human in the driver's seat.",
    image: "/image/step_03_4x.webp",
    alt: "Commit Action"
  },
  {
    step: "Step 04",
    title: "Instant Visual Feedback",
    description: "The modal closes, a green toast notification confirms success (\"Variable userId created ✓\"), and a color-coded scope badge appears inline on the JSON payload. The variable instantly populates in the dedicated Variables Management sidebar on the right.",
    image: "/image/step_04_4x.webp",
    alt: "Confirmation and Badge UI"
  }
];

const endToEndFlowData = [
  {
    step: "Step 01",
    title: "Workspace Suggestion: Level Up Your Workflow",
    description: "AI operates discreetly in the background, observing user activity. When it detects patterns like repetitive API requests, it thoughtfully presents a non-intrusive toast notification. This gentle prompt, titled 'Level Up Your Workflow!', suggests grouping these requests and automatically generating reusable variables, streamlining the user's process without interrupting their flow. Users can choose to explore the suggestion or dismiss it to continue their work seamlessly.",
    image: "/image/slide_1_4x.webp",
    alt: "A dark-themed API development environment displaying a GET request. A small toast notification, 'Level Up Your Workflow!', is visible at the bottom right, suggesting that repetitive requests can be grouped and reusable variables created."
  },
  {
    step: "Step 02",
    title: "Global Environment: Staging AI Suggestions",
    description: "Upon entering the Global Variables section, users are presented with a clear view of their existing environment variables. Directly below this, a dedicated staging area is established to house AI-generated variable suggestions. This design ensures that AI recommendations are not automatically integrated but are instead presented for user review, allowing for careful comparison with current data, selection, and the prevention of duplicates or incorrect additions.",
    image: "/image/slide_2_4x.webp",
    alt: "A dark-themed user interface showing the 'Global Variables' management screen. A welcome modal describes it as a shared space for variables. Below a list of existing variables (like base_url, Host), a section for 'Generated Variables from Manage Pets' is visible, currently displaying a loading message 'Sparrow is on the Job... Finding potential variables for you.'"
  },
  {
    step: "Step 03",
    title: "Suggestion Area: AI-Generated Variables",
    description: "AI-generated suggestions are clearly presented in a dedicated section on the screen, manifesting as a prominent modal window. This 'Suggestion Area' compiles a comprehensive list of potential variables, intelligently derived from the user's recent work. Within this area, users are provided with a transparent preview of the proposed additions and a clear understanding that accepting these will update their request data, empowering them to make informed decisions before integrating the AI-generated variables into their environment.",
    image: "/image/slide_3_4x.webp",
    alt: "A dark-themed user interface displaying a large modal window titled 'Generated Variables from \"Manage Pets\"' in the lower-middle section. This modal shows a table-like structure for suggested variables and a note stating, 'The data in your requests will be updated once you accept.' To its right, a smaller overlay titled 'Here Are Your Suggestions' explains, 'We've compiled a list of potential variables for you to check out, based on your recent work,' with 'Dismiss' and 'Next' buttons, indicating navigation through suggestions."
  },
  {
    step: "Step 04",
    title: "Accepting AI-Generated Variables",
    description: "After the AI has presented its suggestions in the staging area, users can thoroughly review the generated variables. To optimize the workflow, the system offers an 'Accept All' feature, enabling the bulk integration of all validated suggestions directly into the Global Variables table. This ensures that the data in subsequent requests is immediately updated, providing seamless consistency with the newly configured environment and enhancing overall efficiency.",
    image: "/image/slide_4_4x.webp",
    alt: "A dark-themed UI displaying AI-generated variables in a table format, under the heading 'Generated Variables from Manage Pets'. An overlaid dialog titled 'Accept in Bulk' explains the option to move all suggestions to the Global Variables table, featuring 'Dismiss' and 'Next' buttons."
  },
  {
    step: "Step 05",
    title: "Accept or Ignore Individually",
    description: "Users are provided with detailed control over the AI-generated variables. Each suggestion can be individually reviewed and managed, offering the flexibility to either accept or dismiss specific entries using dedicated icons. This fine-grained control allows users to precisely integrate relevant suggestions into their environment, ensuring data integrity and preventing unwanted changes before the environment is saved.",
    image: "/image/slide_5_4x.webp",
    alt: "A screenshot of an application interface displaying a list of AI-generated variables within a 'Generated Variables from \"Manage Pets\"' section. An overlay titled 'Accept or Ignore Individually' instructs users on how to use green checkmark and red cross icons to accept or dismiss individual variable suggestions. 'Dismiss' and 'Next' buttons are also visible at the bottom."
  },
  {
    step: "Step 06",
    title: "Make Your Changes Live",
    description: "After users have accepted their desired AI-generated variable suggestions from the staging area, this critical step ensures their integration. A prominent notification guides the user to click the 'Save' button. This action makes all selected variables permanent within the global environment, transitioning them from a suggested state to active, usable data and thereby finalizing the update process.",
    image: "/image/slide_6_4x.webp",
    alt: "A dark-themed user interface displaying a 'Global Variables' panel. An overlayed modal titled 'Make Your Changes Live!' instructs the user to click the 'Save' button to make their accepted variable suggestions permanent, accompanied by a 'Finish' button."
  },
  {
    step: "Step 07",
    title: "Ready to Save: Integrate Global Variables",
    description: "With all desired AI-generated suggestions accepted and integrated into your 'Global Variables' environment, this step highlights the final action required. Review the staged changes one last time, then click 'Save' to permanently apply these new variables, making them accessible and active across your entire workspace.",
    image: "/image/slide_7_4x.webp",
    alt: "A screenshot of the application's 'Global Variables' tab, displaying a list of existing variables and a prominent 'Ready to Save!' message at the bottom, indicating that accepted AI suggestions are staged. A mouse cursor hovers over the 'Save' button in the top right corner, prompting the user to apply changes."
  },
  {
    step: "Step 08",
    title: "Applying Your Variables",
    description: "After users confirm their selections from the AI-generated suggestions, this step details the variable application process. A concise dialog box appears, confirming that variables are being applied to the designated collection. This interaction provides transparency into the ongoing system operations and informs users that they can revert any changes made by Sparrow during the current task if they choose to cancel, ensuring continued user agency and data control.",
    image: "/image/slide_8.webp",
    alt: "A dark user interface screen displaying a central modal dialog titled 'Applying Your Variables'. The dialog explains that variables are being applied to a 'Manage Pets' collection and warns that canceling will revert all changes made by Sparrow during the task. A prominent red 'Cancel' button is visible."
  },
  {
    step: "Step 09",
    title: "Successful Variable Integration",
    description: "After the user has reviewed and accepted the AI-generated suggestions, a prominent toast notification confirms the successful integration of these new variables. They are automatically added to the 'Global Variables' environment and applied to the active 'Manage Pets' collection, providing immediate utility and streamlining the development workflow.",
    image: "/image/slide_9_4x.webp",
    alt: "A screenshot of a dark-themed API development interface, displaying the 'Global Variables' list populated with various key-value pairs. A toast notification in the bottom right corner confirms: 'Successfully added generated variables to \"Global Variables\" environment and applied them to your \"Manage Pets\" collection.'"
  },
  {
    step: "Step 10",
    title: "How to Use Variables",
    description: "Once variables, including those generated or refined by AI, are staged and ready for use, the system provides clear guidance on their integration. A dedicated prompt instructs users to simply type `{{` within any input field, such as the URL bar, to instantly access a contextual dropdown list of all saved variables. This intuitive auto-completion feature streamlines the process of incorporating dynamic data into API requests, enhancing efficiency and accuracy.",
    image: "/image/slide_10_4x.webp",
    alt: "A dark-themed API development interface showing a GET request tab. The URL field contains `{{base_url}}`. A pop-up titled 'How to Use Variables' overlays the interface, instructing users to type `{{` to access saved variables, with an example of `{{base_url}}/users`."
  }
];

const SparrowCaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (zoomedImage) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomedImage]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const lenis = new Lenis({
      wrapper: containerRef.current,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 5), // Premium quintic ease-out for ultra-buttery inertial scroll stops
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Dynamic resize tracking to prevent scroll-stuck issues when images load
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    resizeObserver.observe(containerRef.current);
    const mainElement = containerRef.current.querySelector('main');
    if (mainElement) {
      resizeObserver.observe(mainElement);
    }

    // Also handle general image load events as a fallback
    const handleImageLoad = () => {
      lenis.resize();
    };
    window.addEventListener('load', handleImageLoad);
    containerRef.current.addEventListener('load', handleImageLoad, true);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('load', handleImageLoad);
      if (containerRef.current) {
        containerRef.current.removeEventListener('load', handleImageLoad, true);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-white overflow-y-auto overflow-x-hidden no-scrollbar font-sans text-ink"
      data-lenis-prevent
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between text-ink">
        <span className="text-xs md:text-sm lg:text-base font-semibold text-zinc-900">Case Study: {project.title}</span>
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink border border-ink/10 rounded-full hover:bg-ink hover:text-white transition-all duration-300"
        >
          <X size={18} />
          Close
        </button>
      </nav>

      <main className="pb-16 selection:bg-accent/20">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-12 px-4 md:px-12 lg:px-24 w-full border-b border-gray-100">
          <div className="max-w-6xl mx-auto w-full">
            <h2 
              className="text-left text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-12 tracking-tight w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.title}
            </h2>
            
            <div className="w-full mb-16">
              <ZoomableImage 
                src="/image/environment_generated_variables_accept_all_2x.webp" 
                alt="Sparrow Generate Variables Feature Overview" 
                sizes="100vw"
                setZoomedImage={setZoomedImage}
              />
            </div>
              
            <div className="space-y-12">
              <div className="py-12 px-0 border-b border-gray-100">
                <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                  Overview
                </h4>
                <h2 
                  className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Building an AI-Assisted Variable Workflow for API Testing
                </h2>
                <div className="text-base md:text-lg text-ink/80 leading-relaxed font-normal space-y-4">
                  <p>
                    Sparrow is an API testing platform used by developers working with complex request chains, dynamic responses, and shared environments.
                  </p>
                  <p className="text-[#DE1C4D]">
                    I led the end-to-end design of a new variable generation workflow that helped developers extract values from API responses, assign names, manage scope, and reuse data across requests without breaking their testing flow.
                  </p>
                  <p>
                    The project was completed in a 4-week sprint after 2 weeks of discovery and research.
                  </p>
                  <p>
                    The feature was introduced to reduce setup effort, improve consistency across teams, and make variable management easier to understand inside large API testing environments.
                  </p>
                </div>
              </div>

              <div className="py-12 px-0 border-b border-gray-100">
                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-ink uppercase tracking-wide mb-4">Team</h4>
                    <ul className="text-base text-ink/80 leading-relaxed space-y-1.5 list-none pl-0">
                      <li>1 Product Manager</li>
                      <li>1 Design Manager</li>
                      <li>2 Engineers</li>
                      <li>1 QA Engineer</li>
                      <li>1 Product Designer (Me)</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-ink uppercase tracking-wide mb-4">My Role</h4>
                    <div className="text-base text-ink/80 leading-relaxed">
                      <p className="font-medium text-ink mb-2">I was responsible for:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Discovery and research</li>
                        <li>Workflow mapping</li>
                        <li>UX strategy</li>
                        <li>Design exploration</li>
                        <li>Prototyping</li>
                        <li>Validation</li>
                        <li>Engineering collaboration</li>
                        <li>Final delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-12 px-0 border-b border-gray-100">
                <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                  Outcome
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="border border-gray-200 p-6 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200">
                    <span className="block text-3xl font-medium text-[#DE1C4D] mb-2">6m → 45s avg</span>
                    <p className="font-medium text-ink text-base">Setup Time Drops</p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200">
                    <span className="block text-3xl font-medium text-[#DE1C4D] mb-2">9/10</span>
                    <p className="font-medium text-ink text-base">AI Suggestion Accepted</p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200">
                    <span className="block text-3xl font-medium text-[#DE1C4D] mb-2">0</span>
                    <p className="font-medium text-ink text-base">Blocking Conflicts</p>
                  </div>
                  
                  <div className="border border-gray-200 p-6 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all duration-200">
                    <span className="block text-3xl font-medium text-[#DE1C4D] mb-2">1 min</span>
                    <p className="font-medium text-ink text-base">To Take Scope Clarity</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* --- BUSINESS CONTEXT --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Business Context
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Why this problem mattered?
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed font-normal space-y-6">
              <p>
                API testing workflows often depend on values generated from previous requests.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-gray-150 block w-full my-4">
                <p className="font-semibold text-ink/90 text-sm uppercase tracking-wider mb-3">For Example :</p>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#DE1C4D] font-bold">→</span>
                    <span>A login request may return an authentication token.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#DE1C4D] font-bold">→</span>
                    <span>A user creation request may return a user ID.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#DE1C4D] font-bold">→</span>
                    <span>A session request may return temporary credentials.</span>
                  </li>
                </ul>
              </div>

              <p>
                These values often need to be reused throughout multiple requests. Although variable creation was a routine task, it was still handled manually.
              </p>
              
              <p className="text-[#DE1C4D]">
                Developers repeatedly copied values, created variables, selected scope, and configured environments before they could begin testing properly.
              </p>
              
              <div className="my-6">
                <p className="font-medium text-ink mb-3">As workflows became larger and more collaborative, this process started affecting:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Setup speed</li>
                  <li>Team consistency</li>
                  <li>Debugging effort</li>
                  <li>Environment reliability</li>
                </ul>
              </div>
              
              <p>
                The opportunity was not simply to automate extraction.
              </p>
              
              <p className="text-lg font-medium text-ink">
                The opportunity was to reduce operational friction while maintaining trust and visibility.
              </p>
            </div>
          </div>
        </section>

        {/* --- 1. THE PROBLEM --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              The problem
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Manual variable management was slowing down API testing
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-8">
              <p>
                During discovery, we found three recurring problems.
              </p>
              
              {/* Problem 1 */}
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-ink mb-3">01. Naming Inconsistency</h3>
                <p className="mb-4">
                  Different developers created variables using different naming patterns. Over time this created confusion across shared workspaces and made collections harder to maintain.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 inline-block min-w-[200px] mb-3">
                  <p className="font-semibold text-xs uppercase tracking-wider text-ink/60 mb-2">Examples:</p>
                  <ul className="space-y-1 text-[18px] font-medium font-mono text-[#DE1C4D] pl-0 list-none">
                    <li>userId</li>
                    <li>user_id</li>
                    <li>id</li>
                  </ul>
                </div>
              </div>

              {/* Problem 2 */}
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-ink mb-3">02. Scope Confusion</h3>
                <p className="mb-3">
                  Developers often disagreed about where variables should live. Because scope wasn't always clear, teams frequently introduced broken dependencies.
                </p>
                <div className="pl-6 border-l-2 border-[#DE1C4D] space-y-2 my-4">
                  <p className="font-medium text-ink">Should a value belong to:</p>
                  <ul className="list-disc pl-5 space-y-1 marker:text-[#DE1C4D]">
                    <li>A single request?</li>
                    <li>A request flow?</li>
                    <li>The entire environment?</li>
                  </ul>
                </div>
              </div>

              {/* Problem 3 */}
              <div>
                <h3 className="text-[22px] font-medium text-ink mb-3">03. Debugging Complexity</h3>
                <p>
                  When variables were overwritten or reused incorrectly, failures became difficult to trace. Developers often spent more time finding variable issues than testing APIs.
                </p>
              </div>
            </div>

            <div className="mt-16 w-full">
              <ZoomableImage 
                src="/image/manual_process_flow_2x.webp" 
                alt="Manual process flow" 
                sizes="(max-width: 768px) 100vw, 1200px"
                setZoomedImage={setZoomedImage}
              />
            </div>
          </div>
        </section>

        {/* --- UNDERSTANDING --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full animate-fade-in">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              UNDERSTANDING THE WORKFLOW
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Researching how developers actually handle variables
            </h2>
            
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-8">
              <div>
                <p className="mb-4 font-medium text-ink">
                  I conducted 12 interviews with:
                </p>
                
                <ul className="list-disc pl-6 mb-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Backend Engineers</li>
                  <li>Full-Stack Developers</li>
                  <li>QA Automation Engineers</li>
                  <li>DevOps Engineers</li>
                </ul>

                <p className="my-6">
                  The goal was to understand how teams currently handled variable creation inside real testing environments.
                </p>
              </div>

              <div className="my-8">
                <p className="font-medium text-ink mb-4">Instead of focusing on feature requests, I focused on understanding:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Existing workflows</li>
                  <li>Workarounds</li>
                  <li>Failure points</li>
                  <li>Team collaboration patterns</li>
                </ul>
              </div>

              <div className="my-10">
                <p className="font-semibold text-lg text-ink mb-6">Several recurring frustrations appeared across interviews.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-ink/90 italic mb-4">
                      “When I import a large Swagger file, I have to manually find and replace every base URL and token.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— Backend Developer</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-ink/90 italic mb-4">
                      “Setting up environment variables takes more time than actually testing the APIs.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— Full-Stack Developer</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-ink/90 italic mb-4">
                      “It’s easy to miss something like a user ID or auth token in a big payload. You usually only realize it when the API fails.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— QA Automation Engineers</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-ink/90 italic mb-4">
                      “I sometimes run a find-and-replace on the raw JSON before importing. But it’s risky—one small mistake can break the whole collection.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— DevOps Engineer</span>
                  </div>
                </div>
              </div>

              <p className="font-medium text-ink/90 pt-4">
                These conversations revealed that developers were spending a surprising amount of time making small configuration decisions before they could begin actual testing.
              </p>

              <div className="pt-6 border-t border-gray-200/60 mt-10 space-y-4">
                <p>
                  They were struggling because managing variables required repeated decisions throughout their workflow.
                </p>
                <div>
                  <p className="font-medium text-ink mb-2">Every extracted value required users to decide:</p>
                  <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                    <li>Should this become a variable?</li>
                    <li>What should I call it?</li>
                    <li>Where should it live?</li>
                    <li>Will it affect other requests?</li>
                  </ul>
                </div>
                <p>
                  These small decisions accumulated across every testing session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. WHAT I LEARNED FROM RESEARCH --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              What I learned & understood
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              The problem was not extraction
            </h2>
            <div className="text-base md:text-lg text-white/80 leading-relaxed space-y-6">
              <p>
                Initially, we assumed the biggest problem was manually copying values from API responses. But during research, I noticed that developers had already created their own systems for managing variables.
              </p>
              
              <p className="font-semibold text-white">
                These behaviors fell into three recurring patterns.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-[#DE1C4D] mb-3 text-base uppercase tracking-wider">
                    The Manual Copier
                  </h5>
                  <p className="text-sm text-white/70">
                    Copied values directly into future requests. Fast for small workflows but difficult to maintain as collections grew.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-[#DE1C4D] mb-3 text-base uppercase tracking-wider">
                    The Script Writer
                  </h5>
                  <p className="text-sm text-white/70">
                    Created custom extraction logic using JSONPath and scripts. Powerful but difficult for less experienced team members to understand and maintain.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h5 className="font-bold text-[#DE1C4D] mb-3 text-base uppercase tracking-wider">
                    The Environment Manager
                  </h5>
                  <p className="text-sm text-white/70">
                    Relied on shared configuration layers and environment files. More scalable but often created ownership and synchronization problems across teams.
                  </p>
                </div>
              </div>

              <p>
                The important insight was that none of these approaches solved visibility and consistency together.
              </p>

              <div className="my-6">
                <p className="font-semibold text-white">The larger issue was interpretation. They repeatedly needed to decide:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Which values mattered.</li>
                  <li>Which values should become reusable.</li>
                  <li>How variables should be organized.</li>
                </ul>
              </div>

              <p>
                This changed the direction of the feature building.
              </p>

              <p className="text-lg font-medium text-[#DE1C4D]">
                Instead of building a faster extraction tool, we started exploring ways to reduce decision effort.
              </p>

              <p className="text-lg font-medium text-white">
                That became the opportunity space for the feature to grow.
              </p>
            </div>
            
          </div>
        </section>

        {/* --- THE MOST IMPORTANT INSIGHT --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              The Most Important Insight
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              We as team were solving a trust problem, not an extraction problem
            </h2>

            <div className="text-base md:text-lg text-[#111111]/80 leading-relaxed font-normal space-y-6">
              <p>
                At the beginning of the project, we assumed reducing manual effort was the primary goal. But, Research showed something different.
              </p>
              <p>
                Developers were comfortable doing manual work if they understood what was happening. What frustrated them was repetitive work without visibility.
              </p>

              <div className="my-8">
                <p className="font-semibold text-[#111111] mb-4">Across interviews, one concern appeared repeatedly.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-[#111111]/90 italic mb-4">
                      “I don’t want AI making changes without my control.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— Backend Developer</span>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-150 flex flex-col justify-between shadow-sm">
                    <div className="text-base text-[#111111]/90 italic mb-4">
                      “Show me what the AI is going to do first.”
                    </div>
                    <span className="text-sm font-semibold text-[#DE1C4D]">— Lead Backend Engineer</span>
                  </div>
                </div>
              </div>

              <p>
                The concern was not accuracy.
              </p>
              <p className="text-3xl font-bold text-[#DE1C4D]">
                It was trust.
              </p>

              <div className="my-6">
                <p className="font-semibold text-[#111111]">Developers wanted:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Faster setup</li>
                  <li>Better consistency</li>
                  <li>Less repetition</li>
                </ul>
              </div>

              <p>
                But they did not want AI making silent decisions on their behalf.
              </p>
              <p>
                This insight changed the direction of the product.
              </p>
              <p className="text-lg font-medium text-[#DE1C4D]">
                The project shifted from an automation problem to a visibility and trust problem.
              </p>
            </div>
          </div>
        </section>

        {/* --- WHY AI --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full animate-fade-in">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Why AI?
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Why We Chose an AI-Assisted Approach?
            </h2>

            <div className="text-base md:text-lg text-ink/80 leading-relaxed font-normal space-y-6">
              <p>
                Before moving toward AI, we explored simpler approaches.
              </p>
              
              <div>
                <p className="font-semibold text-ink mb-3">We considered:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Manual workflow improvements</li>
                  <li>Pattern-based extraction</li>
                  <li>Template generation</li>
                  <li>Rule-based variable suggestions</li>
                </ul>
              </div>

              <p>
                These approaches reduced some effort but still required developers to repeatedly decide:
              </p>
              
              <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                <li>Which values should become variables?</li>
                <li>What those variables should be called?</li>
                <li>Where they should live?</li>
              </ul>

              <p className="font-medium text-ink/90 pt-2">
                The larger problem was interpretation. AI became relevant because it could assist with interpretation.
              </p>

              <div className="my-8">
                <p className="font-semibold text-ink mb-4">AI could assist with those decisions by:</p>
                <ul className="list-disc pl-6 space-y-1.5 marker:text-[#DE1C4D]">
                  <li>Detect reusable values</li>
                  <li>Suggest names</li>
                  <li>Recommend scope</li>
                  <li>Reduce repetitive setup work</li>
                </ul>
              </div>

              <p>
                However, research revealed an important constraint.
              </p>

              <div className="pl-6 border-l-2 border-[#DE1C4D] space-y-1 my-4">
                <p className="text-lg font-medium text-[#111111]">AI could assist decisions.</p>
                <p className="text-xl font-bold text-[#DE1C4D]">It could not silently make them.</p>
              </div>

              <p>
                Developers did not want automatic changes they want control on their end. As they wanted assistance not automation.
              </p>

              <p className="text-lg font-medium text-[#DE1C4D] pt-2">
                This became one of the most important product decisions in the project.
              </p>
            </div>
          </div>
        </section>

        {/* --- 4. PRODUCT PRINCIPLES --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Product principles I defined
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-12 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Three principles guided the direction of the feature.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">REDUCE REPETITIVE DECISIONS</h3>
                <p className="text-white/70">Developers should not repeatedly configure the same values throughout a workflow.</p>
              </div>
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">PRESERVE VISIBILITY</h3>
                <p className="text-white/70">Users should always understand what is being created and where it will be used.</p>
              </div>
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">KEEP USERS IN CONTROL</h3>
                <p className="text-white/70 font-sans">AI should assist decisions, not automatically make irreversible changes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- KEY PRODUCT DECISIONS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Key product decisions
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-16 w-full text-ink"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              The decisions behind the final workflow
            </h2>

            <div className="space-y-16 max-w-3xl">
              {/* Decision 01 */}
              <div>
                <span 
                  className="block mb-3 uppercase text-[#DE1C4D] tracking-widest text-[14px] font-medium"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Decision 01
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                  Do not auto-create variables
                </h3>
                <div className="text-base md:text-[16px] text-ink/75 leading-relaxed space-y-4 font-normal">
                  <p>Early discussions included automatic variable generation.</p>
                  <p>We intentionally avoided this direction. Developers consistently told us they wanted visibility before changes were applied.</p>
                  <p className="text-[#DE1C4D]">Automatic creation increased speed, but reduced trust.</p>
                </div>
              </div>

              {/* Decision 02 */}
              <div>
                <span 
                  className="block mb-3 uppercase text-[#DE1C4D] tracking-widest text-[14px] font-medium"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Decision 02
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                  Keep everything inside the existing workflow
                </h3>
                <div className="text-base md:text-[16px] text-ink/75 leading-relaxed space-y-4 font-normal">
                  <p>Our first assumption was that variable management needed its own dedicated workspace.</p>
                  <p>Testing quickly proved otherwise. Developers spent most of their time moving between:</p>
                  <ul className="list-disc pl-5 space-y-1 my-2 marker:text-[#DE1C4D]">
                    <li>Responses</li>
                    <li>Requests</li>
                    <li>Environment configurations</li>
                  </ul>
                  <p className="text-[#DE1C4D]">Introducing a separate workspace increased context switching.</p>
                </div>
              </div>

              {/* Decision 03 */}
              <div>
                <span 
                  className="block mb-3 uppercase text-[#DE1C4D] tracking-widest text-[14px] font-medium"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Decision 03
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-6">
                  Make scope visible
                </h3>
                <div className="text-base md:text-[16px] text-ink/75 leading-relaxed space-y-4 font-normal">
                  <p>Research showed that scope confusion caused many downstream issues.</p>
                  <p className="text-[#DE1C4D]">Most tools treated scope as configuration. We treated it as a visual system.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. EXPLORING THE SOLUTION (ZIG ZAG) --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-20">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                EXPLORATION
              </h4>
              <h2 className="text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-8 text-ink" style={{ fontFamily: 'var(--font-sans)' }}>
                I tested three possible design solution, first two declined
              </h2>
            </div>

            <div className="space-y-32">
              {/* Iteration 01 */}
              <div className="flex flex-col gap-8">
                <div>
                  <span 
                    className="block mb-3 uppercase text-[#DE1C4D] tracking-widest text-[14px] font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Iteration 01
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight">
                    Dedicated Variable Workspace
                  </h3>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="space-y-6 text-base text-ink/75 leading-relaxed font-normal">
                      <div>
                        <p className="font-semibold text-base text-ink mb-1">Why we tried it</p>
                        <p>We believed organization was the main problem.</p>
                        <p className="mt-2">The concept introduced a dedicated workspace where developers could review and create variables separately.</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-base text-ink mb-1">What we learned</p>
                        <p>Although organization improved, developers lost visibility into their active testing context. Users repeatedly moved back and forth between requests and variables.</p>
                      </div>

                      <div className="pt-4 text-[#DE1C4D] font-semibold">
                        <p className="font-semibold text-base mb-1">Decision</p>
                        <p className="text-lg font-bold">We moved away from a dedicated workspace.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-gray-50/50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <ZoomableImage 
                      src="/image/iterartion_tab_approach_2x.webp" 
                      alt="Dedicated Variable Workspace" 
                      sizes="(max-width: 768px) 100vw, 600px"
                      setZoomedImage={setZoomedImage}
                    />
                  </div>
                </div>
              </div>

              {/* Iteration 02 */}
              <div className="flex flex-col gap-8">
                <div>
                  <span 
                    className="block mb-3 uppercase text-[#DE1C4D] tracking-widest text-[14px] font-medium"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Iteration 02
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-ink tracking-tight">
                    Modal-Based Workflow
                  </h3>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="space-y-6 text-base text-ink/75 leading-relaxed font-normal">
                      <div>
                        <p className="font-semibold text-base text-ink mb-1">Why we tried it</p>
                        <p>We wanted to keep users closer to their workflow while still allowing review.</p>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-base text-ink mb-1">What we learned</p>
                        <p>The modal blocked access to existing variables and environment information. Developers felt less confident applying changes because they couldn't compare information easily.</p>
                      </div>

                      <div className="pt-4 text-[#DE1C4D] font-semibold">
                        <p className="font-semibold text-base mb-1">Decision</p>
                        <p className="text-lg font-bold">We moved toward a split-view workflow instead.</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-gray-50/50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <ZoomableImage 
                      src="/image/iteration_modal_approach_2x.webp" 
                      alt="Modal-Based Workflow" 
                      sizes="(max-width: 768px) 100vw, 600px"
                      setZoomedImage={setZoomedImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CRAFTING THE DETAILS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-16 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                Crafting the Details
              </h4>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-8">
                Solving Core UX Challenges
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                The final interface features a split-view staging area that sits directly alongside the user's existing environment variables, allowing for simultaneous comparison to build absolute trust.
              </p>
            </div>
          </div>

          <div className="w-full mb-20 max-w-7xl mx-auto px-4 md:px-0">
            <ZoomableImage 
              src="/image/sparrow_anatomy_2x.webp" 
              alt="Anatomy of Sparrow feature" 
              sizes="100vw"
              setZoomedImage={setZoomedImage}
            />
          </div>

          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-4xl mx-auto flex flex-col gap-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Challenge 1 */}
                <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/20 group flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono font-medium tracking-wider text-[#DE1C4D] bg-[#DE1C4D]/10 px-2.5 py-1 rounded-full uppercase">01</span>
                      <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Intelligent Naming</h3>
                    </div>
                    <p className="text-ink/75 text-[15px] leading-relaxed mb-8">
                      Generates context-aware camelCase suggestions from nested JSON keys instantly, eradicating naming paralysis.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-ink/65 w-fit font-mono">
                    <span>"id"</span>
                    <span className="text-[#DE1C4D]">→</span>
                    <span className="text-[#DE1C4D] font-medium">userId</span>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/20 group flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono font-medium tracking-wider text-[#DE1C4D] bg-[#DE1C4D]/10 px-2.5 py-1 rounded-full uppercase">02</span>
                      <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Scope Clarity System</h3>
                    </div>
                    <p className="text-ink/75 text-[15px] leading-relaxed mb-8">
                      A three-tier visual hierarchy mapping where variables live and when they persist.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50/50 px-2.5 py-1.5 rounded-lg border border-indigo-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>Request</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sky-600 bg-sky-50/50 px-2.5 py-1.5 rounded-lg border border-sky-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <span>Flow</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50/50 px-2.5 py-1.5 rounded-lg border border-emerald-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Env</span>
                    </div>
                  </div>
                </div>

                {/* Challenge 3 */}
                <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/20 group flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono font-medium tracking-wider text-[#DE1C4D] bg-[#DE1C4D]/10 px-2.5 py-1 rounded-full uppercase">03</span>
                      <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Conflict Safety Net</h3>
                    </div>
                    <p className="text-ink/75 text-[15px] leading-relaxed mb-8">
                      Real-time validation warnings prevent accidental variable overrides before save operations are committed.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-amber-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      <span>Duplicate key warning</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Immutable scope error</span>
                    </div>
                  </div>
                </div>
                
                {/* Challenge 4 */}
                <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/20 group flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs font-mono font-medium tracking-wider text-[#DE1C4D] bg-[#DE1C4D]/10 px-2.5 py-1 rounded-full uppercase">04</span>
                      <h3 className="text-xl md:text-2xl font-bold text-ink tracking-tight">Forgiveness &amp; Traceability</h3>
                    </div>
                    <p className="text-ink/75 text-[15px] leading-relaxed mb-8">
                      A 10-second contextual undo window paired with complete generation history to reverse misclicks instantly.
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-ink/75 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 w-fit font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DE1C4D]" />
                    <span>Contextual 10s undo buffer</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- THE COMPLETE USER FLOW (ZIG ZAG) --- */}
        <section className="py-24 bg-gray-50 border-y border-gray-200 w-full overflow-hidden">
          <div className="max-w-6xl mx-auto w-full px-4 md:px-12 lg:px-24">
            <div className="mb-20 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                The Complete User Flow
              </h4>
              <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
                Inline smart extraction became the core flow
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                The final choice followed the logic of tools like GitHub Copilot. The intelligence appears exactly where the user already is, instead of asking them to move somewhere else or blocking their screen. 
              </p>
            </div>
          </div>

          <div className="w-full mt-12 overflow-hidden relative">
            <InteractiveMarqueeSlider
              items={stepsData}
              speed={0.7}
              sectionId="complete-user-flow-slider"
              renderItem={(step, idx) => (
                <div
                  className="w-[280px] xs:w-[325px] sm:w-[450px] md:w-[540px] lg:w-[650px] shrink-0 rounded-3xl bg-transparent border border-gray-200 p-5 md:p-8 flex flex-col gap-6 shadow-none transition-all duration-300 h-full"
                >
                  {/* Step Header */}
                  <div className="flex flex-col select-none">
                    <span className="text-[#DE1C4D] font-mono font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                      {step.step}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-ink mb-2 md:mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Mockup Showcase - transparent container with a light stroke outline and no drop shadow */}
                  <div className="w-full mt-auto rounded-xl md:rounded-2xl overflow-hidden border border-gray-200/60 bg-transparent shadow-none select-none">
                    <ZoomableImage 
                      src={step.image} 
                      alt={step.alt} 
                      setZoomedImage={(s) => {
                        setZoomedImage(s);
                      }} 
                      className="bg-transparent border-none rounded-none shadow-none pointer-events-auto"
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        {/* --- END TO END FLOW WALKTHROUGH --- */}
        <section className="py-24 bg-white border-y border-gray-200 w-full overflow-hidden">
          <div className="max-w-6xl mx-auto w-full px-4 md:px-12 lg:px-24">
            <div className="mb-20 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                END TO END FLOW
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                First time user step by step walkthrough
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                Experience a complete user journey from raw environment setup to verified collection run coherence. See how Sparrow guides and supports developers step-by-step.
              </p>
            </div>
          </div>

          <div className="w-full mt-12 overflow-hidden relative">
            <InteractiveMarqueeSlider
              items={endToEndFlowData}
              speed={0.6}
              sectionId="end-to-end-flow-slider"
              renderItem={(step, idx) => (
                <div
                  className="w-[280px] xs:w-[325px] sm:w-[450px] md:w-[540px] lg:w-[650px] shrink-0 rounded-3xl bg-transparent border border-gray-200 p-5 md:p-8 flex flex-col gap-6 shadow-none transition-all duration-300 h-full"
                >
                  {/* Step Header */}
                  <div className="flex flex-col select-none">
                    <span className="text-[#DE1C4D] font-mono font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                      {step.step}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-ink mb-2 md:mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Mockup Showcase - transparent container with a light stroke outline and no drop shadow */}
                  <div className="w-full mt-auto rounded-xl md:rounded-2xl overflow-hidden border border-gray-200/60 bg-transparent shadow-none select-none">
                    <ZoomableImage 
                      src={step.image} 
                      alt={step.alt} 
                      setZoomedImage={(s) => {
                        setZoomedImage(s);
                      }} 
                      className="bg-transparent border-none rounded-none shadow-none pointer-events-auto"
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </section>

        {/* --- 10. VARIABLES MANAGEMENT PANEL --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 border-t border-gray-100 w-full bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-12 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                VARIABLE MANAGEMENT PANEL
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full text-ink"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                A dedicated panel to make variable reuse easy and controllable
              </h2>
            </div>

            <div className="w-full text-lg text-ink/75 leading-relaxed font-normal mb-16">
              <p className="w-full mb-6 text-ink/75">
                One important observation from research was that teams rarely created one variable at a time. Most testing sessions involved managing multiple values across large payloads. To support this behavior, I designed a dedicated variable management panel that allowed users to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-ink/75 marker:text-[#DE1C4D] mb-8">
                <li>Review active variables</li>
                <li>Filter by scope</li>
                <li>Edit values</li>
                <li>Copy variables quickly</li>
                <li>Manage multiple variables without leaving context</li>
              </ul>
              <p className="text-[#DE1C4D] font-semibold text-lg">
                This shifted variables from hidden configuration data into a visible part of the testing workflow.
              </p>
            </div>

            <div className="w-full max-w-7xl mx-auto">
               <ZoomableImage src="/image/variable_management_2x.webp" alt="Right sidebar variables management panel UI" sizes="100vw" setZoomedImage={setZoomedImage} />
            </div>
          </div>
        </section>

        {/* --- CONSTRAINTS AND TRADEOFFS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 border-t border-gray-100 w-full bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-16 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                CONSTRAINTS AND TRADEOFFS
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full text-ink animate-fade-in"
                style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}
              >
                What we chose not to build
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed max-w-3xl font-normal">
                Several ideas were intentionally excluded from the first release.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-base text-ink/75 leading-relaxed font-normal">
              {/* Point 1 */}
              <div>
                <h3 className="text-xl font-bold text-ink mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Automatic variable replacement
                </h3>
                <p>
                  Although faster, testing showed reduced trust and debugging visibility.
                </p>
              </div>

              {/* Point 2 */}
              <div>
                <h3 className="text-xl font-bold text-ink mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Dependency graph visualization
                </h3>
                <p>
                  The concept was valuable but required significantly larger engineering investment than the timeline allowed.
                </p>
              </div>

              {/* Point 3 */}
              <div>
                <h3 className="text-xl font-bold text-ink mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Full environment automation
                </h3>
                <p>
                  This introduced risks around ownership, hidden system behavior, and debugging complexity.
                </p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
              <p className="text-[#DE1C4D] font-semibold text-lg">
                Instead, we prioritized adoption, visibility, and control.
              </p>
            </div>
          </div>
        </section>

        {/* --- 11 & 12. VALIDATION AND IMPACT --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full">
          <div className="max-w-6xl mx-auto w-full space-y-32">
            
            {/* Validation */}
            <div>
              <h4 className="text-[18px] font-bold text-accent uppercase tracking-wide mb-6">
                Validation
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                The design was tested with real developers
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
                I validated the feature strictly with 8 diverse backend developers using aggressive early prototypes. The results validated the "human-in-the-loop" strategy perfectly across speed, comprehension, and structural safety margins.
              </p>

              <div className="mb-12 text-base md:text-lg text-white/70 leading-relaxed font-normal">
                <p className="mb-4 text-white font-medium">The goal was to evaluate:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-white/70 marker:text-accent">
                  <li>Workflow speed</li>
                  <li>Naming acceptance</li>
                  <li>Scope comprehension</li>
                  <li>Error prevention</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">8x</span>
                  <p className="font-medium text-lg">Speed Improvement</p>
                  <p className="text-sm text-white/70 mt-1">Setup tasks reduced from approximately 6 minutes to 45 seconds.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">82%</span>
                  <p className="font-medium text-lg">AI Adoption</p>
                  <p className="text-sm text-white/70 mt-1">Most AI naming suggestions were accepted without modification.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">78%</span>
                  <p className="font-medium text-lg">Scope Clarity</p>
                  <p className="text-sm text-white/70 mt-1">Participants understood scope hierarchy more consistently.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">100%</span>
                  <p className="font-medium text-lg">Collision Blocked</p>
                  <p className="text-sm text-white/70 mt-1">No critical conflicts occurred during testing sessions.</p>
                </div>
              </div>

              <p className="text-[20px] leading-relaxed font-semibold text-[#DE1C4D]">
                More importantly, developers reported greater confidence because they could review and control changes before applying them.
              </p>
            </div>

            {/* Impact */}
            <div className="pt-24 border-t border-white/10">
              <h4 className="text-[18px] font-bold text-accent uppercase tracking-wide mb-6">
                Impact
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full text-white"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                The biggest outcome was not speed.
              </h2>
              
              <div className="text-base md:text-lg text-white/75 leading-relaxed font-normal space-y-6 max-w-3xl">
                <p className="text-2xl md:text-3xl font-semibold text-accent">
                  It was clarity.
                </p>
                <p>
                  Variables became easier to understand, easier to manage, and easier to trace across workflows.
                </p>
                <p>
                  Instead of treating variables as hidden configuration, the product made them visible parts of the testing experience.
                </p>
                <p>
                  This reduced friction for individual developers while creating more consistency across teams.
                </p>
                <p>
                  One QA engineer described the conflict warning system as something that helped them catch a deprecated token before it affected a larger testing workflow.
                </p>
                <p className="text-lg text-accent font-semibold pt-4">
                  That reinforced one of the project's biggest lessons: Visibility often creates more value than automation.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- 13 & 14. LESSONS AND ROADMAP --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 border-t border-gray-100 bg-white w-full">
          <div className="max-w-6xl mx-auto w-full space-y-32">
            
            {/* Lessons */}
            <div>
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                What I learned
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Context and clarity mattered more than pure automation
              </h2>
              <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
                <p>
                  This monumental sprint reinforced harsh product truths. Complex workflow features simply cannot be designed in total isolation, because variables only exist to construct the full lifecycle of a chain. Designing in context succeeded; designing in pop-ups failed.
                </p>
                <p>
                  Additionally, AI serves to enhance clarity, never replace it. The smart suggestion engine was incredible, but the visual mental models (the colors, bindings, hierarchies) were what actually built the underlying trust for the user. <strong>Trust is fundamentally a product requirement, not an extra layer.</strong>
                </p>
              </div>
            </div>



          </div>
        </section>

        {/* --- THANK YOU SECTION --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full text-center">
          <div className="max-w-6xl mx-auto w-full">
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-none text-white select-none animate-fade-in"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Thank you for your time
            </h2>
          </div>
        </section>

        <CaseStudyContactCard />

        <AnimatePresence>
          {zoomedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-white/98 flex flex-col overflow-hidden"
              onClick={() => setZoomedImage(null)}
            >
              <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
                <div className="hidden md:flex flex-col items-end mr-4">
                  <span className="text-sm font-medium text-ink/60">Click to {scale === 1 ? 'Zoom In' : 'Zoom Out'}</span>
                  <span className="text-xs text-ink/40">Drag to pan while zoomed</span>
                </div>
                <button 
                  className="p-4 bg-ink/5 hover:bg-[#DE1C4D] hover:text-white rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(null);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <motion.div 
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  drag={scale > 1}
                  dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                  dragElastic={0.1}
                  animate={{ 
                    scale: scale,
                    x: scale === 1 ? 0 : undefined,
                    y: scale === 1 ? 0 : undefined
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative origin-center"
                  onClick={() => {
                    if (scale > 1) {
                      setScale(1);
                    } else {
                      setScale(2.5);
                    }
                  }}
                >
                  <ResponsiveImage 
                    src={zoomedImage} 
                    alt="Zoomed View" 
                    sizes="95vw"
                    className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-xl border border-gray-100 pointer-events-none select-none"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </motion.div>
  );
};

export default SparrowCaseStudy;
