import { combineReducers } from "redux";
// Reducer
import bucketReducer from "./bucketReducer.js";
import locationReducer from "./locationReducer.js";
import bucketDetailReducer from "./bucketDetailReducer.js";

export default combineReducers({
    bucketReducer,
    locationReducer,
    bucketDetailReducer
});