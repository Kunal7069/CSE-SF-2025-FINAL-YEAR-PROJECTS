import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog, approveBlog } from "../operations/adminBlogApi"; // Import approveBlog function
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function AdminViewBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { blogId } = useParams(); 
  const { blog, loading, error } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth); 
  const {user} = useSelector((state)=>state.profile)

  useEffect(() => {
    if (blogId && token) {
      dispatch(fetchBlog(blogId, token)); // Fetch the blog details
    }
  }, [dispatch, blogId, token]);

  // Handle approve blog action
  const handleApprove = () => {
    if (window.confirm("Are you sure you want to approve and publish this blog?")) {
      // console.log(user)
      const approvedBy = user?._id
      dispatch(approveBlog(blogId, "published", token, approvedBy)) // Approve the blog with "Published" status
        navigate("/dashboard")
    }
  };

  // Display loading state
  if (loading) return <div className="mt-28 pt-28">Loading...</div>;

  return (
    <div className="mt-28 px-8 min-h-screen">
      {blog ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-2">Topic: {blog.topic?.name}</p>
          <p className="text-gray-600 mb-2">Difficulty: {blog.difficulty}</p>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }} // Safely render HTML content
            />
          </div>
          {/* Approve button */}
          <button
            onClick={handleApprove}
            className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4 shadow hover:bg-green-700"
          >
            Approve & Publish
          </button>
        </div>
      ) : (
        <div>No blog found</div>
      )}
    </div>
  );
}

export default AdminViewBlog;
