import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Box, FolderKanban, Table2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { CardSpotlight } from '@/components/ui/card-spotlight';

function page() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0 '>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3 p-10'>
        <CardSpotlight className='h-auto w-96 py-16'>
          <p className='text-xl font-bold relative z-20 mt-2 text-white'>
            CSS Battles
          </p>
          <div className='text-neutral-200 mt-4 relative z-20'>
            Blazing fast results with new intuitive UI.
          </div>
          <Link href='/app/css/73'>
            <Button
              variant='ghost'
              className='text-neutral-300 mt-4 relative z-20 text-sm'
            >
              Try Now <ArrowRight className='inline-block ml-1' />
            </Button>
          </Link>
        </CardSpotlight>
        <CardSpotlight className='h-auto w-96 py-16'>
          <p className='text-xl font-bold relative z-20 mt-2 text-white'>
            Cyber and Blockchain
          </p>
          <div className='text-neutral-200 mt-4 relative z-20'>
            Hands-on learn and compete for cyber security training and
            blockchain learning.
          </div>
          <Link href={process.env.NEXT_PUBLIC_CYBER_URI || ''}>
            <Button
              variant='ghost'
              className='text-neutral-300 mt-4 relative z-20 text-sm'
            >
              Try Now <ArrowRight className='inline-block ml-1' />
            </Button>
          </Link>
        </CardSpotlight>
      </div>
      <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min' />
    </div>
  );
}

export default page;
