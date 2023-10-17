import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Adderess</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email here."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password here."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" classname="my-3">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
