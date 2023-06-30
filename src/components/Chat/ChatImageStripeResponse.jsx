import ChatStripe from "./ChatStripe";
import { MdContentCopy } from "react-icons/md";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiFillEdit,
} from "react-icons/ai";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { HiDotsHorizontal, HiLightBulb } from "react-icons/hi";
import MDFormatedResponse from "./MDFormatedResponse";
import useClipboard from "../../hooks/useClipboard";
import { BsStars, BsCheck } from "react-icons/bs";
import { CHAT_REACTIONS } from "../../constants";
import classNames from "classnames";
import { FiEdit } from "react-icons/fi";
import aliceAvatar from "../../assets/img/brand/alice-avatar.png";
import { toast } from "react-toastify";
const REACTION_MAP = {
  [CHAT_REACTIONS.EMPTY]: <AiOutlineLike />,
  [CHAT_REACTIONS.LIKE]: <AiFillLike />,
  [CHAT_REACTIONS.INSIGHTFUL]: <HiLightBulb />,
  [CHAT_REACTIONS.EXCELLENT]: <BsStars />,
  [CHAT_REACTIONS.DISLIKE]: <AiFillDislike />,
};
export default function ChatImageStripeResponse({
  isTyping = false,
  responseMessage = "",
  time,
  reaction = CHAT_REACTIONS.EMPTY,
  avatarSrc = aliceAvatar,
  onReact = () => {},
}) {
  let {
    copySuccess,
    contentElementReference,
    copyFormatedToClipboard,
    copyPlainTextToClipBoard,
  } = useClipboard();
  return (
    <ChatStripe varient="standout">
      <div className="d-flex">
        <div className="flex-shrink-0 mr-2">
          <img src={avatarSrc} alt="avatar" className="avatar" />
        </div>
        <div
          ref={contentElementReference}
          className="flex-grow-1 chat-stripe-response"
        >
          <MDFormatedResponse isTyping={isTyping} renderPlugins>
            {responseMessage}
          </MDFormatedResponse>
          {!isTyping && (
            <div className="mt-1">
              <Button
                title="Copy plain text"
                size="sm"
                onClick={() => copyPlainTextToClipBoard(responseMessage)}
                className="border-0 btn-simple"
              >
                {copySuccess ? <BsCheck /> : <MdContentCopy />}
              </Button>
              <UncontrolledDropdown
                title="Reactions"
                dropup
                className="d-inline"
              >
                <DropdownToggle
                  size="sm"
                  className={classNames("border-0 btn-simple", {
                    "text-primary": reaction !== CHAT_REACTIONS.EMPTY,
                  })}
                >
                  {REACTION_MAP[reaction]}
                </DropdownToggle>
                <DropdownMenu className="p-1">
                  <DropdownItem className="bg-transparent p-0">
                    {Object.keys(REACTION_MAP)
                      .filter((rct) => rct !== CHAT_REACTIONS.EMPTY)
                      .map((rct) => {
                        return (
                          <div
                            title={rct}
                            key={rct}
                            className={classNames("btn btn-simple border-0", {
                              "text-primary": reaction === rct,
                            })}
                            onClick={() => {
                              if (reaction === rct)
                                return onReact(CHAT_REACTIONS.EMPTY);
                              return onReact(rct);
                            }}
                          >
                            {REACTION_MAP[rct]}
                          </div>
                        );
                      })}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown
                title="More actions"
                dropup
                className="d-inline"
              >
                <DropdownToggle size="sm" className="border-0 btn-simple">
                  <HiDotsHorizontal />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      copyFormatedToClipboard();
                      toast.success("Text copied.");
                    }}
                  >
                    {copySuccess ? <BsCheck /> : <MdContentCopy />} Copy
                    formatted text
                  </DropdownItem>
                  {/* <DropdownItem onClick={() => copyFormatedToClipboard()}>
                    {<FiEdit />} Edit in documents
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
              <small className="text-muted pull-right">{time}</small>
            </div>
          )}
        </div>
      </div>
    </ChatStripe>
  );
}
