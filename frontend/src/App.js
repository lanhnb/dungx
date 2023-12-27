
import { ThemeProvider } from 'styled-components';
import './App.css';

import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
/* The following line can be included in a src/App.scss */


import SingleProduct from "./components/SingleProduct"
import SingleXkld from "./components/SingleXkld"
import SingleNhadat from "./components/SingleNhadat"
import OrderXkld from './components/xkldOrder/orDerxkld';
import { GlobalStyle } from './GlobalStyle';

import Header from './components/Header';
import Home from "./components/Home";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Contact from './components/Contact';

import Dashboard from "./components/admin/summary-components/Dashboard";
// import Product from "./components/admin/Detail/Product";
import Users from "./components/admin/summary-components/Users";

import Summary from "./components/admin/summary-components/Summary";
import CreateProduct from "./components/admin/summary-components/CreateProduct";
import CreateXkld from "./components/admin/summary-components/CreateXkld";
import CreateNhadat from "./components/admin/summary-components/CreateNhadat";
import ProductsList from "./components/admin/list/Productslist";
import NhadatsList from "./components/admin/list/Nhadatslist";
import XkldsList from "./components/admin/list/Xkldslist";

import UsersProfileUpdate from "./components/admin/Detail/UserProfileUpdate";
import ProductDetail from "./components/admin/Detail/ProductDetail";
import Products from "./components/admin/summary-components/Products";
import Xklds from "./components/admin/summary-components/Xklds";
import XkldScreen from './components/XkldScreen';
import NhadatScreen from './components/NhadatScreen';
import Nhadats from "./components/admin/summary-components/Nhadats";
import Orders from "./components/admin/summary-components/Order";
import Ordersx from "./components/admin/summary-components/Orderx";
import Comment from "./components/admin/summary-components/Comment";
import ContactA from "./components/admin/summary-components/ContactA";
import OrdersDetail from "./components/admin/Detail/OrderDetail";
import OrderScreen from './components/payment/OrderScreen';
import OrderList from "./components/admin/list/Orderlist";
import OrderxList from './components/admin/list/Orderxlist'
import ContactList from "./components/admin/list/Contactlist"
import CommentList from "./components/admin/list/Commentlist";

import OrderListScreen from './components/payment/OrderListScreen';

import Foots from "./components/foot";
import Productss from './components/Products';
import CheckoutSuccess from "./components/payment/CheckOutSucces";
import ShippingAddressScreen from "./components/payment/ShipingAdressScreen"

import PaymentMethodScreen from './components/payment/PaymentMethodScreen';
import PlaceOrderScreen from './components/payment/PlaceOrderScreen';





const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29, 29, 29, 0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "10px 10px 5px lightblue",
      shadowSupport: "rgba(0, 0, 0, 0.16) 0px 1px 4 px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },

  };



  return (


    <ThemeProvider theme={theme}>

      <Router>
        <GlobalStyle />
        <Header />

        <ToastContainer />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/xklds" element={<XkldScreen />} />
          <Route path='/nhadats' element={<NhadatScreen/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Productss />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/singlexkld/:id" element={<SingleXkld />} />
          <Route path='/singlenhadat/:id' element={<SingleNhadat/>}/>
          <Route path="/orderx/:id" element={<OrderXkld />} />
          <Route path="/comment/:id" element={<OrderXkld />} />
          <Route path="/productdetail/:id" element={<ProductDetail />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}

          <Route path="/users/:id" element={<UsersProfileUpdate />} />
          
          <Route path="/admin" element={<Dashboard />}>
            <Route path="summary" element={<Summary />} />
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>

            <Route path="xklds" element={<Xklds />}>
              <Route index element={<XkldsList />} />
              <Route path="create-xkld" element={<CreateXkld/>} />
            </Route>

            <Route path="nhadats" element={<Nhadats />}>
              <Route index element={<NhadatsList />} />
              <Route path="create-nhadat" element={<CreateNhadat/>} />
            </Route>
            <Route path="contact" element={<ContactA />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route index element={<OrderList />} />
            <Route path="ordersx" element={<Ordersx />} />
            <Route index element={<OrderxList />} />
            <Route path="comment" element={<Comment />} />
            <Route index element={<CommentList />} />

            {/* <Route path='orders' element={<OrderListScreen/>} /> */}
          </Route>
          <Route path="/shipping" element={<ShippingAddressScreen />}
          ></Route>

         
          <Route path="/payment" element={<PaymentMethodScreen />}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route path="/orders/:id" element={<OrdersDetail />} />



        </Routes>
        <Foots />

      </Router>
    </ThemeProvider>

  )

}
export default App;
