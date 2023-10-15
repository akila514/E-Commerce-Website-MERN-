import React, { useEffect, useState } from "react";

import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Header = () => {
  const products = useSelector((state) => state.cart.cartItems);
  let total = 0;
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  useEffect(() => {
    for (const item of products) {
      total += Number(item.qty);
    }
    setNumOfCartItems(total);
  }, [products]);

  return (
    <header>
      <Navbar
        variant="dark"
        expand="md"
        collapseOnSelect
        className="bg-[#1f1f1f]"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <div className="flex items-center justify-center">
                <img src={logo} alt="" className="mr-2 object-contain h-10" />
                <p className="text-2xl flex my-auto font-bold text-gray-300">
                  Proshop
                </p>
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto md:space-x-5">
              <div className="flex items-center space-x-2">
                <FaShoppingCart className="text-gray-400" />
                <LinkContainer to="/cart">
                  <NavLink>
                    Cart
                    <span className="ml-2 rounded-full px-3 text-sm py-1 bg-gray-600 text-white">
                      {numOfCartItems}
                    </span>
                  </NavLink>
                </LinkContainer>
              </div>
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-400" />
                <LinkContainer to="/login">
                  <NavLink>Login</NavLink>
                </LinkContainer>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
