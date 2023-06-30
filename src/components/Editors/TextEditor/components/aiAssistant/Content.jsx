import { Button, Input, InputGroup } from "reactstrap";
import React from "react";
import { BsSend } from "react-icons/bs";
import ChatInput from "../../../../Chat/ChatInput";
const Content = () => {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
      }}
      className=""
    >
      <InputGroup>
        <Input placeholder="Beutify this text" />
        <Button color="primary">
          <BsSend />
        </Button>
      </InputGroup>
    </div>
  );
};

export default Content;
