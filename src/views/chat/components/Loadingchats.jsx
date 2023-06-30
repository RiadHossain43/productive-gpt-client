import React from "react";
import { BounceLoader } from "react-spinners";
const Loadingchats = () => {
  return (
    <p className="text-center">
      <BounceLoader
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "red",
        }}
        size={25}
        color="#36d7b7"
      />
    </p>
  );
};
export default Loadingchats;
