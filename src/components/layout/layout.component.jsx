import SideBar from "../side-bar/side-bar.component";
import { LayoutContainer } from "./layout.styles";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <SideBar />
      <div >
        {children}
      </div>
    </LayoutContainer>
  );
};

export default Layout;

