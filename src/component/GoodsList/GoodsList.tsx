import React, {useEffect} from "react";
import {API_BASE_URL} from "../../App";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchGoodsAsync} from "../../utils/fetchGoodsAsync";
import {cartSlice} from "../../redux/cart/slice";
import {Button} from "antd";
import { Typography } from 'antd'
const { Title } = Typography;


export const GoodsList = () => {
    const dispatch = useAppDispatch();
    const {status, error, items} = useAppSelector((state: RootState) => state.goods);
    const cartItems = useAppSelector((state: RootState) => state.cart.items);

    useEffect(() => {
        dispatch(fetchGoodsAsync([]));
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleAddToCart = (item: any) => {
        dispatch(cartSlice.actions.addToCart({...item, quantity: 1}));
    };
    const handleRemoveFromCart = (itemId: string) => {
        const cartItem = cartItems.find((item) => item.id === itemId);
        if (cartItem && cartItem.quantity > 0) {
            dispatch(cartSlice.actions.updateQuantity({ id: itemId, quantity: cartItem.quantity - 1 }));
        }
    };

    const getQuantityForItem = (itemId: string) => {
        const cartItem = cartItems.find((item) => item.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <>
            <Title level={1} className='goods-list__title'>Список товаров</Title>
            <div className='goods-list'>
                {items.map((item: any) => (
                    <div className='goods-list__item' key={item.id}>
                        <img src={`${API_BASE_URL}/${item.image}`} alt={item.title}/>
                        <div className='goods-list__item__wrapper'>
                            <Title level={3}>{item.name}</Title>
                            <p>{item.price}$</p>
                            <div className='goods-list__item__button'>
                                <Button onClick={() => handleAddToCart(item)}>
                                    В корзину
                                </Button>
                                <Button onClick={() => handleRemoveFromCart(item.id)}>
                                    Убрать один товар из корзины
                                </Button>
                                <div className='quantity-display'>
                                    Товаров в корзине: {getQuantityForItem(item.id)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};