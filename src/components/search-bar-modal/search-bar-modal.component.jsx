import {
  Input,
  SearchBarContainer,
  SearchButton,
  Select,
  RowContainer,
} from "./search-bar-modal.styles";

const ModalSearchBar = ({
  searchKeyword,
  handleInputChange,
  availableEvents,
  selectedEvent,
  handleAddEvent,
  onSearch,
}) => {
  return (
    <SearchBarContainer>
      <RowContainer>
        <Input
          type="text"
          placeholder="Enter keyword"
          value={searchKeyword}
          onChange={handleInputChange}
        />
        <SearchButton type="button" onClick={onSearch}>
          SEARCH
        </SearchButton>
      </RowContainer>
      {availableEvents.length > 0 && (
        <Select
          onChange={(e) => handleAddEvent(e.target.value)} // Pass the selected value
          value={selectedEvent}
        >
          <option value="" disabled>
            Select an event
          </option>
          {availableEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {event.date}
            </option>
          ))}
        </Select>
      )}
    </SearchBarContainer>
  );
};

export default ModalSearchBar;