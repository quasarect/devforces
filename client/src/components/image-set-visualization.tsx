'use client';

import { Bar, BarChart, CartesianGrid, ErrorBar, XAxis, YAxis } from 'recharts';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const data = [
  {
    ImageSet: 1,
    AverageMatch: 95.83333333333333,
    StdDeviation: 1.4290634073484012,
    MinMatch: 94.1,
    MaxMatch: 97.6,
    AvgProcessingTime: 7.662963333333335,
  },
  {
    ImageSet: 2,
    AverageMatch: 84.66666666666667,
    StdDeviation: 3.1940917679713268,
    MinMatch: 81.7,
    MaxMatch: 89.1,
    AvgProcessingTime: 9.956434666666667,
  },
  {
    ImageSet: 3,
    AverageMatch: 81.39999999999999,
    StdDeviation: 9.425850978382096,
    MinMatch: 70.8,
    MaxMatch: 93.7,
    AvgProcessingTime: 9.179772333333338,
  },
];

export default function ImageSetVisualization() {
  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Image Set Match Scores</CardTitle>
        <CardDescription>
          Average match scores (%) with standard deviation for each image set
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            averageMatch: {
              label: 'Average Match',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className='h-[400px]'
        >
          <BarChart
            data={data}
            margin={{ top: 40, right: 30, left: 40, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='ImageSet'
              label={{ value: 'Image Set', position: 'bottom', offset: 0 }}
            />
            <YAxis
              label={{
                value: 'Average Match Score (%)',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 100]}
            />
            <ChartTooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <ChartTooltipContent>
                      <p>Image Set: {data.ImageSet}</p>
                      <p>Average Match: {data.AverageMatch.toFixed(2)}%</p>
                      <p>Std Deviation: {data.StdDeviation.toFixed(2)}%</p>
                      <p>Min Match: {data.MinMatch.toFixed(2)}%</p>
                      <p>Max Match: {data.MaxMatch.toFixed(2)}%</p>
                      <p>
                        Avg Processing Time: {data.AvgProcessingTime.toFixed(2)}
                        ms
                      </p>
                    </ChartTooltipContent>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey='AverageMatch' fill='var(--color-averageMatch)'>
              <ErrorBar dataKey='StdDeviation' width={4} strokeWidth={2} />
            </Bar>
          </BarChart>
        </ChartContainer>

        <Table className='mt-8'>
          <TableHeader>
            <TableRow>
              <TableHead>Image Set</TableHead>
              <TableHead>Average Match (%)</TableHead>
              <TableHead>Std Deviation (%)</TableHead>
              <TableHead>Min Match (%)</TableHead>
              <TableHead>Max Match (%)</TableHead>
              <TableHead>Avg Processing Time (ms)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.ImageSet}>
                <TableCell>{row.ImageSet}</TableCell>
                <TableCell>{row.AverageMatch.toFixed(2)}</TableCell>
                <TableCell>{row.StdDeviation.toFixed(2)}</TableCell>
                <TableCell>{row.MinMatch.toFixed(2)}</TableCell>
                <TableCell>{row.MaxMatch.toFixed(2)}</TableCell>
                <TableCell>{row.AvgProcessingTime.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
