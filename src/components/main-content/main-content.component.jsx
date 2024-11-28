import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Content, ClientListWrapper } from "./main-content.styles.jsx";
import {
  fetchClients,
  setCurrentPage,
} from "../../store/client/client.reducer";
import ClientList from "../client-list/client-list.component.jsx";
import SearchBar from "../search-bar/search-bar.component.jsx";
import {
  allClientsData,
  clientsDataStatus,
  clientsDataError,
  selectTotalPages,
  selectCurrentPage,
} from "../../store/client/client.selector.js";
import Pagination from "../pagination/pagination.component.jsx";

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const clients = useSelector(allClientsData);
  const clientStatus = useSelector(clientsDataStatus);
  const error = useSelector(clientsDataError);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    dispatch(
      fetchClients({
        currentPage,
        pageSize: 8,
        searchTerm: searchQuery || null,
      })
    );
  }, [currentPage, searchQuery, dispatch]);


  const handleSearchChange = (query) => {
    setSearchQuery(query);
    dispatch(setCurrentPage(1));
  };

  // const filteredClients = clients.filter((client) =>
  //   `${client.firstName} ${client.lastName}`
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase())
  // );

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  let content;

  if (clientStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (clientStatus === "succeeded") {
    content = <ClientList clients={clients} />;
  } else if (clientStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <Content>
      <SearchBar onSearchChange={handleSearchChange} />
      <ClientListWrapper>{content}</ClientListWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Content>
  );
};

export default MainContent;
