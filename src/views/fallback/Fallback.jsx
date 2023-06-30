import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
const Fallback = () => {
  return (
    <Card className="shadow border-0">
      <CardBody>
        <div className="text-center">
          <p>Opps | Something went wrong we are working to fix it.</p>
        </div>
        <div className="text-center text-muted">
          <small>
            <Link to="/accounts/register" className="mx-3">
              Sign up
            </Link>
            |
            <Link to="/accounts/login" className="mx-3">
              Sign in
            </Link>
          </small>
        </div>
      </CardBody>
    </Card>
  );
};

export default Fallback;
