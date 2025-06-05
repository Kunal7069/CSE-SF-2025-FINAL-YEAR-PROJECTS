import axios from "axios";
import toast from "react-hot-toast";
import { setLoading,addTopic,setTopics, updateTopic,deleteTopic  } from "../slices/topicSlice";

import { setToken } from "../slices/authSlice";


export function fetchTopics(token,navigate) {
 
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/topics/`,{ headers: { 'Authorization': `Bearer ${token}` } });
      // console.log("FETCH TOPICS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setTopics(response.data.data));
    } catch (error) {
      console.log("FETCH TOPICS API ERROR............", error);
      
    }
    dispatch(setLoading(false));
  };
}




// Modify createTopic to return the newly created topic
export function createTopic(name, token) {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/topics/create`, { name },
                { headers: { 'Authorization': `Bearer ${token}` } });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setLoading(false));
            toast.success("Topic Created Successfully");

            // Dispatch the newly created topic
            dispatch(addTopic(response.data.data));

            // Return the new topic
            return response.data.data;
        } catch (error) {
            console.error("CREATE TOPIC API ERROR:", error);
            toast.error(error?.response?.data?.message || "Failed to create topic");
            dispatch(setLoading(false));
            return null;
        }
    };
}


  
  




export function editTopic(id, name,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
        // console.log("Inside edit Topic, Id :",id)
      const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/topics/edit/${id}`, { name },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      // console.log("UPDATE TOPIC API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(updateTopic(response.data.data));
      toast.success("Topic Updated Successfully");
    } catch (error) {
      console.log("UPDATE TOPIC API ERROR............", error);
      toast.error(error?.response?.data?.message || "Failed to update topic");
    }
    dispatch(setLoading(false));
  };
}


export function removeTopic(id,token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/topics/delete/${id}`,
        { headers: { 'Authorization': `Bearer ${token}` } });
      // console.log("DELETE TOPIC API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(deleteTopic(id));
      toast.success("Topic Deleted Successfully");
    } catch (error) {
      console.log("DELETE TOPIC API ERROR............", error);
      toast.error(error?.response?.data?.message || "Failed to delete topic");
    }
    dispatch(setLoading(false));
  };
}

