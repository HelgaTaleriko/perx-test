import './CartIsEmty.css';
import { Link } from 'react-router-dom';
import React from 'react';

export const CartIsEmpty = () => {
  return (
    <>
      <div className='cart-is-empty'>
        <p>Ваша корзина пуста</p>
        <Link className='link' to='/'>
          Вернуться в список товаров
        </Link>
      </div>
    </>
  );
};
