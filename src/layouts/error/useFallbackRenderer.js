import GlobalErrorFallback from "./GlobalErrorFallback";
export default function useFallbackRenderer() {
  function renderFallback({ error, resetErrorBoundary }) {
    return <GlobalErrorFallback />;
  }

  return { renderFallback };
}
