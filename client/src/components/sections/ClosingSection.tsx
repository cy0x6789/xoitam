import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ClosingSection = () => {
  const kineticTextRef = useRef<HTMLDivElement>(null);
  const proverb1Ref = useRef<HTMLSpanElement>(null);
  const proverb2Ref = useRef<HTMLSpanElement>(null);
  const closingTextRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Kinetic typography animation
    ScrollTrigger.create({
      trigger: kineticTextRef.current,
      start: "top 60%",
      onEnter: () => {
        gsap.to(proverb1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.5)"
        });
        
        gsap.to(proverb2Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "back.out(1.5)"
        });
        
        gsap.to(closingTextRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.4,
          ease: "back.out(1.5)"
        });
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="closing" className="section flex items-center justify-center relative bg-[#333333] py-20">
      <div className="absolute inset-0 opacity-20">
        {/* Background video would be here in production */}
        <div className="w-full h-full bg-gradient-to-b from-[#222222] to-[#111111]"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div ref={kineticTextRef} className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-dancing mb-8 text-white">
            <span ref={proverb1Ref} className="inline-block opacity-0 transform translate-y-8">"Có thực mới vực được đạo"</span>
          </h2>
          <p className="text-xl md:text-2xl font-poppins font-light text-white/90 mb-12">
            <span ref={proverb2Ref} className="inline-block opacity-0 transform translate-y-8">To nourish the spirit, one must first nourish the body</span>
          </p>
          <p className="font-playfair italic text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            <span ref={closingTextRef} className="inline-block opacity-0 transform translate-y-8">
              Xôi Tấm brings you food crafted with care, infused with tradition, and presented with artistry—a feast for both body and soul.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
