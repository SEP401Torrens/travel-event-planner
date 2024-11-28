import {  useSelector } from "react-redux";
import {
  Input,
  SearchBarContainer,
  SearchButton,
  Select,
  RowContainer,
} from "./search-bar-modal.styles";
import { useState } from "react";

const ModalSearchBar = ({
  tripId,
  searchKeyword,
  handleInputChange,
  handleAddEvent,
  onSearch,
}) => {
  const eventStatus = useSelector((state) => state.events.status);
  const availableEvents = useSelector((state) => state.events.events[tripId]);
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleSelectEvent = (eventId) => {
    const event = availableEvents.find((event) => event.id === eventId);
    if (event) {
      setSelectedEvent(event);
      handleAddEvent(event); // Call the callback function to add the event
    }
  };

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
      {eventStatus === 'loading' && <div>Loading events...</div>}
      {eventStatus === 'succeeded' && (
        <Select onChange={(e) => handleSelectEvent(e.target.value)} value={selectedEvent.id || ''}>
          <option value="" disabled>
            Select an event
          </option>
          {availableEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {event.startDate}
            </option>
          ))}
        </Select>
      )}
    </SearchBarContainer>
  );
};

export default ModalSearchBar;