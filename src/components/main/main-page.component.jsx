import { MainContainer } from "./main-page.styles.jsx";

import SideBar from "../side-bar/side-bar.component.jsx";
import MainContent from "../main-content/main-content.component.jsx";

const MainPage = () => {
  return (
    <MainContainer>
      <SideBar />
      <MainContent />
    </MainContainer>
  );
};

export default MainPage;
