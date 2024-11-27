import { EmptyTripMessage, TripButtonContainer, TripContentContainer, TripHeader, TripList, TripRow } from "./trip-content.styles"
import { ReactComponent as TrashButton } from "../../../assets/icons/trash.svg";
import { ReactComponent as ShowButton } from "../../../assets/icons/eye.svg";


export const mockTrips = [
  {
    id: 1,
    location: "New York",
    travelStartDate: "2023-11-01",
    travelEndDate: "2023-11-10",
    budget: 1500,
  },
  {
    id: 2,
    location: "Paris",
    travelStartDate: "2023-12-05",
    travelEndDate: "2023-12-15",
    budget: 2000,
  },
  {
    id: 3,
    location: "Tokyo",
    travelStartDate: "2024-01-20",
    travelEndDate: "2024-01-30",
    budget: 2500,
  },
];


const TripContent = () => {

    const handleRemoveTrip = () => {
        console.log("remove trip")
    }

    const handleShowTrip = () =>{
        console.log("show trip")
    }


    return(
         <TripContentContainer>
                <TripList>
                  <TripHeader>
                    <span>LOCATION</span>
                    <span>TRAVEL START</span>
                    <span>TRAVEL END</span>
                    <span>BUDGET</span>
                    <span></span>
                  </TripHeader>

                  {mockTrips.length > 0 ? (
                    mockTrips.map((trip) => (
                      <TripRow key={trip.id}>
                        {console.log(trip)}
                        <span>{trip.location}</span>
                        <span>{trip.travelStartDate}</span>
                        <span>{trip.travelEndDate}</span>
                        <span>{trip.budget}</span>

                        <TripButtonContainer>
                          <ShowButton
                            onClick={() => handleShowTrip(trip.id)}
                          />
                          <TrashButton
                            onClick={() => handleRemoveTrip(trip.id)}
                          />
                        </TripButtonContainer>
                      </TripRow>
                    ))
                  ) : (
                    <EmptyTripMessage>
                      Please add a trip to the client.
                    </EmptyTripMessage>
                  )}
                </TripList>
              </TripContentContainer>
    )
}

export default TripContent;