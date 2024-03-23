import React from 'react';
import './Cart.css';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { cartSlice } from '../../redux/cart/slice';
import Title from 'antd/lib/typography/Title';
import { Button } from 'antd';
import { CartIsEmpty } from './CartIsEmty/CartIsEmty';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state: RootState) => state.cart);

  const handleRemoveFromCart = (itemId: any) => {
    dispatch(cartSlice.actions.removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId: any, quantity: number) => {
    if (quantity === 0) {
      dispatch(cartSlice.actions.removeFromCart(itemId));
    } else {
      dispatch(cartSlice.actions.updateQuantity({ id: itemId, quantity }));
    }
  };

  return (
    <div className='cart'>
      <Title className='cart__title' level={1}>
        Корзина
      </Title>
      {items.length === 0 ? (
        <CartIsEmpty />
      ) : (
        <div className='cart__wrapper'>
          <ul>
            <li>
              {items.map((item: any) => (
                <div className='cart__item' key={item.id}>
                  <h3>{item.name}</h3>
                  <div className='cart__button'>
                    <p>{item.price}$</p>
                    <Button
                      size={'small'}
                      icon={<MinusOutlined />}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    ></Button>
                    <span>{item.quantity}</span>
                    <Button
                      size={'small'}
                      icon={<PlusOutlined />}
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    ></Button>
                    <Button
                      size={'small'}
                      icon={<CloseOutlined />}
                      onClick={() => {
                        handleRemoveFromCart(item.id);
                      }}
                    ></Button>
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
