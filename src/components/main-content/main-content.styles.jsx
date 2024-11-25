import styled from "styled-components";

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Keeps pagination at the bottom */
  padding: 30px 40px;
  min-height: 100vh; /* Ensures the full height is utilized */
`;

export const ClientListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  gap: 20px;
`;