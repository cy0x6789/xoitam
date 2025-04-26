import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-warm-ivory bg-opacity-95 backdrop-blur-sm py-4 transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-[#A4C3A2] font-playfair text-2xl font-bold cursor-pointer" 
          onClick={() => scrollToSection("hero")}
        >
          Xôi Tấm
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a 
            onClick={() => scrollToSection("menu")} 
            className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors cursor-pointer"
          >
            Menu
          </a>
          <a 
            onClick={() => scrollToSection("xoi")} 
            className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors cursor-pointer"
          >
            Xôi
          </a>
          <a 
            onClick={() => scrollToSection("raucau")} 
            className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors cursor-pointer"
          >
            Rau Câu
          </a>
          <a 
            onClick={() => scrollToSection("process")} 
            className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors cursor-pointer"
          >
            Our Process
          </a>
        </div>
        
        <button 
          className="md:hidden text-[#333333]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-warm-ivory bg-opacity-95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-4">
            <a 
              onClick={() => scrollToSection("menu")} 
              className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors block cursor-pointer"
            >
              Menu
            </a>
            <a 
              onClick={() => scrollToSection("xoi")} 
              className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors block cursor-pointer"
            >
              Xôi
            </a>
            <a 
              onClick={() => scrollToSection("raucau")} 
              className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors block cursor-pointer"
            >
              Rau Câu
            </a>
            <a 
              onClick={() => scrollToSection("process")} 
              className="font-poppins text-[#333333] hover:text-[#A4C3A2] transition-colors block cursor-pointer"
            >
              Our Process
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
