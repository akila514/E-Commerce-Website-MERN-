import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justiy-content-center mb-4 space-x-4 text-center align-middle items-center justify-evenly text-lg">
      <NavItem>
        {step1 ? <NavLink to="login">Sign In</NavLink> : <a>Sign In</a>}
      </NavItem>

      <NavItem>
        {step2 ? <NavLink to="/shipping">Shipping</NavLink> : <a>Shipping</a>}
      </NavItem>

      <NavItem>
        {step3 ? <NavLink to="login">Payment</NavLink> : <a>Payment</a>}
      </NavItem>

      <NavItem>
        {step4 ? <NavLink to="login">Place Order</NavLink> : <a>Place Order</a>}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
