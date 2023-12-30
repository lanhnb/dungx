import { Outlet, useNavigate } from "react-router-dom";
import OrderxList from "../list/Orderxlist";


const Ordersx = () => {
  const navigate = useNavigate();
  

  return (
    <>
     <OrderxList/>
     <Outlet />
      
    </>
  );
};

export default Ordersx;