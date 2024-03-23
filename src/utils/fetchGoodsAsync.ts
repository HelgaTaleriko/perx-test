import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../App';

export const fetchGoodsAsync = createAsyncThunk<string[], string[]>(
  'goods/fetchGoods',
  async (dealers: string[] = [''], { dispatch }) => {
    try {
      const url = dealers.length
        ? `${API_BASE_URL}/api/goods/?dealers=${dealers.join(',')}`
        : `${API_BASE_URL}/api/goods/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch goods');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);
