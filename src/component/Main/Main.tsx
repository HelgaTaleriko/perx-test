import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { GoodsList } from '../GoodsList/GoodsList';
import { Cart } from '../Cart/Cart';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchGoodsAsync } from '../../utils/fetchGoodsAsync';

export const Main = ({ dealerIds }: { dealerIds: string[] }) => {
  const dispatch = useAppDispatch();
  const cartTotal = useAppSelector((state: RootState) => state.cart.total);

  useEffect(() => {
    dispatch(fetchGoodsAsync(dealerIds));
  }, []);

  return (
    <BrowserRouter>
      <Header cartTotal={cartTotal >= 0 ? cartTotal : 0} />
      <div className='main'>
        <Routes>
          <Route path='/' element={<GoodsList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
