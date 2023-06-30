import classNames from "classnames";
import { Col, Container, Row } from "reactstrap";

export default function ChatStripe({ varient = "default", children }) {
  return (
    <div
      className={classNames("p-3 mb-2 chat-stripe", {
        "": varient === "standout",
        "": varient === "default",
      })}
    >
      <Container>
        <Row>
          <Col md="10" className="mx-auto">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
