import React from "react";
import { CgCloseO } from "react-icons/cg";
import { HiXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { MenuItem, useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import useDualStateController from "../../hooks/useDualStateController";
import { timePassedSince } from "../../utils/timePassedSince";
import EditChatHeadName from "./EditChatHeadName";
import { useMainLayout } from "./store";

const DeleteConfirmation = ({ onConfirm = () => {}, onCancel = () => {} }) => {
  return (
    <React.Fragment>
      <span>
        <small>Are you sure ?</small>
      </span>
      <Button
        size="sm"
        color="success"
        className="ml-1 border-0 btn-simple"
        onClick={(e) => {
          e.stopPropagation();
          onConfirm(e);
        }}
      >
        <IoCheckmark />
      </Button>{" "}
      <Button
        size="sm"
        color="danger"
        className="border-0  btn-simple"
        onClick={(e) => {
          e.stopPropagation();
          onCancel(e);
        }}
      >
        <HiXMark />
      </Button>{" "}
    </React.Fragment>
  );
};

const Chathead = ({ chathead }) => {
  let navigate = useNavigate();
  let { isOpen: _isHovering, toggle: _toggleHovering } =
    useDualStateController();
  let { deleteChathead, activeChathead, updateChathead } = useMainLayout();
  const { toggleSidebar, broken } = useProSidebar();
  const { isOpen: isModalOpen, toggle: toggleModal } = useDualStateController();
  const { isOpen: isDeleteConfirmationOpen, toggle: toggleDeleteConfirmation } =
    useDualStateController();
  const _isActive = chathead._id === activeChathead?._id;
  return (
    <MenuItem
      onMouseOver={_toggleHovering}
      onMouseOut={_toggleHovering}
      onClick={() => {
        navigate("/chat/" + chathead._id);
        if (broken) {
          toggleSidebar();
        }
      }}
      rootStyles={
        {
          // ...(chathead._id === activeChathead?._id && {
          //   background: "#f6f8fa",
          // }),
        }
      }
    >
      <React.Fragment>
        <span className="">{chathead.metaData?.name}</span>
        <br></br>
        <small>{_isActive ? "Live now" : chathead.metaData?.description}</small>
        {
          /** we are not showing time if chat is currenttly active. */
          chathead._id !== activeChathead?._id && (
            <React.Fragment>
              <br></br>
              <small>{timePassedSince(chathead.updatedAt)}</small>
            </React.Fragment>
          )
        }
        <br></br>
        {isDeleteConfirmationOpen && (
          <DeleteConfirmation
            onConfirm={(e) => {
              e.stopPropagation();
              deleteChathead(chathead._id);
            }}
            onCancel={toggleDeleteConfirmation}
          />
        )}
        {_isHovering && (
          <React.Fragment>
            {!isDeleteConfirmationOpen && (
              <React.Fragment>
                <Button
                  size="sm"
                  color="primary"
                  className="border-0  btn-simple"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModal();
                  }}
                >
                  <RiEdit2Line />
                </Button>{" "}
                <Button
                  size="sm"
                  color="danger"
                  className="border-0  btn-simple"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDeleteConfirmation();
                  }}
                >
                  <RiDeleteBin6Line />
                </Button>{" "}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
      <Modal isOpen={isModalOpen} centered toggle={toggleModal}>
        <ModalBody>
          <EditChatHeadName
            data={{
              name: chathead?.metaData?.name,
            }}
            onSubmit={async (payload) => {
              await updateChathead(chathead?._id, {
                ...payload,
                description: chathead?.metaData?.description,
              });
              toggleModal();
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal} color="danger">
            <CgCloseO /> Close
          </Button>
        </ModalFooter>
      </Modal>
    </MenuItem>
  );
};

export default Chathead;
