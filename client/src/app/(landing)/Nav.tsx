import Link from 'next/link';

import { cn } from '@/lib/utils';

import { pirulen } from '../fonts';

import { AnimatedText } from '@/components/ui/animated-text';
import AuthSheet from './Auth';

export default function Navbar({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <nav
      className={cn(
        'flex items-center justify-between p-6 lg:px-14 w-full',
        className
      )}
      aria-label='Global'
    >
      <div className='flex lg:flex-1'>
        <Link
          href='/'
          className={
            '-m-1.5 p-1.5 text-2xl flex items-center justify-center ' +
            pirulen.className
          }
        >
          {/* <LoaderPinwheel
            className={`mr-2 animate-spin duration-[1500] repeat-1`}
          /> */}
          {/* <div className='mt-1'>Instinct AI</div> */}
          <AnimatedText text='Dev Forces' />
        </Link>
      </div>

      <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
        <AuthSheet />
      </div>
    </nav>
  );
}
