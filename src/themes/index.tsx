import { useMemo, ReactNode } from 'react';

// Material-UI
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
} from '@mui/material/styles';

// Project Import
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

// Types
import { CustomShadowProps } from 'types/default-theme';
import { TypographyOptions } from '@mui/material/styles/createTypography';

interface Props {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
  const {
    borderRadius,
    fontFamily,
    navType,
    outlinedFilled,
    presetColor,
    rtlLayout,
  } = useConfig();

  const theme: Theme = useMemo<Theme>(
    () => Palette(navType, presetColor),
    [navType, presetColor]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
    () => Typography(theme, borderRadius, fontFamily),
    [theme, borderRadius, fontFamily]
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => customShadows(navType, theme),
    [navType, theme]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      direction: rtlLayout ? 'rtl' : 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [rtlLayout, theme, themeCustomShadows, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = useMemo(
    () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
    [themes, borderRadius, outlinedFilled]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
