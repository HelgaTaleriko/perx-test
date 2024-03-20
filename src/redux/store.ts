import {useDispatch, useSelector} from "react-redux";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {goodsSlice} from "./goods/slice";
import {cartSlice} from "./cart/slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        goods: goodsSlice.reducer,
        cart: cartSlice.reducer,
    })
);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);