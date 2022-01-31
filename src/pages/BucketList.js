import React, { useState, useEffect } from 'react';
import configData from '../config.json';
import { Link } from 'react-router-dom';

const BucketList = () => {
  const [createNewBucket, setCreateNewBucket] = useState(false);
  const [bucketName, setBucketName] = useState('');
  const [location, setLocation] = useState({});
  const [bucketList, setBucketList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    getLocationList();
    getBucketList();
  }, [])

  // Get the list of locations
  const getLocationList = () => {
    fetch(configData.baseUrl + '/locations', {
      method: "GET",
      headers: { "Authorization": "Token " + configData.token }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.locations && result.locations.length > 0) {
            setLocationList(result.locations);
            setLocation(result.locations[0].id);
          }
        })
      .catch(err => console.log(err));
  }

  //Get list of Buckets
  const getBucketList = () => {
    fetch(configData.baseUrl + '/buckets', {
      method: "GET",
      headers: { "Authorization": "Token " + configData.token }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.buckets) {
            setBucketList(result.buckets);
          }
        })
      .catch(err => console.log(err));
  }

  //Create new bucket
  const onCreateNewBucket = () => {
    if (bucketName !== '') {
      setError('');
      fetch(configData.baseUrl + '/buckets', {
        method: "POST",
        body: JSON.stringify({
          "name": bucketName,
          "location": location
        }),
        headers: { "Authorization": "Token " + configData.token }
      })
        .then(response => {
          if (response.status === 201) {
            getBucketList();
            setBucketName('');
            setCreateNewBucket(false);
          } else {
            setError(`Bucket name ${bucketName} already exists!`)
          }
        })
        .catch(err => console.log(err));
    } else {
      setError('Please enter valid bucket name')
    }
  }
  return (
    <div className='container'>
      <div className='bucket-container'>
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
                <select className="form-select" onChange={e => setLocation(e.target.value)}>
                  {locationList.map((item, i) => {
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
          <div className="col-10"><h5>All Buckets ({bucketList.length})</h5></div>
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