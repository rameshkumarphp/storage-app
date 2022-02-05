import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const BucketList = () => {
  const dispatch = useDispatch();

  const [createNewBucket, setCreateNewBucket] = useState(false);
  const [bucketName, setBucketName] = useState('');
  const [validError, setValidError] = useState('');

  useEffect(() => {
    dispatch({ type: 'GET_LOCATION_LIST' })
    dispatch({ type: 'GET_BUCKET_LIST' })
  }, [dispatch])

  const bucketList = useSelector((state) => state.bucketReducer.bucketData);
  const locationListData = useSelector((state) => state.locationReducer.locationData);
  let location = (locationListData && locationListData.length > 0) ? locationListData[0].id : "";
  let error = useSelector((state) => state.bucketReducer.createBucketError);

  //Create new bucket
  const onCreateNewBucket = () => {
    if (bucketName !== '') {
      error = "";
      setValidError('');
      setBucketName('');
      let newBucket = JSON.stringify({
        "name": bucketName,
        "location": location
      })
      dispatch({ type: 'CREATE_NEW_BUCKET', newBucket })
    } else {
      setValidError('Please enter valid bucket name');
    }
  }
  return (
    <div className='container'>
      <div className='bucket-container'>
        <p className='error'>{validError}</p>
        <p className='error'>{error}</p>
        <h4>Bucket List</h4>
        {createNewBucket === true &&
          <div className="row">
            <h5>Create New Bucket</h5>
            <div className="col-6">
              <div className="form-group">
                <label>Bucket Name</label>
                <input type="text" className="form-control" value={bucketName} placeholder="Bucket Name" onChange={e => setBucketName(e.target.value)} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Bucket Location</label>
                <select className="form-select" onChange={(e) => { location = e.target.value }}>
                  {locationListData && locationListData.length > 0 && locationListData.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>{item.name}</option>
                    )
                  })
                  }
                </select>
              </div>
            </div>
            <div className="form-group button-container">
              <button className='btn btn-primary' onClick={onCreateNewBucket} type="button">Create Bucket</button>
            </div>
          </div>}
        <div className="row bucket-list-container">
          <div className="col-10"><h5>All Buckets ({(bucketList && bucketList.length > 0) ? bucketList.length : 0})</h5></div>
          {createNewBucket === false && <div className="col-2"><button className='btn-primary' onClick={() => setCreateNewBucket(true)} type="button">Create New Bucket</button></div>}
        </div>
        {(bucketList && bucketList.length > 0) &&
          <div className="row">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col-6">Name</th>
                  <th scope="col-6">Location</th>
                </tr>
              </thead>
              <tbody>
                {bucketList.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td><Link to={`/bucketdetail/${item.id}`}>{item.name}</Link></td>
                      <td>{item.location.name}</td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>}
      </div>
    </div>);
}

export default BucketList;