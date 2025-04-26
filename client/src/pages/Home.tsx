import { useEffect } from "react";
import Layout from "@/components/Layout";
import HeaderSlider from "@/components/HeaderSlider";
import HeroSection from "@/components/sections/HeroSection";
import MenuSection from "@/components/sections/MenuSection";
import XoiSection from "@/components/sections/XoiSection";
import RauCauSection from "@/components/sections/RauCauSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ClosingSection from "@/components/sections/ClosingSection";

// Import GSAP and ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
  useEffect(() => {
    // Load GSAP and ScrollTrigger
    const loadGSAP = async () => {
      // Dynamically import GSAP and plugins
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      // Register plugins
      gsapModule.gsap.registerPlugin(ScrollTrigger);
      
      // Set up any global GSAP configurations
      gsapModule.gsap.config({
        autoSleep: 60,
        force3D: true
      });
    };
    
    loadGSAP();
    
    // Add Three.js script if needed
    const threeScript = document.createElement("script");
    threeScript.src = "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js";
    threeScript.async = true;
    document.body.appendChild(threeScript);
    
    return () => {
      // Clean up scripts
      document.body.removeChild(threeScript);
    };
  }, []);
  
  return (
    <Layout>
      <HeaderSlider />
      <HeroSection />
      <MenuSection />
      <XoiSection />
      <RauCauSection />
      <ProcessSection />
      <ClosingSection />
    </Layout>
  );
};

export default Home;
