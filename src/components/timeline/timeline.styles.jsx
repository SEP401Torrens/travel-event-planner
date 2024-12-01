import styled from "styled-components";

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 10px; 
  padding: 20px;
  width: 100%;
  max-height: 30vh;
  overflow-y: auto; 
  position: relative;
`;
export const TimelineItem = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  padding: 10px 0;

  // Line (vertical)
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background-color: #20c997;
    top: ${({ position }) => (position === "start" ? "50%" : "0")};
    bottom: ${({ position }) => (position === "end" ? "50%" : "0")};
  }

  // Dot (circle)
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 10px;
    height: 10px;
    background-color: #20c997;
    border-radius: 50%;
    z-index: 1;
  }

  // Left container for text
  .left-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    padding-right: 10px;
    text-align: right;
  }

  // Right container for text
  .right-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    padding-left: 10px;
    text-align: left;
  }

  span {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 10px 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #1e0e62;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    gap: 5px;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    color: #1e0e62;

    &:hover {
      color: #20c997;
    }
  }
`;

export const TimelineWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  position: relative;
`;

export const VerticalLine = styled.div`
  position: absolute;
  left: 50px; 
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #20c997;
`;

export const EventWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  position: relative;
`;

export const DateBox = styled.div`
  background-color: #1e0e62;
  color: #fff;
  border: 2px solid #20c997;
  border-radius: 5px;
  padding: 5px 10px;
  min-width: 80px;
  text-align: center;
  position: absolute;
  left: 0; 
  transform: translateX(-120%); // adjust pos
`;

export const EventBox = styled.div`
  background-color: #fff;
  color: #1e0e62;
  border-radius: 5px;
  padding: 10px 15px;
  margin-left: 100px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  min-width: 200px;
`;