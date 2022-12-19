// Material-UI
import { styled } from '@mui/material/styles';

// Project Imports
import Header from './Header';
import Footer from './Footer';
import Survey from './content/survey';

const HeaderWrapper = styled('div')(({ theme }) => ({
  paddingTop: 30,
  overflowX: 'hidden',
  overflowY: 'clip',
  [theme.breakpoints.down('md')]: {
    paddingTop: 15,
  },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  marginTop: 200,
  [theme.breakpoints.down('md')]: {
    marginTop: 100,
  },
}));

// =============================|| OVERVIEW MAIN ||============================= //

const Assessment = () => (
  <>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <ContentWrapper>
      <Survey />
    </ContentWrapper>
    <Footer />
  </>
);

export default Assessment;
