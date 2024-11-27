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
  width: auto;
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

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  gap: 30px;
`;

export const Sidebar = styled.div`
  background-color: #1e0e62;
  width: 180px;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  border-radius: 10px;
  border: 2px solid #faf9fa;
`;

export const SidebarItem = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#20c997" : "white")};
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    color: ${(props) => (props.isActive ? "#20c997" : "white")};
    cursor: pointer;
  }

  &:hover {
    background-color: #2b1d6b;
  }
`;