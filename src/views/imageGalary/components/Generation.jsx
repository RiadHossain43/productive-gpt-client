import React from "react";
import { Col, Row } from "reactstrap";

const Generation = ({ generation }) => {
  console.log(generation)
  return (
    <Row>
      <Col md="12">{generation.prompt}</Col>
      {generation.generations.map((gen) => {
        return (
          <Col className="rounded" key={gen.url} md="4">
            <img width={"100%"} src={gen.url} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Generation;
