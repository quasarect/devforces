import ImageSetVisualization from '@/components/image-set-visualization';
import PerformanceMetricsChart from '@/components/performance-metrics-chart';

function page() {
  return (
    <div className='p-6'>
      <ImageSetVisualization />
      <PerformanceMetricsChart />
    </div>
  );
}

export default page;
