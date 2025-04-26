import { CSSProperties } from "react";

interface BubbleProps {
  size: string;
  position: {
    left: string;
    top: string;
  };
  delay: string;
}

const Bubble = ({ size, position, delay }: BubbleProps) => {
  const bubbleStyle: CSSProperties = {
    width: size,
    height: size,
    left: position.left,
    top: position.top,
    animationDelay: delay,
  };

  return (
    <div
      className="bubble absolute rounded-full bg-white/30 animate-float"
      style={bubbleStyle}
    ></div>
  );
};

interface BubbleContainerProps {
  count?: number;
}

const BubbleContainer = ({ count = 15 }: BubbleContainerProps) => {
  // Generate random bubbles
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = `${15 + Math.random() * 30}px`;
    const left = `${Math.random() * 90}%`;
    const top = `${Math.random() * 80}%`;
    const delay = `${Math.random() * 2}s`;
    
    return (
      <Bubble
        key={i}
        size={size}
        position={{ left, top }}
        delay={delay}
      />
    );
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles}
    </div>
  );
};

export default BubbleContainer;
