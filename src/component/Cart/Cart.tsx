import React from "react";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {cartSlice} from "../../redux/cart/slice";
import Title from "antd/lib/typography/Title";
import {Button} from "antd";

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
        <div className='cart'>
            <Title className='cart__title' level={1}>
                Корзина
            </Title>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='cart__wrapper'>
                    <ul>
                        <li>
                            {items.map((item: any) => (
                                <div className='cart__item' key={item.id}>
                                    <h3>{item.name}</h3>
                                    <div className='cart__button'>
                                        <p>{item.price}$</p>

                                        <Button size={"small"}
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+
                                        </Button>

                                        <span>{item.quantity}</span>
                                        <Button size={"small"}
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-
                                        </Button>
                                        <Button size={"small"} onClick={() => handleRemoveFromCart(item.id)}>
                                            Х
                                        </Button>


                                    </div>
                                </div>
                            ))}
                        </li>
                    </ul>
                    <p className='cart__total'>Итого: {total.toFixed(2)}$</p>
                </div>
            )}
        </div>
    );
};