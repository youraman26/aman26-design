import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';

interface InteractiveMarqueeSliderProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  speed?: number; // scroll pixels per frame
  containerClassName?: string;
  sectionId?: string;
}

export const InteractiveMarqueeSlider: React.FC<InteractiveMarqueeSliderProps> = ({
  items,
  renderItem,
  speed = 0.8,
  containerClassName = "",
  sectionId = "marquee-slider"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayActiveRef = useRef<boolean>(true);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeftState, setScrollLeftState] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto scroll effect using requestAnimationFrame for subpixel buttery smooth scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const scrollStep = () => {
      if (autoPlayActiveRef.current && !isDragging) {
        container.scrollLeft += speed;
      }
      rafId = requestAnimationFrame(scrollStep);
    };

    rafId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(rafId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [speed, isDragging]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const halfWidth = container.scrollWidth / 2;
    if (halfWidth <= 20) return;

    // Seamless wrap-around for infinite left & right scrolling
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    } else if (container.scrollLeft <= 2) {
      container.scrollLeft += halfWidth;
    }
  };

  // Mouse drag-to-scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    autoPlayActiveRef.current = false;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const container = containerRef.current;
    const x = e.pageX - container.offsetLeft;
    const scrollOffsetMultiplier = 1.8; // Adjust drag responsiveness
    const walk = (x - startX) * scrollOffsetMultiplier;
    container.scrollLeft = scrollLeftState - walk;
  };

  // Touch gesture swipe support (Mobile/Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    autoPlayActiveRef.current = false;
    // Track the initial touch point
    setStartX(e.touches[0].pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const x = e.touches[0].pageX - container.offsetLeft;
    const scrollOffsetMultiplier = 1.8; // Match mouse gesture sensitivity
    const walk = (x - startX) * scrollOffsetMultiplier;
    container.scrollLeft = scrollLeftState - walk;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Resume autoplay immediately
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    autoPlayActiveRef.current = true;
  };

  const slideManual = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll by roughly 1 and a half card widths for fast seeking
    const viewWidth = container.clientWidth;
    const slideAmount = direction === 'left' ? -Math.min(viewWidth * 0.75, 480) : Math.min(viewWidth * 0.75, 480);

    container.scrollBy({
      left: slideAmount,
      behavior: 'smooth'
    });

    // Pause autoplay briefly for the smooth transition (600ms) then resume immediately
    autoPlayActiveRef.current = false;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      autoPlayActiveRef.current = true;
    }, 600);
  };

  // Twice duplicated items to guarantee infinite scrolling and wrap space
  const duplicatedItems = [...items, ...items];

  return (
    <div 
      className="relative w-full group/slider overflow-visible select-none"
      id={sectionId}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleDragEnd();
        autoPlayActiveRef.current = true;
      }}
    >
      {/* Decorative Swipe Indicator on Hover */}
      <div className="absolute -top-10 right-4 flex items-center gap-1.5 text-xs text-ink/40 font-mono pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
        <Hand className="w-3.5 h-3.5 text-[#DE1C4D] animate-pulse" />
        <span>Swipe or drag to seek manually</span>
      </div>

      {/* Styled Floating Navigation Controls */}
      <div className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={() => slideManual('left')}
          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/95 text-ink hover:text-[#DE1C4D] shadow-lg border border-gray-100 flex items-center justify-center pointer-events-auto transform active:scale-95 hover:scale-105 hover:bg-white hover:border-[#DE1C4D]/25 transition-all duration-200"
          title="Scroll Left"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-6 md:w-7 h-6 md:h-7 stroke-[2px]" />
        </button>
      </div>

      <div className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={() => slideManual('right')}
          className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/95 text-ink hover:text-[#DE1C4D] shadow-lg border border-gray-100 flex items-center justify-center pointer-events-auto transform active:scale-95 hover:scale-105 hover:bg-white hover:border-[#DE1C4D]/25 transition-all duration-200"
          title="Scroll Right"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-6 md:w-7 h-6 md:h-7 stroke-[2px]" />
        </button>
      </div>

      {/* Draggable & Swipeable Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
        className={`flex gap-6 md:gap-8 overflow-x-auto scrollbar-none py-4 px-4 sm:px-8 md:px-12 w-full select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${containerClassName}`}
        style={{
          scrollSnapType: 'none', // Removed x mandatory to prevent browser snap system from freezing autoPlay steps
          scrollBehavior: 'auto', // Custom RAF handler scales custom offsets
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {duplicatedItems.map((item, index) => {
          return (
            <div 
              key={`${item.step}-${index}`} 
              className="select-none"
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>

      {/* Custom Styles Inject for Scrolling Hide */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-none {
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

