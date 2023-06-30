import React from "react";
import TextEditor from "../Index";
import Button from "../../Buttons/ButtonBase";

const TextEditorExample = () => {
  const [data, setData] = React.useState({
    data: {
      value: "",
      assignedTo: {
        value: null,
        label: "Select user",
      },
    },
    errors: {},
  });
  // console.log("data", data);
  return (
    <div>
      <TextEditor
        name="value"
        value={data.value}
        onDataStructureChange={(value) => {
          setData({ ...data, value });
        }}
        linkGeneratorFn={() => "https://picsum.photos/200/300"}
        // error={errors.value}
        // linkGeneratorFn={linkGenerator}
        // handleUpload={handleUpload}
        mentionSuggestions={[
          {
            _id: "182973aSJLsddkhsd",
            name: "Reyad Hossain",
            profileImageSrc: "https://picsum.photos/200/300",
          },
          {
            _id: "182973sadadkhsd",
            name: "Samin israr",
            profileImageSrc: "https://picsum.photos/200/300",
          },
        ]}
      />
      <Button
        disabled={data.value && !data.value.trim()}
        onClick={() => {
          // console.log("data", data.value);
        }}
      >
        Send
      </Button>
    </div>
  );
};

export default TextEditorExample;
