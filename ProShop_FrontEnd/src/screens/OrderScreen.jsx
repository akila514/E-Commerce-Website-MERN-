import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../store/orderApiSlice";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Spinner,
  Image,
  Card,
} from "react-bootstrap";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

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
