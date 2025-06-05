import axios from "axios"
import toast from "react-hot-toast"
import { setLoading, addMessage,setMessages,clearMessages } from "../slices/chatSlice"
// import { setUser } from "../slices/profileSlice"

export function generateContent(inputMessage,userId) {
    return async (dispatch, getState) => {
      const { token } = getState().auth; // get token from auth state
      dispatch(setLoading(true));
    //   console.log(token)

    //   dispatch(addMessage({ sender: "user", text: inputMessage }));
      
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/chat/generate-content`,
          { userMessage: inputMessage, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response)
        const { success, botResponse } = response.data;
        if (success) {
          dispatch(addMessage({ userMessage:inputMessage, botResponse }));
        } else {
          throw new Error("Failed to generate content.");
        }
      } catch (error) {
        console.error("Generate content error:", error);
        toast.error(error?.response?.data?.message || "Failed to generate content.");
      }
  
      dispatch(setLoading(false));
    };
  }
  
  // Async function to fetch all chat history for the user
  export function fetchAllChats(userId) {
    return async (dispatch, getState) => {
      const { token } = getState().auth;
      dispatch(setLoading(true));
  
      try {
        
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/chat/all-chats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const { success, chatHistory } = response.data;
        if (success) {
          dispatch(setMessages(chatHistory));
        //   console.log(message)
        } else {
          throw new Error("Failed to fetch chats.");
        }
      } catch (error) {
        console.error("Fetch all chats error:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch chats.");
      }
  
      dispatch(setLoading(false));
    };
  }
  
  // Async function to delete all chat history for the user
  export function deleteAllChats(userId) {
    return async (dispatch, getState) => {
      const { token } = getState().auth;
      dispatch(setLoading(true));
  
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/chat/delete-chats/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const { success } = response.data;
        if (success) {
          dispatch(clearMessages());
          toast.success("Chat history cleared!");
        } else {
          throw new Error("Failed to delete chats.");
        }
      } catch (error) {
        console.error("Delete all chats error:", error);
        toast.error(error?.response?.data?.message || "Failed to delete chats.");
      }
  
      dispatch(setLoading(false));
    };
  }