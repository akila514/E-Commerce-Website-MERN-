import React from "react";
import {
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";
import { FaTrashAlt } from "react-icons/fa";

const CartScreen = () => {
  const cartDetails = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qtyChangeHandler = (product, qty) => {
    dispatch(
      cartActions.addToCart({ product: { ...product }, qty: Number(qty) })
    );
  };

  const removeFromCartHandler = (product) => {
    dispatch(cartActions.removeItemFromCart(product));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-10">Shopping Cart</h1>
        {products.length === 0 ? (
          <h1 className="text-center text-lg">Your cart is empty.</h1>
        ) : (
          <ListGroup variant="flush">
            {products.map((product) => (
              <ListGroupItem key={product._id}>
                <Row>
                  <Col md={2}>
                    <Image src={product.image} fluid rounded />
                  </Col>
                  <Col md={4} className="flex items-center">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {product.name}
                    </Link>
                  </Col>
                  <Col md={2} className="flex items-center">
                    <p className="text-center flex my-auto mx-auto">
                      ${product.price}
                    </p>
                  </Col>
                  <Col md={2} className="flex items-center">
                    <Form.Control
                      as="select"
                      value={product.qty}
                      onChange={(e) => {
                        qtyChangeHandler(product, e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((qty) => (
                        <option key={qty + 1} value={qty + 1}>
                          {qty + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} className="flex items-center">
                    <button
                      className="flex flex-row items-center mt-2 md:mt-0"
                      onClick={() => {
                        removeFromCartHandler(product);
                      }}
                    >
                      <FaTrashAlt
                        size={20}
                        className="hover:cursor-pointer sm:mt-5 flex my-auto mx-auto"
                      />
                      <span className="flex md:hidden ml-5 md:ml-0">
                        Delete
                      </span>
                    </button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Row className="drop-shadow-md rounded-xl p-5">
          <p className="text-xl font-bold">
            Subtotal ({products.reduce((acc, pro) => acc + pro.qty, 0)}) items
            available
          </p>
          <ListGroup variant="flush">
            <ListGroupItem>
              <span className="font-bold">Shipping :</span> $
              {cartDetails.shippingPrice}
            </ListGroupItem>
            <ListGroupItem>
              <span className="font-bold">Tax :</span> ${cartDetails.taxPrice}
            </ListGroupItem>
            <ListGroupItem>
              <span className="font-bold">Total payable :</span> $
              {cartDetails.totalPrice}
            </ListGroupItem>
            <ListGroupItem>
              <button
                className="bg-gray-700 rounded-lg text-white px-3 py-2 mt-10"
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </button>
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Col>
    </Row>
  );
};

export default CartScreen;
