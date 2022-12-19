// Material-UI
import { styled } from '@mui/material/styles';

// Material-UI
import { Container } from '@mui/material';

// Project Imports
import Intro from './content/Intro';

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  webkitTransform: 'translateX(-50%) translateY(-50%);',
  transform: 'translateX(-50%) translateY(-50%)',
  [theme.breakpoints.down('md')]: {
    position: 'none',
    left: '0',
    top: '5%',
    webkitTransform: 'none',
    transform: 'none',
  },
  [theme.breakpoints.down('lg')]: {
    position: 'none',
    left: '0',
    top: '10%',
    webkitTransform: 'none',
    transform: 'none',
  },
}));

// =============================|| LANDING MAIN ||============================= //

const Landing = () => (
  <>
    <StyledContainer maxWidth="xl">
      <Intro />
    </StyledContainer>
  </>
);

export default Landing;
