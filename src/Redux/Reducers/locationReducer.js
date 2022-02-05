const locationReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOCATION_FETCH_SUCCEEDED":
            return { ...state, locationData: action.response }
        case "LOCATION_FETCH_FAILED":
            return { ...state, message: action.message }
        default:
            return state;
    }
}

export default locationReducer;