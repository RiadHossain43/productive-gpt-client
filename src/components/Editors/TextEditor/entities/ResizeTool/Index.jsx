import React from "react";
import classnames from "classnames";
import StretchBar from "./StretchBar";
import Aligner from "./Aligner";
import { ENTITY_NAME } from "../entityNames";
export default function Resizer({ children, ...rest }) {
  let [isActive, setIsActive] = React.useState(false);
  let toggleIsActive = () => setIsActive((curret) => !curret);
  let [currentSize, setCurrentSize] = React.useState(rest.size || 30);
  let [alignment, setAlignment] = React.useState(
    rest.alignment || ENTITY_NAME.ALIGN_LEFT
  );
  let alignementClasses = () => ({
    "justify-content-start": alignment === "start",
    "justify-content-center": alignment === "center",
    "justify-content-end": alignment === "end",
  });
  return (
    <>
      {isActive && alignment && (
        <div className={classnames("d-flex", alignementClasses())}>
          <Aligner
            onAlignmentChange={(e) => setAlignment(e.alignment)}
            {...rest}
          />
        </div>
      )}
      <div
        className={classnames("d-flex align-items-center position-relative", alignementClasses())}
      >
        {isActive && alignment !== "start" && (
          <StretchBar
            {...rest}
            reference={alignment}
            onResizeEnd={(e) => setCurrentSize(e.partition)}
          />
        )}
        <div
          className={classnames(
            "d-inline-block rounded resize-container unselectable",
            {
              "resize-focused": isActive,
              "w-10": currentSize === 10,
              "w-15": currentSize === 15,
              "w-20": currentSize === 20,
              "w-25": currentSize === 25,
              "w-30": currentSize === 30,
              "w-35": currentSize === 35,
              "w-40": currentSize === 40,
              "w-45": currentSize === 45,
              "w-50": currentSize === 50,
              "w-55": currentSize === 55,
              "w-60": currentSize === 60,
              "w-65": currentSize === 65,
              "w-70": currentSize === 70,
              "w-75": currentSize === 75,
              "w-80": currentSize === 80,
              "w-85": currentSize === 85,
              "w-90": currentSize === 90,
              "w-95": currentSize === 95,
              "w-100": currentSize === 100,
            }
          )}
          onClick={toggleIsActive}
        >
          {children}
        </div>
        {isActive && alignment !== "end" && (
          <StretchBar
            {...rest}
            reference={alignment}
            currentSize={currentSize}
            onResizeEnd={(e) => setCurrentSize(e.partition)}
          />
        )}
      </div>
    </>
  );
}
