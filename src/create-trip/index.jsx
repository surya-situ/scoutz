import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsLists,
} from "@/constants/options";
import { chatSession } from "@/service/AiModel";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,

        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem(
          "user",
          JSON.stringify(resp.data)
        );
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);

    const jsonString = tripData.replace(/^```json\n/, "").replace(/```$/, "");
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(jsonString),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
    
  };

  const onGenerateTrip = async () => {
    if (formData?.noOfDays > 5) {
      toast.error("Max limit is 5 days")
      return;
    }

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.budget ||
      !formData?.people ||
      !formData?.noOfDays ||
      !formData?.location
    ) {
      toast.error("Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{people}", formData?.people)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    const result = await chatSession.sendMessage(
      FINAL_PROMPT
    );

    setLoading(false);
    const tripData = result?.response?.text();
    saveAiTrip(tripData);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-20 font-poppins">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip
        planner will generate a customized itinerary based
        on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice ?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={
              import.meta.env.VITE_GOOGLE_PLACE_API_KEY
            }
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              isDisabled: loading
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning tour trip ?
          </h2>
          <p className="mb-2">max 5 days</p>
          <Input
            placeholder={"Ex. 5"}
            type="number"
            max="5"
            min="1"
            onChange={(e) => 
              handleInputChange("noOfDays", value)
            }
            disabled={loading}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Your Budget ?
          </h2>
          <div className="grid grid-rows-1  md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item) => (
              <div
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title &&
                  "shadow-lg border-black"
                }`}
                key={item.id}
                onClick={() =>
                  handleInputChange("budget", item.title)
                }
              >
                <h2 className="mb-2 text-5xl">
                  {item.icon}
                </h2>
                <h2 className="text-lg font-bold">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next
            adventure ?
          </h2>
          <div className="grid grid-rows- md:grid-cols-3 gap-5 mt-5">
            {SelectTravelsLists.map((item) => (
              <div
                className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg ${
                  formData?.people === item.people &&
                  "shadow-lg border-black"
                }`}
                key={item.id}
                onClick={() =>
                  handleInputChange("people", item.people)
                }
              >
                <h2 className="mb-2 text-5xl">
                  {item.icon}
                </h2>
                <h2 className="text-lg font-bold">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-500">
                  {item.desc}
                </h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button
            disabled={loading || formData.noOfDays > 5}
            onClick={(e) => {
              onGenerateTrip();
            }}
          >
            {loading ? (
              "Generating trip..."
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">
                Sign in with Google
              </h2>
              <p>
                Sign in to the app with Google
                authentication
              </p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
