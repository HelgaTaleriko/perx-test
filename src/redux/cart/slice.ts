import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {items: [] as { id: string, quantity: number, price: number, image: string }[], total: 0},
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.total += action.payload.price * action.payload.quantity;
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.total -= item.price * item.quantity;
                state.items.splice(itemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                state.total -= item.price * item.quantity;
                item.quantity = action.payload.quantity;
                state.total += item.price * item.quantity;
            }
        },
    },
});
