import { API_BASE_URL } from '../App';

export const fetchDealers = async () => {
  const url = `${API_BASE_URL}/api/dealers/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch dealers');
  }
  return response.json();
};
