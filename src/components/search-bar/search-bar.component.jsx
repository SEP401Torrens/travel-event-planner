import { useState } from "react";
import {
  AddClientButton,
  SearchBarContainer,
  SearchInput,
} from "./search-bar.styles";
import AddClientModal from "../add-client-form/add-client-form.component";

const SearchBar = ({ onSearchChange }) => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const openAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

  const closeAddClientModal = () => {
    setIsAddClientModalOpen(false);
  };

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };
  
  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="search by name or phone number"
        onChange={handleInputChange}
      />
      <AddClientButton onClick={openAddClientModal}>ADD CLIENT</AddClientButton>
      {isAddClientModalOpen && <AddClientModal onClose={closeAddClientModal} />}
    </SearchBarContainer>
  );
};

export default SearchBar;
