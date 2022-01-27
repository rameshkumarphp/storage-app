import React, { useState, useEffect } from 'react';

const BucketList = () => {
  const [createNewBucket, setCreateNewBucket] = useState(false);
  const [bucketList, setBucketList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    getLocationList();
    getBucketList();
  }, [])
  const getLocationList = () => {
    fetch('https://challenge.3fs.si/storage/locations', {
      method: "GET",
      headers: { "Authorization": "Token 924fce53-6a6d-43d8-bc74-197e41e632df" }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.locations) {
            setLocationList(result.locations);
          }
        })
      .catch(err => console.log(err));
  }
  const getBucketList = () => {
    fetch('https://challenge.3fs.si/storage/buckets', {
      method: "GET",
      headers: { "Authorization": "Token 924fce53-6a6d-43d8-bc74-197e41e632df" }
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
  return (
    <div className='container'>
      <div className='bucket-container'>
        <h4>Bucket List</h4>
        <div className="row">
          <h5>Create New Bucket</h5>
          <div className="col-6">
            <div className="form-group">
              <label>Bucket Name</label>
              <input type="text" class="form-control" placeholder="" />
            </div>
          </div>
          <div className="col-6">
            <div class="form-group">
              <label>Bucket Location</label>
              <select className="form-select" aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div class="form-group button-container">
            <button className='btn btn-primary' type="button">Create Bucket</button>
          </div>
        </div>
        <div className="row bucket-list-container">
          <div className="col-10"><h5>All Buckets</h5></div>
          <div className="col-2"><button className='btn-primary' type="button">Create New Bucket</button></div>
        </div>
        <div className="row">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col-6">Name</th>
                <th scope="col-6">Location</th>
              </tr>
              {bucketList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.location.name}</td>
                  </tr>
                )
              })
              }
            </thead>
          </table>
        </div>
      </div>
    </div>);
}

export default BucketList;