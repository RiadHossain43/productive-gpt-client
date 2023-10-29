import React from "react";
import { Link } from "react-router-dom";
import MarkDown from "../../../components/MarkDown/MarkDown";
const RegistrationHeroSection = ({}) => {
  return (
    <React.Fragment>
      <small className="text-light">
        Powered by{" "}
        <Link
          className="text-light"
          to="https://freetoolsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Freetools
        </Link>
      </small>
      <h2 className="mb-md-2 mb-lg-4">Start Your Journey with Us</h2>

      <MarkDown
        markdown={`
Embrace the future of productivity and efficiency with Free Tools AI. We're your trusted companion on the road to success. Dive into a world of innovation and discover how our cutting-edge tools can transform the way you work:

📊 **Data Analysis**: Crunch numbers, extract insights, and make data-driven decisions effortlessly.

📈 **Diagram Making**: Create stunning visuals and diagrams that convey your ideas with precision and style.

✍️ **Document Editing**: Edit, review, and perfect your documents with intuitive features and collaboration capabilities.

🔧 **And More**: Explore a wide array of tools and capabilities to unlock your potential and enhance your work.

Don't wait – take the first step towards a more productive future. Start your journey with Free Tools AI today and experience the difference! 💡
      
`}
      />
    </React.Fragment>
  );
};

export default RegistrationHeroSection;
