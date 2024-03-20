import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {API_BASE_URL} from "../../App";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {cartSlice} from "../../redux/cart/slice";

export const Cart = () => {
    const dispatch = useAppDispatch();
    const {items, total} = useAppSelector((state: RootState) => state.cart);

    const handleRemoveFromCart = (itemId: any) => {
        dispatch(cartSlice.actions.removeFromCart(itemId));
    };

    const handleUpdateQuantity = (itemId: any, quantity: number) => {
        dispatch(cartSlice.actions.updateQuantity({id: itemId, quantity}));
    };

    return (
        <div>
            <h2>Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {items.map((item: any) => (
                        <div key={item.id}>
                            <img src={`${API_BASE_URL}/${item.image}`} alt={item.title}/>
                            <h3>{item.title}</h3>
                            <p>{item.price}$</p>
                            <div>
                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <p>Total: {total.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};