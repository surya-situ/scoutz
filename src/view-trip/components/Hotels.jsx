import { v4 as uuidv4 } from "uuid";
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData.travel_plan.hotels;

  // Loader if trip or userSelection is undefined
  if (!trip || !hotels) {
    return <></>;
  }

  return (
    <div className="font-poppins">
      <h2 className="font-bold text-xl mt-10">
        Recommended hotels 🏩
      </h2>

      <div className="grid grid-rows-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {hotels.map((hotel) => {
          return (
            <HotelCard
              key={uuidv4()}
              hotel={hotel}
              trip={trip}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;
