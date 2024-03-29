import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom';
import { Main } from './component/Main/Main';
import { fetchDealers } from './utils/fetchDealers';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

// Define API endpoints

export const API_BASE_URL = 'https://test-frontend.dev.int.perx.ru';

// Initialize React Query
const queryClient = new QueryClient();

const App = (options: any) => {
  // Fetch the list of dealers
  fetchDealers()
    .then((dealers) => {
      const filteredDealers =
        options && options.dealers
          ? dealers.filter((dealer: any) => options.dealers.includes(dealer))
          : dealers;
      const dealerIds = filteredDealers.map((dealer: any) => dealer.id);

      // Render the app
      ReactDOM.render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Main dealerIds={dealerIds} />
              </PersistGate>
            </Provider>
          </QueryClientProvider>
        </React.StrictMode>,
        document.getElementById('app-root'),
      );
    })
    .catch((error) => {
      console.error('Failed to fetch dealers', error);
    });
};

// Start the app when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  App({ dealers: ['id1', 'id2'] });
});

export default App;
