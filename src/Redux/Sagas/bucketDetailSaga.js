import { call, put, takeLatest } from 'redux-saga/effects';
import { getBucketDetail, getBucketObjects, deleteBucket, uploadObject, deleteObject } from '../Services';

function* fetchBucketDetail(action) {
    try {
        const bucketData = yield call(getBucketDetail, action.id);
        if (bucketData.status === 200 && bucketData.data && bucketData.data.bucket) {
            yield put({ type: "BUCKET_DETAIL_FETCH_FAILED", message: '' });
            yield put({ type: "BUCKET_DETAIL_FETCH_SUCCEEDED", response: bucketData.data.bucket });
        } else {
            yield put({ type: "BUCKET_DETAIL_FETCH_FAILED", message: 'Unable to fetch bucket detail, please try again' });
        }
    } catch (e) {
        yield put({ type: "BUCKET_DETAIL_FETCH_FAILED", message: 'Unable to fetch bucket detail, please try again' });
    }
}

function* fetchBucketObjects(action) {
    try {
        const bucketObjectsData = yield call(getBucketObjects, action.id);
        if (bucketObjectsData.status === 200 && bucketObjectsData.data && bucketObjectsData.data.objects) {
            yield put({ type: "BUCKET_OBJECTS_FETCH_FAILED", message: '' });
            let bucketObjects = bucketObjectsData.data.objects.map(el => ({ ...el, selected: false }))
            yield put({ type: "BUCKET_OBJECTS_FETCH_SUCCEEDED", response: bucketObjects });
        } else {
            yield put({ type: "BUCKET_OBJECTS_FETCH_FAILED", message: 'Unable to fetch bucket objects, please try again!' });
        }
    } catch (e) {
        yield put({ type: "BUCKET_OBJECTS_FETCH_FAILED", message: 'Unable to fetch bucket objects, please try again!' });
    }
}

function* removeBucket(action) {
    try {
        const deleteBucketData = yield call(deleteBucket, action.id);
        if (deleteBucketData.status === 200) {
            yield put({ type: "BUCKET_DELETE_FAILED", message: '' });
            yield put({ type: "BUCKET_DELETE_SUCCEEDED", response: true });
        } else {
            yield put({ type: "BUCKET_DELETE_FAILED", message: 'Unable to delete bucket, please try again!' });
        }
    } catch (e) {
        yield put({ type: "BUCKET_DELETE_FAILED", message: 'Unable to delete bucket, please try again!' });
    }
}

function* createObject(action) {
    try {
        const createObjectData = yield call(uploadObject, action.data);
        if (createObjectData && createObjectData.status === 201) {
            yield put({ type: "OBJECT_CREATE_FAILED", message: '' });
            yield put({ type: "OBJECT_CREATE_SUCCEEDED", response: true });
            yield put({ type: "OBJECT_CREATE_SUCCEEDED", response: false });
        } else {
            yield put({ type: "OBJECT_CREATE_FAILED", message: 'Filename already exists!' });
        }
    } catch (e) {
        yield put({ type: "OBJECT_CREATE_FAILED", message: 'Failed to create new object, please try again!' });
    }
}

function* removeObject(action) {
    try {
        const deleteObjectData = yield call(deleteObject, action.data);
        if (deleteObjectData.status === 200) {
            yield put({ type: "OBJECT_DELETE_FAILED", message: '' });
            yield put({ type: "OBJECT_DELETE_SUCCEEDED", response: true });
            yield put({ type: "OBJECT_DELETE_SUCCEEDED", response: false });

        } else {
            yield put({ type: "OBJECT_DELETE_FAILED", message: 'Unable to delete Object, please try again!' });
        }
    } catch (e) {
        yield put({ type: "OBJECT_DELETE_FAILED", message: 'Unable to delete object, please try again!' });
    }
}

function* watchBucketDetailSaga() {
    yield takeLatest("GET_BUCKET_DETAIL", fetchBucketDetail);
    yield takeLatest("GET_BUCKET_OBJECTS", fetchBucketObjects);
    yield takeLatest("REMOVE_BUCKET", removeBucket);
    yield takeLatest("CREATE_OBJECT", createObject);
    yield takeLatest("REMOVE_OBJECT", removeObject);

}

export default watchBucketDetailSaga;