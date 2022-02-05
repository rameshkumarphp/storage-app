import axios from 'axios';

const config = {
    headers: {
        'Authorization': "Token " + process.env.REACT_APP_API_TOKEN
    }
}

// Get List of Buckets
export const getBucketList = () => {
    return axios.get(process.env.REACT_APP_BASE_URL + '/buckets', config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}

//Get list of locations
export const getLocationList = () => {
    return axios.get(process.env.REACT_APP_BASE_URL + '/locations', config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}

// Create a new bucket
export const createNewBucket = (inputData) => {
    return axios.post(process.env.REACT_APP_BASE_URL + '/buckets', inputData, config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}


// Get existing bucket detail
export const getBucketDetail = (id) => {
    return axios.get(process.env.REACT_APP_BASE_URL + '/buckets/' + id, config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });;
}

// Get existing bucket objects
export const getBucketObjects = (id) => {
    return axios.get(process.env.REACT_APP_BASE_URL + '/buckets/' + id + '/objects', config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}

// Delete an existing bucket
export const deleteBucket = (id) => {
    return axios.delete(process.env.REACT_APP_BASE_URL + '/buckets/' + id, config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}

// Upload a new object to bucket
export const uploadObject = (data) => {
    return axios.post(process.env.REACT_APP_BASE_URL + '/buckets/' + data.id + '/objects', data.formData, config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}

// Delete a existing object from bucket
export const deleteObject = (data) => {
    return axios.delete(process.env.REACT_APP_BASE_URL + '/buckets/' + data.id + '/objects/' + data.name, config).then((response) => {
        return response;
    }).catch(error => {
        return error;
    });
}