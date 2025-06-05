import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogDetails } from '../operations/blogapi';
import { toast } from 'react-hot-toast';

export default function BlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const blog = useSelector((state) => state.blog.blogEdit);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const loadBlogDetails = async () => {
      try {
        await dispatch(fetchBlogDetails(blogId, token));
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog details');
        setLoading(false);
        toast.error('Failed to load blog details');
      }
    };

    loadBlogDetails();
  }, [blogId, dispatch, token]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 mt-16 text-gray-600 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 mt-16 text-red-500 flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto p-8 mt-16 w-screen">
      
      <article className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-3xl font-semibold mb-6-500 w-full px-6 py-4 rounded text-gray-800 shadow-lg  animate-pulse-glow">
        {blog.topic?.name} | {blog.title}
        <p className="text-gray-600 mt-6 font-semi-bold text-lg flex items-center">
            Difficulty: {blog.difficulty}
          </p>
        </div>

        <div className="p-6 prose max-w-none text-lg text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </article>
    </div>
  );
}
