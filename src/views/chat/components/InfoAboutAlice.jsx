import classNames from "classnames";
import { Button, Col, Modal, ModalBody } from "reactstrap";
import React from "react";
import { CgInfo, CgClose } from "react-icons/cg";
import ReactMarkdown from "react-markdown";
import useDualStateController from "../../../hooks/useDualStateController";

const naratives = `
## **Version:** v1.0.1 (June 19, 2023)

Alice the AI bot was created with the aim of helping individuals and businesses stay compliant with ISO and regulatory standards.
Compliance with these standards is crucial for businesses to operate efficiently and effectively,
with failure to comply potentially resulting in significant financial and reputational damage.
Alice the AI bot can help businesses reduce the time taken to create policies and processes,
as well as the time taken to complete tasks. This is achieved through the use of advanced machine learning algorithms 
that enable Alice to learn from past interactions and provide personalised reccomandations to users.
By automating compliance related tasks, Alice the AI bot can help businesses save time and resources,
allowing them to focus on their core business activities. Overall, Alice the AI bot is a powerful tool
that helps businesses stay compliant, reduce costs and improve operational efficiency.

## Enhancement pipeline

- Bid writer hat.
- Build custom hats.



`;

const InfoAboutAlice = ({}) => {
  const { isOpen: isModalOpen, toggle: toggleModal } = useDualStateController();
  return (
    <React.Fragment>
      <Col md={4}>
        <div onClick={toggleModal} className={classNames("tile-primary")}>
          <div className="icon-container">
            <h3>
              <CgInfo />
            </h3>
          </div>
          <p className="white-space-prewrap mt-2">Information</p>
        </div>
      </Col>
      <Modal isOpen={isModalOpen} centered toggle={toggleModal}>
        <ModalBody>
          <h4 className="mb-2">
            <CgInfo /> Information
          </h4>
          <ReactMarkdown>{naratives}</ReactMarkdown>{" "}
          <div className="mt-2">
            <Button onClick={toggleModal} outline color="danger">
              <CgClose /> Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InfoAboutAlice;
