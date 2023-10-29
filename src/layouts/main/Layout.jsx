import classNames from "classnames";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  sidebarClasses,
  useProSidebar,
} from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import logo from "../../assets/img/brand/logo-ai.png";
import { useApplication } from "../../stores/applicationStore";
import PremiumView from "../components/PremiumView";
import ProtectedView from "../components/ProtectedView";
import Chathead from "./Chathead";
import Guide from "./Guide";
import Navigationbar from "./Navigationbar";
import SidebarFooter from "./SidebardFooter";
import { useMainLayout } from "./store";
const Layout = (props) => {
  let { mainContentReference, chatheads, loadMoreChatHeads } = useMainLayout();
  let { collapsed, broken, toggleSidebar } = useProSidebar();
  let navigate = useNavigate();
  let { currentUserData } = useApplication();
  return (
    <React.Fragment>
      <div className="main-layout index-page">
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
          className="sidebar-chathead"
        >
          <Menu
            id="chat-heads-container"
            rootStyles={{
              [`.${menuClasses.button}`]: {
                height: "auto",
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingBottom: "10px",
                paddingTop: "10px",
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                transition: ".1s ease-in-out",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              [`.${menuClasses.label}`]: {},
              height: "75%",
              overflowY: "scroll",
            }}
          >
            <MenuItem
              rootStyles={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                [`.${menuClasses.button}`]: {
                  backgroundColor: "#171941 !important",
                  "&:hover": {
                    backgroundColor: "#171941 !important",
                  },
                },
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <img className="login-productiveai-logo mx-auto mb-3" src={logo} />
              </div>
              <Button
                id="new-chat-button"
                color="primary"
                className={classNames("mx-0", {
                  "px-1": collapsed,
                })}
                block
                onClick={() => {
                  navigate("/new-chat-redirect");
                  if (broken) {
                    toggleSidebar();
                  }
                }}
              >
                {!collapsed && "Create new "}
                <FiPlusCircle />
              </Button>
            </MenuItem>
            {chatheads.map((chathead) => {
              return <Chathead key={chathead._id} chathead={chathead} />;
            })}
          </Menu>
          <SidebarFooter />
        </Sidebar>
        <div className="main-content" ref={mainContentReference}>
          <Navigationbar {...props} />
          {/* {currentUserData?.subscriptionInformation?.status === "Trial" && (
            <AlertForSubscription />
          )} */}
          <ProtectedView>
            <PremiumView>
              <Outlet />
            </PremiumView>
          </ProtectedView>
        </div>
      </div>
      <Guide />
    </React.Fragment>
  );
};

export default Layout;
