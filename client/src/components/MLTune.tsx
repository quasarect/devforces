'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Layers, Zap } from 'lucide-react';

export default function Component() {
  const [maxModels, setMaxModels] = useState(10);
  const [stoppingRounds, setStoppingRounds] = useState(5);
  const [maxRuntimeSecs, setMaxRuntimeSecs] = useState(60);
  const [isAutoTuning, setIsAutoTuning] = useState(true);

  const totalProgress =
    (maxModels / 20 + stoppingRounds / 10 + maxRuntimeSecs / 300) / 3;

  return (
    <Card className='w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 shadow-lg'>
      <CardHeader className='border-b border-gray-700'>
        <CardTitle className='text-center text-2xl font-bold text-cyan-400'>
          ML Model Auto-Tuner
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6 pt-6'>
        <div className='relative h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg overflow-hidden border border-gray-600'>
          <div
            className='absolute inset-y-0 left-0 bg-cyan-500 opacity-30 transition-all duration-1000 ease-out'
            style={{ width: `${totalProgress * 100}%` }}
          />
          <Brain
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-300 w-16 h-16 animate-pulse'
            style={{
              left: `${totalProgress * 100}%`,
              transition: 'left 1s ease-out',
            }}
          />
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='max-models'
                className='text-sm font-medium flex items-center gap-2 text-cyan-300'
              >
                <Layers className='w-4 h-4' />
                Max Models
              </Label>
              <span className='text-sm font-bold text-cyan-400'>
                {maxModels}
              </span>
            </div>
            <Slider
              id='max-models'
              min={1}
              max={20}
              step={1}
              value={[maxModels]}
              onValueChange={value => setMaxModels(value[0])}
              disabled={!isAutoTuning}
              className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-cyan-400'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='stopping-rounds'
                className='text-sm font-medium flex items-center gap-2 text-cyan-300'
              >
                <Clock className='w-4 h-4' />
                Stopping Rounds
              </Label>
              <span className='text-sm font-bold text-cyan-400'>
                {stoppingRounds}
              </span>
            </div>
            <Slider
              id='stopping-rounds'
              min={1}
              max={10}
              step={1}
              value={[stoppingRounds]}
              onValueChange={value => setStoppingRounds(value[0])}
              disabled={!isAutoTuning}
              className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-cyan-400'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='max-runtime'
                className='text-sm font-medium flex items-center gap-2 text-cyan-300'
              >
                <Zap className='w-4 h-4' />
                Max Runtime (secs)
              </Label>
              <span className='text-sm font-bold text-cyan-400'>
                {maxRuntimeSecs}
              </span>
            </div>
            <Slider
              id='max-runtime'
              min={10}
              max={300}
              step={10}
              value={[maxRuntimeSecs]}
              onValueChange={value => setMaxRuntimeSecs(value[0])}
              disabled={!isAutoTuning}
              className='[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-cyan-400'
            />
          </div>
        </div>

        <div className='flex items-center justify-between bg-gray-700 p-3 rounded-lg'>
          <Label
            htmlFor='auto-tuning'
            className='text-sm font-medium cursor-pointer text-cyan-300'
          >
            Enable Auto-Tuning
          </Label>
          <Switch
            id='auto-tuning'
            checked={isAutoTuning}
            onCheckedChange={setIsAutoTuning}
          />
        </div>

        <Button
          className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-cyan-300 focus:outline-none'
          disabled={!isAutoTuning}
        >
          Start Auto-Tuning
        </Button>
      </CardContent>
    </Card>
  );
}
