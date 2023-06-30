import { Card, CardBody } from "reactstrap";
const ChartPromptSlide = ({ chartType = "", prompts = [], imgSrc }) => {
  return (
    <Card className="rounded-3">
      <CardBody className="d-flex flex-column ">
        <div className="d-flex mb-2">
          <div className="flex-shrink-0 me-2 ">
            <img src={imgSrc} alt="avatar" className="avatar" />
          </div>
          <p className="white-space-prewrap">
            <small>{chartType}</small>
          </p>
        </div>
        <ul className="white-space-prewrap">
          {prompts.map((prompt, i) => (
            <li className="white-space-prewrap" key={prompt + i}>{prompt}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default ChartPromptSlide;
