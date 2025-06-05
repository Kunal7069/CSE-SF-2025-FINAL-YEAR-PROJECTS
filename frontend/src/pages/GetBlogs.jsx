import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GetBlogsByTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { topicName } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/topic/${topicName}`);
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch blogs');
        setLoading(false);
      }
    };

 

    fetchBlogs();
    // fetchTopicName();
  }, [topicId]);

  const handleView = (title, blogId) => {
   title =  title.replace(/\s+/g, '-')
    navigate(`/view-blog/${title}/${blogId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container min-h-screen mx-auto p-8 mt-16">
      {/* <button
        onClick={handleGoBack}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        &larr; Back
      </button> */}
      <h2 className="text-2xl font-semibold mb-8 bg-[#63b175] w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        Blogs on {topicName || "Loading..."}
      </h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found for this topic.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog, index) => (
            <li
              key={blog._id}
              className="bg-white shadow-md rounded-sm p-2 flex justify-between items-center hover:bg-gray-200 duration-300 transform transition-transform ease-in-out hover:scale-[1.01] cursor-pointer"
              onClick={() => handleView(blog.title, blog._id)}
            >
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">{` ${blog.title}`}</h3>
                <p className="text-gray-600">Difficulty: {blog.difficulty}</p>
              </div>
              <div className="flex space-x-4">
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetBlogsByTopic;
