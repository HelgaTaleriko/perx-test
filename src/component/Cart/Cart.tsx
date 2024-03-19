import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {API_BASE_URL} from "../../App";
import {RootState} from "../../redux/store";
import {cartSlice} from "../../redux/cart/slice";

export const Cart = () => {

    const dispatch = useDispatch();
    const {items, total} = useSelector((state: RootState) => state.cart);

    const handleRemoveFromCart = (itemId: any) => {
        dispatch(cartSlice.actions.removeFromCart(itemId));
    };

    const handleUpdateQuantity = (itemId: any, quantity: any) => {
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
                            <p>{item.price}</p>
                            <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                            />
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <p>Total: {total}</p>
                </div>
            )}
        </div>
    );
};
