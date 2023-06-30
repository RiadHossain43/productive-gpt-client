import { Card, CardBody } from "reactstrap";
const MarketingSlide = ({ contents, title, imgSrc }) => {
  return (
    <Card className="h-100 rounded-3">
      <CardBody className="d-flex flex-column">
        <p className="flex-grow-1">
          <small>{contents}</small>
        </p>
        <div className="d-flex">
          <div className="flex-shrink-0 mr-2">
            <img src={imgSrc} alt="avatar" className="avatar" />
          </div>
          <p>
            <small>{title}</small>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MarketingSlide;
