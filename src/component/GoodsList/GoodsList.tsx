import React, {useEffect} from "react";
import {API_BASE_URL} from "../../App";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchGoodsAsync} from "../../utils/fetchGoodsAsync";
import {cartSlice} from "../../redux/cart/slice";

export const GoodsList = () => {
    const dispatch = useAppDispatch();

    const {status, error, items} = useAppSelector((state: RootState) => state.goods);

    // Используйте тип AsyncThunkAction для fetchGoodsAsync
    useEffect(() => {
        dispatch(fetchGoodsAsync([]));
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Goods List</h2>
    {items.map((item: any) => (
        <div key={item.id}>
        <img src={`${API_BASE_URL}/${item.image}`} alt={item.title}/>
    <h3>{item.title}</h3>
    <p>{item.price}</p>
    <button onClick={() => dispatch(cartSlice.actions.addToCart({...item, quantity: 1}))}>
        Add to Cart
    </button>
    </div>
    ))}
    </div>
);
};
