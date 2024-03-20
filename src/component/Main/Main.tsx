import React, {useEffect} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {GoodsList} from "../GoodsList/GoodsList";
import {Cart} from "../Cart/Cart";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchGoodsAsync} from "../../utils/fetchGoodsAsync";

export const Main = ({dealerIds}: { dealerIds: string[] }) => {
    const dispatch = useAppDispatch();
    const cartTotal = useAppSelector((state: RootState) => state.cart.total);

    useEffect(() => {
        dispatch(fetchGoodsAsync(dealerIds));
    }, []);

    return (
        <BrowserRouter>
            <div className='main'>
                <header className='header'>
                    <ul>
                        <li>
                            <Link className='link' to="/">Список товаров</Link>
                        </li>
                        <li>
                            <Link className='link' to="/cart">Корзина ({cartTotal.toFixed(2)}$)</Link>
                        </li>
                    </ul>
                </header>

                <Routes>
                    <Route path="/" element={<GoodsList/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};