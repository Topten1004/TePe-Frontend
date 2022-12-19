// Material-UI
import { Box, Typography } from '@mui/material';

// Types
import { ItemProps } from 'types/interdental';

// =============================|| RECOMMENDED ||============================= //

const Brushes = ({ size, image: img }: ItemProps) => {
  const imgPath = require.context('assets/images/items', true);
  const CategoryImg = img && imgPath(`./${img}`).default;

  return (
    <Box className="brush-container">
      <img src={CategoryImg} srcSet={CategoryImg} alt={size} loading="lazy" />
      <Typography variant="subtitle1">{size}mm</Typography>
    </Box>
  );
};

export default Brushes;
