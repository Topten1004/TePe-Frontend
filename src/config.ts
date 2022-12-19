// Types
import { ConfigProps } from 'types/config';

// Backend
export const BackendUrl = process.env.REACT_APP_SERVER_URL;

// Basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// Like '/Tepe.Brt.React/react/default'
export const BASE_PATH = '';
export const DASHBOARD_PATH = '/dashboard/default';

const config: ConfigProps = {
  fontFamily: `'Ubuntu', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: 'light',
  presetColor: 'default',
  locale: 'en',
  rtlLayout: false,
  container: false,
};

export default config;
