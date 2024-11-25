import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px; 
`;

export const PageButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  background-color: #20c997;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin: 0 10px;
  color: #1E0E62;
`;
