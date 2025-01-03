import styled from "styled-components";

export const ClientCardContainer = styled.div`
  width: 220px;
  background-color: #1e0e62;
  color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 10px;
  margin: 10px 0px 10px 0px;
`;

export const ClientCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  color: white;
  word-wrap: break-word;
  white-space: normal;
  overflow-wrap: break-word;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  height: 2px;
  background-color: white;
  border: none;
  margin: 10px 0;
`;

export const ClientCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;

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

export const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const DetailText = styled.span`
  font-size: 14px;
  color: ${(props) => (props.$highlight ? "#20c997" : "white")};
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Show ellipsis for long text */
  max-width: calc(100% - 40px); /* Ensure text does not overlap with SVG */
`;

export const AddTripButton = styled.button`
  padding: 10px 20px;
  background-color: #20c997;
  color: #1e0e62;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #17a589;
  }
`;
export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

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
