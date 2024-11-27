import {
  ClientInfoContent,
  Divider,
  EmptyTripMessage,
  Label,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Sidebar,
  SidebarContainer,
  SidebarItem,
  TripButtonContainer,
  TripContent,
  TripHeader,
  TripList,
  TripRow,
} from "./show-client.styles";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { ReactComponent as GlobeButton } from "../../assets/icons/globe.svg";
import { ReactComponent as InformationButton } from "../../assets/icons/information.svg";
import { ReactComponent as TrashButton } from "../../assets/icons/trash.svg";
import { ReactComponent as ShowButton } from "../../assets/icons/eye.svg";
import { useState } from "react";

export const mockTrips = [
  {
    id: 1,
    location: "New York",
    travelStartDate: "2023-11-01",
    travelEndDate: "2023-11-10",
    budget: 1500,
  },
  {
    id: 2,
    location: "Paris",
    travelStartDate: "2023-12-05",
    travelEndDate: "2023-12-15",
    budget: 2000,
  },
  {
    id: 3,
    location: "Tokyo",
    travelStartDate: "2024-01-20",
    travelEndDate: "2024-01-30",
    budget: 2500,
  },
];

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
              <ClientInfoContent>
                <Label>FIRST NAME: {client.firstName}</Label>
                <Label>LAST NAME: {client.lastName}</Label>
                <Label>E-MAIL: {client.email}</Label>
                <Label>PHONE: {client.phone}</Label>
                <Label>
                  FAVORITE EVENT TYPES: {client.favoriteEventTypes.label}
                </Label>
                <Label>TOTAL BUDGET: ${client.totalBudget}</Label>
              </ClientInfoContent>
            )}
            {activeTab === "trips" && (
              <TripContent>
                <TripList>
                  <TripHeader>
                    <span>LOCATION</span>
                    <span>TRAVEL START</span>
                    <span>TRAVEL END</span>
                    <span>BUDGET</span>
                    <span></span>
                  </TripHeader>

                  {mockTrips.length > 0 ? (
                    mockTrips.map((trip) => (
                      <TripRow key={trip.id}>
                        {console.log(trip)}
                        <span>{trip.location}</span>
                        <span>{trip.travelStartDate}</span>
                        <span>{trip.travelEndDate}</span>
                        <span>{trip.budget}</span>

                        <TripButtonContainer>
                          <ShowButton
                            onClick={() => handleRemoveTrip(trip.id)}
                          />
                          <TrashButton
                            onClick={() => handleRemoveTrip(trip.id)}
                          />
                        </TripButtonContainer>
                      </TripRow>
                    ))
                  ) : (
                    <EmptyTripMessage>
                      Please add a trip to the client.
                    </EmptyTripMessage>
                  )}
                </TripList>
              </TripContent>
            )}
          </div>
        </SidebarContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ShowClient;
