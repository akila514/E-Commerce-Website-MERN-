import React, { useEffect, useState } from "react";

import { Navbar, Nav, Container, NavLink, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../store/userApiSlice";
import { authActions } from "../store/authSlice";

const Header = () => {
  const products = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(authActions.logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
                    {products.length > 0 && (
                      <span className="ml-2 rounded-full px-3 text-sm py-1 bg-gray-600 text-white">
                        {products.reduce(
                          (a, curruntItem) => a + curruntItem.qty,
                          0
                        )}
                      </span>
                    )}
                  </NavLink>
                </LinkContainer>
              </div>
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-400" />
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <NavLink>Login</NavLink>
                  </LinkContainer>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
