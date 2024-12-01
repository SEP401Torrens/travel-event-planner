import React, { useEffect } from "react";
import {
  TimelineContainer,
  TimelineWrapper,
  TimelineItem,
} from "./timeline.styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchAllEventsForTrip } from "../../store/events/events.reducer";
import {
  selectEvents,
  selectEventsError,
  selectEventsStatus,
} from "../../store/events/events.selector";
import { OrbitProgress } from "react-loading-indicators";
import { notification } from "../../utils/notification.utils";
import { ReactComponent as TrashButton } from "../../assets/icons/trash.svg";

const Timeline = ({ tripId }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => selectEvents(state, tripId));
  const status = useSelector(selectEventsStatus);
  const error = useSelector(selectEventsError);

  useEffect(() => {
    if (!events.length) {
      dispatch(fetchAllEventsForTrip(tripId));
    }
  }, [dispatch, tripId, events.length]);

  const truncateText = (text, maxLength = 29) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleDeleteEvent = (eventTripId) => {
    dispatch(deleteEvent({ clientTripId: tripId, eventTripId })).then((action) => {
      if (action.type === deleteEvent.fulfilled.type) {
        notification("Successfully deleted event", "success");
      } else {
        notification(`Failed to delete event: ${action.payload}`, "error");
      }
    });
  };

  return (
    <TimelineWrapper>
      <TimelineContainer>
        {status === "loading" && <OrbitProgress color="#ffffff" size="small" />}
        {status === "failed" && events.length === 0 && (<div>{error}</div>)}
        {events.map((event, index) => (
            <TimelineItem
              key={index}
              side={event.side}
              position={event.position}
            >
              <div className="left-container">
                {event.side === "left" && (
                  <span>
                    {`${truncateText(event.name)} - ${event.startDate}`}
                    <TrashButton onClick={() => handleDeleteEvent(event.id)} />
                  </span>
                )}
              </div>
              <div className="right-container">
                {event.side === "right" && (
                  <span>
                    {`${truncateText(event.name)} - ${event.startDate}`}
                    <TrashButton onClick={() => handleDeleteEvent(event.id)} />
                  </span>
                )}
              </div>
            </TimelineItem>
          ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};

export default Timeline;
