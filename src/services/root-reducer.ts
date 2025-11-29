import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredientsSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';

import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import ordersFeedReducer from '../slices/ordersFeedSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,

  feed: feedReducer,
  profileOrders: profileOrdersReducer,

  //
  ordersFeed: ordersFeedReducer
});
