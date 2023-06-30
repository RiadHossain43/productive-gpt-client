import { useState } from "react";
export default function useDrawerStore(config) {
  const [openDrawers, setOpenDrawers] = useState([]);
  function toggle(drawerId) {
    setOpenDrawers((ids) => {
      if (ids.includes(drawerId)) return ids.filter((id) => id !== drawerId);
      else return [...ids, drawerId];
    });
  }
  function isOpen(drawerId) {
    return openDrawers.includes(drawerId);
  }
  //close function for the top most drawer
  function closeDrawer(drawerId) {
    setOpenDrawers((ids) => {
      if(ids.includes(drawerId)) return ids.filter((id) => id !== drawerId);
      else return ids;
    });
  }
  //function to only open drawer
  function openDrawer(drawerId) {
    setOpenDrawers((ids) => {
      if (ids.includes(drawerId)) return ids;
      else return [...ids, drawerId];
    });
  }
  //function to close all drawers
  function closeAllDrawers() {
    setOpenDrawers([]);
  }
  return { isOpen, toggle, openDrawer, closeDrawer, closeAllDrawers };
}
