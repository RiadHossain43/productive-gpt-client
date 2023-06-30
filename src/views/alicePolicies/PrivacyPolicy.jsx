import { Col, Container, Row } from "reactstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const privacyPolicy = `
## iMS Technologies Privacy Policy

### Introduction

At iMS Technologies, we are committed to protecting the privacy of our users. This Privacy Policy outlines the types of personal information we collect, how we use it, and how we protect it.

### Information We Collect

We collect personal information from our users when they register for our software, subscribe to our newsletter, or fill out a form. The information we collect may include your name, email address, phone number, company name, and job title. We may also collect non-personal information such as browser type, operating system, and IP address.

### How We Use Your Information

We use the information we collect to provide and improve our software, communicate with our users, send newsletters and promotional materials, and analyze usage trends. We do not sell or rent your personal information to third parties.

### Payment Details

We do not store any payment details. All payment transactions are processed by our partner, Stripe. Please refer to Stripe's Privacy Policy for more information.

### How We Protect Your Information

We take the security of your personal information seriously and have implemented measures to protect it from unauthorized access, disclosure, alteration, or destruction. We use industry-standard encryption technologies to protect your data during transmission and storage.

### Sharing Your Information

We may share your personal information with third-party service providers who perform services on our behalf, such as email marketing, customer support, and data analysis. These service providers are contractually obligated to protect your information and may not use it for any other purpose.

### Marketing Communications

We may send you marketing communications about our products and services. You can opt-out of these communications at any time by clicking the unsubscribe link in the email or contacting us at support@imssystems.tech.

### Cookies

We use cookies to enhance your user experience and analyze usage trends. You can disable cookies in your browser settings, but this may affect the functionality of our software.

### Your Rights

You have the right to access, correct, or delete your personal information at any time. You can do this by contacting us at support@imssystems.tech.

### Data Retention

We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

### Changes to this Policy

We may update this Privacy Policy from time to time. We will notify our users of any changes by posting the new policy on our website.
 
`;
const PrivacyPolicy = () => {
  return (
    <Container>
      <Row>
        <Col className="mx-auto my-3" md="8">
          <ReactMarkdown>{privacyPolicy}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
