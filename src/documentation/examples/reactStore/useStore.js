import useANiceNamedHook from "./hooks/useANiceNamedHook";
export default function useStore(config) {
  const { anAmzingFunctionThatCanControlUILogicAndBusinessLogic } = useANiceNamedHook();

  return {
    /**
     * expose all the usefull functions and states
     */
    anAmzingFunctionThatCanControlUILogicAndBusinessLogic,
  };
}
