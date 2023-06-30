import { Button } from "reactstrap";
import imsLogo from "../../assets/img/brand/ims-systems-full-logo.png";
import { Link } from "react-router-dom";
import { useApplication } from "../../stores/applicationStore";
import { BsStars, BsLightning } from "react-icons/bs";
const SidebarFooter = () => {
  const { currentUserData, redirectToCheckout } = useApplication();
  return (
    <div className="sidebar-footer d-flex flex-column">
      {currentUserData?.subscriptionInformation?.status === "Trial" && (
        <Button
          size="sm"
          block
          className="btn-simple"
          color="warning"
          onClick={() =>
            redirectToCheckout({ userEmail: currentUserData.email })
          }
        >
          <BsLightning /> Upgrade
        </Button>
      )}
      <div className="ims-promotion rounded-2 flex-grow-1">
        <small className="mb-1">
          <BsStars /> Please also check out
        </small>
        <Link
          to={"https://imssystems.tech/products.php#imssystems"}
          target="_blank"
          rel="noreferer"
        >
          <img height={20} src={imsLogo} />
        </Link>
      </div>
    </div>
  );
};

export default SidebarFooter;
