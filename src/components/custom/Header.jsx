import { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

const Header = () => {


  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <header className="font-poppins p-4 shadow-sm flex justify-between items-center px-5 md:px-12 lg:px-28">
      <div className="flex items-center">
        <img src="/logo.svg" />
        <span className="font-bold text-2xl ml-2 text-gray-600">
          Scoutz
        </span>
      </div>

      <nav>
        {user ? (
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="w-8 h-8 rounded-full"
                  alt={user.name}
                />
              </PopoverTrigger>
              <PopoverContent>
                <button onClick={()=> {
                  googleLogout();
                  localStorage.clear();
                  window.location.assign("/"); 
                }} variant='outline'>Log out</button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};

export default Header;
