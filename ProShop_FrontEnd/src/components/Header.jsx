import React from "react";

import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

import logo from "../assets/logo.png";

const Header = () => {
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
                  <NavLink>Cart</NavLink>
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
