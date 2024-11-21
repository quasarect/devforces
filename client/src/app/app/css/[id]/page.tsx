'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
});

export default function CSSBattle() {
  const [code, setCode] = useState<string>(`<div></div>
<style>
  body {
    background: #1A4341;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  div {
    width: 200px;
    height: 200px;
    background: #998235;
    transform: rotate(45deg);
  }
</style>`);
  const [iframeKey, setIframeKey] = useState(0);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Solution 1: Add debounce to state updates
  const [debouncedCode, setDebouncedCode] = useState(code);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(code);
    }, 100);
    return () => clearTimeout(timer);
  }, [code]);

  useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [debouncedCode]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setScore(null);
      setResponseTime(null);

      const startTime = performance.now();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/css/score`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: debouncedCode }),
        }
      );

      const endTime = performance.now();
      setResponseTime(endTime - startTime);

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      setScore(data.score);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to evaluate submission',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-6 flex h-[calc(100vh-64px)] h-full'>
      <div className='w-1/2 pr-3 flex flex-col'>
        <h1 className='text-2xl font-bold mb-4'>CSS Battle</h1>
        <Card className='flex-grow overflow-hidden'>
          <CardContent className='p-0 h-full flex flex-col'>
            <div className='bg-[#1e1e1e] text-white p-2'>
              <h2 className='text-lg font-semibold'>Code Editor</h2>
            </div>
            <div className='flex-grow'>
              <MonacoEditor
                height='100%'
                language='html'
                theme='vs-dark'
                value={code}
                onChange={value => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  cursorStyle: 'line',
                }}
              />
            </div>
          </CardContent>
        </Card>{' '}
        <div className='p-6'>
          {' '}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className='w-full h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded transition-all duration-300 transform hover:scale-105 animate-gradient'
          >
            Submit Solution
          </Button>
          {score !== null && (
            <div className='mt-4 text-center'>
              <span className='font-semibold'>Score: </span>
              <span
                className={`${score >= 70 ? 'text-green-500' : 'text-red-500'}`}
              >
                {score || 0}%
              </span>
              {responseTime && (
                <div className='text-muted-foreground text-sm'>
                  Latency: {responseTime.toFixed(0) || 0}ms
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='w-1/2 pl-3 flex flex-col space-y-4'>
        <h1 className='text-2xl font-bold '>Outputs</h1>
        <Card>
          <CardContent className='p-4'>
            <h2 className='text-lg font-semibold mb-2'>Live Preview</h2>
            <div className='bg-gray-800 p-1 rounded-lg w-[400px]  mx-auto h-full overflow-hidden  mix-blend-normal pointer-events-none z-10'>
              <iframe
                key={iframeKey}
                srcDoc={debouncedCode}
                className='w-[500px] h-[300px] bg-white border-0 outline-none'
                title='preview'
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <h2 className='text-lg font-semibold mb-2'>Target</h2>
            <div className='bg-gray-800 p-1 rounded-lg w-[400px] h-[300px] mx-auto'>
              <Image
                src='https://cssbattle.dev/targets/10.png'
                width={400}
                height={300}
                alt='Target design'
                className='w-full h-full object-contain'
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <h2 className='text-lg font-semibold mb-2'>Color Information</h2>
            <div className='flex space-y-2'>
              <div className='flex items-center space-x-4'>
                <div className='w-6 h-6 bg-[#62306D] rounded-full'></div>
                <span className='font-mono text-sm'>#62306D (Background)</span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-6 h-6 bg-[#F7EC7D] rounded-full'></div>
                <span className='font-mono text-sm'>#F7EC7D (Square)</span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-6 h-6 bg-[#AA445F] rounded-full'></div>
                <span className='font-mono text-sm'>#AA445F (Accent 1)</span>
              </div>
              <div className='flex items-center space-x-4'>
                <div className='w-6 h-6 bg-[#E38F66] rounded-full'></div>
                <span className='font-mono text-sm'>#E38F66 (Accent 2)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .submit-button {
          backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
      <Toaster />
    </div>
  );
}
