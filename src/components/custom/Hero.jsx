import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-6 md:mx-10 lg:mx-56 font-poppins h-screen mb-1 md:mt-20">
      <h1 className="font-extrabold text-[#f56551] text-3xl md:text-[50px] text-center mt-16 md:mb-10">
        Discover your Next Adventure with AI
      </h1>

      <p className="text-center font-bold text-3xl mt-2">
        Personalized Itineraries at Your Fingertips
      </p>

      <article className="text-xl text-gray-500 text-center mt-4">
        Your personal trip planner and travel curator,
        creating custom itineraries tailored to your
        interests and budgets.
      </article>

      <Link to={"/create-trip"} className="mt-4">
        <Button> Get started, It&apos;s free</Button>
      </Link>
    </div>
  );
};

export default Hero;
