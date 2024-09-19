import { createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import CSSBattles from './pages/CSSBattles.tsx';
import Pricing from './components/Pricing.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path : '/CSS-Battles',
    element: <CSSBattles />,
  },
  {
    path : '/pricing',
    element: <Pricing />,
  },
]);

export default router;
