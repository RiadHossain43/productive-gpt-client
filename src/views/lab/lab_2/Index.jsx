import { ContextProvider } from "./store";
import Content from "./Content";
const Lab = () => {
  return (
    <ContextProvider>
      <Content />
    </ContextProvider>
  );
};

export default Lab;
