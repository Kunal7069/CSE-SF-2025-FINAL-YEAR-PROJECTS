import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics, createTopic, editTopic, removeTopic } from "../operations/topicApi";
import { addTopic, updateTopic, deleteTopic } from "../slices/topicSlice";
import { useNavigate } from "react-router-dom";

const CreateTopic = () => {
  const [newTopic, setNewTopic] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const topics = useSelector((state) => state.topics.topics);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch topics when the component loads
    dispatch(fetchTopics(token,navigate));
  }, [dispatch]);

  const handleAddTopic = async () => {
    if (newTopic.trim()) {
      const newCreatedTopic = await dispatch(createTopic(newTopic, token));

      if (newCreatedTopic) {
        setNewTopic("");  
        setEditingId(null);
        setEditingName("");
      }
    }
  };

  const handleEditTopic = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = async () => {
    if (editingName.trim()) {
      await dispatch(editTopic(editingId, editingName, token));
      setEditingId(null);
      setEditingName("");
      
      dispatch(updateTopic({ _id: editingId, name: editingName }));
    }
  };

  const handleDeleteTopic = async (id) => {
    await dispatch(removeTopic(id, token));

    dispatch(deleteTopic(id));  // Remove the deleted topic from the Redux store
  };

  return (
    <div className="max-w-lg mx-auto p-4 mt-12">
      <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        Manage Topics
      </h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Enter a new topic"
          className="flex-grow border border-gray-300 p-2 rounded-l"
        />
        <button
          onClick={handleAddTopic}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 "
        >
          Add Topic
        </button>
      </div>

      <ul className="space-y-2">
        {topics.map((t) => (
          <li key={t._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            {editingId === t._id ? (
              <div className="flex-grow flex">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-grow border border-gray-300 p-2 rounded-l"
                />
                <button
                  onClick={handleSaveEdit}
                  className="bg-green-600 text-white p-2 rounded-r hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-grow flex justify-between items-center">
                <span>{t.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTopic(t._id, t.name)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTopic(t._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTopic;
