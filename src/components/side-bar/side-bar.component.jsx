import {
  LogoutButton,
  LogoutButtonContainer,
  SidebarHeader,
  SidebarLine,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContainer,
} from "./side-bar.styles";
import { ReactComponent as ClientsIcon } from "../../assets/icons/clients.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/auth.reducer";
import { notification } from "../../utils/notification.utils";

const SideBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    notification("Successfully logout", "success");
  };

  return (
    <SidebarContainer>
      <div>
        <SidebarHeader>Travel Event Planner</SidebarHeader>
        <SidebarLine />
        <SidebarMenu>
          <SidebarMenuItem>
            <ClientsIcon />
            Clients
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ProfileIcon />
            Profile
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <LogoutButtonContainer>
        <SidebarLine />
        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </LogoutButton>
      </LogoutButtonContainer>
    </SidebarContainer>
  );
};

export default SideBar;