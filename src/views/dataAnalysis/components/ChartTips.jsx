import React from "react";
import { BsBarChart } from "react-icons/bs";
import { Card, UncontrolledAlert } from "reactstrap";
const ChartTips = ({ injectedCode = " " }) => {
  return (
    <div className="w-100 h-100 p-2 px-md-3 pb-md-3">
      <Card className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="inline-block w-75 w-md-50">
          <h1 className="">
            <BsBarChart className="mx-2" />
            Chart area.
          </h1>
          <p>
            Your analysis results are meticulously displayed in visually
            appealing charts. Simply select a{" "}
            <span className="text-warning">CSV</span> dataset to witness what
            the AI can do for you.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChartTips;
