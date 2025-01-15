import { FaShareAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const userSelection = trip?.tripData?.travel_plan;

  const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
  // Loader if trip or userSelection is undefined
  const isLoading = !trip || !userSelection;

  useEffect(() => {
    if (userSelection) {
      const getPlacePhoto = async () => {
        const data = {
          textQuery: userSelection.location,
        };
        const resp = await GetPlaceDetails(data);
        const photoName =
          resp.data?.places[0]?.photos[4]?.name;
        if (photoName) {
          const photoUrl = PHOTO_REF_URL.replace(
            "{NAME}",
            photoName
          );
          setPhotoUrl(photoUrl);
        }
        setIsPhotoLoading(false)
      };
      getPlacePhoto();
    }
  }, [userSelection]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AiOutlineLoading3Quarters className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-poppins">
      {isPhotoLoading ? (
        <div className="flex items-center justify-center h-[340px] bg-slate-200 w-full rounded-xl animate-pulse">
          <p className="text-sm">Loading...</p>
        </div>
      ) : photoUrl ? (
        <img
          className="h-[340px] w-full object-cover rounded-xl"
          src={photoUrl}
          alt={`${userSelection.location}-image`}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center h-[340px] bg-slate-200 w-full rounded-xl">
          <p className="text-sm">No media available!</p>
        </div>
      )}

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {userSelection.location}
        </h2>

        <div className="flex justify-between items-center flex-wrap gap-y-3">
          <div className="flex gap-5">
            <h2 className="p-1 bg-gray-200 rounded-full px-3 text-gray-500 text-xs md:text-md lg:text-lg">
              🗓️{userSelection.duration}{" "}
              {userSelection.duration > 1 ? "Days" : "Day"}
            </h2>

            <h2 className="p-1 bg-gray-200 rounded-full px-3 text-gray-500 text-xs md:text-md lg:text-lg">
              🧑🏽‍🦱{userSelection.travelers}{" "}
              {userSelection.travelers > 1
                ? "Persons"
                : "Person"}
            </h2>

            <h2 className="p-1 bg-gray-200 rounded-full px-3 text-gray-500 text-xs md:text-md lg:text-lg">
              💸{userSelection.budget} Budget
            </h2>
          </div>

          <Button>
            <FaShareAlt />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
