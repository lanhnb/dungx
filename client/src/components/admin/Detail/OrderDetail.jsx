import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { setHeaders, url } from '../../slices/api';
import styled from '@emotion/styled';
import PrintThisComponent from "../../payment/print"

const OrdersDetail = () => {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );
        setOrder(res.data);
        setLoading(false);

      } catch (err) {
        console.log(err)
      }
    };
    fetchOrder();
  }, [params.id]);
  return (
    <div id='home11'>
      <StyledOrder>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <>
            <OrderContainer>
              <h4> order Id:{order._id} </h4>
              <p className='w3 d-flex'>
                Delivery status:{" "}
                {order.isDelivered === "pending" ? (
                  <Pending>Pending</Pending>
                ) : order.isDelivered === true ? (
                  <Dispathched>Dispatched</Dispathched>
                ) : order.isDelivered === false ? (
                  <Delivered>Delivery</Delivered>
                ) : ("error")}
              </p>
              <h3> Ordered Product</h3>
              <Items>
                <>
                  {order.orderItems?.map((item) => (

                    <Item key={item._id} >
                      <span>Name: {item.name}</span>
                      <span>Price: {"$" + (item.price)?.toLocaleString()}</span>
                     

                    </Item>
                  ))}
                  <div>
                    <h3> Total Price: {"$" + (order.totalPrice)?.toLocaleString()}</h3>

                  </div>
                </>
              </Items>

              <div>
                <h3> Shipping Details</h3>
                <p> Customer: {order.shippingAddress?.fullName}</p>
                <p> City: {order.shippingAddress?.city}</p>
                <p> Country: {order.shippingAddress?.country}</p>
                <p> PaymentMethod: {order.paymentMethod}</p>
                <p><b> Phone: {order.shippingAddress?.phoneN}</b></p>
              </div>
            </OrderContainer>

            <PrintThisComponent/>

          </>
        )}
      </StyledOrder>
    </div>
  )


};

export default OrdersDetail;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3{
    margin: 1.5rem 0 0.5rem 0;
  }
`;


const Pending = styled.div`
background-color: rgb(114, 255, 40);
`;

const OrderContainer = styled.div`
max-width: 500px;
width: 100%;
height: auto;
color: grb(253, 181, 40);
box-shadow: rgb(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 5px;
padding: 2rem;
`;
const Dispathched = styled.div`
color: grb(255, 64, 0);
background-color: rgb(255, 64, 0, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`;
const Delivered = styled.div`
color: grb(38, 198, 249);
background-color: rgb(38, 198, 249, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`;

const Item = styled.div`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Items = styled.div`
  span{
    margin-right:1.5rem;
    &:first-child{
      font-weight: bold;
    }
  }
`;






