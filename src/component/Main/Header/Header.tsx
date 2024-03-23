import './Header.css';
import { Link } from 'react-router-dom';
import React from 'react';

type IProps = {
  cartTotal: number;
};
export const Header = ({ cartTotal }: IProps) => {
  return (
    <>
      <header className='header'>
        <ul>
          <li>
            <Link className='link' to='/'>
              Список товаров
            </Link>
          </li>
          <li>
            <Link className='link' to='/cart'>
              Корзина {cartTotal.toFixed(2)}$
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};
