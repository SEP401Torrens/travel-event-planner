import { Divider, Label, ModalContent, ModalHeader, ModalOverlay, ModalTitle } from "./trip-details.styles";
import { ReactComponent as CloseButton } from "../../../../assets/icons/close.svg";


const TripDetails = ({ trip, onClose }) => {

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Trip Details</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <Divider />
        <Label>Trip ID: {trip.id}</Label>
        
      </ModalContent>
    </ModalOverlay>
  );
};

export default TripDetails;