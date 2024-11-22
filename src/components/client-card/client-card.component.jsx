import {
  ClientCardContainer,
  ClientCardDetails,
  ClientCardHeader,
  DetailLabel,
  DetailRow,
  DetailText,
  Divider,
} from "./client-card.styles";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";

const ClientCard = ({ client }) => {
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
        <DetailRow>
          <CalendarIcon />
          <DetailText highlight="true">{client.nextTripDate}</DetailText>
        </DetailRow>
        <DetailRow>
          <LocationIcon />
          <DetailText highlight="true">{client.location}</DetailText>
        </DetailRow>
      </ClientCardDetails>
    </ClientCardContainer>
  );
};

export default ClientCard;
