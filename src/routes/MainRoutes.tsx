import { lazy } from 'react';

// Project Imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';

const BrushRecoTool = Loadable(lazy(() => import('views/brt')));
const Assessment = Loadable(lazy(() => import('views/assessment')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/brush-recommendation-tool',
      element: <BrushRecoTool />,
    },
    {
      path: '/assessment',
      element: <Assessment />,
    },
  ],
};

export default MainRoutes;
