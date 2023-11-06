import MentorCards from "./Mentorfunctions";
import "./Mentors.css";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { Navigate, useLocation } from "react-router-dom";

function MentorsList() {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token) {
    <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div className="mentorsbackground">
      <div className="flex flex-col items-center justify-center p-5">
        <div className="text-4xl font-bold text-white pb-10 text-center">
          Welcome to Our Mentor Page
        </div>
        <div className="text-lg text-white max-w-[900px] text-center">
          Here you will find all the information about our volunteer mentors!
          These mentors are here to help you succeed! They have generously
          offered up their knowledge and expertise to help you along on your
          project. If you see a mentor that may be a great asset to your project
          send them a message and see if they are willing to join your project!
        </div>
      </div>
      <MentorCards />
    </div>
  );
}

export default MentorsList;

