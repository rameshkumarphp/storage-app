import React, { useState, useEffect } from 'react';

const BucketList = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('https://challenge.3fs.si/storage/buckets', {
      method: "GET",
      headers: { "Authorization": "Token 924fce53-6a6d-43d8-bc74-197e41e632df" }
    })
      .then(response => response.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          setItems(result);
        })
      .catch(err => console.log(err));
  })
  return (
    <div className='container'>
      <div className='bucket-list-container'>
        <h4>Bucket List</h4>
        <div className="row">
          <div className="col-10">All Buckets</div>
          <div className="col-2"><button className='btn-primary' type="button">Create New Bucket</button></div>
        </div>
        <div className="row">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col-6">Name</th>
                <th scope="col-6">Location</th>
              </tr>
              {/* {items.map((el, index) => {
                return (
                  <td></td>
                )
              })
              } */}
            </thead>
          </table>
        </div>
      </div>
    </div>);
}

export default BucketList;
