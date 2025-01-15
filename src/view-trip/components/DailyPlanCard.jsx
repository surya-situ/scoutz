import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { useEffect, useState } from "react";

const DailyPlanCard = ({ place, trip }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);

  const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  useEffect(() => {
    if (place) {
      const getPlacePhoto = async () => {
        const data = {
          textQuery: place?.name,
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
        setIsPhotoLoading(false);
      };
      getPlacePhoto();
    }
  }, [place]);

  return (
    <div
      className="hover:scale-105 hover:shadow-2xl transition-all cursor-pointer mt-5 mb-4 shadow-lg rounded-lg"
      key={uuidv4()}
    >
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          place?.name
        }
        target="_blank"
      >
        {isPhotoLoading ? (
          <div className="flex items-center h-44 w-full justify-center bg-slate-200 rounded-t-lg animate-pulse object-cover">
            <p className="text-sm">Loading...</p>
          </div>
        ) : photoUrl ? (
          <img
            className="object-cover h-44 w-full rounded-t-lg"
            src={photoUrl}
            alt={`${place?.name}-image`}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-44 w-full bg-slate-200 rounded-t-lg object-cover">
            <p className="text-sm">No media available!</p>
          </div>
        )}
        <div className="mt-2 mb-4 px-2">
          <h2 className="font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {place.name}
          </h2>
          <h2 className="mt-2 text-xs text-gray-500">
            🖊️{place?.details}
          </h2>
          <h2 className="mt-2 text-xs text-gray-500 flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
            📍
            {place.time_travel}
          </h2>
          <h2 className="mt-2 text-xs text-gray-500">
            🪙{place?.ticket_price
              ? `${place.ticket_price} ${
                  trip?.tripData?.travel_plan?.location?.toLowerCase().includes('india')
                    ? "₹"
                    : "$"
                } ticket price`
              : "Price is not available"}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default DailyPlanCard;
