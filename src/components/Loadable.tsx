import { Suspense, LazyExoticComponent, ComponentType } from 'react';

// Material-UI
import { LinearProgressProps } from '@mui/material/LinearProgress';

// Project Imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps {}

const Loadable =
  (
    Component:
      | LazyExoticComponent<() => JSX.Element>
      | ComponentType<React.ReactNode>
  ) =>
  (props: LoaderProps) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );

export default Loadable;
