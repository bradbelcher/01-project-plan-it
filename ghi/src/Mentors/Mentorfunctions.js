import React, { useState, useEffect, memo } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { NavLink } from 'react-router-dom';

const MentorCard = memo(({ mentor }) => {
  return (
    <div className="bg-white w-[500px] h-[200px] rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-row justify-between items-center rounded-lg bg-white shadow-lg md:max-w-xl p-2 h-full">
        <div
          className="w-[165px] h-[175px] flex-none bg-cover rounded-t rounded-l"
          style={{
            backgroundImage: `url('${mentor?.picture}')`,
          }}
        ></div>
        <div className="mentorname">
          <div className="self-center text-3xl font-semibold pb-1">
            {`${mentor?.first_name} ${mentor?.last_name}` ||
              "first and last name"}
          </div>
          <div className="m-3 text-sm">
            username:
            <span className="mt-3 ml-10 text-md text-gray-500">
              {mentor?.username || "username"}
            </span>
          </div>
          <div className="ml-4 text-sm">
            education:
            <span className="ml-3 text-md text-gray-500 overflow-hidden">
              {mentor?.education || "education"}
            </span>
          </div>
          <div className="ml-4 text-sm">
            <span className="ml-3 text-md text-gray-500 overflow-hidden"></span>
            <NavLink to={`/profile/${mentor?.id}`}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View profile<span className="sr-only">, {mentor?.first_name}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
});

function MentorCards() {
  const { token } = useAuthContext();
  const mentorsUrl = `${process.env.REACT_APP_API_HOST}/api/accounts`;
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch(mentorsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mentors");
        }

        const allAccounts = await response.json();
        const mentorAccounts = allAccounts.filter(
          (account) => account.is_mentor
        );
        setMentors(mentorAccounts);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchMentors();
  }, [token]); // eslint-disable-line

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (mentors.length === 0) {
    return <div className="flex flex-col items-center justify-center">
      <div>
        <img
          alt="no mentors available"
          src={require("./media/ohno.gif")}
        />
      </div>
      <div className="text-lg text-white max-w-[900px] text-center p-3 mt-2 mb-20">OH NO! No Mentors Available Right Now</div>
    </div>
  }

  return (
    <div className="mentor-grid">
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} />
      ))}
    </div>
  );
}

export default MentorCards;
export { MentorCard };
