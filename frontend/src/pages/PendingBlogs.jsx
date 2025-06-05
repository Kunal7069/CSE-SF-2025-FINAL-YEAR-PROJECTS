import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingBlogs, deleteBlog} from "../operations/blogapi";
import { fetchAllPendingBlogs } from "../operations/adminBlogApi";
import { useNavigate } from "react-router-dom";
import { removeBlog } from "../slices/blogSlice";
import toast from "react-hot-toast";

const PendingBlogs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { pendingBlogs, adminPendingBlogs } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userId = user._id;
  const isAdmin = user.role === "Admin";

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllPendingBlogs(token));
    } else {
      dispatch(fetchPendingBlogs(userId, token));
    }
  }, [dispatch, userId, token, isAdmin]);

  const handleEdit = (blogId,title) => {
    title =  title.replace(/\s+/g, '-')
    navigate(`/publisher/edit-blog/${title}/${blogId}`);
  };

  const handleView = (blogId,title) => {
    title =  title.replace(/\s+/g, '-')
    navigate(`/admin/view-blog/${title}/${blogId}`);
  };

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(blogId, userId, token))
    }

    dispatch(removeBlog(blogId));
    toast.success("Blog deleted successfully!");
  };


  const blogsToDisplay = isAdmin ? adminPendingBlogs : pendingBlogs;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-8 bg-green-600 w-full px-4 py-2 rounded text-white font-sans shadow-lg animate-pulse-glow text-center">
        Pending Blogs
      </h2>
      {blogsToDisplay?.length === 0 ? (
        <p className="text-gray-600 text-center">No pending blogs found.</p>
      ) : (
        <ul className="space-y-6">
          {blogsToDisplay?.map((blog, index) => (
            <li
              key={blog._id}
              className="bg-white shadow-lg rounded-lg p-2 flex justify-between items-center hover:bg-gray-200 duration-300 transform transition-transform ease-in-out hover:scale-[1.01]"
            >
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">{`${index + 1}. ${blog.title}`}</h3>
                <p className="text-gray-600">Topic: {blog.topic.name}</p>
                <p className="text-gray-600">Difficulty: {blog.difficulty}</p>
              </div>
              <div className="flex space-x-4">
                {isAdmin ? (
                  <button
                    onClick={() => handleView(blog._id,blog.title)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    View
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(blog._id,blog.title)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingBlogs;
