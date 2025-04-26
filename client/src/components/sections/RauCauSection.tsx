import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleContainer from "@/components/animations/BubbleAnimation";
import { RAUCAU_DISHES } from "@/lib/constants";

const RauCauSection = () => {
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
              ease: "elastic.out(1, 0.5)"
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
    <section id="raucau" className="section py-20 relative overflow-hidden bg-gradient-to-br from-[#E2D4EB]/40 to-[#F7F3E3]">
      <BubbleContainer count={15} />
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-4 text-gradient">Rau Câu Creations</h2>
        <p className="text-center font-dancing text-xl md:text-2xl mb-16 text-[#333333]/80">Delicate desserts that dance on your palate</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {RAUCAU_DISHES.map((dish, i) => (
            <div 
              key={dish.id}
              ref={el => dishRefs.current[i] = el}
              className="dish-card glass rounded-2xl overflow-hidden transform transition-all opacity-0 translate-y-10 hover:animate-jiggle rotate-3 odd:-rotate-3"
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

export default RauCauSection;
