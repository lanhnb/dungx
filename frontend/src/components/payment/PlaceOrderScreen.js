import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from './utils';
import { Store } from './Store';
import CheckoutSteps from './CheckOutStep';
import LoadingBox from './LoadingBox';
import { url, setHeaders } from '../api';
import { useSelector } from "react-redux";
import FormatPrice from '../FormatPrice';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  //reload for order

  const reloadCount = sessionStorage.getItem('reloadCount');
  if (reloadCount < 1) {
    sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    window.location.reload();
  } else {
    sessionStorage.removeItem('reloadCount');
  }

//end relaod

const [{ loading }, dispatch] = useReducer(reducer, {
  loading: false,
});

const { state, dispatch: ctxDispatch } = useContext(Store);
const { cart, userInfo } = state;
// const auth = useSelector((state) => state.auth);

const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
cart.itemsPrice = round2(
  cart.cartItems.reduce((a, c) => a + c.cartQuantity * c.price, 0)
);
cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
cart.taxPrice = round2(0.1 * cart.itemsPrice);
cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

const placeOrderHandler = async () => {
  try {
    dispatch({ type: 'CREATE_REQUEST' });

    const { data } = await Axios.post(`${url}/orders`,
      {

        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      },
      setHeaders()

    );
    console.log("co:", data)
    ctxDispatch({ type: 'CART_CLEAR' });
    dispatch({ type: 'CREATE_SUCCESS' });
    localStorage.removeItem('cartItems');
    navigate(`/order/${data._id}`);
  } catch (err) {
    dispatch({ type: 'CREATE_FAIL' });
    toast.error(getError(err));
    console.log(getError(err))
  }
};

useEffect(() => {
  if (!cart.paymentMethod) {
    navigate('/payment');
  }
}, [cart, navigate]);

return (
  <div id='home11'>
    <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <Helmet>
      <title>Preview Order</title>
    </Helmet>
    <h1 className="my-3">Preview Order</h1>
    <Row>
      <Col md={8}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Shipping</Card.Title>
            <Card.Text>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}<br />
              <strong>PhoneNumber:{cart.shippingAddress.phoneN} </strong>
            </Card.Text>
            <Link to="/shipping">Edit</Link>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Payment</Card.Title>
            <Card.Text>
              <strong>Method:</strong> {cart.paymentMethod}
            </Card.Text>
            <Link to="/payment">Edit</Link>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Items</Card.Title>
            <ListGroup variant="flush">
              {cart.cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img style={{ width: '100px' }}
                        src={item.image[0]?.url}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <span>{item.cartQuantity}</span>
                    </Col>
                    <Col md={3}><FormatPrice price={item.price} /></Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Link to="/cart">Edit</Link>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col><FormatPrice price={cart.itemsPrice.toFixed(2)} /></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col><FormatPrice price={cart.shippingPrice.toFixed(2)} /></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col><FormatPrice price={cart.taxPrice.toFixed(2)} /></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong> Order Total</strong>
                  </Col>
                  <Col>
                    <strong><FormatPrice price={cart.totalPrice.toFixed(2)} /></strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                </div>
                {loading && <LoadingBox></LoadingBox>}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <div className="khoang" style={{ "height": "250px" }}>
    </div>
  </div>
);
}
