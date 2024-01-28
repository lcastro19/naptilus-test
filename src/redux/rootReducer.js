import { combineReducers } from '@reduxjs/toolkit';
import { listReducer, itemReducer } from './slices';

const rootReducer = combineReducers({
    list: listReducer,
    item: itemReducer,
});

export default rootReducer;
