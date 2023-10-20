import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Col, Form, FormCheck, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cartSlice";

const PaymetsScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Checout Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <FormLabel as="legend">Select Method</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              className="my-2"
              id="PayPal"
              label={paymentMethod}
              name="paymentsMethod"
              value="PayPal"
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></FormCheck>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymetsScreen;
