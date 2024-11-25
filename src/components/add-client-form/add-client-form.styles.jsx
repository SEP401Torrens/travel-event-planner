import styled from "styled-components";

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
  background-color: #1E0E62;
  border-radius: 15px;
  padding: 38px 38px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    color: white;
    cursor: pointer;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: #ffffff;
  margin: 20px 0;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
  letter-spacing: 2px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #20c997;
    box-shadow: 0 0 5px rgba(32, 201, 151, 0.5);
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #20c997;
    box-shadow: 0 0 5px rgba(32, 201, 151, 0.5);
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#20c997")};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  align-self: flex-end;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#17a589")};
  }
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