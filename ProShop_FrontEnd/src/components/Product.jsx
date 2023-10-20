import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded-md">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title
            as="div"
            className="h-10 overflow-hidden truncate whitespace-nowrap"
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <div className="my-3">
          <Rating
            value={product.rating}
            text={`${product.numOfReviews} reviews`}
          />
        </div>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
