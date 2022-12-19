// Routing
import Routes from 'routes';

// Project Imports
import Locales from 'components/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'components/RTLLayout';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { StorageProvider } from 'contexts/StorageContext';

// ==============================|| APP ||============================== //

const App = () => (
  <ThemeCustomization>
    {/* RTL Layout */}
    <RTLLayout>
      <Locales>
        <NavigationScroll>
          <StorageProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </StorageProvider>
        </NavigationScroll>
      </Locales>
    </RTLLayout>
  </ThemeCustomization>
);

export default App;
