import { AiAssistantContextProvider } from "./store";
import Content from "./Content";
const AiAssistant = () => {
  return (
    <AiAssistantContextProvider>
      <Content />
    </AiAssistantContextProvider>
  );
};

export default AiAssistant;
