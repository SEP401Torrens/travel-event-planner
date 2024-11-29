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
  background-color: #1e0e62;
  border-radius: 15px;
  padding: 38px 38px;
  width: 900px;
  /* height: 570px; */
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

    &:hover {
      color: #20c997;
    }
  }
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: white;
  margin: 20px 0;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.$highlight ? "#20c997" : "white")};
  margin-bottom: 10px;
  text-transform: uppercase;
`;

export const TripDetailsContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
  gap: 5px;
  overflow-wrap: break-word;
  white-space: normal;
  flex-wrap: wrap;
  flex-direction:row;
`;
