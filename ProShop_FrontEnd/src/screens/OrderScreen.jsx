import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../store/orderApiSlice";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
  Image,
  Card,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import toast from "react-toastify";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOption",
          value: { "client-id": paypal.clientid, currency: "USD" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  return (
    <>
      {isLoading && (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        />
      )}
      {order && !isLoading && (
        <>
          <h1 className="my-5">Order ID : {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong>Adress: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    , {order.shippingAddress.postalCode} ,
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered && (
                    <p>Delivered at: {order.deliveredAt}</p>
                  )}
                  {!order.isDelivered && <p>Not delivered yet.</p>}
                </ListGroupItem>
                <ListGroupItem>
                  <h2>Payment</h2>

                  <strong>Payment Method: </strong>
                  {order.paymentMethod}
                  {order.isPaid ? (
                    <p>
                      <strong>Paid status: </strong> Paid
                    </p>
                  ) : (
                    <p>
                      <strong>Paid status: </strong>Not paid
                    </p>
                  )}

                  <ListGroup>
                    <h2>My Order</h2>
                    {order.orderItems.map((item, index) => {
                      return (
                        <ListGroupItem key={index}>
                          <Row>
                            <Col md={1}>
                              <img src={item.image} />
                            </Col>
                            <Col md={5}>
                              <Link to={`/products/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={2}>qty : {item.qty}</Col>
                            <Col md={4}>
                              {item.price} x {item.qty} = $
                              {item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="p-2">
                <h3>Order summary</h3>
                <hr />
                <div className="items-center px-4">
                  <p>
                    <strong>Price: </strong>${order.itemPrice}
                  </p>
                  <p>
                    <strong>Tax: </strong>${order.taxPrice}
                  </p>
                  <p>
                    <strong>Shipping: </strong>${order.shippingPrice}
                  </p>
                  <hr />
                  <p>
                    <strong>Total: </strong>${order.totalPrice}
                  </p>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
