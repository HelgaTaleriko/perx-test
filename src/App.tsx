import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createAsyncThunk, createSlice, configureStore} from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import ReactDOM from "react-dom";
import { useDispatch, useSelector} from 'react-redux'

// Define API endpoints
const API_BASE_URL = 'https://test-frontend.dev.int.perx.ru';

const fetchGoodsAsync = createAsyncThunk<string[], string[]>(
    'goods/fetchGoods',
    async (dealers: string[] = [''], {dispatch}) => {
        try {
            const url = dealers.length ? `${API_BASE_URL}/api/goods/?dealers=${dealers.join(',')}` : `${API_BASE_URL}/api/goods/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch goods');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);


const fetchDealers = async () => {
  const url = `${API_BASE_URL}/api/dealers/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch dealers');
  }
  return response.json();
};

// Redux slice for managing goods
const goodsSlice = createSlice({

  name: 'goods',
  initialState: { items: [], status: 'idle', error: null as string|null },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchGoodsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGoodsAsync.fulfilled, (state, action:any) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchGoodsAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message|| 'Unknown error';
        });
  },
});

// Redux slice for managing cart
const cartSlice = createSlice({

  name: 'cart',
      initialState: { items: [] as { id: string, quantity: number, price: number, image: string }[], total: 0 },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.total -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        state.total -= item.price * item.quantity;
        item.quantity = action.payload.quantity;
        state.total += item.price * item.quantity;
      }
    },
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
// Create Redux store
const store = configureStore({
  reducer: {
    goods: goodsSlice.reducer,
    cart: cartSlice.reducer,
  },
});



// React component for displaying the list of goods
const GoodsList = () => {
  const dispatch = useAppDispatch();

  const { status, error, items } = useAppSelector((state: RootState) => state.goods);

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
        {items.map((item:any) => (
            <div key={item.id}>
              <img src={`${API_BASE_URL}/${item.image}`} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.price}</p>
              <button onClick={() => dispatch(cartSlice.actions.addToCart({ ...item, quantity: 1 }))}>
                Add to Cart
              </button>
            </div>
        ))}
      </div>
  );
};

// React component for displaying the cart
const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state:RootState) => state.cart);

  const handleRemoveFromCart = (itemId:any) => {
    dispatch(cartSlice.actions.removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId:any, quantity:any) => {
    dispatch(cartSlice.actions.updateQuantity({ id: itemId, quantity }));
  };

  return (
      <div>
        <h2>Cart</h2>
        {items.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div>
              {items.map((item:any) => (
                  <div key={item.id}>
                    <img src={`${API_BASE_URL}/${item.image}`} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                    />
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </div>
              ))}
              <p>Total: {total}</p>
            </div>
        )}
      </div>
  );
};

// Initialize React Query
const queryClient = new QueryClient();

// Main app component
const App = ({ dealerIds }: {dealerIds: string[]}) => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchGoodsAsync(dealerIds));
    },[])
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
            <Route path="/" element={<GoodsList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
};

// Entry point of the application
const startApp = (options:any) => {
  // Fetch the list of dealers
  fetchDealers()
      .then((dealers) => {
        const filteredDealers = options && options.dealers ? dealers.filter((dealer:any) => options.dealers.includes(dealer)) : dealers;
        const dealerIds = filteredDealers.map((dealer:any) => dealer.id);

        // Pre-fetch goods from the filtered dealers


        // Render the app
        ReactDOM.render(
            <React.StrictMode>
              <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                  <App dealerIds={dealerIds}/>
                </Provider>
              </QueryClientProvider>
            </React.StrictMode>,
            document.getElementById('app-root')
        );
      })
      .catch((error) => {
        console.error('Failed to fetch dealers', error);
      });
};

// Start the app when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  startApp({ dealers: ['id1', 'id2'] });
});

export default startApp;