// Material-UI
import { useTheme } from '@mui/material/styles';
import { Container, Box, Grid, Typography } from '@mui/material';

// Third Party
import { FormattedMessage } from 'react-intl';

// Assets
import MissingIcon from 'assets/images/icons/missing.png';
import BridgeIcon from 'assets/images/icons/bridge.png';

import { SummeryProps } from 'types/summery';
// =============================|| INSTRUCTION ||============================= //

const Summery = ({
  email,
  phone_number,
  comment,
  bridge_list,
  missing_list,
}: SummeryProps) => {
  const theme = useTheme();
  return (
    <Container className="sum-container">
      <Typography variant="h3">
        <FormattedMessage id="personal_information" />
      </Typography>

      <Box className="summery">
        <Typography variant="h4">{email}</Typography>
        <Typography variant="h4">{phone_number}</Typography>
      </Box>

      <Typography variant="h3">
        <FormattedMessage id="comment" />
      </Typography>

      <Box className="summery">
        <Typography variant="h4">{comment}</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <img src={MissingIcon} alt="Missing Teeth" />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5">
            = <FormattedMessage id="missing_teeth" />{' '}
            {` (${missing_list.length})`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <img src={BridgeIcon} alt="Bridge" />
        </Grid>
        <Grid
          item
          xs={10}
          sx={{ pb: 0, [theme.breakpoints.down('lg')]: { pb: 10 } }}
        >
          <Typography variant="h5">
            = <FormattedMessage id="bridge" /> {` (${bridge_list.length})`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Summery;
