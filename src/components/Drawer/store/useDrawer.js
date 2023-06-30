import { useContext } from "react";
import { DrawerContext } from "./Context";
export default function useDrawer() {
  const { ...store } = useContext(DrawerContext);
  return { ...store };
}
