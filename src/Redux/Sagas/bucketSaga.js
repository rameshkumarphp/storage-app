import { call, put, takeLatest } from 'redux-saga/effects'
import { getBucketList, getLocationList, createNewBucket } from '../Services/index'

function* fetchBucketList() {
    try {
        const bucketData = yield call(getBucketList);
        if (bucketData.status === 200 && bucketData.data && bucketData.data.buckets && bucketData.data.buckets.length > 0) {
            yield put({ type: "BUCKET_FETCH_FAILED", message: '' });
            yield put({ type: "BUCKET_FETCH_SUCCEEDED", response: bucketData.data.buckets });
        } else {
            yield put({ type: "BUCKET_FETCH_FAILED", message: 'Something went wrong, Please try again' });
        }
    } catch (e) {
        yield put({ type: "BUCKET_FETCH_FAILED", message: 'Unable to fetch buckets, please try again' });
    }
}

function* fetchLocationList() {
    try {
        const locationData = yield call(getLocationList);
        if (locationData.status === 200 && locationData.data && locationData.data.locations && locationData.data.locations.length > 0) {
            yield put({ type: "LOCATION_FETCH_FAILED", message: '' });
            yield put({ type: "LOCATION_FETCH_SUCCEEDED", response: locationData.data.locations });
        } else {
            yield put({ type: "LOCATION_FETCH_FAILED", message: 'Something went wrong, Please try again' });
        }
    } catch (e) {
        yield put({ type: "LOCATION_FETCH_FAILED", message: 'Unable to fetch buckets, please try again' });
    }
}

function* onCreateNewBucket(action) {
    try {
        const bucketData = yield call(createNewBucket, action.newBucket);
        if (bucketData.status === 201) {
            yield put({ type: "CREATE_BUCKET_FAILED", message: '' });
            yield call(fetchBucketList);
        } else {
            yield put({ type: "CREATE_BUCKET_FAILED", message: `Bucket name already exists!` });
        }
    } catch (e) {
        yield put({ type: "CREATE_BUCKET_FAILED", message: 'Something went wrong, please try again' });
    }
}

function* watchBucketSaga() {
    yield takeLatest("GET_BUCKET_LIST", fetchBucketList);
    yield takeLatest("GET_LOCATION_LIST", fetchLocationList);
    yield takeLatest("CREATE_NEW_BUCKET", onCreateNewBucket);
}

export default watchBucketSaga;