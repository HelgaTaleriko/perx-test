import {useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {goodsSlice} from "./goods/slise";
import {cartSlice} from "./cart/slice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create Redux store
export const store = configureStore({
    reducer: {
        goods: goodsSlice.reducer,
        cart: cartSlice.reducer,
    },
});
