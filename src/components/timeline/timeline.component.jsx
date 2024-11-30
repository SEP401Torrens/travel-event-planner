import React, { useEffect } from "react";
import {
  TimelineContainer,
  TimelineWrapper,
  TimelineItem,
} from "./timeline.styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEventsForTrip } from "../../store/events/events.reducer";
import { selectEvents, selectEventsError, selectEventsStatus } from "../../store/events/events.selector";
import { OrbitProgress } from "react-loading-indicators";

const Timeline = ({tripId}) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => selectEvents(state, tripId));
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);
 
   useEffect(() => {
     if (!events.length) {
       dispatch(fetchAllEventsForTrip(tripId));
     }
   }, [dispatch, tripId, events.length, events]);

  const truncateText = (text, maxLength = 33) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};
 
  return (
    <TimelineWrapper>
      <TimelineContainer>
        {status === "loading" && <OrbitProgress color="#ffffff" size="small" />}
        {status === "failed" && <div>{error}</div>}
        {status === "succeeded" &&
          events.map((event, index) => (
            <TimelineItem
              key={index}
              side={event.side}
              position={event.position}
            >
              <div className="left-container">
                {event.side === "left" && (
                  <span>{`${truncateText(event.name)} - ${
                    event.startDate
                  }`}</span>
                )}
              </div>
              <div className="right-container">
                {event.side === "right" && (
                  <span>{`${truncateText(event.name)} - ${
                    event.startDate
                  }`}</span>
                )}
              </div>
            </TimelineItem>
          ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};

export default Timeline;
