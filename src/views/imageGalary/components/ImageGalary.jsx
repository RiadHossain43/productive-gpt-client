import React from "react";
import { Container, Form, FormGroup, Input } from "reactstrap";
import Navigationbar from "./Navigationbar";
import PromptBox from "./PromptBox";
import Generation from "./Generation";
import { useImageGalary } from "./store";

const ImageGalary = () => {
  const { generateImage, generations } = useImageGalary();
  return (
    <React.Fragment>
      <Navigationbar />
      <Container className="my-5">
        <PromptBox onSubmit={generateImage} />
        {generations.map((generation) => {
          return <Generation key={Date.now()} generation={generation} />;
        })}
      </Container>
    </React.Fragment>
  );
};

export default ImageGalary;
