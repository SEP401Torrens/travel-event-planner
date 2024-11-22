import {
  AddClientButton,
  SearchBarContainer,
  SearchInput,
} from "./search-bar.styles";

const SearchBar = ({ onSearchChange }) => {
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
      <AddClientButton>ADD CLIENT</AddClientButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
