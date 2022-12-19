import { useState } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, Grid, IconButton, Tooltip } from '@mui/material';
import { IconSettings } from '@tabler/icons';

// Third Party
import PerfectScrollbar from 'react-perfect-scrollbar';

// Project Imports
import Layout from './Layout';
import PresetColor from './PresetColor';
import AnimateButton from 'components/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '90%',
            position: 'fixed',
            right: 16,
            zIndex: theme.zIndex.speedDial,
            boxShadow: theme.customShadows.secondary,
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        {open && (
          <PerfectScrollbar component="div">
            <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
              <Grid item xs={12}>
                {/* layout type */}
                <Layout />
              </Grid>
              <Grid item xs={12}>
                {/* Theme Preset Color */}
                <PresetColor />
              </Grid>
            </Grid>
          </PerfectScrollbar>
        )}
      </Drawer>
    </>
  );
};

export default Customization;
