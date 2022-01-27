import React from 'react';

const BucketDetail = () => {
  return <div className="container">
    <div className='bucket-container'>
      <h4>My New Storage</h4>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="files-tab" data-bs-toggle="tab" data-bs-target="#files" type="button" role="tab" aria-controls="files" aria-selected="true">Files</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="details-tab" data-bs-toggle="tab" data-bs-target="#tabs" type="button" role="tab" aria-controls="details" aria-selected="false">Details</button>
        </li>
      </ul>
    </div>
  </div>;
}

export default BucketDetail;
