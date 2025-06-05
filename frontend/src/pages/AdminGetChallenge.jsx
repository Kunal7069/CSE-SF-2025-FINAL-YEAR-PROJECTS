import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchAdminChallenges } from "../operations/adminChallengeApi";


export default function AdminGetChallenge() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { challenges, loading, error } = useSelector((state) => state.challenge);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    dispatch(fetchAdminChallenges(token));
    console.log(challenges)
  }, [dispatch, token]);

  // Handle navigation on challenge click
  const handleChallengeClick = (title, challengeId) => {
    // Navigate to the specific challenge page using title and id
    navigate(`/admin/view-challenge/${title}/${challengeId}`);
  };

  
  return (
    <div className="mt-10 min-h-screen">
      <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        All Challenges
      </h2>

      {/* List of Challenges */}
      <ul className="space-y-4">
        {challenges.map((challenge, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleChallengeClick(challenge.title, challenge._id)} // Redirect on click
          >
            <div className="p-4 py-2 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">{`${index + 1}. ${challenge.title}`}</h3>
                <p className="text-gray-600">Type: {challenge.typeOfChallenge}</p>
                <p className="text-gray-600">
                  Date to be Published: {new Date(challenge.dateTobePublished).toLocaleDateString('en-GB')}
                </p>
              </div>


              {/* <div>
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">View Challenge</span>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}