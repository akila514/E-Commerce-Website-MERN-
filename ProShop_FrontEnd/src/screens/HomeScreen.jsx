import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../store/productsAppSlice";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <h1>Latest Products</h1>
      {isLoading && (
        <p className="mt-10 text-lg text-center font-bold">Loading...</p>
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
