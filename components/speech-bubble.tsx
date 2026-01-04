'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const speechTexts = {
  '/': ['...hello...', 'hm...', 'welcome... i guess...'],
  '/about': ['ahhhhhhhhh!', 'this is the about page', '...i love making art....'],
  '/shop': ['prints for sale!', 'all items ship free in the US'],
  '/comic': ['here are my comics', 'sequential art is fun','O__O'],
  '/powered-off': ['system offline', 'power down mode', 'see you later!'],
  'default': ['stop hovering over me...O_O']
};

interface SpeechBubbleProps {
  isHovered: boolean;
}

export default function SpeechBubble({ isHovered }: SpeechBubbleProps) {
  const pathname = usePathname();
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      // Get texts for current page or default, handle trailing slash
      const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
      console.log('Current pathname:', pathname, 'Normalized:', normalizedPath);
      const texts = speechTexts[normalizedPath as keyof typeof speechTexts] || speechTexts.default;
      console.log('Selected texts:', texts);

      // Show random text immediately
      const randomIndex = Math.floor(Math.random() * texts.length);
      setCurrentText(texts[randomIndex]);
      setTextIndex((randomIndex + 1) % texts.length);

      // Cycle through texts every 2 seconds
      intervalRef.current = setInterval(() => {
        setTextIndex(prevIndex => {
          const newIndex = prevIndex % texts.length;
          setCurrentText(texts[newIndex]);
          return newIndex + 1;
        });
      }, 2000);
    } else {
      // Clear interval when not hovered
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentText('');
      setTextIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, pathname]);

  if (!isHovered || !currentText) return null;

  return (
    <div className="absolute -top-6 left-6 z-20 pointer-events-none h-12 flex items-end">
      {/* Using comicbubbles CSS class */}
      <div className="cbbl text-xs font-mono max-w-[140px]">
        {currentText}
      </div>
    </div>
  );
}