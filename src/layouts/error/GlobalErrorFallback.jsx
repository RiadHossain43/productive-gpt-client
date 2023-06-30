import React from "react";
import { Button, Card, CardBody } from "reactstrap";
const GlobalErrorFallback = () => {
  return (
    <React.Fragment>
      <Card className="shadow border-0">
        <CardBody>
          <div className="text-center text-muted">
            <p>Opps | Something went wrong we are working to fix it.</p>
          </div>
          <div className="text-center text-muted">
            <small>
              <Button onClick={() => window.location.reload()}>
                Try again
              </Button>
            </small>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default GlobalErrorFallback;
