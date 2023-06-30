import classnames from "classnames";
import React from "react";
/** block sizes are measured in percentage */
const partitions = [
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
];
export default function StretchBar({
  editorRef,
  onResizeEnd,
  reference = "left",
  currentSize = 10,
  ...rest
}) {
  let [isDragging, setIsDragging] = React.useState(false);
  let [currentlyHoverring, setCurrentlyHovering] = React.useState(currentSize);
  /**
   * we are getting editor bounding client rectangle to calculate
   * styles in mutiple places for better fitting our resizing algorithm
   */
  const editorRect = editorRef.current?.editor?.getBoundingClientRect();
  /**
   * following function generates guide positions both in pixels and percentages
   * when user is dragging to resize
   */
  let getGuidePositions = () =>
    partitions.map((part) => {
      /**
       * we are mapping out the partitions to it's corresponding
       * abolute "X" pixels. editors left padding is added as an offset
       * balance to all the absolute positioned guide elements.
       */
      let editorPaddingOffset = parseInt(
        window
          .getComputedStyle(
            document.querySelector(".document-editor-container"),
            null
          )
          .getPropertyValue("padding-left")
      );
      let offset = (editorRect.width * part) / 100;
      return {
        percentage: part,
        pixels: Math.ceil(offset),
      };
    });
  let handleMouseDown = React.useCallback(
    (e) => {
      e.preventDefault();
      const doDrag = (e) => {
        /** we are copying the partitions constant so action array is not muted */
        let partitionsCopy = [...partitions];
        setIsDragging(true);
        /** the algorithm finds the closed partiion to the current cursor
         * and sorts the closed at the begining of the array.
         * --------------------------------------------------------------
         * caution: do not use e.offesetX (because event.offsetX changes depending on hovering element)
         * alway good to calculate the offset value
         */
        let fullLength =
          reference === "center" ? editorRect.width / 2 : editorRect.width;
        let refLine =
          reference === "center"
            ? editorRect.left + editorRect.width / 2
            : reference === "end"
            ? editorRect.left + editorRect.width
            : editorRect.left;
        let calculatedOffsetX = parseInt(Math.abs(e.clientX - refLine));
        let needle = parseInt((calculatedOffsetX / fullLength) * 100);
        partitionsCopy.sort((a, b) => {
          return Math.abs(needle - a) - Math.abs(needle - b);
        });
        /** we pick the closest partition position as the reszied to data */
        let resizedTo = partitionsCopy[0];
        setCurrentlyHovering(resizedTo);
        let createdEvent = { partition: resizedTo };
        onResizeEnd && onResizeEnd(createdEvent);
        let entityKey = rest.block.getEntityAt(0);
        rest.contentState.mergeEntityData(entityKey, { size: resizedTo });
      };
      const stopDrag = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", doDrag, false);
        document.removeEventListener("mouseup", stopDrag, false);
        /**
         * - handle drag state
         * - handle resized data
         */
      };
      document.addEventListener("mousemove", doDrag, false);
      document.addEventListener("mouseup", stopDrag, false);
    },
    [onResizeEnd]
  );
  return (
    <>
      <div
        className="d-inline-block p-2 unselectable"
        style={{ cursor: "col-resize" }}
        onMouseDown={handleMouseDown}
      >
        <div className="bg-primary rounded resize-bar"></div>
      </div>
      {/**
       * follwing portion is rendering the guide elements
       */}
      {isDragging && (
        <div className="resize-guides-container position-absolute ">
          {getGuidePositions().map((guide) => {
            return (
              <div
                key={guide.pixels}
                className={classnames(
                  "resize-guide position-absolute rounded",
                  {
                    "bg-info":
                      /** match if alligned at left/start  */
                      (reference === "start" &&
                        guide.percentage === currentlyHoverring) ||
                      /** match if alligned at right/end  */
                      (reference === "end" &&
                        100 - guide.percentage === currentlyHoverring),
                  }
                )}
                style={{
                  left: guide.pixels,
                }}
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
}
