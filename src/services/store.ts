import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from "react-redux";

import { rootReducer } from "./root-reducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
