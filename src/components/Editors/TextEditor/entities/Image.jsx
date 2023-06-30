import React from "react";
export default function Image(props) {
  if (props.src || props.link) {
    return (
      <img
        src={props.src || props.link}
        alt={props.alt || props.storageInfo?.Key || "..."}
        className="unselectable"
      />
    );
  }
  return null;
}
