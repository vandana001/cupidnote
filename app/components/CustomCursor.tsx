'use client'

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = (): JSX.Element => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <Image
        src="/cursor.png"
        alt="Custom Cursor"
        width={80}
        height={80}
        priority
      />
    </div>
  );
};

export default CustomCursor;