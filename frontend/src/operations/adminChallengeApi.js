
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setLoading, setChallengeCreated, setChallenges, setError, setAdminViewChallenge,setChallengeAnswers } from '../slices/challengeSlice';

export function createChallenge(title, description, dateTobePublished, type, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log("token in api",token)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/challenges/admin/createChallenge`, {
        title,
        description,
        dateTobePublished,
        type
      },
      { headers: { 'Authorization': `Bearer ${token}` } });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setChallengeCreated(response.data.data));
      toast.success("Challenge created successfully!");
      
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.message);
    }
    
    dispatch(setLoading(false));
  };
}


export function fetchAdminChallenges(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/challenges/admin/getChallenges`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log( response.data)
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        // console.log(response.data)
  
        dispatch(setChallenges(response.data.data));
      } catch (error) {
        dispatch(setError(error.message));
        console.log(error)
        toast.error(error.message);
      }
  
      dispatch(setLoading(false));
    };
  }

  export function fetchAdminChallengeById(token,challengeId) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/challenges/admin/getChallengebyId/${challengeId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // console.log( response.data)
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        // console.log(response.data)
  
        dispatch(setAdminViewChallenge(response.data.data));
      } catch (error) {
        dispatch(setError(error.message));
        console.log(error)
        toast.error(error.message);
      }
  
      dispatch(setLoading(false));
    };
  }


  export const fetchChallengeAnswers = (token, challengeId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
  
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/challenges/${challengeId}/answers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      dispatch(setChallengeAnswers(response.data.data));  
      // console.log("New-----------------",response.data.data)
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to fetch answers'));
      dispatch(setLoading(false));
    }
  };



  