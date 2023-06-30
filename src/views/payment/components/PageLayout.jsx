import classNames from "classnames";
import { Col, Container, Row } from "reactstrap";
import "swiper/css";
import "swiper/css/pagination";
import LoginHeroSection from "./LoginHeroSection";
import MarketingSlides from "./MarketingSlides";
import RegistrationHeroSection from "./RegistrationHeroSection";
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
  return (
    <Container className="h-100" fluid>
      <Row className="h-100">
        <Col
          className={classNames(
            "py-4  rounded-3 overflow-hidden d-none d-md-flex flex-column",
            {
              "registration-alice-promo-container": varient === varients.signup,
              "login-alice-promo-container": varient === varients.signin,
            }
          )}
          md={4}
        >
          <div className="login-hero-section py-md-2 py-lg-4 flex-grow-1">
            {varient === varients.signup && <RegistrationHeroSection />}
            {varient === varients.signin && <LoginHeroSection />}
          </div>
          <div className="login-alice-promo-slider">
            <MarketingSlides />
          </div>
        </Col>
        <Col md={6} lg={4} xl={3} className="mx-auto">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default PageLayout;
