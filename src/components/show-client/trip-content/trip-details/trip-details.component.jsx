import {
  Divider,
  Label,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  TripDetailsContent,
} from "./trip-details.styles";
import { ReactComponent as CloseButton } from "../../../../assets/icons/close.svg";
import Timeline from "../../../timeline/timeline.component";

const TripDetails = ({ trip, onClose }) => {
  console.log("trip", trip);
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Trip Details</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <Divider />
        <TripDetailsContent>
          <Label>LOCATION: </Label> 
          <Label $highlight>{trip.location}</Label>
          <Label>TRAVEL START DATE:</Label>
          <Label $highlight>{trip.travelStartDate}</Label>
          <Label>TRAVEL END DATE:</Label>
          <Label $highlight>{trip.travelEndDate}</Label>
          <Label>INTEREST: </Label>
          <Label $highlight>{trip.interest} </Label>
        </TripDetailsContent>
         <ModalHeader>
          <ModalTitle>Events</ModalTitle>
        </ModalHeader>
        <Divider />
        <Timeline />
      </ModalContent>
    </ModalOverlay>
  );
};

export default TripDetails;
