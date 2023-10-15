import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container className="fixed bottom-0">
        <Row>
          <Col>Proshop &copy; {currentYear}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
