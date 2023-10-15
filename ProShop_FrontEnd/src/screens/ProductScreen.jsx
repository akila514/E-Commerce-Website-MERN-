import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../store/productsAppSlice";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart(product));
  };

  const [qty, setQty] = useState(1);
  return (
    <>
      {isLoading && (
        <div className="mt-10">
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
        </div>
      )}
      {isError && (
        <div className="mt-10">
          <p className="text-xl font-bold text-center">Something went wrong</p>
          <p className="text-center">Please try again later.</p>
        </div>
      )}
      {!isError && !isLoading && (
        <>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product.image} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroupItem className="text-xl font-bold">
                  {product.name}
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroupItem>
                <ListGroupItem>${product.price}</ListGroupItem>
                <ListGroupItem className="leading-8">
                  {product.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (qty) => (
                                <option key={qty + 1} value={qty + 1}>
                                  {qty + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <button
                      onClick={addToCartHandler}
                      className="bg-gray-700 disabled:bg-gray-400 text-white hover:bg-gray-500 duration-150 py-2 px-5 rounded-md my-2"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
