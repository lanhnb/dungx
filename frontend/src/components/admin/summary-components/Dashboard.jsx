import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUsers, FaChartBar, FaClipboard, FaStore, FaTachometerAlt, FaProductHunt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <div id="home11"><p>Access denied. Not an Admin!</p></div>;

  return (<>
    <Helmet><title>lanhnb.store-Dashboard</title></Helmet>
    <StyledDashboard>
      

        <div id="home11" className="w3-col m3 s3">
          <SideNav id="si1">
            <h3>Quick Links</h3>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/summary"
            >
              <FaTachometerAlt /> Summary
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/products"
            >
              <FaProductHunt /> Products
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/orders"
            >
              <FaStore />  Orders
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/users"
            >
              <FaUsers />  Users
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/xklds"
            >
              <FaStore />  Labor services
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/ordersx"
            >
              <FaStore />  OrdersX
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/comment"
            >
              <FaStore />  Comment
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/contact"
            >
              < FaUsers />  Contact
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "link-active" : "link-inactive"
              }
              to="/admin/nhadats"
            >
              <FaStore /> Real estates
            </NavLink>

          </SideNav>
        </div>

        <Content>
          <Outlet />
        </Content>
    

    </StyledDashboard>
    </>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`

#si1{
  display:flex;
}

  display: flex;
  height: 100vh;
}
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  
  
  overflow-y: auto;
  
  
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  
  padding: 2rem 3rem;
  width: 100%;
`;
