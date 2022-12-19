import { Outlet } from 'react-router-dom';

// Material-UI
import { styled } from '@mui/material/styles';

// Assets
import Brushes from 'assets/images/bg/brushes-fade.png';

const Wrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip',
  minHeight: '100vh',
  backgroundImage: `url(${Brushes})`,
  [theme.breakpoints.down('lg')]: {
    backgroundImage: `none`,
  },
}));

// ==============================|| INTRO LAYOUT ||============================== //

const IntroLayout = () => (
  <>
    <Wrapper className="wrapper-background">
      <Outlet />
    </Wrapper>
  </>
);

export default IntroLayout;
