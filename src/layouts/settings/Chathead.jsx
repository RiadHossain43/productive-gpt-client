import { Button } from "reactstrap";
import React from "react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import useDualStateController from "../../hooks/useDualStateController";
import { useMainLayout } from "./store";
import { timePassedSince } from "../../utils/timePassedSince";
const Chathead = ({ chathead }) => {
  let navigate = useNavigate();
  let { isOpen: _isHovering, toggle: _toggleHovering } =
    useDualStateController();
  let { deleteChathead, activeChathead } = useMainLayout();
  return (
    <MenuItem
      onMouseOver={_toggleHovering}
      onMouseOut={_toggleHovering}
      onClick={() => navigate("/chat/" + chathead._id)}
    >
      <React.Fragment>
        <span className="text-dark">{chathead.metaData?.name}</span>
        <br></br>
        <small>
          {chathead._id === activeChathead?._id
            ? "Live now"
            : chathead.metaData?.description}
        </small>
        <br></br>
        {
          /** we are not showing time if chat is currenttly active. */
          chathead._id !== activeChathead?._id && (
            <small>{timePassedSince(chathead.updatedAt)}</small>
          )
        }
        <br></br>
        {_isHovering && (
          <React.Fragment>
            {/* <Button
              size="sm"
              outline
              className="border-0"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RiEdit2Line />
            </Button>{" "} */}
            <Button
              size="sm"
              outline
              className="border-0"
              onClick={(e) => {
                e.stopPropagation();
                deleteChathead(chathead._id);
              }}
            >
              <RiDeleteBin6Line />
            </Button>{" "}
          </React.Fragment>
        )}
      </React.Fragment>
    </MenuItem>
  );
};

export default Chathead;
