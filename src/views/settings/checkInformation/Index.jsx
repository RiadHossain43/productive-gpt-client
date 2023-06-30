import { SubscriptionsContextProvider } from "./store";
import Content from "./Content";
const PaymentSuccessPage = () => {
  return (
    <SubscriptionsContextProvider>
      <Content />
    </SubscriptionsContextProvider>
  );
};

export default PaymentSuccessPage;
