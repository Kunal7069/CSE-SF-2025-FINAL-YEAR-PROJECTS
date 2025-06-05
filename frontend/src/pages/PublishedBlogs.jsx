import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedBlogs } from "../operations/blogapi";
import { fetchAllPublishedBlogs } from "../operations/adminBlogApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PublishedBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { publishedBlogs, adminPublishedBlogs, loading, error } = useSelector(
    (state) => state.blog
  );
  const { token } = useSelector((state) => state.auth);

  const userId = user?._id;
  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllPublishedBlogs(token));
    } else if (userId && token) {
      dispatch(fetchPublishedBlogs(userId, token));
    }
  }, [dispatch, userId, token, isAdmin]);

  const handleView = (title, blogId) => {
    title =  title.replace(/\s+/g, '-')
     navigate(`/view-blog/${title}/${blogId}`);
   };

  const blogsToDisplay = isAdmin ? adminPublishedBlogs : publishedBlogs; // Determine which blogs to display
  // console.log(blogsToDisplay)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-8 bg-green-600 w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        {isAdmin ? "All Published Blogs" : "Your Published Blogs"}
      </h2>
      {blogsToDisplay?.length === 0 ? (
        <p className="text-gray-600">No published blogs found.</p>
      ) : (
        <ul className="space-y-4">
          {blogsToDisplay?.map((blog, index) => (
            <li
              key={blog._id}
              className="bg-white shadow-md rounded-lg p-2 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">{`${index + 1}. ${blog.title}`}</h3>
                <p className="text-gray-600">Topic: {blog.topic.name}</p>
                <p className="text-gray-600">Difficulty: {blog.difficulty}</p>
                {user?.role=== "Admin" && (
                  <p className="text-gray-600">Approved By: {blog.approvedBy?.userName}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleView(blog.title, blog._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow"
                >
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublishedBlogs;
