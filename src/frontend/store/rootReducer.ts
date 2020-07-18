import { combineReducers } from '@reduxjs/toolkit';
import { reducer as resources } from '../lib/redux-resourcify';

export default combineReducers({
  resources,
});
