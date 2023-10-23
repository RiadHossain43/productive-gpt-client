import { useContext } from "react";
import { Context } from "./Context";
export default function useConsumer() {
  const { ...store } = useContext(Context);
  return { ...store };
}
