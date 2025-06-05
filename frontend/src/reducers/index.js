import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import topicsReducer from "../slices/topicSlice";
import blogReducer from "../slices/blogSlice"
import challengeReducer from "../slices/challengeSlice"
import chatReducer from "../slices/chatSlice"


const rootReducer = combineReducers({
    auth:authReducer,
    profile: profileReducer,
    topics: topicsReducer,
    blog : blogReducer,
    challenge : challengeReducer,
    chat : chatReducer
})

export default rootReducer;