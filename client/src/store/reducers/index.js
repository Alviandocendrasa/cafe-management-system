import { combineReducers } from "redux";

import loadingReducer from "./loadingReducer";
import messageReducer from "./messageReducer";
import authReducer from "./authReducer";
import workslotReducer from "./workslotReducer";
import bidReducer from "./bidReducer";

export default combineReducers({
   auth: authReducer,
   messages: messageReducer,
   loading: loadingReducer,
   workslots: workslotReducer,
   bids: bidReducer
});