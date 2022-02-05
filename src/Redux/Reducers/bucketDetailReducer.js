const bucketDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case "BUCKET_DETAIL_FETCH_SUCCEEDED":
            return { ...state, bucketDetail: action.response }
        case "BUCKET_DETAIL_FETCH_FAILED":
            return { ...state, bucketDetailError: action.message }
        case "BUCKET_OBJECTS_FETCH_SUCCEEDED":
            return { ...state, bucketObjects: action.response }
        case "BUCKET_OBJECTS_FETCH_FAILED":
            return { ...state, bucketObjectsError: action.message }
        case "BUCKET_DELETE_SUCCEEDED":
            return { ...state, removeBucket: action.response }
        case "BUCKET_DELETE_FAILED":
            return { ...state, removeBucketError: action.message }
        case "OBJECT_CREATE_SUCCEEDED":
            return { ...state, createObject: action.response }
        case "OBJECT_CREATE_FAILED":
            return { ...state, createObjectError: action.message }
        case "OBJECT_DELETE_SUCCEEDED":
            return { ...state, removeObject: action.response }
        case "OBJECT_DELETE_FAILED":
            return { ...state, removeObjectError: action.message }
        default:
            return state;
    }
}

export default bucketDetailReducer;