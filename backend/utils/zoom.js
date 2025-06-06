import axios from 'axios';
import qs from 'qs';

import dotenv from "dotenv";
dotenv.config();


const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;

const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET; 
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;

let cachedToken = null;
let tokenExpiry = null;

// Fetch Zoom OAuth token
const getZoomAccessToken = async () => {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(
    'https://zoom.us/oauth/token',
    qs.stringify({ grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID }),
    {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = now + response.data.expires_in * 1000;
  return cachedToken;
};

// Create meeting
export const createZoomMeeting = async (topic, startTime, duration) => {
  const accessToken = await getZoomAccessToken();
  const response = await axios.post(
    'https://api.zoom.us/v2/users/me/meetings',
    {
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: 'Asia/Kolkata',
      settings: {
        join_before_host: true,
        approval_type: 0,
        registration_type: 1,
        enforce_login: false,
        waiting_room: false,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
