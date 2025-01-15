import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import DailyPlan from "../components/DailyPlan";

const ViewTrip = () => {
    const [tripData, setTripData] = useState();
    const {tripId} = useParams();

    const getTripData = async () => {
        const docRef = doc(db, "AiTrips",tripId );
        const docSnap = await getDoc(docRef);
        

        if(docSnap.exists() ) {
            setTripData(docSnap.data());
        } else {
            toast("No trip found!")
        }
    };

    useEffect(()=> {
        tripId&&getTripData()
    },[tripId]);


  return (
    <div className="p-10 md:px-20 lg;px-44 xl:px-56">
       {/* Information section */}
        <InfoSection trip={tripData}/>

       {/* Recommended Hotels */}
       <Hotels trip={tripData}/>

       {/* Daily plan */}
       <DailyPlan trip={tripData} />
    </div>
  )
}

export default ViewTrip