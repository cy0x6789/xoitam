import { useEffect, useRef } from "react";
import { COLORS } from "@/lib/constants";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    title: "XÔI TẤM",
    subtitle: "Xôi Five Colors",
    description: "Xôi được chế biến theo phương pháp truyền thống, kết hợp với các nguyên liệu tươi ngon tạo ra những hương vị đặc trưng của ẩm thực Việt Nam.",
    bgColor: `linear-gradient(135deg, ${COLORS.LIGHT_GREEN}, ${COLORS.GREEN_TEA})`
  },
  {
    title: "NGHỆ THUẬT ẨM THỰC",
    subtitle: "Sự Hòa Quyện",
    description: "Mỗi món ăn đều là sự kết hợp tinh tế giữa hương vị, màu sắc và cảm nhận, mang đến trải nghiệm ẩm thực trọn vẹn cho thực khách.",
    bgColor: `linear-gradient(135deg, ${COLORS.LIGHT_PURPLE}, ${COLORS.SOFT_PURPLE})`
  },
  {
    title: "HƯƠNG VỊ TINH TẾ",
    subtitle: "Truyền Thống Việt Nam",
    description: "Với bí quyết gia truyền được lưu giữ qua nhiều thế hệ, mỗi món ăn của chúng tôi đều mang đậm hương vị tinh tế của ẩm thực Việt.",
    bgColor: `linear-gradient(135deg, ${COLORS.WARM_IVORY}, ${COLORS.VIBRANT_RED})`
  },
  {
    title: "TINH HOA ẨM THỰC",
    subtitle: "Đam Mê Sáng Tạo",
    description: "Chúng tôi luôn đam mê khám phá và sáng tạo, mang đến những món ăn truyền thống với diện mạo mới lạ nhưng vẫn giữ được hương vị đặc trưng.",
    bgColor: `linear-gradient(135deg, ${COLORS.DEEP_YELLOW}, ${COLORS.VIBRANT_RED})`
  },
  {
    title: "BẢN SẮC VIỆT",
    subtitle: "Văn Hóa Ẩm Thực",
    description: "Mỗi món ăn đều là một phần của văn hóa ẩm thực Việt Nam, được chúng tôi gìn giữ và phát triển với tất cả tâm huyết.",
    bgColor: `linear-gradient(135deg, ${COLORS.FRESH_BLUE}, ${COLORS.MINT_GREEN})`
  }
];

const HeaderSlider = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  
  let unAcceptClick: NodeJS.Timeout | null = null;

  const showSlider = (type: 'next' | 'prev') => {
    if (!carouselRef.current || !listRef.current || !nextBtnRef.current || !prevBtnRef.current) return;
    
    // Disable pointer events during transition
    nextBtnRef.current.style.pointerEvents = 'none';
    prevBtnRef.current.style.pointerEvents = 'none';

    carouselRef.current.classList.remove('next', 'prev');
    const items = listRef.current.querySelectorAll('.item');
    
    if (type === 'next') {
      listRef.current.appendChild(items[0]);
      carouselRef.current.classList.add('next');
    } else {
      listRef.current.prepend(items[items.length - 1]);
      carouselRef.current.classList.add('prev');
    }
    
    // Clear any existing timeout
    if (unAcceptClick) {
      clearTimeout(unAcceptClick);
    }
    
    // Re-enable clicks after animation completes
    unAcceptClick = setTimeout(() => {
      if (nextBtnRef.current && prevBtnRef.current) {
        nextBtnRef.current.style.pointerEvents = 'auto';
        prevBtnRef.current.style.pointerEvents = 'auto';
      }
    }, 2000);
  };
  
  // Set up automatic slide rotation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      showSlider('next');
    }, 7000);
    
    return () => {
      clearInterval(rotationInterval);
      if (unAcceptClick) {
        clearTimeout(unAcceptClick);
      }
    };
  }, []);

  // Initialize event handlers for the buttons
  useEffect(() => {
    // Setup seeMore buttons click handler
    const setupSeeMoreButtons = () => {
      const seeMoreButtons = document.querySelectorAll('.seeMore');
      seeMoreButtons.forEach((button) => {
        button.addEventListener('click', () => {
          if (carouselRef.current) {
            carouselRef.current.classList.remove('next', 'prev');
            carouselRef.current.classList.add('showDetail');
          }
        });
      });
    };
    
    setupSeeMoreButtons();
    
    return () => {
      // Clean up event listeners if needed
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {slides.map((slide, index) => (
          <div className="item" key={index}>
            <div 
              className="bg-gradient"
              style={{ background: slide.bgColor }}
            />
            
            <div className="introduce">
              <div className="title font-dancing">
                {slide.title}
              </div>
              <div className="topic font-playfair">
                {slide.subtitle}
              </div>
              <div className="des font-poppins">
                {slide.description}
              </div>
              <button className="seeMore">
                XEM THÊM &#8599;
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Wave effect */}
      <div className="wave-effect">
        <svg 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="opacity-20 fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      <div className="arrows">
        <button 
          id="prev"
          ref={prevBtnRef}
          onClick={() => showSlider('prev')} 
        >
          &lt;
        </button>
        <button 
          id="next"
          ref={nextBtnRef}
          onClick={() => showSlider('next')} 
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default HeaderSlider;