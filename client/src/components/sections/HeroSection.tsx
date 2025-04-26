import { useEffect, useRef } from "react";
import ParticleAnimation from "@/components/animations/ParticleAnimation";
import { SteamContainer } from "@/components/animations/SteamAnimation";
import { gsap } from "gsap";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoCircleRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    timeline.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.9");

    timeline.to(logoCircleRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.9");

    timeline.to(menuContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5");
  }, []);

  return (
    <section 
      id="hero" 
      className="section min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-[#D1E2C4] to-[#E2D4EB]"
    >
      <ParticleAnimation containerId="particles-hero" />
      <SteamContainer count={5} />

      <div className="relative text-center z-20 mb-16">
        <h1 
          ref={titleRef}
          className="text-[#333333] text-5xl md:text-7xl font-playfair mb-6 opacity-0 transform translate-y-8"
        >
          Xôi Tấm
        </h1>
        <p 
          ref={subtitleRef}
          className="text-[#333333] text-xl md:text-2xl font-dancing mb-12 max-w-lg mx-auto px-4 opacity-0 transform translate-y-8"
        >
          A harmonious blend of tradition and artistry in every bite
        </p>
        <div 
          ref={logoCircleRef}
          className="w-24 h-24 bg-gradient-to-r from-[#A4C3A2] to-[#C5B4D6] rounded-full mx-auto opacity-0 scale-0"
        ></div>
      </div>

      <div 
        ref={menuContainerRef}
        className="container mx-auto px-6 opacity-0 transform translate-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="menu-card bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-playfair mb-3 md:mb-4 text-[#333333]">Xôi Specialties</h3>
              <p className="text-[#333333]/80 mb-6">Traditional sticky rice dishes crafted with care</p>
              <a 
                href="#xoi"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('xoi')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-8 py-3 bg-[#A4C3A2] text-white font-poppins rounded-full hover:bg-[#A4C3A2]/80 transition-all transform hover:-translate-y-1"
              >
                Explore
              </a>
            </div>
          </div>

          <div className="menu-card bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-xl transition-all">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-playfair mb-3 md:mb-4 text-[#333333]">Rau Câu Art</h3>
              <p className="text-[#333333]/80 mb-6">Exquisite jelly desserts that delight the senses</p>
              <a 
                href="#raucau"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('raucau')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block px-8 py-3 bg-[#C5B4D6] text-white font-poppins rounded-full hover:bg-[#C5B4D6]/80 transition-all transform hover:-translate-y-1"
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

export default HeroSection;