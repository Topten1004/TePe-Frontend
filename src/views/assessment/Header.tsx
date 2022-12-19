import React, { ReactElement } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// Material UI
import { useTheme } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Grid,
  Hidden,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

// Third Party
import { FormattedMessage } from 'react-intl';

// Project Imports
// import Logo from 'components/Logo';

// Assets
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import StoreIcon from '@mui/icons-material/Store';
import SearchIcon from '@mui/icons-material/Search';
import NotesIcon from '@mui/icons-material/Notes';

// elevation scroll
interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });
  const darkBorder =
    theme.palette.mode === 'dark'
      ? theme.palette.dark.dark
      : theme.palette.grey[200];

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.dark.main : '#9cd3dc',
      borderBottom: trigger ? 'none' : '0px solid',
      borderColor: trigger ? '' : darkBorder,
      color: theme.palette.text.dark,
    },
  });
}

// ==============================|| MAIN LAYOUT APP BAR ||============================== //

const Header = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);
  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type! === 'keydown' &&
      (event.key! === 'Tab' || event.key! === 'Shift')
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dropdownOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Hidden mdDown>
          <Toolbar className="header-top">
            <Container>
              <Grid container alignItems="center" className="left-section">
                <Stack direction="row" className="left">
                  <IconButton disableRipple className="icon-button">
                    <LanguageIcon />
                    <Link href="#" underline="hover">
                      <FormattedMessage id="global" />
                    </Link>
                  </IconButton>

                  <IconButton disableRipple className="icon-button">
                    <StoreIcon />
                    <Link href="#" underline="hover">
                      <FormattedMessage id="reseller" />
                    </Link>
                  </IconButton>
                </Stack>
                {/* ********************************************************************* */}
                <Stack direction="row" className="right-section">
                  <Link href="#" underline="hover">
                    <FormattedMessage id="sustainability" />
                  </Link>
                  <Link href="#" underline="hover">
                    <FormattedMessage id="contact" />
                  </Link>
                  <Link href="#" underline="hover">
                    <FormattedMessage id="career" />
                  </Link>
                  <Link href="#" underline="hover">
                    <FormattedMessage id="about_us" />
                  </Link>
                </Stack>
              </Grid>
            </Container>
          </Toolbar>
        </Hidden>
        {/* ********************************************************************* */}
        <Container>
          <Toolbar className="header-bottom">
            <Typography component="span" className="left-section">
              <Stack direction="row" className="elements">
                <Typography component="span">{/* <Logo /> */}</Typography>
                <Hidden mdDown>
                  <Button
                    color="inherit"
                    onClick={dropdownOpen}
                    endIcon={<ExpandMoreIcon className="icon" />}
                  >
                    <Typography variant="h4">
                      <FormattedMessage id="our_pruducts" />
                    </Typography>
                  </Button>
                  <Button
                    color="inherit"
                    onClick={dropdownOpen}
                    endIcon={<ExpandMoreIcon className="icon" />}
                  >
                    <Typography variant="h4">
                      <FormattedMessage id="tips_advice" />
                    </Typography>
                  </Button>
                  <Button
                    color="inherit"
                    onClick={dropdownOpen}
                    endIcon={<ExpandMoreIcon className="icon" />}
                  >
                    <Typography variant="h4">
                      <FormattedMessage id="tepe_share" />
                    </Typography>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={dropdownClose}
                    onClick={dropdownClose}
                    PaperProps={{
                      elevation: 0,
                      className: 'dropdown-menu',
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem>ITEM 1</MenuItem>
                    <MenuItem>ITEM 2</MenuItem>
                  </Menu>
                </Hidden>
              </Stack>
            </Typography>

            <Stack
              direction="row"
              className="right-section"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              spacing={2}
            >
              <IconButton className="search">
                <SearchIcon className="search-icon" />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<NotesIcon />}
                endIcon={<ExpandMoreIcon />}
                className="partners"
              >
                <FormattedMessage id="partners" />
              </Button>
            </Stack>
            {/* ********************************************************************* */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                color="inherit"
                onClick={drawerToggler(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
              >
                {drawerToggle && (
                  <Box
                    sx={{ width: 'auto' }}
                    role="presentation"
                    onClick={drawerToggler(false)}
                    onKeyDown={drawerToggler(false)}
                  >
                    <List>
                      <Link style={{ textDecoration: 'none' }} href="/#">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <ExpandMoreIcon />
                          </ListItemIcon>
                          <ListItemText primary="Our Pruducts" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/#">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <ExpandMoreIcon />
                          </ListItemIcon>
                          <ListItemText primary="Tips and Advice" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/#">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <ExpandMoreIcon />
                          </ListItemIcon>
                          <ListItemText primary="Tepe Share" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default Header;
