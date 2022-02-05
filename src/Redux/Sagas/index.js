import { all } from 'redux-saga/effects'
import watchBucketSaga from "./bucketSaga";
import watchBucketDetailSaga from './bucketDetailSaga';
export default function* rootSaga() {
    yield all([
        watchBucketSaga(),
        watchBucketDetailSaga()
    ]);
}