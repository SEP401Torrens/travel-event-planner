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
import { ReactComponent as ShowIcon } from "../../assets/icons/eye.svg";

import AddTripForm from "../add-trip-form/add-trip-form.component";
import { useState } from "react";
import ConfirmationModal from "../confirmation-modal/confirmation-modal.component";
import { useDispatch } from "react-redux";
import { deleteClient } from "../../store/client/client.reducer";
import { notification } from "../../utils/notification.utils";
import ShowClient from "../show-client/show-client.component";

const ClientCard = ({ client }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isShowClientDetailsOpen, setIsShowClientDetailsOpen] = useState(false);
  
  
  const dispatch = useDispatch();

  const handleAddTripClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteClient(client.id));
    notification("Successfully deleted", "success");
    setIsConfirmationModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleShowClientDetails = () => {
    setIsShowClientDetailsOpen(true)
  }

  const handleCloseShowClientModal = () =>{
    setIsShowClientDetailsOpen(false)
  }

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
          <DetailLabel>SHOW DETAILS</DetailLabel>
          <ShowIcon onClick={handleShowClientDetails}/>
        </DetailRow>
        <DetailRow>
          <DetailLabel>NEXT TRIP</DetailLabel>
        </DetailRow>

        {client.nextTripDate && client.location ? (
          <div>
            <DetailRow>
              <CalendarIcon />
              <DetailText $highlight="true">{client.nextTripDate}</DetailText>
            </DetailRow>
            <DetailRow>
              <LocationIcon />
              <DetailText $highlight="true">{client.location}</DetailText>
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
        {isConfirmationModalOpen && (
          <ConfirmationModal
            message={`Are you sure you want to delete ${client.firstName} ${client.lastName} ?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        {isShowClientDetailsOpen && (
          <ShowClient client={client} onClose={handleCloseShowClientModal}/>
        )}
      </ClientCardDetails>
    </ClientCardContainer>
  );
};

export default ClientCard;
