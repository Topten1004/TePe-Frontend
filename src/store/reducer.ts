// Third Party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Project Imports
import snackbarReducer from './slices/snackbar';
import cartReducer from './slices/cart';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'tepe-',
    },
    cartReducer
  ),
});

export default reducer;
