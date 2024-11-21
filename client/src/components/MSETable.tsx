import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function formatNumber(num: number): string {
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

function sanitizeModelName(modelId: string): string {
  // Extract the model name from the ID
  const modelName = modelId.split('_')[0];

  // Handle special cases
  if (modelName === 'StackedEnsemble') {
    return modelId.includes('AllModels')
      ? 'Stacked Ensemble (All Models)'
      : 'Stacked Ensemble (Best of Family)';
  }

  // Map abbreviations to full names
  const modelNameMap: { [key: string]: string } = {
    DRF: 'Random Forest',
    XGBoost: 'XGBoost',
    GBM: 'Gradient Boosting Machine',
    GLM: 'Generalized Linear Model',
  };

  return modelNameMap[modelName] || modelName;
}

export default function MSETable({ results }) {
  console.log(results);
  return (
    <Table>
      <TableCaption>Model Performance Metrics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[250px]'>Model Name</TableHead>
          <TableHead>RMSE</TableHead>
          <TableHead>MSE</TableHead>
          <TableHead>MAE</TableHead>
          <TableHead>RMSLE</TableHead>
          <TableHead>Mean Residual Deviance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(results?.model_id)?.map((modelId, index) => (
          <TableRow key={modelId}>
            <TableCell className='font-medium'>
              {sanitizeModelName(modelId)}
            </TableCell>
            <TableCell>{formatNumber(results?.rmse[index])}</TableCell>
            <TableCell>{formatNumber(results?.mse[index])}</TableCell>
            <TableCell>{formatNumber(results?.mae[index])}</TableCell>
            <TableCell>{formatNumber(results?.rmsle[index])}</TableCell>
            <TableCell>
              {formatNumber(results?.mean_residual_deviance[index])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
