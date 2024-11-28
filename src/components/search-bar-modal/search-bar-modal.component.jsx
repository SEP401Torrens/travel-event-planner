import {  useSelector } from "react-redux";
import {
  Input,
  SearchBarContainer,
  SearchButton,
  // Select,
  RowContainer,
  customSelectStyles,
} from "./search-bar-modal.styles";
import { useState } from "react";
import Select from "react-select";

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

  const handleSelectEvent = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    const event = availableEvents.find((event) => event.id === selectedOption.value.id);
    console.log("event", event);
    if (event) {
      setSelectedEvent(event);
      handleAddEvent(event); // Call the callback function to add the event
    }
  };

   const eventOptions = availableEvents?.map((event) => ({
     value: event,
     label: `${event.name} - ${event.startDate}`,
   }));

  console.log("eventOptions", eventOptions);

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
        <Select
          styles={customSelectStyles}
          options={eventOptions}
          onChange={handleSelectEvent}
          value={selectedEvent ?  { value: selectedEvent, label: `${selectedEvent.name} - ${selectedEvent.startDate}` } : null}
          placeholder="Select an event"
        />
      )}
    </SearchBarContainer>
  );
};

export default ModalSearchBar;