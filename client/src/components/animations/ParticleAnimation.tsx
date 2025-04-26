import { useRef, useEffect } from "react";
import { COLORS } from "@/lib/constants";

interface ParticleAnimationProps {
  containerId: string;
}

const ParticleAnimation = ({ containerId }: ParticleAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if window.particlesJS is available
    if (typeof window !== "undefined" && containerRef.current) {
      // Dynamically import particles.js
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
      script.async = true;
      
      script.onload = () => {
        if (window.particlesJS) {
          window.particlesJS(containerId, {
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: COLORS.SOFT_PURPLE
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                }
              },
              opacity: {
                value: 0.5,
                random: true
              },
              size: {
                value: 5,
                random: true
              },
              line_linked: {
                enable: false
              },
              move: {
                enable: true,
                speed: 2,
                direction: "top",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              }
            },
            retina_detect: true
          });
        }
      };
      
      document.body.appendChild(script);
      
      return () => {
        // Clean up the script
        document.body.removeChild(script);
      };
    }
  }, [containerId]);

  return (
    <div 
      id={containerId} 
      ref={containerRef} 
      className="absolute inset-0 z-10"
    ></div>
  );
};

export default ParticleAnimation;
