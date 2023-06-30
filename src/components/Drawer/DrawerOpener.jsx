import useDrawer from "./store/useDrawer";
const DrawerOpener = ({
  drawerId = "",
  children,
  onClick = () => {},
  ...rest
}) => {
  const { openDrawer } = useDrawer();
  return (
    <span
      onClick={(e) => {
        openDrawer(drawerId);
        onClick(e);
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
export default DrawerOpener;
