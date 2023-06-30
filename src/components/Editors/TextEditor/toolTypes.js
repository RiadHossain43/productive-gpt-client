import { ELEMENT_TYPES } from "./elementTypes";
import { ENTITY_NAME } from "./entities/entityNames";
import {
  FaBold,
  FaUnderline,
  FaItalic,
  FaStrikethrough,
  FaHeading,
  FaList,
  FaListOl,
  FaQuoteLeft,
  FaCode,
  FaRegImage,
  FaMinus,
  FaMagic,
} from "react-icons/fa";
export const INLINE_TYPES = [
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: <FaUnderline />,
    element: ELEMENT_TYPES.INLINE_DEFAULT,
  },
  {
    label: "Bold",
    style: "BOLD",
    icon: <FaBold />,
    element: ELEMENT_TYPES.INLINE_DEFAULT,
  },
  {
    label: "Italic",
    style: "ITALIC",
    icon: <FaItalic />,
    element: ELEMENT_TYPES.INLINE_DEFAULT,
  },
  {
    label: "Strike through",
    style: "STRIKETHROUGH",
    icon: <FaStrikethrough />,
    element: ELEMENT_TYPES.INLINE_DEFAULT,
  },
];
export const BLOCK_TYPES = [
  {
    label: "Header",
    style: "header-four",
    icon: <FaHeading />,
    element: ELEMENT_TYPES.BLOCK_DEFAULT,
  },
  {
    label: "UL",
    style: "unordered-list-item",
    icon: <FaList />,
    element: ELEMENT_TYPES.BLOCK_DEFAULT,
  },
  {
    label: "OL",
    style: "ordered-list-item",
    icon: <FaListOl />,
    element: ELEMENT_TYPES.BLOCK_DEFAULT,
  },
  {
    label: "Blockquote",
    style: "blockquote",
    icon: <FaQuoteLeft />,
    element: ELEMENT_TYPES.BLOCK_DEFAULT,
  },
  {
    label: "Code block",
    style: "code-block",
    icon: <FaCode />,
    element: ELEMENT_TYPES.BLOCK_DEFAULT,
  },
  // {
  //   lebel: "Align left",
  //   style: "editor-alignment-left",
  //   icon: "fa-solid fa-align-left",
  //   element: ELEMENT_TYPES.BLOCK_DEFAULT,
  // },
  // {
  //   lebel: "Align center",
  //   style: "editor-alignment-center",
  //   icon: "fa-solid fa-align-center",
  //   element: ELEMENT_TYPES.BLOCK_DEFAULT,
  // },
  // {
  //   lebel: "Align right",
  //   style: "editor-alignment-right",
  //   icon: "fa-solid fa-align-right",
  //   element: ELEMENT_TYPES.BLOCK_DEFAULT,
  // },
  // {
  //   lebel: "Align justify",
  //   style: "editor-alignment-justify",
  //   icon: "fa-solid fa-align-justify",
  //   element: ELEMENT_TYPES.BLOCK_DEFAULT,
  // },
];
export const ENTITY_TYPES = [
  {
    label: "Ai Assit",
    style: ENTITY_NAME.AI_ASSISTANT,
    icon: <FaMagic />,
    element: ELEMENT_TYPES.ATOMIC_ENTITY,
  },
  {
    label: "Image",
    style: ENTITY_NAME.IMAGE,
    icon: <FaRegImage />,
    element: ELEMENT_TYPES.ATOMIC_ENTITY,
  },
  // {
  //   label: "Mention",
  //   style: ENTITY_NAME.MENTION,
  //   icon: "fa-solid fa-at",
  //   element: ELEMENT_TYPES.ATOMIC_ENTITY,
  // },
  // {
  //   lable: "CL",
  //   style: ENTITY_NAME.CHECKLIST,
  //   icon: "fa-solid fa-list-check",
  //   element: ELEMENT_TYPES.ATOMIC_ENTITY,
  // },
  {
    label: "Divider",
    style: ENTITY_NAME.DIVIDER,
    icon: <FaMinus />,
    element: ELEMENT_TYPES.ATOMIC_ENTITY,
  },
];
const toolType = {
  INLINE_TYPES,
  BLOCK_TYPES,
  ENTITY_TYPES,
};

export default toolType;
