import {
  ClientInfoContentContainer,
  Label,
} from "./client-info-content.styles";

const ClientInfoContent = ({ client }) => {
  return (
    <ClientInfoContentContainer>
      <Label>FIRST NAME: {client.firstName}</Label>
      <Label>LAST NAME: {client.lastName}</Label>
      <Label>E-MAIL: {client.email}</Label>
      <Label>PHONE: {client.phone}</Label>
      <Label>FAVORITE EVENT TYPES: {client.favoriteEventTypes.label}</Label>
      <Label>TOTAL BUDGET: ${client.totalBudget}</Label>
    </ClientInfoContentContainer>
  );
};

export default ClientInfoContent;
