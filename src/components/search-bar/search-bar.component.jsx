import {
  AddClientButton,
  SearchBarContainer,
  SearchInput,
} from "./search-bar.styles";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="search by name or phone number" />
      <AddClientButton>ADD CLIENT</AddClientButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
