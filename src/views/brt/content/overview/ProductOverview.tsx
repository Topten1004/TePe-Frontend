import React from 'react';

// Material-UI
import { Grid, IconButton, Typography } from '@mui/material';

// Types
import { OverviewProps } from 'types/overview';

// Third Party
import { FormattedMessage } from 'react-intl';

// Assets
import Logo from 'assets/images/logo.png';
import CloseIcon from '@mui/icons-material/Close';
import SelectedItems from './SelectedItems';

// =============================|| INSTRUCTION ||============================= //

const ProductOverview = ({
  recommend_list,
  deleteBrush,
  btnClick,
}: OverviewProps) => (
  <Grid item className="ove-grid">
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      className="header"
    >
      <img src={Logo} alt="tepe" />
      <Typography variant="h2">
        <FormattedMessage id="product_recommendation" />
      </Typography>
      <IconButton className="icon" onClick={btnClick}>
        <CloseIcon />
      </IconButton>
    </Grid>
    <Grid container spacing={2}>
      <div className="product-scroll">
        <div className="content">
          {recommend_list &&
            recommend_list.map((item, index) => (
              <SelectedItems
                key={index}
                id={index}
                recommend_brush={item}
                deleteBrush={deleteBrush}
              />
            ))}
        </div>
      </div>
    </Grid>
  </Grid>
);

export default ProductOverview;
