import React from "react";
import { Button, Card, CardBody, CardText, Col, Row } from "reactstrap";
import Avatar from "components/Avatar/Avatar";
import moment from "moment";
const MetaInfo = (props) => {
  return (
    <Row>
      <Col md="5">
        <Button size="sm" className="btn-link">
          Share
        </Button>
        <Button size="sm" className="btn-link">
          Share
        </Button>
        <Button size="sm" className="btn-link">
          Watch
        </Button>
        <Button size="sm" className="btn-link">
          Flag
        </Button>
      </Col>
      <Col md="4"></Col>
      <Col md="3">
        <Card className="bg-secondary">
          <CardBody className="p-2">
            <CardText className="mb-2">
              <small>Asked {moment(props.askedAt).format("DD/MM/YYYY HH:MM")}</small>
            </CardText>
            <Avatar imageSrc="..." userName={props.userName} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
MetaInfo.defaultProps = {};

MetaInfo.propTypes = {};

export default MetaInfo;
