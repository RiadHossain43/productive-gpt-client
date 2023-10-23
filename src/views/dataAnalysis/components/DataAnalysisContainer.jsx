import React from "react";
import { DrawerContextProvider } from "../../../components/Drawer";
import { DataAnalysisContextProvider } from "./store";
import DataAnalysis from "./DataAnalysis";
const DataAnalysisContainer = ({}) => {
  return (
    <DataAnalysisContextProvider>
      <DrawerContextProvider>
        <DataAnalysis />
      </DrawerContextProvider>
    </DataAnalysisContextProvider>
  );
};

export default DataAnalysisContainer;
