import React, { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CursorTrail: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailLength = 10; // Number of trail dots

  useEffect(() => {
    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Update trail with new cursor position
    setTrail(prevTrail => {
      // Add new position to the beginning
      const newTrail = [
        { id: Date.now(), x: position.x, y: position.y },
        ...prevTrail
      ];
      
      // Keep only the last trailLength dots
      return newTrail.slice(0, trailLength);
    });
  }, [position]);

  return (
    <>
      {trail.map((dot, index) => {
        // Calculate opacity based on position in trail
        const opacity = 1 - (index / trailLength);
        // Calculate size based on position in trail
        const size = 10 - (index * 0.8);
        
        return (
          <div
            key={dot.id}
            className="cursor-trail"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              opacity,
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate(-50%, -50%)`,
              transition: `all ${index * 0.02 + 0.1}s ease`
            }}
          />
        );
      })}
    </>
  );
};

export default CursorTrail;