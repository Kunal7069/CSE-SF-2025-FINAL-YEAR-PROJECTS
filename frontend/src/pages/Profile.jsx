import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchPendingBlogs, fetchPublishedBlogs } from '../operations/blogapi'; 

const Profile = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth); 
  const { pendingBlogs, publishedBlogs } = useSelector((state) => state.blog);
  const {user} = useSelector((state)=>state.profile)

  const userId = user?._id;
  const userIcon = user?.userName?.slice(0, 2).toUpperCase();

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchPendingBlogs(userId, token));
      dispatch(fetchPublishedBlogs(userId, token));
    }
  }, [dispatch, userId, token]);

  const totalBlogsPosted = pendingBlogs.length + publishedBlogs.length;

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Profile</h1>
        <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            {/* Display the user icon */}
            <span className="text-4xl font-bold">{userIcon}</span>
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{user?.userName}</h2>
            <p className="text-gray-600">Total Blogs Posted: {totalBlogsPosted}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Pending Blogs</h3>
            <ul>
              {pendingBlogs.length === 0 ? (
                <li className="text-gray-500">No pending blogs found.</li>
              ) : (
                pendingBlogs.map((blog, index) => (
                  <li key={blog._id} className="border-b py-2">
                    <h4 className="font-semibold">{`${index + 1}. ${blog.title}`}</h4>
                    {/* <p>{blog.content.substring(0, 100)}...</p> */}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Published Blogs</h3>
            <ul>
              {publishedBlogs.length === 0 ? (
                <li className="text-gray-500">No published blogs found.</li>
              ) : (
                publishedBlogs.map((blog, index) => (
                  <li key={blog._id} className="border-b py-2">
                    <h4 className="font-semibold">{`${index + 1}. ${blog.title}`}</h4>
                    {/* <p>{blog.content.substring(0, 100)}...</p> */}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
