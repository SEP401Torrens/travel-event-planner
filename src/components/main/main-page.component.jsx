import {
  MainContainer,
  Content,
  ClientCard,
  ClientCardHeader,
  ClientCardDetails,
} from "./main-page.styles.jsx";

import { ReactComponent as CalendarIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/logout.svg";
import SideBar from "../side-bar/side-bar.component.jsx";
import SearchBar from "../search-bar/search-bar.component.jsx";

const MainPage = () => {
  return (
    <MainContainer>
      <SideBar />
      <Content>
        <SearchBar />
        <ClientCard>
          <ClientCardHeader>Nicole Fisher</ClientCardHeader>
          <hr />
          <ClientCardDetails>
            <p>
              <CalendarIcon /> <span>Next Trip: 17/10/2024</span>
            </p>
            <p>
              <LocationIcon /> <span>Dominican Rep.</span>
            </p>
          </ClientCardDetails>
        </ClientCard>
      </Content>
    </MainContainer>
  );
};

export default MainPage;
