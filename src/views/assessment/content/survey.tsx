import * as React from 'react';

import { useSearchParams } from 'react-router-dom';

// Material-UI
import {
  Container,
  Grid,
  ImageList,
  Typography,
  Button,
  Stack,
  ImageListItem,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';

// Third Party
import { FormattedMessage } from 'react-intl';

// Project Imports
import Brushes from './brushes';

import axios from 'axios';
import { BackendUrl } from 'config';

import all_markets from 'data/markets.json';
import { MarketData, StorageProps } from 'types/storagecontext';

// Hook
import { usePtStorage } from 'contexts/StorageContext';

// Assets
import Apotea from 'assets/images/icons/apotea-logo.png';
import useConfig from 'hooks/useConfig';

// ==============================|| BRUSH RECOMMENDATION TOOL ||============================== //

const Survey = () => {
  const { ptLocale } = usePtStorage() as StorageProps;
  const { onChangeLocale } = useConfig();

  const [ptComment, setPtComment] = React.useState<string>('');
  const [ptImage, setPtImage] = React.useState<string>('');
  const [ptMarket, setPtMarket] = React.useState<MarketData | null>(null);
  const [ptBrushes, setPtBrushes] = React.useState<Array<any>>([]);
  const [urlParams] = useSearchParams();

  const imgPath = require.context('assets/images/markets', true);

  // Setting the body background color
  document.body.style.backgroundColor = '#ffffff';

  const handleGotoLink = () => {
    if (ptMarket) window.open(ptMarket.cta_url, '_blank');
  };

  React.useEffect(() => {
    if (urlParams) {
      if (urlParams.get('recommendation_id')) {
        axios
          .get(
            `${BackendUrl}Recommendation/GetRecommendationDetailById?recommendationsId=${urlParams.get(
              'recommendation_id'
            )}`
          )
          .then((res: any) => {
            console.log(res);
            setPtImage(res.data.value.teethImage);
            setPtComment(res.data.value.comment);
            setPtBrushes(res.data.value.recoItems);
            onChangeLocale(res.data.value.lang);

            const current_market = all_markets.find(
              market => market.id === res.data.value.marketID
            );

            if (current_market) setPtMarket(current_market);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams]);

  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        sx={{ mt: { xs: 10, sm: 6, md: 18.75 }, mb: { xs: 2.5, md: 10 } }}
      >
        {/* ********************************************************************* */}
        {/* LEFT GRID */}
        <Grid item xs={12} md={4} className="sur-left-grid">
          <Grid item>
            <Typography variant="h6" sx={{ mb: 1 }}>
              <FormattedMessage id="from_your" />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h1">
              <FormattedMessage id="hi" />
            </Typography>
            <Typography variant="h4">
              <FormattedMessage id="your_dental" />
            </Typography>
            <div className="recommendation-scroll">
              <div className="content">
                <ImageList cols={3} className="image-list">
                  {ptBrushes.map((brush, index) => (
                    <ImageListItem key={index} className="content">
                      <Brushes image={brush.catImgName} size={brush.size} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </div>
            <div className="align-to-bottom">
              <Button
                size="large"
                variant="contained"
                className="contained-button"
                onClick={handleGotoLink}
              >
                <FormattedMessage id="buy_now" />
              </Button>
              <Stack direction="row" className="store-logo">
                <img src={Apotea} alt="Apotea" />
                <Typography variant="caption" className="caption">
                  <FormattedMessage id="find_our" />
                </Typography>
              </Stack>
            </div>
          </Grid>
        </Grid>
        {/* ********************************************************************* */}
        {/* MIDDLE GRID */}
        <Grid item xs={12} md={4} className="sur-middle-grid">
          <Grid item>
            <Typography variant="h2">
              <FormattedMessage id="where_to" />
            </Typography>
          </Grid>
          <Grid item>
            {ptImage ? <img src={ptImage} alt="placeholder" /> : <></>}
          </Grid>
        </Grid>
        {/* ********************************************************************* */}
        {/* RIGHT GRID */}
        <Grid item xs={12} md={4} className="sur-right-grid">
          <Grid item>
            <Typography variant="h2">
              <FormattedMessage id="comment" />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{ptComment}</Typography>
            <Typography variant="h3">
              <FormattedMessage id="tips_advice" />
            </Typography>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              className="inner-grid"
            >
              {ptMarket ? (
                <>
                  <Grid item xs={6}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={
                          imgPath(`./${ptMarket.banners.images.first}`).default
                        }
                        alt={ptMarket.banners.headings.first}
                      />
                      <CardContent className="card-content">
                        <Typography variant="h5">
                          {ptMarket.banners.headings.first[ptLocale]}
                        </Typography>
                        <Typography variant="caption">
                          {ptMarket.banners.contents.first[ptLocale]}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Grid>
                  <Grid item xs={6}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={
                          imgPath(`./${ptMarket.banners.images.second}`).default
                        }
                        alt={ptMarket.banners.headings.second}
                      />
                      <CardContent className="card-content">
                        <Typography variant="h5">
                          {ptMarket.banners.headings.second[ptLocale]}
                        </Typography>
                        <Typography variant="caption">
                          {ptMarket.banners.contents.second[ptLocale]}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Typography variant="h3">
              <FormattedMessage id="want_news" />
            </Typography>
            <Button variant="contained" className="align-to-bottom">
              <FormattedMessage id="sign_up" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Survey;
