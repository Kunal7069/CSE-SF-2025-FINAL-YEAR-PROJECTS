import axios from "axios";
import { setLoading, setError, setBlogCreated, setPendingBlogs, setPublishedBlogs, setBlogEdit } from "../slices/blogSlice";
import toast from "react-hot-toast";
import { fetchAllPendingBlogs } from "./adminBlogApi";

export function createBlog(title, content, author, topicId,difficulty, navigate,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log("Token-------",token)
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/blogs/create`, {
        title,
        content,
        author,
        topicId,
        difficulty
      },
      { headers: { 'Authorization': `Bearer ${token}` } });

      // console.log("Response", response)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setBlogCreated(response.data.data));
      toast.success("Blog created successfully!");
      
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
     
    }
    dispatch(setLoading(false));
  };
}

// Fetch blogs for a user depending on blogId
export function editBlog(blogId, updatedBlog, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/blogs/blog/edit/${blogId}`,
        updatedBlog,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setBlogEdit(response.data.data)); 
      toast.success("Blog updated successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    }

    dispatch(setLoading(false));
  };
}

export function deleteBlog(blogId,userId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/blogs/blog/delete/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Remove the deleted blog from the pendingBlogs list
      // dispatch(fetchPendingBlogs(userId, token));
      // dispatch(fetchAllPendingBlogs(token))
      // toast.success("Blog deleted successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    }

    dispatch(setLoading(false));
  };
}



// Action to fetch blog details by ID
export function fetchBlogDetails(blogId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.success) {
        dispatch(setBlogEdit(response.data.data));
      } else {
        throw new Error(response.data.message || 'Failed to fetch blog details');
      }
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    }

    dispatch(setLoading(false));
  };
}






// Action to fetch pending blogs
export function fetchPendingBlogs(userId,token) {

  
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/publisher/${userId}/pending-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      // console.log("her e---------",response.data.data)

      if (response.data && response.data.success) {
        dispatch(setPendingBlogs(response.data.data));  
        // toast.success("Pending blogs fetched successfully!");
      } else {
        throw new Error(response.data.message || "Unexpected response format");
      }
      
      dispatch(setPendingBlogs(response.data.data));
      // console.log()
      // toast.success("Pending blogs fetched successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      // toast.error(error.message);
    }
    dispatch(setLoading(false));
  };
}


// Action to fetch pending blogs
export function fetchPublishedBlogs(userId,token) {

  
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/publisher/${userId}/published-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      

      if (response.data && response.data.success) {
        dispatch(setPublishedBlogs(response.data.data));  
        // toast.success("Pending blogs fetched successfully!");
      } else {
        throw new Error(response.data.message || "Unexpected response format");
      }
      
      dispatch(setPublishedBlogs(response.data.data));
      // console.log()
      // toast.success("Pending blogs fetched successfully!");
    } catch (error) {
      dispatch(setError(error.message));
      // toast.error(error.message);
    }
    dispatch(setLoading(false));
  };
}


export function fetchBlogsByTopic(topicId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/topic/${topicId}`);
      // console.log("API Response:", response.data); 

      if (response.data && response.data.success) {
        // console.log("Blogs Data:", response.data.data); 
        dispatch(setPublishedBlogs(response.data.data));
        toast.success("Blogs fetched successfully!");
      } else {
        throw new Error(response.data.message || "Failed to fetch blogs by topic");
      }
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    }
    dispatch(setLoading(false));
  };
}
