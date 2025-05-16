'use client'

import React, { useState, useEffect } from 'react';

interface FrameAnimationProps {
  image1: string;
  image2: string;
  image3: string;
}

const FrameAnimation = ({ image1, image2, image3 }: FrameAnimationProps) => {
  // State to track which frame is currently displayed
  const [currentFrame, setCurrentFrame] = useState(0);
  // State to track if the component is being hovered
  const [isHovered, setIsHovered] = useState(false);
  
  // Effect to handle automatic cycling between frames when not hovered
  useEffect(() => {
    // Only run the animation if not currently hovered
    if (!isHovered) {
      // Set up an interval to cycle between frames 0 and 1
      const intervalId = setInterval(() => {
        setCurrentFrame(prev => prev === 0 ? 1 : 0);
      }, 500); // Change frame every 3 seconds
      
      // Clean up the interval when component unmounts or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [isHovered]); // Re-run effect when hover state changes
  
  // Event handlers for mouse hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentFrame(2); // Show the third frame on hover
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentFrame(0); // Go back to the first frame
  };
  
  // Frame content with images passed as props
  const frames = [
    { image: image1 },
    { image: image2 },
    { image: image3 }
  ];
  
  return (
    <div 
      style={{
        width: '200px',
        height: '200px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {frames.map((frame, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '150px',
            height: '150px',
            opacity: currentFrame === index ? 1 : 0,
            // transition: 'opacity 0.5s ',
          }}
        >
          <img 
            src={frame.image} 
            alt={`Frame ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FrameAnimation;

// Usage example:
// import FrameAnimation from './FrameAnimation';
// 
// function App() {
//   return (
//     <div className="App">
//       <h1>Frame Animation Example</h1>
//       <FrameAnimation 
//         image1="/path/to/image1.jpg"
//         image2="/path/to/image2.jpg"
//         image3="/path/to/image3.jpg"
//       />
//     </div>
//   );
// }