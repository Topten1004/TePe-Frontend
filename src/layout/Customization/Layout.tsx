// Material-UI
import { useTheme } from '@mui/material/styles';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  PaletteMode,
} from '@mui/material';

// Project Imports
import useConfig from 'hooks/useConfig';
import SubCard from 'components/cards/SubCard';

const Layout = () => {
  const theme = useTheme();
  const { navType, rtlLayout, onChangeMenuType, onChangeRTL } = useConfig();

  return (
    <SubCard title="Layout">
      <FormControl component="fieldset">
        <FormLabel component="legend">Mode</FormLabel>
        <RadioGroup
          row
          aria-label="layout"
          value={navType}
          onChange={e => onChangeMenuType(e.target.value as PaletteMode)}
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="light"
            control={<Radio />}
            label="Light"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 28 },
              '& .MuiFormControlLabel-label': {
                color: theme.palette.grey[900],
              },
            }}
          />
          <FormControlLabel
            value="dark"
            control={<Radio />}
            label="Dark"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 28 },
              '& .MuiFormControlLabel-label': {
                color: theme.palette.grey[900],
              },
            }}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Direction</FormLabel>
        <FormControlLabel
          control={
            <Switch
              checked={rtlLayout}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onChangeRTL(event.target.checked)
              }
              inputProps={{ 'aria-label': 'controlled-direction' }}
            />
          }
          label="RTL"
        />
      </FormControl>
    </SubCard>
  );
};

export default Layout;
