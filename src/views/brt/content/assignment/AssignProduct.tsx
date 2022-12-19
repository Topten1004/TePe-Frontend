import React, { useState, useEffect } from 'react';

// Material-UI
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

// Types
import { ItemData, ItemDataProps } from 'types/interdental';

// Project Imports
import ProductsList from './ProductList';

// Assets
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

// =============================|| PRODUCT ||============================= //

const AssignProduct = (props: ItemDataProps) => {
  const {
    title,
    is_open,
    cat_img: img,
    dataSource,
    onCollapse,
    onEmit,
  } = props;
  const imgPath = require.context('assets/images/items', true);
  const CategoryImg = img && imgPath(`./${img}`).default;
  const [brushData, setBrushData] = useState<ItemData[]>([]);

  useEffect(() => {
    setBrushData([...dataSource]);
  }, [dataSource]);

  const handleClick = () => {
    setBrushData([...brushData!.map((item, id) => item)]);
    onCollapse(is_open);
  };

  const onEmitting = (data: ItemData) => {
    // setBrushData([
    //   ...brushData!.map((item, id) => {
    //     if (item.id === data.id) {
    //       item.isChecked = !item.isChecked;
    //     }
    //     return item;
    //   }),
    // ]);
    onEmit(data);
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton
        disableRipple
        onClick={handleClick}
        className="prod-list-button"
        style={{ backgroundColor: 'transparent' }}
      >
        <img src={CategoryImg} alt={title} />
        <ListItemText
          className="list-item"
          primary={<Typography className="title">{title}</Typography>}
        />
        {is_open ? (
          <ExpandLess className="list-icon" />
        ) : (
          <ExpandMore className="list-icon" />
        )}
      </ListItemButton>
      <Collapse in={is_open} timeout="auto" unmountOnExit>
        {is_open &&
          brushData!.map((item, index) => (
            <ProductsList
              onEmit={onEmitting}
              key={index}
              id={item.id}
              name={item.name}
              size={item.size}
              hex={item.hex}
              isChecked={item.isChecked}
            />
          ))}
      </Collapse>
    </List>
  );
};

export default AssignProduct;
