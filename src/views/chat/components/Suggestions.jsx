import { Col, Container, Row, UncontrolledAlert } from "reactstrap";
import React from "react";
import { DEFAULT_PROMPTS } from "../../../constants";
import Suggestion from "./Suggestion";
import { useChatUIManager } from "./uiStore";
import InfoAboutAlice from "./InfoAboutAlice";
const Suggestions = () => {
  const {} = useChatUIManager();
  return (
    <Container className="suggestion-tiles">
      <Row className="mt-5">
        <Col md="8" className="mx-auto mt-4">
          <UncontrolledAlert color="primary">
            *I am your day to day chat AI assistant. Ask me anything for help.*
          </UncontrolledAlert>
        </Col>
        {/* <Col id="chat-suggestions" md={8} className="mx-auto">
          <Row>
            {Object.keys(DEFAULT_PROMPTS)
              .filter((key) => key !== "DEFAULT")
              .map((key, index) => {
                let sequenceNumber = (index + 1) % 6;
                return (
                  <Suggestion
                    key={key}
                    sequenceNumber={sequenceNumber}
                    propmtData={DEFAULT_PROMPTS[key]}
                  />
                );
              })}
            <InfoAboutAlice />
          </Row>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Suggestions;
