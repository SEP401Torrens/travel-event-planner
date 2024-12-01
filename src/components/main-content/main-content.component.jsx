import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Content,
  ClientListWrapper,
  LoadingContainer,
} from "./main-content.styles.jsx";
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
import { OrbitProgress } from "react-loading-indicators";
import { notification } from "../../utils/notification.utils.js";
import { calculatePageSize } from "../../utils/calculatePageSize.js";

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const clients = useSelector(allClientsData);
  const clientStatus = useSelector(clientsDataStatus);
  const error = useSelector(clientsDataError);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  const pageSize = calculatePageSize();
  console.log("pageSize", pageSize);

  useEffect(() => {
    dispatch(
      fetchClients({
        currentPage,
        pageSize,
        searchTerm: searchQuery || null,
      })
    ).then((action) => {
      if (action.type === fetchClients.rejected.type) {
        notification("Something went wrong, please try later.", "error");
      }
    });
  }, [currentPage, pageSize, searchQuery, dispatch]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  let content;
  console.log("clientStatus", clientStatus);

  if (clientStatus === "loading") {
    content = (
      <LoadingContainer>
        <OrbitProgress color="#1e0e62" size="small" />
      </LoadingContainer>
    );
  } else if (clientStatus === "succeeded") {
    content = <ClientList clients={clients} />;
  } else if (clientStatus === "failed" && clients.length === 0) {
    content = <div>{error}</div>;
  } else {
    content = <ClientList clients={clients} />;
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
