import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';

export default function ShinyText({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <div className={cn('z-10 flex  items-center justify-center', className)}>
      <div
        className={cn(
          'group rounded-full border border-black/5 bg-neutral-100 text-sm text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
        )}
      >
        <AnimatedShinyText className='inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400'>
          <span>✨ Cyber Security and Blockchain</span>
          <ChevronRight className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
        </AnimatedShinyText>
      </div>
    </div>
  );
}
