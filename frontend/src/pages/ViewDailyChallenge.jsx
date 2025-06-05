import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyChallenge, submitChallengeResponse } from '../operations/challengeApi'; 
import { toast } from 'react-hot-toast';

function ViewDailyChallenge() {
  const dispatch = useDispatch();
  const { challengeOftheDay, loading, error } = useSelector((state) => state.challenge);
  const { token } = useSelector((state) => state.auth); // Replace with your auth logic
  const [githubLink, setGithubLink] = useState("");

  console.log(challengeOftheDay)
  useEffect(() => {
    if (token) {
      dispatch(fetchDailyChallenge(token));
    } else {
      toast.error('User is not authenticated');
    }
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!githubLink) {
      toast.error('Please provide a GitHub link');
      return;
    }

    // Dispatch the action to submit the challenge response
    dispatch(submitChallengeResponse({ token, challengeId: challengeOftheDay[0]._id, githubLink }));
  };
 

  return (
    <div className='mt-16 p-4 min-h-screen bg-white shadow-md rounded'>
      <h2 className='text-xl font-bold mb-4'>Daily Challenge</h2>
      <p className='text-lg'>{challengeOftheDay[0]?.title}</p>
      <p className='mt-2'>{challengeOftheDay[0]?.description}</p>

      <form className='mt-8' onSubmit={handleSubmit}>
        <label htmlFor='githubLink' className='block mb-2 text-sm font-medium text-gray-700'>
          Submit your GitHub link:
        </label>
        <input
          type='url'
          id='githubLink'
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
          placeholder='https://github.com/your-repo'
          required
        />
        <button
          type='submit'
          className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ViewDailyChallenge;