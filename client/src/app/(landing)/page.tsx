import Particles from '@/components/ui/particles';
import Footer from './Footer';
import Hero from './Hero';

export default function Home() {
  return (
    <div className='min-h-screen relative'>
      <Particles
        className='absolute inset-0'
        quantity={150}
        ease={80}
        color='#ffffff'
        refresh
      />
      <Hero />
      <Footer />
    </div>
  );
}
