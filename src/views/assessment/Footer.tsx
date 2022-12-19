// Material UI
import { Container, Grid } from '@mui/material';

// Third Party
// import { FormattedMessage } from 'react-intl';

// Project Imports
import Logo from 'components/Logo';
import { gridSpacing } from 'store/constant';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

const Footer = () => (
  <>
    <div className="footer">
      <Container>
        <Grid container alignItems="center" spacing={gridSpacing}>
          <Grid item xs={12} sm={4}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={8}>
            {/* MORE CONTENT GOES HERE */}
          </Grid>
        </Grid>
      </Container>
    </div>
  </>
);

export default Footer;
