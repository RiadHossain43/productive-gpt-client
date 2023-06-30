import { Button } from "reactstrap";
import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactJoyride from "react-joyride";
import { steps } from "./guideSteps";
import { useApplication } from "../../stores/applicationStore";
import { useMainLayout } from "./store/index";

function TooltipComponent({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  size,
}) {
  return (
    <div
      style={{ maxWidth: 300 }}
      className="card m-0 rounded-3"
      {...tooltipProps}
    >
      <div className="card-body">
        {step.title && <p className="text-dark">{step.title}</p>}
        <p>{step.content}</p>
        <div className="mt-2">
          {index > 0 && (
            <Button
              outline
              color="primary"
              className="border-0"
              size="sm"
              {...backProps}
            >
              <BsArrowLeft /> Prev
            </Button>
          )}
          {continuous && index !== size - 1 && (
            <Button
              outline
              color="primary"
              className="border-0"
              size="sm"
              {...primaryProps}
            >
              Next <BsArrowRight />
            </Button>
          )}
          {continuous && index === size - 1 && (
            <Button
              outline
              color="danger"
              className="border-0"
              size="sm"
              {...closeProps}
            >
              Close <IoCloseCircleOutline />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Guide({}) {
  const { currentUserData } = useApplication();
  const { runUserJourney } = useMainLayout();
  /**
   * We return empty if user is not a first time user.
   * TODO: This is only the starting point. In future this machanism
   * will change and a proper guide builder accross URLs and Guide consuming
   * API will be provided for easier management
   */
  // if (currentUserData?.activity?.status !== "Never") return null;
  return (
    <React.Fragment>
      <ReactJoyride
        styles={{
          options: {
            zIndex: 2000,
          },
        }}
        continuous
        run={runUserJourney}
        steps={steps}
        tooltipComponent={TooltipComponent}
      />
    </React.Fragment>
  );
}
