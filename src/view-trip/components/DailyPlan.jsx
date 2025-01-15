import { v4 as uuidv4 } from "uuid";
import DailyPlanCard from "./DailyPlanCard";

const DailyPlan = ({ trip }) => {
  const dailyPlan = trip?.tripData?.travel_plan?.itinerary;
  const location = trip?.tripData?.travel_plan?.location;
  // Loader if trip or userSelection is undefined
  if (!trip || !dailyPlan || !location) {
    return <></>;
  }

  const dailyPlanArray = Object.entries(dailyPlan).map(
    ([dayKey, dayDetails]) => ({
      dayKey,
      ...dayDetails,
    })
  );

  const sortedDailyPlan = dailyPlanArray.sort((a, b) => {
    const dayA = parseInt(a.dayKey.replace("day", ""));
    const dayB = parseInt(b.dayKey.replace("day", ""));
    return dayA - dayB;
  });

  return (
    <div className="font-poppins">
      <h2 className="font-bold text-xl mt-10">
        Places to visit 🏖️
      </h2>

      <div key={uuidv4()}>
        {sortedDailyPlan.map((plan) => {
          return (
            <div key={uuidv4()}>
              <h3 className="font-medium text-lg">{`Day ${plan.dayKey.slice(
                3
              )}`}</h3>
              <p className="text-sm text-gray-600">{`Theme: ${plan.theme}`}</p>
              <p className="text-sm text-orange-600">{`Best Time to Visit: ${plan.best_time_to_visit}`}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {plan.places.map((place) => {
                  return (
                    <DailyPlanCard
                      key={uuidv4()}
                      place={place}
                      trip={trip}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyPlan;
