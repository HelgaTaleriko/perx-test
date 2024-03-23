import React, { useEffect } from 'react';
import './GoodsList.css';
import { API_BASE_URL } from '../../App';
import {
  type RootState,
  useAppDispatch,
  useAppSelector,
} from '../../redux/store';
import { fetchGoodsAsync } from '../../utils/fetchGoodsAsync';
import { cartSlice } from '../../redux/cart/slice';
import { Button } from 'antd';
import { Preloader } from './Preloader/Preloader';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export const GoodsList = () => {
  const dispatch = useAppDispatch();
  const { status, error, items } = useAppSelector(
    (state: RootState) => state.goods,
  );
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    void dispatch(fetchGoodsAsync([]));
  }, [dispatch]);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'failed') {
    return <div className='error'>Error: {error}</div>;
  }

  const handleAddToCart = (item: any) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem && cartItem.quantity === 0) {
      return; // Не добавлять товар с количеством 0 в корзину
    }
    dispatch(cartSlice.actions.addToCart({ ...item, quantity: 1 }));
  };
  const handleRemoveFromCart = (itemId: any) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === itemId);
    if (cartItem && cartItem.quantity === 1) {
      dispatch(cartSlice.actions.removeFromCart(itemId));
    } else if (cartItem && cartItem.quantity > 1) {
      dispatch(
        cartSlice.actions.updateQuantity({
          id: itemId,
          quantity: cartItem.quantity - 1,
        }),
      );
    }
  };

  const getQuantityForItem = (itemId: string) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem != null ? cartItem.quantity : 0;
  };

  return (
    <>
      <h3 className='goods-list__title'>Список товаров</h3>
      <div className='goods-list'>
        <div className='goods-list__wrapper'>
          {items.map((item: any) => (
            <div className='goods-list__item' key={item.id}>
              <img src={`${API_BASE_URL}/${item.image}`} alt={item.title} />
              <div className='goods-list__item__wrapper'>
                <h4 className='goods-list__item__title'>{item.name}</h4>
                <p>{item.price}$</p>
                <div className='goods-list__item__button'>
                  <Button
                    size={'small'}
                    icon={<MinusOutlined />}
                    onClick={() => {
                      handleRemoveFromCart(item.id);
                    }}
                  ></Button>
                  <span className='quantity-display'>
                    {getQuantityForItem(item.id)}
                  </span>
                  <Button
                    size={'small'}
                    onClick={() => {
                      handleAddToCart(item);
                    }}
                    icon={<PlusOutlined />}
                  ></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
