import classNames from "classnames";
import { Col, Container, Row } from "reactstrap";
import "swiper/css";
import "swiper/css/pagination";
import LoginHeroSection from "./LoginHeroSection";
import MarketingSlides from "./MarketingSlides";
import RegistrationHeroSection from "./RegistrationHeroSection";
import { Link } from "react-router-dom";
/**
 * @typedef {Object} Varients - varient of the layout.
 * @property {String} signup - new customer varient
 * @property {String} signin - exisitng customer varient
 */
const varients = {
  signin: "sign-in",
  signup: "sign-up",
};
/**
 * @typedef {String} Varient - varient of the layout.
 * @type {'signin' | 'signup'}
 */

const PageLayout = ({
  /** @type {Varient} */
  varient = "sign-in",
  children,
}) => {
  console.log(varient);
  return (
    <Container className="h-100" fluid>
      <Row className="h-100">
        <Col
          className={classNames(
            "py-4 rounded-3 overflow-hidden d-none d-md-flex flex-column",
            {
              "registration-productiveai-promo-container": varient === varients.signup,
              "login-productiveai-promo-container": varient === varients.signin,
            }
          )}
          md={6}
        >
          <div className="login-hero-section py-md-2 py-lg-4 flex-grow-1">
            {varient === varients.signup && <RegistrationHeroSection />}
            {varient === varients.signin && <LoginHeroSection />}
          </div>
          <div className="login-productiveai-promo-slider">
            <MarketingSlides />
          </div>
        </Col>
        <Col md={6} lg={4} xl={3} className="mx-auto my-3 d-flex flex-column">
          <div className="flex-grow-1">{children}</div>
          <footer>
            <small>
              <Link to={"/privacy-policy"} target="_blank" rel="noreferer">
                Privacy policy
              </Link>
            </small>
            <small className="mx-1">
              <Link
                to={"/terms-and-conditions"}
                target="_blank"
                rel="noreferer"
              >
                Terms and Conditions
              </Link>
            </small>
            <small>
              &copy;{" "}
              <Link to={"#"} target="_blank" rel="noreferer">
                Free AI
              </Link>
            </small>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default PageLayout;
