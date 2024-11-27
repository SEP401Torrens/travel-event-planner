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

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  letter-spacing: 2px;
`;

export const ClientInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 480px;
  height: 300px;
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

// Trips
export const TripContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 300px;
`;

export const TripList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 10px 0px;
  border-radius: 5px;
`;

export const TripHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr; 
  gap: 10px;
  align-items: center;
  padding: 5px 0; 
  border-bottom: 2px solid white;

  span {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    text-align: left; 
  }
`;

export const TripRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr; 
  gap: 10px;
  align-items: center;
  padding: 10px 0; 
  border-bottom: 1px solid #3a2a72;

  span {
    font-size: 16px;
    color: #ffffff;
    text-align: left; 
  }

  &:last-child {
    border-bottom: none;
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
    cursor: pointer;

    &:hover {
      color: #20c997;
    }
  }
`;

export const TripButtonContainer = styled.div`
  display: flex;
`;

export const EmptyTripMessage = styled.div`
  color: white;
  text-align: center;
  margin-top: 10px;
`;
