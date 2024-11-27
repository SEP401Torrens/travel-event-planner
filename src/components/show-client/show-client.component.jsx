import {
  Divider,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Sidebar,
  SidebarContainer,
  SidebarItem,
} from "./show-client.styles";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { ReactComponent as GlobeButton } from "../../assets/icons/globe.svg";
import { ReactComponent as InformationButton } from "../../assets/icons/information.svg";
import { useState } from "react";
import TripContent from "./trip-content/trip-content.component";
import ClientInfoContent from "./client-info-content/client-info-content.component";


const ShowClient = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState("info");

  const handleRemoveTrip = () => {
    // Remove trip from the client
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <SidebarContainer>
          <Sidebar>
            <SidebarItem
              isActive={activeTab === "info"}
              onClick={() => setActiveTab("info")}
            >
              <InformationButton />
              Info
            </SidebarItem>
            <SidebarItem
              isActive={activeTab === "trips"}
              onClick={() => setActiveTab("trips")}
            >
              <GlobeButton />
              Trips
            </SidebarItem>
          </Sidebar>
          <div>
            <ModalHeader>
              <ModalTitle>
                {activeTab === "info" ? "Client Information" : "Trips"}
              </ModalTitle>
              <CloseButton onClick={onClose} />
            </ModalHeader>
            <Divider />
            {activeTab === "info" && (
              <ClientInfoContent client={client} / >
            )}
            {activeTab === "trips" && (
              <TripContent />
            )}
          </div>
        </SidebarContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShowClient;
