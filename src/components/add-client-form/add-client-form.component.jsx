import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customSelectStyles,
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
  // Select,
} from "./add-client-form.styles";
import { ReactComponent as CloseButton } from "../../assets/icons/close.svg";
import { addClient } from "../../store/client/client.reducer";
import { selectCategories } from "../../store/categories/categories.selector";
import Select from "react-select";

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
  const categories = useSelector(selectCategories);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const newErrors = {};

    if (
      !formFields.firstName ||
      !formFields.lastName ||
      !formFields.email ||
      !formFields.totalBudget ||
      !formFields.phone ||
      !formFields.favoriteEventTypes
    ) {
      newErrors.favoriteEventTypes = "Inputs is required";
    }
    setIsSaveDisabled(Object.keys(newErrors).length > 0);
  }, [formFields]);

  const handleChange = (event, actionMeta) => {
    if (actionMeta) {
      const { name } = actionMeta;
      setFormFields({ ...formFields, [name]: event });
    } else {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addClient(formFields)).then(() => {
      onClose();
    });
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

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
              {/* 
                <Select
                name="favoriteEventTypes"
                value={formFields.favoriteEventTypes}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select ...
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
                
                
                */}
              <Select
                name="favoriteEventTypes"
                value={formFields.favoriteEventTypes}
                onChange={handleChange}
                options={categoryOptions}
                styles={customSelectStyles}
              />
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
          <SaveButton type="submit" disabled={isSaveDisabled}>
            SAVE
          </SaveButton>
        </ModalForm>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddClientModal;
