import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/constants";

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Timeline items animation
    timelineItemsRef.current.forEach((item, i) => {
      if (item) {
        ScrollTrigger.create({
          trigger: timelineContainerRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: i * 0.2,
              ease: "power2.out"
            });
          }
        });
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Mouse down handler for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineContainerRef.current) return;
    
    setIsDragging(true);
    startXRef.current = e.pageX - timelineContainerRef.current.offsetLeft;
    scrollLeftRef.current = timelineContainerRef.current.scrollLeft;
    
    // Add cursor styling
    document.body.style.cursor = 'grabbing';
  };
  
  // Mouse move handler for drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineContainerRef.current) return;
    
    const x = e.pageX - timelineContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2; // Multiply by 2 for faster scrolling
    timelineContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    
    // Update active step based on scroll position
    updateActiveStep();
  };
  
  // Mouse up handler for drag
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };
  
  // Update active step based on scroll position
  const updateActiveStep = () => {
    if (!timelineContainerRef.current) return;
    
    const scrollPos = timelineContainerRef.current.scrollLeft;
    const containerWidth = timelineContainerRef.current.clientWidth;
    
    const midpoint = scrollPos + containerWidth / 2;
    
    // Find the item that is closest to the center of the viewport
    timelineItemsRef.current.forEach((item, i) => {
      if (item) {
        const itemLeft = item.offsetLeft;
        const itemWidth = item.clientWidth;
        const itemMidpoint = itemLeft + itemWidth / 2;
        
        if (Math.abs(midpoint - itemMidpoint) < itemWidth / 2) {
          setActiveStep(i);
        }
      }
    });
  };
  
  // Scroll to a specific step
  const scrollToStep = (index: number) => {
    if (timelineContainerRef.current && timelineItemsRef.current[index]) {
      const item = timelineItemsRef.current[index];
      if (item) {
        const scrollPosition = item.offsetLeft - (timelineContainerRef.current.clientWidth / 2) + (item.clientWidth / 2);
        
        timelineContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        setActiveStep(index);
      }
    }
  };

  return (
    <section id="process" className="section py-20 bg-[#F7F3E3] relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-4 text-gradient">Our Culinary Journey</h2>
        <p className="text-center font-dancing text-xl md:text-2xl mb-6 text-[#333333]/80">From tradition to your table</p>
        <p className="text-center text-sm flex items-center justify-center gap-2 mb-10 text-[#333333]/60">
          <span className="animate-bounce-x">←</span>
          <span>Kéo để khám phá</span>
          <span className="animate-bounce-x">→</span>
        </p>
        
        <div 
          ref={timelineContainerRef}
          className="timeline-container scrollbar-hide pb-6 overflow-x-auto"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex space-x-8 px-4 min-w-max cursor-grab active:cursor-grabbing">
            {PROCESS_STEPS.map((step, i) => (
              <div 
                key={step.id}
                ref={el => timelineItemsRef.current[i] = el}
                className={`timeline-item w-80 opacity-0 translate-x-10 scroll-snap-align-center ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
              >
                <div className="relative">
                  <div className="h-64 rounded-lg overflow-hidden mb-4">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${step.bgColor} flex items-center justify-center`}
                      aria-label={step.title}
                    >
                      <span className="text-white text-4xl font-bold opacity-40">{step.id}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#A4C3A2] flex items-center justify-center text-white font-bold absolute -top-2 -left-2 border-4 border-[#F7F3E3]">
                    {step.id}
                  </div>
                </div>
                <h3 className="font-playfair text-xl mb-2 text-[#333333]">{step.title}</h3>
                <p className="font-poppins text-[#333333]/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {PROCESS_STEPS.map((step, i) => (
              <button 
                key={step.id}
                className={`w-3 h-3 rounded-full ${activeStep === i ? 'bg-[#A4C3A2]' : 'bg-[#A4C3A2]/30'} timeline-dot hover:bg-[#A4C3A2] transition-colors`}
                onClick={() => scrollToStep(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
