import React from "react";
import {
  TimelineContainer,
  TimelineWrapper,
  TimelineItem,
} from "./timeline.styles";

const Timeline = () => {
  const events = [
    {
      id: 1,
      date: "01/01/2024",
      event: "Event X",
      side: "right",
      position: "start",
    },
    {
      id: 2,
      date: "15/01/2024",
      event: "Event Y",
      side: "left",
      position: "middle",
    },
    {
      id: 4,
      date: "15/01/2024",
      event: "Event Y",
      side: "right",
      position: "middle",
    },
    {
      id: 5,
      date: "15/01/2024",
      event: "Event Y",
      side: "left",
      position: "middle",
    },
    {
      id: 6,
      date: "15/01/2024",
      event: "Event Y",
      side: "right",
      position: "middle",
    },
    {
      id: 7,
      date: "15/01/2024",
      event: "Event Y",
      side: "left",
      position: "middle",
    },
    {
      id: 7,
      date: "15/01/2024",
      event: "Event YYYYYYYYYYYYYYYY",
      side: "right",
      position: "middle",
    },
    {
      id: 8,
      date: "15/01/2024",
      event: "NOMBRE EXTREMOOOO",
      side: "left",
      position: "middle",
    },
    {
      id: 9,
      date: "15/01/2024",
      event: "Event Y",
      side: "right",
      position: "middle",
    },
    {
      id: 10,
      date: "30/01/2024",
      event: "Event Z",
      side: "left",
      position: "end",
    },
  ];

 
  return (
    <TimelineWrapper>
      <TimelineContainer>
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            side={event.side}
            position={event.position}
          >
            <div className="left-container">
              {event.side === "left" && (
                <span>{`${event.event} - ${event.date}`}</span>
              )}
            </div>
            <div className="right-container">
              {event.side === "right" && (
                <span>{`${event.event} - ${event.date}`}</span>
              )}
            </div>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};

export default Timeline;
