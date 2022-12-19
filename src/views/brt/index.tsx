// Material-UI
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

// Project Imports
import BrushRecoTool from './content/BrushRecoTool';

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

// =============================|| TOOL MAIN ||============================= //

const Brt = () => (
  <>
    <StyledContainer maxWidth="xl">
      <BrushRecoTool />
    </StyledContainer>
  </>
);

export default Brt;
