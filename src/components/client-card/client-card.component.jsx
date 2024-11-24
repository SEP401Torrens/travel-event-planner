import {
  ClientCardContainer,
  ClientCardDetails,
  ClientCardHeader,
  DetailLabel,
  DetailRow,
  DetailText,
  Divider,
  AddTripButton,
} from "./client-card.styles";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import AddTripForm from "../add-trip-form/add-trip-form.component";
import { useState } from "react";

const ClientCard = ({ client }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTripClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log("ClientCard client", client);
  
  return (
    <ClientCardContainer>
      <ClientCardHeader>
        {client.firstName} {client.lastName}
      </ClientCardHeader>
      <Divider />
      <ClientCardDetails>
        <DetailRow>
          <DetailLabel>NEXT TRIP</DetailLabel>
        </DetailRow>

        {client.nextTripDate && client.location ? (
          <div>
            <DetailRow>
              <CalendarIcon />
              <DetailText highlight="true">{client.nextTripDate}</DetailText>
            </DetailRow>
            <DetailRow>
              <LocationIcon />
              <DetailText highlight="true">{client.location}</DetailText>
            </DetailRow>
          </div>
        ) : (
          <AddTripButton onClick={handleAddTripClick}>
            ADD NEW TRIP
          </AddTripButton>
        )}
        {isModalOpen && (
          <AddTripForm client={client} onClose={handleCloseModal} />
        )}
      </ClientCardDetails>
    </ClientCardContainer>
  );
};

export default ClientCard;
