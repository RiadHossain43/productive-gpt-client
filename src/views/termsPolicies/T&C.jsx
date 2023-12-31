import { Container, Row, Col } from "reactstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const tAndC = `
## Terms and Conditions

These terms and conditions ("Agreement") govern your use of AI_PRODUCT_NAME software ("Software") provided by Freetools ("Company"). By using the Software, you agree to be bound by this Agreement. If you do not agree to these terms and conditions, do not use the Software.

### Subscription

The Software is available on a subscription basis. You may subscribe to the Software by paying the subscription fee as set forth on the Company's website. The subscription fee is payable in advance and is non-refundable.

### Cancellation

You may cancel your subscription at any time by contacting the Company. If you cancel your subscription before the payment date, no payment will be taken until the next billing date. If you cancel your subscription after the payment date, you will continue to have access to the Software until the end of the current billing period. You will not be entitled to a refund for any unused portion of the subscription.

### Renewal

You may renew your subscription at any time by paying the subscription fee as set forth on the Company's website. If you renew your subscription before the end of the current billing period, your subscription will be extended for another billing period. No payment will be charged at the point of renewal. Payment will be charged at the monthly billing date.

### Intellectual Property

The Software and all intellectual property rights in the Software, including but not limited to patents, copyrights, trademarks, trade secrets, and any other proprietary rights, are owned by Freetools. You may not copy, modify, distribute, sell, or transfer any part of the Software without the prior written consent of Freetools.
All rights, title, and interest in and to the Software, including all intellectual property rights, belong exclusively to Freetools. You acknowledge that you have no rights, title, or interest in or to the Software except as expressly set forth in this Agreement.
You agree not to remove, obscure, or alter any proprietary rights notices (including copyright and trademark notices) that may be affixed to or contained within the Software.
If you believe that any content or materials on the Software infringe your intellectual property rights, please contact Freetools immediately.
By using the Software, you acknowledge and agree that the IP of AI_PRODUCT_NAME belongs to Freetools and that you have no rights, title, or interest in or to the Software except as expressly set forth in this Agreement.

### Machine Learning and AI

The Software may use machine learning and AI algorithms to provide certain features and functionality. By using the Software, you acknowledge and agree that the Company may collect and use data generated by your use of the Software to improve the machine learning and AI algorithms.
Users must consent to the collection and use of their data for AI and machine learning purposes. By signing up to use AI_PRODUCT_NAME, users are automatically opted-in to the data collection and use. Users may opt-out of the data collection and use by cancelling their subscription.
If users wish to opt-out of the data collection and use at any other time, they may contact the Company to request their data be removed from the machine learning and AI algorithms. However, please note that opting-out of the data collection and use may affect the functionality and features of the Software.
The Company takes the privacy and security of user data seriously and will only use the data for the purposes of improving the machine learning and AI algorithms. The Company will not sell or share user data with third parties without the user's explicit consent.
By using the Software, you agree to the collection and use of your data for AI and machine learning purposes as outlined in this Agreement. If you have any questions or concerns about the data collection and use, please contact Freetools.

### Disclaimer of Warranties

The Software is provided "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The Company does not warrant that the Software will meet your requirements or that the operation of the Software will be uninterrupted or error-free.

### Limitation of Liability

In no event shall the Company be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the Software, even if the Company has been advised of the possibility of such damages.

### Governing Law

This Agreement shall be governed by and construed in accordance with the laws of [country name]. Any dispute arising out of or in connection with this Agreement shall be resolved by arbitration in accordance with the rules of the [arbitration association name].
By using the Software, you agree to be bound by this Agreement. If you have any questions about this Agreement, please contact Freetools.
`;
const TAndC = () => {
  return (
    <Container>
      <Row>
        <Col className="mx-auto my-3" md="8">
          <ReactMarkdown>{tAndC}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  );
};

export default TAndC;
