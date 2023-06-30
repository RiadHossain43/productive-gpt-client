import React from "react";
const FilePicker = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="d-none"
      type={"file"}
      accept={props.accept || "image/*"}
    />
  );
});
export default FilePicker;
