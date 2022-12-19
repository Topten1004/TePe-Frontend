import { Link as RouterLink } from 'react-router-dom';

// Material-UI
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Hidden,
  Typography,
} from '@mui/material';

// third party
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

// Project Imports
import Logo from 'components/Logo';
import { gridSpacing } from 'store/constant';
import LanguageSwitch from './Localization';

// Assets
import Tooth from 'assets/images/bg/tooth.png';

// styles
const HeaderAnimationImage = styled('img')({
  maxWidth: '100%',
  filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))',
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderPage = () => {
  // Setting the body background color
  document.body.style.backgroundColor = '#a8daea';

  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        {/* ********************************************************************* */}
        <Grid item sm={6} md={5}>
          <Logo />
        </Grid>
        <Grid item sm={6} md={7}>
          {/* LEAVE EMPTY */}
        </Grid>
        {/* ********************************************************************* */}
        {/* LEFT GRID */}
        <Grid item sm={6} md={5} className="int-left-grid">
          <Grid item sx={{ mt: 3, mb: 3 }}>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
              }}
            >
              <Typography variant="h1">
                <FormattedMessage id="tool_kit" />
              </Typography>
            </motion.div>
          </Grid>
          <Grid item sx={{ mb: 3 }}>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.2,
              }}
            >
              <Typography variant="h4" color="inherit">
                <FormattedMessage id="tool_desc" />
              </Typography>
            </motion.div>
          </Grid>
          <Grid item sx={{ mb: 3 }}>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.4,
              }}
            >
              <Grid item>
                <LanguageSwitch />
              </Grid>
            </motion.div>
          </Grid>
          <Grid item sx={{ mb: 3 }}>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.6,
              }}
            >
              <Grid item>
                <Stack direction="row">
                  <Button
                    component={RouterLink}
                    to="/brush-recommendation-tool"
                    fullWidth
                    variant="contained"
                    className="start-button"
                  >
                    <FormattedMessage id="start" />
                  </Button>
                </Stack>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
        {/* ********************************************************************* */}
        {/* RIGHT GRID */}
        <Grid item sm={6} md={7} className="int-right-grid">
          <Box
            className="int-right-box"
            sx={{
              position: 'absolute',
              bottom: 150,
              left: 100,
              animation: '5s slideY linear infinite',
              animationDelay: '1s',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.4,
              }}
            >
              <Hidden lgDown>
                <HeaderAnimationImage src={Tooth} alt="Tepe" />
              </Hidden>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderPage;
