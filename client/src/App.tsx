import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [fCount, setFCount] = useState<number>(0);

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center font-manrope'>
      <Button
        variant='outline'
        className='-translate-y-1/2 m-2 text-lg'
        onClick={() => setFCount(fCount + 1)}
      >
        click me daddy!
      </Button>
      {fCount > 0 && <div className='font-inter'> count - {fCount}</div>}
    </div>
  );
}

export default App;
