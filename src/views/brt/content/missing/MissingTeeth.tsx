// Material-UI
import { Container, Typography } from '@mui/material';

// Third Party
import { FormattedMessage } from 'react-intl';

// =============================|| INSTRUCTION ||============================= //

const MissingTeeth = () => (
  <Container className="mis-container">
    <Typography variant="h3">
      <FormattedMessage id="select_the" />
    </Typography>
  </Container>
);

export default MissingTeeth;
