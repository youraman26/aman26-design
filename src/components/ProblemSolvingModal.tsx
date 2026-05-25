import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquare, Send, CheckCircle2, Sparkles } from "lucide-react";

interface ProblemSolvingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StepCard {
  id: number;
  badge: string;
  heading: string;
  mainText: React.ReactNode;
}

interface UserFeedback {
  id: string;
  name: string;
  role: string;
  content: string;
  timestamp: string;
}

export const ProblemSolvingModal: React.FC<ProblemSolvingModalProps> = ({ isOpen, onClose }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState(1);

  // Dynamic feedback state with local storage persistence - no default dummy comments
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aman_approach_feedback_form_only_v1");
    if (saved) {
      try {
        setFeedbacks(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading feedbacks", err);
      }
    }
  }, []);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newComment: UserFeedback = {
      id: `feedback-${Date.now()}`,
      name: newName.trim() || "Anonymous Collaborator",
      role: newRole.trim() || "Visitor / Partner",
      content: newContent.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    const updated = [newComment, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("aman_approach_feedback_form_only_v1", JSON.stringify(updated));

    // Reset input fields
    setNewName("");
    setNewRole("");
    setNewContent("");
    
    // Show gorgeous trigger toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };


  // Lock raw body scrolling when modal is open to ensure seamless container touch translation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Design story points defined with high-clarity copy
  const steps: StepCard[] = [
    {
      id: 1,
      badge: "PAUSE",
      heading: "01. A Familiar Moment",
      mainText: (
        <div className="space-y-3.5">
          <p>You sit down to complete something simple.</p>
          <p>It should take less than a minute.</p>
          <p>But now you’re several screens deep.</p>
          <p>
            You clicked once.<br />
            Went back.<br />
            Hovered over something trying to understand it.
          </p>
          <p>Then you stop.</p>
          <p>Not because the product is broken.</p>
          <p>But because <span className="font-serif italic text-[#DE1C4D]">you’re no longer sure what comes next.</span></p>
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-zinc-400 text-[10px] font-sans font-bold tracking-wider uppercase mb-1">Questions appear:</p>
            <p className="pl-3 border-l border-[#DE1C4D] text-zinc-700">Am I doing this correctly?</p>
            <p className="pl-3 border-l border-[#DE1C4D] text-zinc-700">Is this the latest version?</p>
            <p className="pl-3 border-l border-[#DE1C4D] text-zinc-700">What happens after this?</p>
          </div>
          <p>That <span className="font-serif italic text-[#DE1C4D]">moment of hesitation</span> is where I usually begin paying attention.</p>
        </div>
      ),
    },
    {
      id: 2,
      badge: "OBSERVATIONS",
      heading: "02. What I Started Noticing",
      mainText: (
        <div className="space-y-3.5">
          <p>Over time, I realized most product problems don’t look like problems.</p>
          <p>Interfaces looked polished.</p>
          <p>Features worked.</p>
          <p>Requirements were delivered.</p>
          <p>Yet <span className="font-serif italic text-[#DE1C4D]">users still hesitated.</span></p>
          <p>Teams kept adding functionality.</p>
          <p>Users kept becoming less confident.</p>
          <p>That’s when I started seeing a pattern:</p>
          <p>People don’t struggle because they can’t interact.</p>
          <p>They struggle because they’re <span className="font-serif italic text-[#DE1C4D]">forced to think harder than they should.</span></p>
          <p>The issue usually isn’t UI. It’s <span className="font-serif italic text-[#DE1C4D]">clarity.</span></p>
        </div>
      ),
    },
    {
      id: 3,
      badge: "EXPERIENCE",
      heading: "03. Learning From Inside the Process",
      mainText: (
        <div className="space-y-3.5">
          <p>Over the last 3.5+ years, I’ve worked inside products where the challenge wasn’t creating something new.</p>
          <p>It was <span className="font-serif italic text-[#DE1C4D]">making existing systems easier to understand.</span></p>
          <p>Complex workflows. Multi-role platforms. Data-heavy environments. Fast-moving teams.</p>
          <p>I’ve been in conversations where flows changed faster than documentation. Worked with developers building exactly what was requested. And still watched users get lost.</p>
          <p>That experience changed how I think about design. Because <span className="font-serif italic text-[#DE1C4D]">building more isn’t always solving more.</span></p>
        </div>
      ),
    },
    {
      id: 4,
      badge: "PROCESS",
      heading: "04. How I Approach Problems",
      mainText: (
        <div className="space-y-3.5">
          <p>My process starts before screens.</p>
          <p>I <span className="font-serif italic text-[#DE1C4D]">slow down the thinking.</span> I ask questions.</p>
          <div className="my-2 py-1 space-y-1">
            <p className="font-serif italic text-[#DE1C4D]">• What is the user actually trying to accomplish?</p>
            <p className="font-serif italic text-[#DE1C4D]">• At which point does uncertainty appear?</p>
            <p className="font-serif italic text-[#DE1C4D]">• What are we expecting users to understand on their own?</p>
            <p className="font-serif italic text-[#DE1C4D]">• What information exists only inside the team’s head?</p>
          </div>
          <p>Those questions usually <span className="font-serif italic text-[#DE1C4D]">reveal more than another redesign.</span></p>
        </div>
      ),
    },
    {
      id: 5,
      badge: "STRATEGY",
      heading: "05. Turning Complexity Into Clarity",
      mainText: (
        <div className="space-y-3.5">
          <p>Once the problem becomes visible, things begin to change.</p>
          <p>Not because we remove every step.</p>
          <p>But because we <span className="font-serif italic text-[#DE1C4D]">make each step easier to understand.</span></p>
          <p>Users move with more confidence.</p>
          <p>Teams align faster.</p>
          <p>Developers spend less time interpreting.</p>
          <p>Products become easier to trust.</p>
          <p>The goal isn’t simplicity. The goal is <span className="font-serif italic text-[#DE1C4D]">clarity.</span></p>
        </div>
      ),
    },
    {
      id: 6,
      badge: "AI WORKFLOW",
      heading: "06. How AI Fits Into My Process",
      mainText: (
        <div className="space-y-3.5">
          <p>Recently, AI has become part of how I work.</p>
          <p>Not as a shortcut.</p>
          <p>But as a way to <span className="font-serif italic text-[#DE1C4D]">explore faster. Validate earlier. Reduce unnecessary iterations.</span></p>
          <p>Create more room for better decisions.</p>
          <p>Technology changes.</p>
          <p>The principle stays the same:</p>
          <p>Help users move forward <span className="font-serif italic text-[#DE1C4D]">without hesitation.</span></p>
        </div>
      ),
    },
    {
      id: 7,
      badge: "THE SPACE",
      heading: "07. The Space I Work In",
      mainText: (
        <div className="space-y-3.5">
          <p>If you’re building something and it feels slightly off,</p>
          <p className="pl-3 border-l border-zinc-200 text-zinc-500 italic">not broken, not obviously wrong, just harder than it should be,</p>
          <p>you’re probably <span className="font-serif italic text-[#DE1C4D]">closer to the problem than you think.</span></p>
          <p>That’s the space I enjoy working in. Finding friction. Asking better questions. Turning <span className="font-serif italic text-[#DE1C4D]">complexity into clarity.</span></p>
        </div>
      ),
    },
    {
      id: 8,
      badge: "CLOSING",
      heading: "08. Closing Statement",
      mainText: (
        <div className="space-y-3.5">
          <p>I design products and systems that help people <span className="font-serif italic text-[#DE1C4D]">move with confidence.</span></p>
          <p>Because good experiences aren’t the ones users notice.</p>
          <p>They’re the ones <span className="font-serif italic text-[#DE1C4D]">users don’t have to think about.</span></p>
        </div>
      ),
    },
  ];

  // Map scroll event to vertical stepper activation dynamically
  const handleScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;

    let currentActive = 1;
    let minDistance = Infinity;

    steps.forEach((step) => {
      const element = cardRefs.current[step.id];
      if (element) {
        const offsetTop = element.offsetTop;
        const distance = Math.abs(offsetTop - scrollTop - (containerHeight / 6));
        if (distance < minDistance) {
          minDistance = distance;
          currentActive = step.id;
        }
      }
    });

    setActiveSection(currentActive);
  };

  const jumpToCard = (id: number) => {
    const element = cardRefs.current[id];
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop - 16,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden touch-none">
          
          {/* BACKGROUND: Opacity reduced to 30% as explicitly requested */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A0A0C] pointer-events-auto"
          >
            {/* Soft backdrop gradient matching sections blending to #7B0B27 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-[#2D0612] to-[#7B0B27]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px]" />
          </motion.div>

          {/* INNER MODERN WHITE PAGE DIALOG CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative bg-white w-full max-w-4xl h-[80vh] rounded-[24px] sm:rounded-[32px] border border-zinc-200/80 overflow-hidden flex flex-col shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] z-10 text-zinc-900"
          >
            {/* Header: Pure Modern Design */}
            <div className="border-b border-zinc-100 px-6 py-5 sm:px-10 flex items-center justify-between bg-white/95 backdrop-blur-sm z-20">
              <div className="text-left">
                {/* One big line in Poppins, My Design Approach as explicitly requested */}
                <h2 
                  className="text-2xl sm:text-3.5xl font-semibold tracking-tight text-zinc-900"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  My Design Approach
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-350 active:scale-95 transition-all text-zinc-700 cursor-pointer flex items-center justify-center bg-white"
                title="Close"
              >
                <X className="w-5 h-5 pointer-events-none" />
              </button>
            </div>

            {/* Layout Split Container */}
            <div className="flex-1 flex overflow-hidden relative bg-white">
              
              {/* Left Column: Vertical Scroll Stepper using the same beautiful Brand Gradient pill */}
              <div className="hidden sm:flex flex-col items-center justify-start py-8 px-6 border-r border-zinc-100 w-24 bg-zinc-50/50 shrink-0 select-none overflow-y-auto no-scrollbar">
                
                {/* Stepper Track */}
                <div className="relative flex-1 flex flex-col items-center justify-between w-full h-[320px]">
                  {/* Background vertical connector line */}
                  <div className="absolute top-2 bottom-2 w-[1px] bg-zinc-200" />

                  {/* Dynamic Nodes with fill gradients */}
                  {steps.map((step) => {
                    const isActive = activeSection === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => jumpToCard(step.id)}
                        className={`relative z-10 flex items-center justify-center w-7.5 h-7.5 rounded-full border text-[10px] font-sans font-bold transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? "bg-gradient-to-r from-[#DE1C4D] to-[#7B0B27] border-transparent text-white scale-110 shadow-sm" 
                            : "bg-white border-zinc-200 text-zinc-400 hover:border-zinc-350 hover:text-zinc-800"
                        }`}
                        title={`Step ${step.id}`}
                      >
                        {step.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Clean scrollable cards wrapper */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScrollUpdate}
                data-lenis-prevent
                className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-zinc-50/30 scroll-smooth pointer-events-auto touch-pan-y custom-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                
                {/* Clean SaaS Card Container Layout with Brand Gradients */}
                <div className="space-y-6 pb-4">
                  {steps.map((step) => {
                    const isSelected = activeSection === step.id;
                    return (
                      <div
                        key={step.id}
                        ref={(el) => (cardRefs.current[step.id] = el)}
                        className={`transition-all duration-300 rounded-xl bg-white p-6 sm:p-8 text-left relative flex flex-col gap-3 shadow-sm border ${
                          isSelected 
                            ? "border-[#DE1C4D]/30 bg-white ring-1 ring-[#DE1C4D]/10" 
                            : "border-zinc-100 hover:border-zinc-200"
                        }`}
                      >
                        {/* Upper row: Brand Gradient badge for every card */}
                        <div className="flex items-center gap-3 select-none">
                          <span 
                            className="inline-flex items-center justify-center px-2.5 py-1 text-[9px] font-medium tracking-wider uppercase rounded-full text-white bg-gradient-to-r from-[#DE1C4D] to-[#7B0B27] leading-none shadow-sm"
                          >
                            {step.badge}
                          </span>
                          <span className="text-[10px] font-mono font-medium text-zinc-400 tracking-wider">
                            STEP {step.id.toString().padStart(2, "0")}
                          </span>
                        </div>

                        {/* Decreased font weight for Titles of the sections in Poppins */}
                        <h3 
                          className="text-base sm:text-lg font-medium text-zinc-900 m-0 tracking-tight"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {step.heading}
                        </h3>

                        {/* Text block */}
                        <div className="text-xs sm:text-[14px] text-zinc-650 leading-relaxed font-sans font-normal m-0">
                          {step.mainText}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RESTORED VISUAL COMMENT & CRITIQUE SECTION FORM */}
                <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col gap-6 text-left relative z-10 pb-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-red-50 rounded-lg text-[#DE1C4D]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <h4 
                        className="text-base font-semibold tracking-tight text-zinc-900"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Drop Feedback & Suggestions
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 leading-normal font-sans">
                      Have some improvement pointers, critiques, or advice about my product process? Write them down! They store directly inside your workspace's local feed.
                    </p>
                  </div>

                  {/* Success Banner if user sent a comment */}
                  <AnimatePresence>
                    {showSuccessToast && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="bg-emerald-50/75 border border-emerald-200/80 text-emerald-800 rounded-2xl p-4 text-xs flex items-center gap-3"
                      >
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 shrink-0 animate-bounce" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <p className="font-sans font-semibold">Suggestion Saved Successfully!</p>
                          <p className="text-emerald-600 font-sans">Your feedback point has been captured in your browser's persistent session state.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Modern Styled Comment Form */}
                  <form 
                    onSubmit={handleAddFeedback} 
                    className="p-6 bg-white border border-zinc-150 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col gap-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label 
                          className="text-[14px] font-medium text-zinc-700 tracking-wide text-left"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          Your Name / Alias
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Robin Hood"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-[#DE1C4D] focus:bg-white focus:ring-4 focus:ring-[#DE1C4D]/10 transition-all text-xs rounded-xl px-4 py-3 w-full outline-none font-sans font-medium text-zinc-800 placeholder-zinc-400"
                        />
                      </div>

                      {/* Role input */}
                      <div className="flex flex-col gap-2">
                        <label 
                          className="text-[14px] font-medium text-zinc-700 tracking-wide text-left"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          Role or Company
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Product Reviewer"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-[#DE1C4D] focus:bg-white focus:ring-4 focus:ring-[#DE1C4D]/10 transition-all text-xs rounded-xl px-4 py-3 w-full outline-none font-sans font-medium text-zinc-800 placeholder-zinc-400"
                        />
                      </div>
                    </div>

                    {/* Feedback Content Input */}
                    <div className="flex flex-col gap-2">
                      <label 
                        className="text-[14px] font-medium text-zinc-700 tracking-wide text-left"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Suggestion Point or Improvement Feedback
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="What would you refine? Share your thoughts on my approach, UI patterns, or details you found interesting..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-[#DE1C4D] focus:bg-white focus:ring-4 focus:ring-[#DE1C4D]/10 transition-all text-xs rounded-xl px-4 py-3 w-full outline-none font-sans font-normal text-zinc-800 placeholder-zinc-400 resize-none h-24"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-1">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-[#FF2A54] via-[#DE1C4D] to-[#B60E36] hover:from-[#DE1C4D] hover:to-[#9A0B31] text-white font-sans font-semibold text-xs rounded-full transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_4px_16px_rgba(222,28,77,0.25)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Submit Critique
                      </button>
                    </div>
                  </form>

                  {/* Render User Submitted feedbacks locally only if any exists to verify */}
                  {feedbacks.length > 0 && (
                    <div className="mt-4 space-y-3.5">
                      <div className="flex items-center gap-1.5 pt-4">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                        <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                          Your Active Feedback Feed ({feedbacks.length})
                        </h5>
                      </div>

                      <div className="space-y-3">
                        {feedbacks.map((item) => {
                          const initials = item.name
                            .trim()
                            .split(/\s+/)
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase();

                          return (
                            <div
                              key={item.id}
                              className="bg-zinc-50/50 border border-zinc-150 rounded-2xl p-4 flex gap-3 text-left animate-in fade-in slide-in-from-bottom-2 duration-300"
                            >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-650 font-sans font-bold text-[10px] flex items-center justify-center shrink-0 border border-zinc-200">
                                {initials || "U"}
                              </div>

                              <div className="flex-1 flex flex-col gap-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-2">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-xs font-bold text-zinc-800 truncate font-sans">
                                      {item.name}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 truncate font-sans">
                                      • {item.role}
                                    </span>
                                  </div>
                                  <span className="text-[9px] text-zinc-400 font-mono shrink-0">
                                    {item.timestamp}
                                  </span>
                                </div>

                                <p className="text-xs font-sans text-zinc-650 leading-relaxed font-normal whitespace-pre-wrap break-words">
                                  {item.content}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
