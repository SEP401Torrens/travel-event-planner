import {
  ClientCardContainer,
  ClientCardDetails,
  ClientCardHeader,
  DetailLabel,
  DetailRow,
  DetailText,
  Divider,
  AddTripButton,
  DeleteButton,
} from "./client-card.styles";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/close.svg";

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

  const handleDeleteClick = () => {
    console.log("delete client");
  };

  return (
    <ClientCardContainer>
      <ClientCardHeader>
        <span>
        {client.firstName} {client.lastName}
        </span>
        <DeleteButton onClick={handleDeleteClick}>
          <DeleteIcon />
        </DeleteButton>
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
