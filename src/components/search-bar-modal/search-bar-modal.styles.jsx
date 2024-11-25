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
  color: #1E0E62;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
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