import { Button, Col, Input, Row } from "reactstrap";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { MdSaveAlt } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import Mermaid from "../../../components/Mermaid/Index";
import useClipboard from "../../../hooks/useClipboard";
import { useHook } from "./store";

const ButtonSet = () => {
  const { handleSubmit, resetRes, generate } = useHook();
  return (
    <div className="my-1">
      <Button color="danger" onClick={(e) => resetRes()}>
        <RiRefreshLine />
      </Button>
      <Button
        color="primary"
        onClick={(e) =>
          handleSubmit(e, (d) =>
            generate({ prompt: d.prompt, conversation: [] })
          )
        }
      >
        <BsArrowRight />
      </Button>
    </div>
  );
};

const Content = () => {
  const { prompts, prompt, savePrompt, res, dataModel, handleChange } =
    useHook();
  const { copyPlainTextToClipBoard } = useClipboard();
  return (
    <Row>
      <Col md={3}>
        {prompts.data?.map((d) => (
          <p key={d} className="mb-1">
            <Button onClick={(e) => copyPlainTextToClipBoard(d)}>
              <FiCopy />
            </Button>
            {d}
          </p>
        ))}
      </Col>
      <Col md={9}>
        <ButtonSet />
        <Row>
          <Col md={12}>
            {prompt && (
              <p className="chat-stripe-prompt">
                {prompt}
                <Button onClick={savePrompt}>
                  <MdSaveAlt />
                </Button>
              </p>
            )}
            <p className="chat-stripe-prompt">{res}</p>
          </Col>
          <Col md={12}>
            <Mermaid
              chart={`
            sequenceDiagram
            participant User
            participant System
            User->>System: Enter login credentials
            System->>System: Verify credentials
            alt Credentials are valid
                System->>User: Redirect to dashboard
            else Credentials are invalid
                System->>User: Display error message
            end
            `}
            />
          </Col>
        </Row>
        <Input
          placeholder="ask me something..."
          type="textarea"
          autoComplete="off"
          value={dataModel.prompt}
          onChange={(e) =>
            handleChange({
              field: "prompt",
              value: e.currentTarget.value,
            })
          }
        />
        <ButtonSet />
      </Col>
    </Row>
  );
};

export default Content;
