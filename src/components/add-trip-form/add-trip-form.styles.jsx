import styled from "styled-components";

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #1e0e62;
  border-radius: 15px;
  width: 600px;
  padding: 20px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    color: white;
    cursor: pointer;
  }
`;

export const ModalTitle = styled.h2`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #20c997;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #17a589;
  }
`;

export const Divider = styled.div`
  height: 2px;
  background-color: white;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const EventList = styled.div`
  margin-top: 15px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 5px;
`;

export const EventHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 10px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid white;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
  }
`;

export const EventRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #3a2a72;

  span {
    font-size: 16px;
    color: #ffffff;
  }

  &:last-child {
    border-bottom: none;
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    color: white;
    cursor: pointer;

    &:hover {
      color: #20c997;
    }
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #20c997;
  }
`;

export const AddEventButton = styled.button`
  background-color: #00c896;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #00a57e;
  }

  &:active {
    background-color: #008e6c;
  }
`;

export const SearchButton = styled.button`
  background-color: #0ad4fa;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0ac3e6;
  }

  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#20c997")};
  color: #1e0e62;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  align-self: flex-end;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#17a589")};
  }

  &:active {
    background-color: #008e6c;
  }
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const EmptyEventMessage = styled.div`
  color: white;
  text-align: center;
  margin-top: 10px;
`;

export const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    padding: "2px",
    border: "1px solid white",
    borderColor: "red",
    borderRadius: "5px",
    fontSize: "14px",
    color: "black",
    boxShadow: "none",

    "&:hover": {
      borderColor: "white",
    },
    "&:focus": {
      borderColor: "#20c997",
      boxShadow: "0 0 0 1px #00c896",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    opacity: 0.8,
  }),

  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected ? "#20c997" : "transparent",
    "&:hover": {
      backgroundColor: "#d5f5df",
    },
  }),
};