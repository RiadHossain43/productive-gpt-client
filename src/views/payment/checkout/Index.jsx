import Content from "./Content";
import { CheckoutContextProvider } from "./store";
const CheckoutPage = () => {
  return (
    <CheckoutContextProvider>
      <Content />
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
