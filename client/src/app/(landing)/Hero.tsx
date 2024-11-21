'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Cover } from '@/components/ui/cover';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';
import ShineBorder from '@/components/ui/shine-border';
import { FileBox } from 'lucide-react';
import Navbar from './Nav';
import ShinyText from './ShinyText';

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='h-full w-full flex-col justify-center items-center relative mt-36 bg-transparent'
      // childRef={videoRef}
    >
      <Navbar className='fixed top-0' />
      <div className='text-center relative w-full'>
        <Link href='blog'>
          <ShinyText className='mb-4' />
        </Link>
        <div className='font- text-7xl text-center'>
          The modern way of learning <br />
          and competing in development.
        </div>
        <h1 className='text-lg  font-semibold mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white'>
          Beautifully crafted, only for &nbsp;
          <Cover>warp speed</Cover>
        </h1>
        <Link href='app'>
          <Button>
            <FileBox />
            Get Started
          </Button>
        </Link>

        <div className='relative flex items-center justify-center mt-6  '>
          <div className='pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/2 z-10 w-full' />
          <div
            className='relative mt-16 p-1 rounded-md max-w-screen-lg group'
            ref={videoRef}
          >
            <div
              className='absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-blue-600/20 to-purple-600/20 
                        blur-[80px] rounded-t-full scale-110 -translate-y-1/6 z-0 
                        '
              aria-hidden='true'
            ></div>
            <BorderBeam />

            <ShineBorder
              className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl'
              // color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
            >
              <HeroVideoDialog
                className='block max-w-screen-lg h-full m-0 p-0'
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/d50CteurSqI?si=1rE2equqexOJib3J'
                thumbnailSrc='/df_logo.png'
                thumbnailAlt='Hero Video'
              />
            </ShineBorder>
          </div>
        </div>
      </div>
    </div>
  );
}
