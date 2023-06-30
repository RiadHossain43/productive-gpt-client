import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  sidebarClasses,
  useProSidebar,
} from "react-pro-sidebar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import routes from "../../routes";
import ProtectedView from "../components/ProtectedView";
import Navigationbar from "./Navigationbar";

const Layout = (props) => {
  let { broken, toggleSidebar } = useProSidebar();
  let navigate = useNavigate();
  return (
    <div className="settings-layout">
      <Sidebar
        customBreakPoint="764px"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#171941",
            position: "relative",
            overflowY: "hidden",
          },
          [`&.${sidebarClasses.broken}`]: {
            zIndex: 1051,
          },
        }}
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.button}`]: {
              height: "auto",
              paddingRight: "20px",
              paddingLeft: "20px",
              paddingBottom: "10px",
              paddingTop: "10px",
              borderTopRightRadius: 10,
              transition: ".1s ease-in-out",
              borderBottomRightRadius: 10,
              "&:hover": {
                backgroundColor: "#2b3553",
              },
            },
            overflowY: "scroll",
          }}
        >
          {routes.settingsLayout.settings
            .filter((route) => !route.hideInsidebar)
            .map((route) => {
              return (
                <MenuItem
                  key={route.path}
                  onClick={() => {
                    navigate(route.path);
                    if (broken) {
                      toggleSidebar();
                    }
                  }}
                  icon={route.icon}
                >
                  <Link to={route.path}>
                    <p className="m-0">{route.name}</p>
                  </Link>
                </MenuItem>
              );
            })}
        </Menu>
      </Sidebar>
      <div className="main-content">
        <Navigationbar {...props} />
        <ProtectedView>
          <Outlet />
        </ProtectedView>
      </div>
    </div>
  );
};

export default Layout;
