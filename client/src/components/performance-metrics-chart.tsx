'use client';

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
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

const data = [
  {
    maxPages: 2,
    initialHeap: 0.22455978393554688,
    peakHeap: 13.113940238952637,
    finalHeap: 13.391240119934082,
    avgMemoryPerPage: 0.01814746856689453,
    avgLatency: 0.558764999999994,
    peakConcurrent: 1,
  },
  {
    maxPages: 3,
    initialHeap: 13.391240119934082,
    peakHeap: 13.815303802490234,
    finalHeap: 13.91325569152832,
    avgMemoryPerPage: 0,
    avgLatency: 0.07260700000006182,
    peakConcurrent: 1,
  },
  {
    maxPages: 5,
    initialHeap: 13.91325569152832,
    peakHeap: 14.430452346801758,
    finalHeap: 14.536720275878906,
    avgMemoryPerPage: 0,
    avgLatency: 0.09400900000002821,
    peakConcurrent: 1,
  },
  {
    maxPages: 8,
    initialHeap: 14.536720275878906,
    peakHeap: 15.272693634033203,
    finalHeap: 15.372257232666016,
    avgMemoryPerPage: 0,
    avgLatency: 0.026589250000029097,
    peakConcurrent: 1,
  },
  {
    maxPages: 10,
    initialHeap: 15.372257232666016,
    peakHeap: 16.313753128051758,
    finalHeap: 16.40108013153076,
    avgMemoryPerPage: 0,
    avgLatency: 0.02539120000001276,
    peakConcurrent: 1,
  },
  {
    maxPages: 15,
    initialHeap: 16.40108013153076,
    peakHeap: 17.71761131286621,
    finalHeap: 17.857646942138672,
    avgMemoryPerPage: 0,
    avgLatency: 0.02086128571428552,
    peakConcurrent: 1,
  },
  {
    maxPages: 20,
    initialHeap: 17.857646942138672,
    peakHeap: 19.568135261535645,
    finalHeap: 19.734731674194336,
    avgMemoryPerPage: 0,
    avgLatency: 0.043041399999947313,
    peakConcurrent: 1,
  },
  {
    maxPages: 25,
    initialHeap: 19.734731674194336,
    peakHeap: 21.769213676452637,
    finalHeap: 21.938448905944824,
    avgMemoryPerPage: 0,
    avgLatency: 0.021171583333398303,
    peakConcurrent: 1,
  },
  {
    maxPages: 30,
    initialHeap: 21.938448905944824,
    peakHeap: 24.520702362060547,
    finalHeap: 24.716747283935547,
    avgMemoryPerPage: 0.0012760586208767361,
    avgLatency: 0.02211673333331419,
    peakConcurrent: 1,
  },
  {
    maxPages: 25,
    initialHeap: 24.716747283935547,
    peakHeap: 26.727002143859863,
    finalHeap: 26.89287757873535,
    avgMemoryPerPage: 0,
    avgLatency: 0.01807708333338572,
    peakConcurrent: 1,
  },
  {
    maxPages: 40,
    initialHeap: 26.89287757873535,
    peakHeap: 30.09425926208496,
    finalHeap: 30.336438179016113,
    avgMemoryPerPage: 0,
    avgLatency: 0.014606099999946309,
    peakConcurrent: 1,
  },
  {
    maxPages: 45,
    initialHeap: 30.336438179016113,
    peakHeap: 33.920026779174805,
    finalHeap: 34.1530818939209,
    avgMemoryPerPage: 0,
    avgLatency: 0.013891000000016489,
    peakConcurrent: 1,
  },
  {
    maxPages: 50,
    initialHeap: 34.1530818939209,
    peakHeap: 38.16810607910156,
    finalHeap: 38.4273157119751,
    avgMemoryPerPage: 0,
    avgLatency: 0.014132440000030328,
    peakConcurrent: 1,
  },
];

export default function PerformanceMetricsChart() {
  return (
    <div className='space-y-8 mt-6 w-full flex flex-col justify-center items-center'>
      <Card>
        <CardHeader>
          <CardTitle>Memory Usage</CardTitle>
          <CardDescription>
            Initial, Peak, and Final Heap Memory Usage across Page Counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              initialHeap: {
                label: 'Initial Heap',
                color: 'hsl(var(--chart-1))',
              },
              peakHeap: {
                label: 'Peak Heap',
                color: 'hsl(var(--chart-2))',
              },
              finalHeap: {
                label: 'Final Heap',
                color: 'hsl(var(--chart-3))',
              },
            }}
            className='h-[400px]'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='maxPages' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='initialHeap'
                  stroke='var(--color-initialHeap)'
                />
                <Line
                  type='monotone'
                  dataKey='peakHeap'
                  stroke='var(--color-peakHeap)'
                />
                <Line
                  type='monotone'
                  dataKey='finalHeap'
                  stroke='var(--color-finalHeap)'
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latency Metrics</CardTitle>
          <CardDescription>
            Average Latency, Peak Concurrent, and Average Memory Per Page across
            Page Counts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgLatency: {
                label: 'Average Latency',
                color: 'hsl(var(--chart-1))',
              },
              peakConcurrent: {
                label: 'Peak Concurrent',
                color: 'hsl(var(--chart-2))',
              },
              avgMemoryPerPage: {
                label: 'Avg Memory Per Page',
                color: 'hsl(var(--chart-3))',
              },
            }}
            className='h-[400px]'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='maxPages' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey='avgLatency' fill='var(--color-avgLatency)' />
                <Bar
                  dataKey='peakConcurrent'
                  fill='var(--color-peakConcurrent)'
                />
                <Bar
                  dataKey='avgMemoryPerPage'
                  fill='var(--color-avgMemoryPerPage)'
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Latency Trend</CardTitle>
          <CardDescription>Average Latency across Page Counts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              avgLatency: {
                label: 'Average Latency',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className='h-[400px]'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='maxPages' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='avgLatency'
                  stroke='var(--color-avgLatency)'
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
