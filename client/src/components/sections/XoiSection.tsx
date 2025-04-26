import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SteamContainer } from "@/components/animations/SteamAnimation";
import { XOI_DISHES } from "@/lib/constants";

const XoiSection = () => {
  const dishRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animated appearance for each dish
    dishRefs.current.forEach((dish, i) => {
      if (dish) {
        ScrollTrigger.create({
          trigger: dish,
          start: "top 85%",
          onEnter: () => {
            gsap.to(dish, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.15,
              ease: "back.out(1.5)"
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

  return (
    <section id="xoi" className="section py-20 relative bg-[#D1E2C4]/30">
      <SteamContainer count={8} topPositioned={true} />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-4 text-gradient">Xôi Delicacies</h2>
        <p className="text-center font-dancing text-xl md:text-2xl mb-16 text-[#333333]/80">The art of perfect sticky rice</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {XOI_DISHES.map((dish, i) => (
            <div 
              key={dish.id}
              ref={el => dishRefs.current[i] = el}
              className="dish-card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all opacity-0 translate-y-10 hover:translate-y-[-15px] hover:scale-105 duration-500 rotate-2 odd:-rotate-2"
            >
              <div className="h-56 overflow-hidden">
                <div 
                  className={`w-full h-full bg-gradient-to-br ${dish.bgColor} transition-all duration-700 hover:scale-105 hover:rotate-3`}
                  aria-label={dish.name}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-2xl mb-2 text-[#333333]">{dish.name}</h3>
                <p className="font-poppins text-[#333333]/80">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default XoiSection;
