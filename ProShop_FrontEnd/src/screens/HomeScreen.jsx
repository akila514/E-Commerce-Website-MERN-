import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../store/productsAppSlice";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading && (
        <div className="mt-10 h-screen">
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
        <Row>
          {products.map((product) => (
            <Col key={Math.random()} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
