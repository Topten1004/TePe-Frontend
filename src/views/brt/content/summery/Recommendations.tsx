// Material-UI
import { Container, Grid, Typography } from '@mui/material';

// Data
import wireframe_constant from 'data/wireframe.json';

// Types
import { RecommendationProps } from 'types/recommendation';
import { IRecommendBrush } from 'types/wireframe';

// Third Party
import { FormattedMessage } from 'react-intl';

// =============================|| INSTRUCTION ||============================= //

const Recommendations = ({ recommend_brush }: RecommendationProps) => {
  const imgPath = require.context('assets/images/items', true);

  const displayDescription = (brush_data: IRecommendBrush | null) => {
    if (!brush_data) return '';
    const { description, name, size } = brush_data;

    return (
      <>
        {!name ? (
          <FormattedMessage id="size" />
        ) : (
          <FormattedMessage id="brush" />
        )}
        {` ${size}`}
        {!name ? '' : 'mm'}
        {` ${name}`}
        {description === wireframe_constant.recommend_desc.upper_row ||
        description === wireframe_constant.recommend_desc.lower_row ||
        description === wireframe_constant.recommend_desc.entire_mouth ? (
          <FormattedMessage id="entire_prefix" />
        ) : (
          <FormattedMessage id="gap_prefix" />
        )}
      </>
    );
  };

  const translationArea = (description: string | null) => {
    if (!description) return '';

    if (
      description === wireframe_constant.recommend_desc.upper_row ||
      description === wireframe_constant.recommend_desc.lower_row ||
      description === wireframe_constant.recommend_desc.entire_mouth
    )
      return <FormattedMessage id={description} />;

    if (description.search(wireframe_constant.recommend_desc.upper_row) >= 0) {
      return (
        <>
          <FormattedMessage id={wireframe_constant.recommend_desc.upper_row} />{' '}
          {description.slice(
            wireframe_constant.recommend_desc.upper_row.length,
            description.length
          )}
        </>
      );
    }

    if (description.search(wireframe_constant.recommend_desc.lower_row) >= 0) {
      return (
        <>
          <FormattedMessage id={wireframe_constant.recommend_desc.lower_row} />{' '}
          {description.slice(
            wireframe_constant.recommend_desc.lower_row.length,
            description.length
          )}
        </>
      );
    }

    if (
      description.search(wireframe_constant.recommend_desc.entire_mouth) >= 0
    ) {
      return (
        <>
          <FormattedMessage
            id={wireframe_constant.recommend_desc.entire_mouth}
          />{' '}
          {description.slice(
            wireframe_constant.recommend_desc.entire_mouth.length,
            description.length
          )}
        </>
      );
    }

    return <>{description}</>;
  };

  return (
    <Container className="rec-container">
      <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
        <Grid item xs={2}>
          <img
            src={imgPath(`./${recommend_brush?.cat_img}`).default}
            srcSet={imgPath(`./${recommend_brush?.cat_img}`).default}
            alt={recommend_brush?.description}
          />
        </Grid>
        <Grid item xs={10} className="content">
          <Typography variant="h4">{recommend_brush?.title} </Typography>
          <Typography variant="h6">
            {displayDescription(recommend_brush || null)}
          </Typography>
          <Typography variant="h3">
            {translationArea(recommend_brush?.description || null)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Recommendations;
