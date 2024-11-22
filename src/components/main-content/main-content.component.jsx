import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content } from "./main-content.styles.jsx";
import { fetchClients } from "../../store/client/client.reducer";
import ClientList from "../client-list/client-list.component.jsx";
import SearchBar from "../search-bar/search-bar.component.jsx";
import {
  allClientsData,
  clientsDataStatus,
  clientsDataError,
} from "../../store/client/client.selector.js";

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const clients = useSelector(allClientsData);
  const clientStatus = useSelector(clientsDataStatus);
  const error = useSelector(clientsDataError);

  useEffect(() => {
    if (clientStatus === "idle") {
      dispatch(fetchClients());
    }
  }, [clientStatus, dispatch]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredClients = clients.filter((client) =>
    `${client.firstName} ${client.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  let content;

  if (clientStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (clientStatus === "succeeded") {
    content = <ClientList clients={filteredClients} />;
  } else if (clientStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <Content>
      <SearchBar onSearchChange={handleSearchChange} />
      {content}
    </Content>
  );
};

export default MainContent;
