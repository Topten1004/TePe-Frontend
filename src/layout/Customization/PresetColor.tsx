// Material-UI
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid } from '@mui/material';
import { IconChecks } from '@tabler/icons';

// Project Imports
import useConfig from 'hooks/useConfig';
import SubCard from 'components/cards/SubCard';

// color import
import defaultTheme from 'assets/scss/_mainTheme.module.scss';

// Types
import { StringColorProps } from 'types';

interface Props {
  color: StringColorProps;
  presetColor: string;
  setPresetColor: (s: string) => void;
}

const PresetColorBox = ({ color, presetColor, setPresetColor }: Props) => (
  <Grid item>
    <Avatar
      variant="rounded"
      color="inherit"
      sx={{
        background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
        opacity: presetColor === color.id ? 0.6 : 1,
        cursor: 'pointer',
      }}
      onClick={() => setPresetColor(color?.id!)}
    >
      {presetColor === color.id && <IconChecks color="#fff" />}
    </Avatar>
  </Grid>
);

const PresetColor = () => {
  const theme = useTheme();
  const { presetColor, onChangePresetColor } = useConfig();

  const colorOptions = [
    {
      id: 'default',
      primary:
        theme.palette.mode === 'dark'
          ? defaultTheme.darkPrimaryMain
          : defaultTheme.primaryMain,
      secondary:
        theme.palette.mode === 'dark'
          ? defaultTheme.darkSecondaryMain
          : defaultTheme.secondaryMain,
    },
  ];

  return (
    <SubCard title="Preset Color">
      <Grid item container spacing={2} alignItems="center">
        {colorOptions.map((color, index) => (
          <PresetColorBox
            key={index}
            color={color}
            presetColor={presetColor}
            setPresetColor={onChangePresetColor}
          />
        ))}
      </Grid>
    </SubCard>
  );
};

export default PresetColor;
