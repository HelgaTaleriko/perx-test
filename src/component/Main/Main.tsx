import React, {useEffect} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {GoodsList} from "../GoodsList/GoodsList";
import {Cart} from "../Cart/Cart";
import {useAppDispatch} from "../../redux/store";
import {fetchGoodsAsync} from "../../utils/fetchGoodsAsync";

export const Main = ({dealerIds}: { dealerIds: string[], }) => {


    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGoodsAsync(dealerIds));
    }, [])

    return (
        <BrowserRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Goods</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<GoodsList/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};