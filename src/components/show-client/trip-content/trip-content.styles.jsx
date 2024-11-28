import styled from "styled-components";

export const TripContentContainer = styled.div`
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
