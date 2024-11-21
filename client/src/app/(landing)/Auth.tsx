import { ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AuthSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='text-md font-semibold leading-6 flex items-center group'>
          Log in
          <span
            aria-hidden='true'
            className='transition-transform duration-300 ease-in-out transform group-hover:translate-x-1 ml-1'
          >
            <ArrowRight className='h-5' />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <Tabs defaultValue='login'>
          <SheetHeader>
            <SheetTitle>
              {' '}
              <TabsList>
                <TabsTrigger value='login'>Login</TabsTrigger>
                <TabsTrigger value='signup'>Register</TabsTrigger>
              </TabsList>
            </SheetTitle>
            <SheetDescription>
              Create an account or log in to get started.
            </SheetDescription>
          </SheetHeader>

          <TabsContent value='login'>
            <div className='my-6 px-3'>
              <div className='my-2'>
                <Label htmlFor='name'>Email</Label>
                <Input
                  id='name'
                  placeholder='Your Email'
                  type='email'
                  className='  my-1 dark:focus:ring-0 dark:focus:outline-none'
                />
              </div>
              <div className='my-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Your Password'
                  className='my-1 dark:focus:ring-0 dark:focus:outline-none'
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='signup'>
            <div className='my-6 px-3'>
              <div className='my-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  placeholder='Name'
                  type='email'
                  className='  my-1 dark:focus:ring-0 dark:focus:outline-none'
                />
              </div>
              <div className='my-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='Your Email'
                  type='email'
                  className='  my-1 dark:focus:ring-0 dark:focus:outline-none'
                />
              </div>
              <div className='my-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Your Password'
                  className='my-1 dark:focus:ring-0 dark:focus:outline-none'
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className='px-3'>
          <SheetClose asChild>
            <Button type='submit'>Submit</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
