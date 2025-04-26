import { CSSProperties } from "react";

interface SteamProps {
  position: {
    left: string;
    bottom?: string;
    top?: string;
  };
  size: {
    width: string;
    height: string;
  };
  delay: string;
}

const SteamAnimation = ({ position, size, delay }: SteamProps) => {
  const steamStyle: CSSProperties = {
    left: position.left,
    bottom: position.bottom,
    top: position.top,
    width: size.width,
    height: size.height,
    animationDelay: delay,
  };

  return (
    <div
      className="steam absolute opacity-70 blur-md origin-bottom animate-steam"
      style={steamStyle}
    ></div>
  );
};

interface SteamContainerProps {
  count?: number;
  topPositioned?: boolean;
}

export const SteamContainer = ({ count = 5, topPositioned = false }: SteamContainerProps) => {
  // Generate random positions for steam elements
  const steamElements = Array.from({ length: count }, (_, i) => {
    const left = `${10 + Math.random() * 80}%`;
    const position = topPositioned 
      ? { left, top: `${20 + Math.random() * 60}%` }
      : { left, bottom: "0" };
    
    const width = `${80 + Math.random() * 70}px`;
    const height = `${150 + Math.random() * 100}px`;
    const delay = `${Math.random() * 1.5}s`;
    
    return (
      <SteamAnimation
        key={i}
        position={position}
        size={{ width, height }}
        delay={delay}
      />
    );
  });

  return (
    <div className="absolute w-full h-full overflow-hidden pointer-events-none z-0">
      {steamElements}
    </div>
  );
};

export default SteamAnimation;
