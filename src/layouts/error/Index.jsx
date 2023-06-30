import { ErrorBoundary } from "react-error-boundary";
import useFallbackRenderer from "./useFallbackRenderer";

const GlobalErrorBoundary = ({ children }) => {
  const { renderFallback } = useFallbackRenderer();
  return (
    <ErrorBoundary fallbackRender={renderFallback}>{children}</ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
