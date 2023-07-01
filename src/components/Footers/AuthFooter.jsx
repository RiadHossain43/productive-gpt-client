import React from "react";

// reactstrap components
import { Container, Row, Col } from "react-grid-system";

const Login = () => {
  return (
    <Container>
      <footer className="py-5">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="12">
            <div className="copyright text-center text-xl-left text-muted">
              © {new Date().getFullYear()}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://freetoolsapp.com"
              >
                iMS Systems
              </a>{" "}
              all rights reserved
            </div>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default Login;
