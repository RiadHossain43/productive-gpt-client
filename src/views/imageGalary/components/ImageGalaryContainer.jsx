import React from "react";
import { DrawerContextProvider } from "../../../components/Drawer";
import { ImageGalaryContextProvider } from "./store";
import ImageGalary from "./ImageGalary";
const ImageGalaryContainer = ({}) => {
  return (
    <ImageGalaryContextProvider>
      <DrawerContextProvider>
        <ImageGalary/>
      </DrawerContextProvider>
    </ImageGalaryContextProvider>
  );
};

export default ImageGalaryContainer;
