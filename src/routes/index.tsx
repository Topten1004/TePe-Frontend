import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import IntroLayout from 'layout/IntroLayout';

// routes
import IntroRoutes from './IntroRoutes';
import MainRoutes from './MainRoutes';
import Loadable from 'components/Loadable';

const Landing = Loadable(lazy(() => import('views/landing')));

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <IntroLayout />,
      children: [{ path: '/', element: <Landing /> }],
    },
    IntroRoutes,
    MainRoutes,
  ]);
}
