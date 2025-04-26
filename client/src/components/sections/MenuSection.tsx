import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MenuSection = () => {
  const splitRevealRef = useRef<HTMLDivElement>(null);
  const leftCategoryRef = useRef<HTMLDivElement>(null);
  const rightCategoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Menu split-reveal animation
    ScrollTrigger.create({
      trigger: splitRevealRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(leftCategoryRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(rightCategoryRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="menu" className="section py-20 relative bg-[#F7F3E3]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16 text-gradient">
          Discover Our Specialties
        </h2>
        
        <div ref={splitRevealRef} className="w-full overflow-hidden">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
            {/* Left Category: Xôi */}
            <div 
              ref={leftCategoryRef}
              className="menu-category bg-[#D1E2C4] p-8 rounded-2xl shadow-lg w-full md:w-5/12 transform -rotate-3 hover:-rotate-5 transition-transform duration-300 text-center opacity-0 translate-x-[-100px]"
            >
              <h3 className="font-playfair text-3xl mb-4 text-[#333333]">Xôi</h3>
              <div className="overflow-hidden rounded-xl mb-4 h-64 flex items-center justify-center relative">
                <div 
                  className="w-full h-full bg-gradient-to-br from-green-400 to-green-200"
                  aria-label="Sticky rice dishes"
                >
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-4xl font-dancing">Xôi</span>
                </div>
              </div>
              <p className="font-poppins text-lg">Traditional sticky rice dishes crafted with care and premium ingredients</p>
              <a 
                href="#xoi" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('xoi')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block mt-6 px-8 py-3 bg-[#A4C3A2] text-white font-poppins rounded-full hover:bg-[#A4C3A2]/80 transition-all transform hover:-translate-y-1"
              >
                Explore
              </a>
            </div>
            
            {/* Right Category: Rau Câu */}
            <div 
              ref={rightCategoryRef}
              className="menu-category glass p-8 rounded-2xl w-full md:w-5/12 transform rotate-3 hover:rotate-5 transition-transform duration-300 text-center mt-10 md:mt-0 opacity-0 translate-x-[100px]"
            >
              <h3 className="font-playfair text-3xl mb-4 text-[#333333]">Rau Câu</h3>
              <div className="overflow-hidden rounded-xl mb-4 h-64 flex items-center justify-center relative">
                <div 
                  className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-200"
                  aria-label="Vietnamese jelly desserts"
                >
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-4xl font-dancing">Rau Câu</span>
                </div>
              </div>
              <p className="font-poppins text-lg">Elegant jelly desserts with delicate flavors and mesmerizing textures</p>
              <a 
                href="#raucau" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('raucau')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block mt-6 px-8 py-3 bg-[#C5B4D6] text-white font-poppins rounded-full hover:bg-[#C5B4D6]/80 transition-all transform hover:-translate-y-1"
              >
                Discover
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
