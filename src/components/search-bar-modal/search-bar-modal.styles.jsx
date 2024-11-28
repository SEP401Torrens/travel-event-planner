import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack items vertically */
  gap: 10px; /* Spacing between items */
  margin: 20px 0;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center; /* Align input and button vertically */
  gap: 10px; /* Spacing between input and button */
`;

export const Input = styled.input`
  flex: 1; /* Make the input take the remaining space */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0ad4fa;
  }
`;

export const SearchButton = styled.button`
  background-color: #20c997;
  color: #1e0e62;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0ac3e6;
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: #0ad4fa;
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
    fontSize: "16px",
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
