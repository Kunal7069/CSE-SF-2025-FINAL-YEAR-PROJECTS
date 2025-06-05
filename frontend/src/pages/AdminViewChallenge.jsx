import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminChallengeById, fetchChallengeAnswers } from "../operations/adminChallengeApi";
import { useParams } from "react-router-dom";

const AdminViewChallenge = () => {
    const dispatch = useDispatch();
    const { challengeId } = useParams();

    const token = useSelector((state) => state.auth.token);
    const { adminViewChallenge, answers } = useSelector((state) => state.challenge);

    useEffect(() => {
        if (token && challengeId) {
            dispatch(fetchAdminChallengeById(token, challengeId));
            dispatch(fetchChallengeAnswers(token, challengeId));
        }
    }, [dispatch, token, challengeId]);

    return (
        <div className="challenge-container bg-gray-100 min-h-screen p-8 mt-16">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Challenge Details</h1>

            {adminViewChallenge ? (
                <>
                    <div className="challenge-card bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4 text-[#63b175]">{adminViewChallenge.title}</h2>
                        <p className="text-gray-700"><strong>Description:</strong> {adminViewChallenge.description}</p>
                        <p className="text-gray-700"><strong>Type:</strong> {adminViewChallenge.typeOfChallenge}</p>
                    </div>

                    {/* Answers Section */}
                    <div className="answers-section mt-8">
                        <h3 className="text-xl font-semibold mb-4">Submitted Answers:</h3>
                        {answers && answers.length > 0 ? (
                            <ul className="bg-white shadow-md rounded-lg p-4">
                                {answers.map((answer, index) => (
                                    <li key={answer._id} className="border-b border-gray-300 py-2">
                                        <p className="text-gray-800">
                                            <strong>Answer {index + 1}:</strong> {answer.link} {/* Rendering the link property */}
                                        </p>
                                        <p className="text-gray-600">Submitted by: {answer.user.userName}</p> {/* Accessing userName from user object */}
                                        <p className="text-gray-600">Created at: {new Date(answer.createdAt).toLocaleString()}</p> {/* Formatting the date */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No answers submitted yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-center text-red-500 text-xl">No challenge found.</p>
            )}
        </div>
    );
};

export default AdminViewChallenge;