import axios from 'axios';
import { setLoading, setError, setAdminPendingBlogs,setAdminPublishedBlogs,setBlog } from '../slices/blogSlice'; 
import { toast } from 'react-hot-toast';

export function fetchAllPendingBlogs(token) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/blogs/admin/pending-blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.success) {
        dispatch(setAdminPendingBlogs(response.data.data)); // Set the blogs in the Redux state
      } else {
        throw new Error(response.data.message || 'Failed to fetch pending blogs');
      }
    } catch (error) {
      dispatch(setError(error.message));
    }

    dispatch(setLoading(false));
  };
}


export function fetchAllPublishedBlogs(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/blogs/admin/published-blogs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data && response.data.success) {
          dispatch(setAdminPublishedBlogs(response.data.data)); // Set the admin published blogs
        } else {
          throw new Error(response.data.message || "Failed to fetch published blogs");
        }
      } catch (error) {
        dispatch(setError(error.message));// Show error notification
      }
  
      dispatch(setLoading(false));
    };
  }




  export function fetchBlog(blogId) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/blogs/blog/${blogId}`,
        
        );
  
        if (response.data && response.data.success) {
          dispatch(setBlog(response.data.data)); 
        } else {
          throw new Error(response.data.message || "Failed to fetch  blogs");
        }
      } catch (error) {
        dispatch(setError(error.message));
        toast.error(error.message); // Show error notification
      }
  
      dispatch(setLoading(false));
    };
  }



  export function approveBlog(blogId, status, token,approvedBy) {
    return async (dispatch) => {
      dispatch(setLoading(true));
            // const status = "published"
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/blogs/approve`,
          { blogId, status, approvedBy },  
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
  
        if (response.data.success) {
          toast.success(`Blog status updated to ${status} successfully.`);
          // You may dispatch other actions here to update the state
        } else {
          throw new Error(response.data.message || "Failed to approve blog");
        }
      } catch (error) {
        dispatch(setError(error.message));
        toast.error(error.message);
      }
  
      dispatch(setLoading(false));
    };
  }





  
