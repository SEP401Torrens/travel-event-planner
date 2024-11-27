import {
  EmptyTripMessage,
  TripButtonContainer,
  TripContentContainer,
  TripHeader,
  TripList,
  TripRow,
} from "./trip-content.styles";
import { ReactComponent as TrashButton } from "../../../assets/icons/trash.svg";
import { ReactComponent as ShowButton } from "../../../assets/icons/eye.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteClientTrip,
  fetchClientTrips,
  setCurrentPage,
} from "../../../store/client/client.trip.reducer";
import { notification } from "../../../utils/notification.utils";
import { clearClientTrip } from "../../../store/client/client.reducer";

const TripContent = ({ clientId }) => {
  const dispatch = useDispatch();
  const { trips, currentPage, totalPages, status } = useSelector(
    (state) => state.clientTrips
  );
  const [initialPageSet, setInitialPageSet] = useState(false);

  useEffect(() => {
    if (!initialPageSet) {
      if (currentPage[clientId] === undefined) {
        dispatch(setCurrentPage({ clientId, page: 1 }));
      } else {
        dispatch(
          fetchClientTrips({
            clientId,
            currentPage: currentPage[clientId],
            pageSize: 8,
          })
        );
      }
      setInitialPageSet(true);
    } else if (currentPage[clientId] !== undefined) {
      dispatch(
        fetchClientTrips({
          clientId,
          currentPage: currentPage[clientId],
          pageSize: 8,
        })
      );
    }
  }, [dispatch, clientId, currentPage, initialPageSet]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage({ clientId, page: newPage }));
  };

  const handleShowTrip = (tripId) => {
    console.log("handleShowTrip", tripId);
  };

  const handleRemoveTrip = (tripId) => {
    dispatch(deleteClientTrip(tripId)).then((action) => {
      if (action.type === deleteClientTrip.fulfilled.type) {
        // Check if there are any remaining trips for the client
        const remainingTrips = (trips[clientId] || []).filter(
          (trip) => trip.id !== tripId
        );
        if (remainingTrips.length === 0) {
          dispatch(clearClientTrip({ clientId }));
        }
        notification("Successfully trip deleted", "success");
      } else {
        console.error("Failed to delete trip:", action.error.message);
      }
    });
  };

  return (
    <TripContentContainer>
      <TripList>
        <TripHeader>
          <span>LOCATION</span>
          <span>TRAVEL START</span>
          <span>TRAVEL END</span>
          <span>BUDGET</span>
          <span></span>
        </TripHeader>

        {status === "loading" && <div>Loading...</div>}
        {status === "succeeded" &&
        trips[clientId] &&
        trips[clientId].length > 0 ? (
          trips[clientId].map((trip) => (
            <TripRow key={trip.id}>
              <span>{trip.location}</span>
              <span>{trip.travelStartDate}</span>
              <span>{trip.travelEndDate}</span>
              <span>{trip.budget}</span>

              <TripButtonContainer>
                <ShowButton onClick={() => handleShowTrip(trip.id)} />
                <TrashButton onClick={() => handleRemoveTrip(trip.id)} />
              </TripButtonContainer>
            </TripRow>
          ))
        ) : (
          <EmptyTripMessage>Please add a trip to the client.</EmptyTripMessage>
        )}
      </TripList>
      {totalPages > 1 && (
        <div>
          <button
            onClick={() => handlePageChange(currentPage[clientId] - 1)}
            disabled={currentPage[clientId] === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage[clientId] + 1)}
            disabled={currentPage[clientId] === totalPages[clientId]}
          >
            Next
          </button>
        </div>
      )}
    </TripContentContainer>
  );
};

export default TripContent;