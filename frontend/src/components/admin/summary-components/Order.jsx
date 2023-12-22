import { Outlet, useNavigate } from "react-router-dom";
import OrderList from "../list/Orderlist";


const Orders = () => {
  const navigate = useNavigate();
  

  return (
    <>
     <OrderList/>
     <Outlet />
      
    </>
  );
};

export default Orders;