import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setChallengeOftheDay,setLoading,setError } from '../slices/challengeSlice';

export function fetchDailyChallenge(token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/challenges/challengeOfTheDay`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        // console.log(response.data.data)
  
        dispatch(setChallengeOftheDay(response.data.data));
      } catch (error) {
        dispatch(setError(error.message));
        console.log(error)
        toast.error(error.message);
      }
  
      dispatch(setLoading(false));
    };
  }


  export const submitChallengeResponse = ({ token, challengeId, githubLink }) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/challenges/${challengeId}/submit-answer`, 
        { githubLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // dispatch({
      //   type: 'SUBMIT_RESPONSE_SUCCESS',
      //   payload: response.data,
      // });
  
      toast.success('Response submitted successfully!');
    } catch (error) {
      dispatch({
        type: 'SUBMIT_RESPONSE_FAILURE',
        payload: error.response ? error.response.data.message : error.message,
      });
      toast.error(error.response?.data?.message || 'Failed to submit response');
    }
  };