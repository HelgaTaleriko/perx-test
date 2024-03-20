import {createSlice} from "@reduxjs/toolkit";
import {fetchGoodsAsync} from "../../utils/fetchGoodsAsync";

export const goodsSlice = createSlice({

    name: 'goods',
    initialState: {items: [], status: 'idle', error: null as string | null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoodsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGoodsAsync.fulfilled, (state, action: any) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchGoodsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
});
