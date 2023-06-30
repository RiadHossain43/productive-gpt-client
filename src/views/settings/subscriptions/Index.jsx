import { SubscriptionsContextProvider } from "./store";
import Content from "./Content";
const SubscriptionsPage = () => {
  return (
    <SubscriptionsContextProvider>
      <Content />
    </SubscriptionsContextProvider>
  );
};

export default SubscriptionsPage;
