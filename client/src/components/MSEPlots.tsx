'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export default function MSEPlots({ results }) {
  const formatData = () => {
    return Object.keys(results.model_id)
      .map(key => ({
        model: results?.model_id[key].split('_')[0],
        rmse: results?.rmse[key],
        mae: results?.mae[key],
      }))
      .sort((a, b) => a.rmse - b.rmse);
  };
  const data = formatData();

  return (
    <Card className='w-full max-w-4xl bg-transparent text-gray-100'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold text-gray-100'>
          Model Performance Comparison
        </CardTitle>
        <CardDescription className='text-gray-400'>
          Errors in different models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            rmse: {
              label: 'RMSE',
              color: 'hsl(280, 100%, 70%)', // Bright purple for contrast
            },
          }}
          className='h-[400px]'
        >
          <BarChart
            data={data}
            layout='vertical'
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              horizontal={false}
              stroke='rgba(255, 255, 255, 0.1)'
            />
            <XAxis
              type='number'
              tickFormatter={value => value.toExponential(2)}
              stroke='rgba(255, 255, 255, 0.7)'
            />
            <YAxis
              dataKey='model'
              type='category'
              stroke='rgba(255, 255, 255, 0.7)'
              tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <ChartTooltipContent className='bg-gray-800 border-gray-700 text-gray-100'>
                      <div className='font-bold'>{data.model}</div>
                      <div>RMSE: {data.rmse.toFixed(2)}</div>
                      <div>MAE: {data.mae.toFixed(2)}</div>
                    </ChartTooltipContent>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey='rmse' fill='hsl(280, 100%, 70%)' />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
