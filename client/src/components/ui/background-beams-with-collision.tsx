'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

const generateRandomBeams = (
  containerWidth: number,
  containerHeight: number,
  numBeams: number
) => {
  const beams = [];
  const minSpacing = containerWidth / (numBeams * 2); // Ensure minimum spacing between beams

  for (let i = 0; i < numBeams; i++) {
    const initialX =
      Math.random() * (containerWidth - minSpacing) + minSpacing / 2;
    const beam = {
      initialX,
      translateX: initialX,
      initialY: -200 - Math.random() * 200, // Start above the container
      translateY: containerHeight + 200 + Math.random() * 200, // End below the container
      duration: Math.random() * 5 + 5, // Random duration between 5 and 10 seconds
      repeatDelay: Math.random() * 5, // Random delay between 0 and 5 seconds
      delay: Math.random() * 5, // Random initial delay between 0 and 5 seconds
      className: `h-${Math.floor(Math.random() * 16 + 4)}`, // Random height between h-4 and h-20
    };
    beams.push(beam);
  }
  return beams;
};

export const BackgroundBeamsWithCollision = ({
  children,
  className,
  childRef,
}: {
  children: React.ReactNode;
  className?: string;
  childRef?: React.RefObject<HTMLElement>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<
    {
      initialX: number;
      translateX: number;
      initialY: number;
      translateY: number;
      duration: number;
      repeatDelay: number;
      delay: number;
      className: string;
    }[]
  >([]);

  useEffect(() => {
    const generateBeams = () => {
      if (parentRef.current) {
        const { width, height } = parentRef.current.getBoundingClientRect();
        const numBeams = Math.floor(width / 200); // Adjust this value to control beam density
        const newBeams = generateRandomBeams(width, height, numBeams);
        setBeams(newBeams);
      }
    };

    generateBeams();
    window.addEventListener('resize', generateBeams);

    return () => {
      window.removeEventListener('resize', generateBeams);
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className={cn(
        'h-96 md:max-h-full bg-transparent relative flex items-center w-full justify-center overflow-hidden',
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`beam-${index}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
          childRef={childRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className='absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none'
        style={{
          boxShadow:
            '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    childRef?: React.RefObject<HTMLElement>;
    beamOptions: {
      initialX: number;
      translateX: number;
      initialY: number;
      translateY: number;
      duration: number;
      delay: number;
      repeatDelay: number;
      className: string;
    };
  }
>(({ parentRef, containerRef, childRef, beamOptions }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          handleCollision(beamRect, parentRect);
        }

        if (childRef?.current) {
          const childRect = childRef.current.getBoundingClientRect();
          if (
            beamRect.left < childRect.right &&
            beamRect.right > childRect.left &&
            beamRect.top < childRect.bottom &&
            beamRect.bottom > childRect.top
          ) {
            handleCollision(beamRect, parentRect);
          }
        }
      }
    };

    const handleCollision = (beamRect: DOMRect, parentRect: DOMRect) => {
      const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
      const relativeY = beamRect.bottom - parentRect.top;

      setCollision({
        detected: true,
        coordinates: {
          x: relativeX,
          y: relativeY,
        },
      });
      setCycleCollisionDetected(true);
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, childRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey(prevKey => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate='animate'
        initial={{
          translateY: beamOptions.initialY,
          translateX: beamOptions.initialX,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY,
            translateX: beamOptions.translateX,
          },
        }}
        transition={{
          duration: beamOptions.duration,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
          delay: beamOptions.delay,
          repeatDelay: beamOptions.repeatDelay,
        }}
        className={cn(
          'absolute left-0 top-0 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent',
          beamOptions.className
        )}
      />

      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=''
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = 'CollisionMechanism';

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn('absolute z-50 h-2 w-2', props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className='absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm'
      ></motion.div>
      {spans.map(span => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: 'easeOut' }}
          className='absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500'
        />
      ))}
    </div>
  );
};
