import ClientCard from "../client-card/client-card.component";
import { ClientListContainer } from "./client-list.styles";

const ClientList = ({ clients }) => {
  return (
    <ClientListContainer>
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </ClientListContainer>
  );
};

export default ClientList;
