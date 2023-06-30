import Content from "./Content";
import { UnsubscribeContextProvider } from "./store";
const UnsubscribePage = () => {
  return (
    <UnsubscribeContextProvider>
      <Content />
    </UnsubscribeContextProvider>
  );
};

export default UnsubscribePage;
