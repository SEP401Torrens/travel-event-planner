import { useEffect, useState } from "react";
import {
  ButtonContainer,
  customSelectStyles,
  Divider,
  EmptyEventMessage,
  EventHeader,
  EventList,
  EventRow,
  FormRow,
  Input,
  InputWrapper,
  Label,
  ModalContent,
  ModalForm,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  SaveButton,
} from "./add-trip-form.styles";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { ReactComponent as TrashButton } from "../../assets/icons/trash.svg";
import ModalSearchBar from "../search-bar-modal/search-bar-modal.component";
import { useDispatch, useSelector } from "react-redux";
import { updateClientTrip } from "../../store/client/client.reducer";
import { selectCategories } from "../../store/categories/categories.selector";
import { selectLocations } from "../../store/location/location.selector";
import Select from "react-select";
import { addClientTrip } from "../../store/client/client.trip.reducer";
import { format } from "date-fns";

const defaultFormFields = {
  location: null,
  budget: 0,
  startDate: "",
  endDate: "",
  interest: null,
};
// clientId dont include

const AddTripForm = ({ client, onClose }) => {
  const [tripDetails, setTripDetails] = useState(defaultFormFields);
  const [currentModal, setCurrentModal] = useState("trip"); // 'trip' or 'event'
  const [searchKeyword, setSearchKeyword] = useState("");
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const locations = useSelector(selectLocations);

  useEffect(() => {
    const newErrors = {};
    if (!tripDetails.location) {
      newErrors.location = "Location is required";
    }
    if (!tripDetails.interest) {
      newErrors.interest = "Principal interest is required";
    }
    if (!tripDetails.budget || tripDetails.budget <= 0) {
      newErrors.budget = "Budget interest is required";
    }
    if (!tripDetails.startDate) {
      newErrors.startDate = "Start Date interest is required";
    }
    if (!tripDetails.endDate) {
      newErrors.endDate = "Start End interest is required";
    }
    setIsNextDisabled(Object.keys(newErrors).length > 0);
  }, [tripDetails]);

  const fetchEvents = async () => {
    const simulatedEvents = [
      { id: 1, name: "Concert A", date: "2024-12-01" },
      { id: 2, name: "Festival B", date: "2024-12-05" },
      { id: 3, name: "Exhibition C", date: "2024-12-10" },
    ].filter((event) =>
      event.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAvailableEvents(simulatedEvents);
  };

  const handleTripChange = (selectedOption, actionMeta) => {
    if (actionMeta) {
      const { name } = actionMeta;
      setTripDetails({ ...tripDetails, [name]: selectedOption });
    } else {
      const { name, value } = selectedOption.target;
      setTripDetails({ ...tripDetails, [name]: value });
    }
  };

  // add client trip
  const handleNext = async () => {
    dispatch(
      addClientTrip({
        clientId: client.id,
        startDate: tripDetails.startDate,
        endDate: tripDetails.endDate,
        location: tripDetails.location.value.id,
        interest: tripDetails.interest.value,
        budget: tripDetails.budget,
      })
    ).then((action) => {
        if (action.type === addClientTrip.fulfilled.type) {
          dispatch(
          updateClientTrip({
            clientId: client.id,
            nextTripDate: tripDetails.startDate,
            location: tripDetails.location.value.country,
            interest: tripDetails.interest,
            budget: tripDetails.budget,
          })
        );
          fetchEvents();
          setCurrentModal('event'); 
        } else {
          console.error('Failed to add client trip:', action.error.message);
        }
      })
  };

  const handleSearch = async () => {
    //todo: to backend fetch events
    await fetchEvents();
  };

  const handleAddEvent = (eventId) => {
    const selectedEvent = availableEvents.find(
      (event) => event.id === parseInt(eventId, 10)
    );

    if (
      selectedEvent &&
      !selectedEvents.some((event) => event.id === selectedEvent.id)
    ) {
      setSelectedEvents((prev) => [...prev, selectedEvent]);
    }
  };

  const handleRemoveEvent = (eventId) => {
    setSelectedEvents((prev) =>
      prev.filter((event) => event.id !== parseInt(eventId, 10))
    );
  };

  const handleSave = () => {
    //todo: send to backend

    
    onClose();
  };

  const locationOptions = locations.map((location) => ({
    value: location,
    label: location.country,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {currentModal === "trip" ? "Add Trip" : "Add Events for Trip"}
          </ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <Divider />
        {currentModal === "trip" ? (
          <ModalForm>
            <FormRow>
              <InputWrapper>
                <Label>Location</Label>
                <Select
                  name="location"
                  value={tripDetails.location}
                  onChange={handleTripChange}
                  options={locationOptions}
                  styles={customSelectStyles}
                  isSearchable
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Budget</Label>
                <Input
                  type="number"
                  name="budget"
                  value={tripDetails.budget}
                  onChange={handleTripChange}
                  placeholder="5000"
                  required
                />
              </InputWrapper>
            </FormRow>
            <FormRow>
              <InputWrapper>
                <Label>Travel Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  value={tripDetails.startDate}
                  onChange={handleTripChange}
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Label>Travel End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  value={tripDetails.endDate}
                  onChange={handleTripChange}
                  required
                />
              </InputWrapper>
            </FormRow>
            <FormRow>
              <InputWrapper>
                <Label>Principal Interest</Label>
                <Select
                  name="interest"
                  value={tripDetails.interest}
                  onChange={handleTripChange}
                  options={categoryOptions}
                  styles={customSelectStyles}
                />
              </InputWrapper>
            </FormRow>
            <SaveButton
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              NEXT
            </SaveButton>
          </ModalForm>
        ) : (
          <div>
            <FormRow>
              <InputWrapper>
                <Label>Location</Label>
                <div style={{ color: "#20c997" }}>
                  {tripDetails.location.label}
                </div>
              </InputWrapper>
              <InputWrapper>
                <Label>Travel Start Date</Label>
                <div style={{ color: "#20c997" }}>{format(new Date(tripDetails.startDate), "dd/MM/yyyy")}</div>
              </InputWrapper>
              <InputWrapper>
                <Label>Travel End Date</Label>
                <div style={{ color: "#20c997" }}>{format(new Date(tripDetails.endDate), "dd/MM/yyyy")}</div>
              </InputWrapper>
            </FormRow>
            <Divider />
            <Label style={{ marginBottom: "10px", color: "#ffffff" }}>
              Events
            </Label>
            <ModalSearchBar
              searchKeyword={searchKeyword}
              handleInputChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={handleSearch}
              availableEvents={availableEvents}
              handleAddEvent={handleAddEvent}
            />

            <EventList>
              <EventHeader>
                <span>Name</span>
                <span>Date</span>
                <span>Action</span>
              </EventHeader>

              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <EventRow key={event.id}>
                    <span>{event.name}</span>
                    <span>{event.date}</span>

                    <TrashButton onClick={() => handleRemoveEvent(event.id)} />
                  </EventRow>
                ))
              ) : (
                <EmptyEventMessage>
                  No selected events. Please add events to the list.
                </EmptyEventMessage>
              )}
            </EventList>
            <ButtonContainer>
              <SaveButton
                type="button"
                onClick={handleSave}
                disabled={selectedEvents.length === 0}
              >
                SAVE
              </SaveButton>
            </ButtonContainer>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddTripForm;
