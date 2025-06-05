import React from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'; 

const PreviewBlog = ({ title, content, topic, difficulty, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-28 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-4xl font-semi-bold text-gray-900">Blog Preview - {title}</h2>
        {/* <p className="text-lg px-4 py-2 rounded-lg">{title}</p> */}
      </div>
      
      <div className="mb-6">
        {/* <h3 className="text-3xl font-semibold mb-4 text-gray-800 underline">{title}</h3> */}
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          <p className="text-lg text-gray-700 mb-2 md:mb-0"><strong>Topic:</strong> {topic}</p>
          <p className="text-lg text-gray-700"><strong className="">Difficulty:</strong> {difficulty}</p>
        </div>
        <div className="border-t border-gray-300 mt-6 pt-4">
          <ReactQuill
            value={content}
            readOnly={true}
            theme="bubble"
            className="h-80 mb-6 border-none text-lg" 
            style={{ fontSize: '2rem' }} 
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onEdit}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Blog
        </button>
      </div>
    </div>
  );
};

export default PreviewBlog;
 