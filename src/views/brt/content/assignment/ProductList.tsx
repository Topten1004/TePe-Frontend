// Material-UI
import { List, ListItemButton, ListItemText, Checkbox } from '@mui/material';

// Types
import { ItemDataEmitProps } from 'types/interdental';

// Assets
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// hook
import { usePtStorage } from 'contexts/StorageContext';
import { StorageProps } from 'types/storagecontext';
// =============================|| PRODUCT LIST ||============================= //

const ProductList = (props: ItemDataEmitProps) => {
  const { ptLocale } = usePtStorage() as StorageProps;

  const { id, name, size, hex, isChecked, onEmit } = props;

  const handleClick = () => {
    onEmit({
      id,
      isChecked: true,
    });
  };

  return (
    <List component="div" disablePadding>
      <ListItemButton className="prod-item-outline" onClick={handleClick}>
        <CircleIcon sx={{ color: hex }} />
        <ListItemText className="left-item" primary={size} />
        <ListItemText className="right-item" primary={name?.[ptLocale]} />
        <Checkbox
          icon={<CircleIcon className="disabled-icon" />}
          checkedIcon={<CheckCircleIcon className="checked-icon" />}
          checked={isChecked || false}
          color="primary"
        />
      </ListItemButton>
    </List>
  );
};

export default ProductList;
