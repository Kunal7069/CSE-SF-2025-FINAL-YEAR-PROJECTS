import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChallenge } from "../operations/adminChallengeApi"; 

const CreateChallenge = () => {
  const dispatch = useDispatch();
  const {  loading, error } = useSelector((state) => state.challenge); 
  const { token } = useSelector((state) => state.auth); 
  // console.log("token in page",token)

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTobePublished, setDateToBePublished] = useState("");
  const [type, setType] = useState(""); // Default value set to "Daily"

  

  // Handle form submission for creating a challenge
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createChallenge(title, description, dateTobePublished, type, token));
    console.log(title, description, dateTobePublished, type);
    // setTitle(""); 
    // setDescription("");
    // setDateToBePublished("");
    // setType("");
  };

  

  return (
    <div className="max-w mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        Create Challenge
      </h2>

      {/* Form to create a new challenge */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          value={dateTobePublished}
          onChange={(e) => setDateToBePublished(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        
        {/* Dropdown for selecting challenge type */}
        <select
          value={type}
          placeholder="Type"
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Type</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#63b175] text-white py-2 px-4 rounded shadow-lg hover:bg-[#519d64] transition duration-300"
          disabled={loading}
        >
          {loading ? "Creating Challenge..." : "Create Challenge"}
        </button>
      </form>

      
    </div>
  );
};

export default CreateChallenge;