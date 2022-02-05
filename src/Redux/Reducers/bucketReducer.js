const bucketReducer = (state = {}, action) => {
    switch (action.type) {
        case "BUCKET_FETCH_SUCCEEDED":
            return { ...state, bucketData: action.response }
        case "BUCKET_FETCH_FAILED":
            return { ...state, bucketDataError: action.message }
        case "CREATE_BUCKET_SUCCEEDED":
            return { ...state, createBucket: action.response }
        case "CREATE_BUCKET_FAILED":
            return { ...state, createBucketError: action.message }
        default:
            return state;
    }
}

export default bucketReducer;