import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: #1e0e62;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 400px;
  width: 100%;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: #20c997;
    }
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: #f56868;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #f44336;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  color: #1e0e62;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #aaa;
  }
`;
