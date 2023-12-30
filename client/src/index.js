import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './components/ProductContext';
import { FilterContextProvider } from "./components/FilterContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { StoreProvider } from './components/payment/Store';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import productsReducer, { productsFetch } from "./components/slices/productsSlice";
import xkldsReducer, { xkldsFetch } from "./components/slices/xkldsSlice";
import nhadatsReduce, { nhadatsFetch } from "./components/slices/nhadatsSlice"

import cartReducer, { getTotals } from "./components/slices/cartSlice";
import authReducer from "./components/slices/authSlice";
import { productsApi } from "./components/slices/productsApi";
import contactSlice from './components/slices/contactSlice';
import { xkldsApi } from "./components/slices/xkldsApi";
import { nhadatsApi } from "./components/slices/nhadatsApi";
import ordersSlice from "./components/slices/ordersSlice";
import commentSlice from './components/slices/commentSlice';
import ordersxSlice from "./components/slices/ordersxSlice";
import usersSlice from "./components/slices/usersSlice";
import { configureStore } from "@reduxjs/toolkit";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    products: productsReducer,
    xklds: xkldsReducer,
    orders: ordersSlice,
    ordersx: ordersxSlice,
    comment:commentSlice,
    users: usersSlice,
    contact: contactSlice,
    nhadats: nhadatsReduce,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [xkldsApi.reducerPath]: xkldsApi.reducer,
    [nhadatsApi.reducerPath]: nhadatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
store.dispatch(productsFetch());
store.dispatch(xkldsFetch());
store.dispatch(nhadatsFetch());
store.dispatch(getTotals());





root.render(



  <Provider store={store}>
    <StoreProvider>
      <AppProvider>
        <FilterContextProvider>
          <HelmetProvider>
            <PayPalScriptProvider >
              <App />
            </PayPalScriptProvider>
          </HelmetProvider>

        </FilterContextProvider>

      </AppProvider>

    </StoreProvider >
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
