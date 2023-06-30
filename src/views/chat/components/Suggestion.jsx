import classNames from "classnames";
import { Button, Col, Modal, ModalBody } from "reactstrap";
import React from "react";
import useDualStateController from "../../../hooks/useDualStateController";
import { useMainLayout } from "../../../layouts/main/store";
import { toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";
import { CgCloseO } from "react-icons/cg";
import ReactMarkdown from "react-markdown";

const commonSuggestions = `
> Limitations: Due to the tokens used per conversation, I may begin to respond to you with blank answers.
If this occurs, please start a new conversation and select this hat again.
The diagrams and visuals I provide may be limited.
`;

const Suggestion = ({ propmtData, sequenceNumber = 0 }) => {
  const { isOpen: isModalOpen, toggle: toggleModal } = useDualStateController();
  const { chageBot } = useMainLayout();
  return (
    <React.Fragment>
      <Col md={4}>
        <div
          onClick={toggleModal}
          className={classNames("", {
            "tile-success": sequenceNumber === 2,
            "tile-danger": sequenceNumber === 3,
            "tile-info": sequenceNumber === 4,
            "tile-warning": sequenceNumber === 5,
            "tile-primary": sequenceNumber === 0,
            "tile-primary": sequenceNumber === 1,
          })}
        >
          <div className="icon-container">
            <h3>{propmtData.icon}</h3>
          </div>
          <p className="white-space-prewrap mt-2">{propmtData.name}</p>
        </div>
      </Col>
      <Modal isOpen={isModalOpen} centered toggle={toggleModal}>
        <ModalBody>
          <h4 className="mb-2">
            {propmtData.icon} {propmtData.name}
          </h4>
          <ReactMarkdown>
            {propmtData.description + commonSuggestions}
          </ReactMarkdown>{" "}
          <div className="mt-2">
            <Button onClick={toggleModal} outline color="danger">
              <CgCloseO /> Close
            </Button>
            <Button
              onClick={() => {
                chageBot(propmtData);
                toggleModal();
                toast.success("Activated " + propmtData.name);
              }}
              outline
              color="primary"
            >
              <FiCheckCircle /> Activate hat
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Suggestion;
