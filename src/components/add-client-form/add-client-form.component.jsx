import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Divider,
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
  Select,
} from "./add-client-form.styles";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { addClient } from "../../store/client/client.reducer";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  favoriteEventTypes: "",
  totalBudget: "",
};

const AddClientModal = ({ onClose }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
     dispatch(addClient(formFields)).then(() => {
      onClose(); 
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Client Information</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <Divider />
        <ModalForm onSubmit={handleSubmit}>
          <FormRow>
            <InputWrapper>
              <Label>FIRST NAME</Label>
              <Input
                type="text"
                name="firstName"
                value={formFields.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label>LAST NAME</Label>
              <Input
                type="text"
                name="lastName"
                value={formFields.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </InputWrapper>
          </FormRow>
          <FormRow>
            <InputWrapper>
              <Label>E-MAIL</Label>
              <Input
                type="email"
                name="email"
                value={formFields.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Label>PHONE</Label>
              <Input
                type="text"
                name="phone"
                value={formFields.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </InputWrapper>
          </FormRow>
          <FormRow>
            <InputWrapper>
              <Label>FAVORITE EVENT TYPES</Label>
              <Select
                name="favoriteEventTypes"
                value={formFields.favoriteEventTypes}
                onChange={handleChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="Sports">Sports</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Music">Music</option>
                <option value="Arts">Arts</option>
                <option value="Arts & Theatre">Arts & Theatre</option>
                <option value="Film">Film</option>
              </Select>
            </InputWrapper>
            <InputWrapper>
              <Label>TOTAL BUDGET</Label>
              <Input
                type="number"
                name="totalBudget"
                value={formFields.totalBudget}
                onChange={handleChange}
                placeholder="Total Budget"
                required
              />
            </InputWrapper>
          </FormRow>
          <SaveButton type="submit">SAVE</SaveButton>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddClientModal;
