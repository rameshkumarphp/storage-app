import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import configData from '../config.json';

const BucketDetail = () => {
  const { id } = useParams(); // Bucket Id
  const navigate = useNavigate(); // default in react-router - used for navigation
  const [bucketDetail, setBucketDetail] = useState({}); // Details of selected bucket
  const [bucketDetailList, setBucketDetailList] = useState([]); // List of objects
  const [error, setError] = useState(''); // Errors if any
  const [rerender, setRerender] = useState(false); // Used for force update

  //Get Details of selected bucket
  const getbucketDetail = useCallback(() => {
    fetch(configData.baseUrl + '/buckets/' + id, {
      method: "GET",
      headers: { "Authorization": "Token " + configData.token }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.bucket) {
            setBucketDetail(result.bucket);
          }
        })
      .catch(err => console.log(err));
  }, [id])

  //Get list of objects
  const getBucketDetailList = useCallback(() => {
    fetch(configData.baseUrl + '/buckets/' + id + '/objects', {
      method: "GET",
      headers: { "Authorization": "Token " + configData.token }
    })
      .then(response => response.json())
      .then(
        (result) => {
          if (result.objects) {
            let bucketList = result.objects.map(el => ({ ...el, selected: false }))
            setBucketDetailList(bucketList);
          }
        })
      .catch(err => console.log(err));
  }, [id])

  useEffect(() => {
    getbucketDetail();
    getBucketDetailList();
  }, [getbucketDetail, getBucketDetailList])

  //Upload a new object
  const uploadObject = (evt) => {
    if (evt.target.files) {
      let file = evt.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      fetch(configData.baseUrl + '/buckets/' + id + '/objects', {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": "Token " + configData.token,
        }
      })
        .then(response => {
          if (response.status === 201) {
            getBucketDetailList();
          } else {
            setError('Filename already exists');
          }
        })
        .catch(err => console.log(err));
    }
  }

  //Handle selected object radio button
  const handleSelectedObject = (objName) => {
    let objList = bucketDetailList;
    for (let i = 0; i < objList.length; i++) {
      if (objList[i].name === objName) {
        objList[i].selected = true;
      } else {
        objList[i].selected = false;
      }
    }
    setBucketDetailList(objList);
    setRerender(!rerender);
  }

  //Delete an object
  const deleteObject = () => {
    setError('');
    let bucketList = bucketDetailList;
    let selectedObject = bucketList.filter((el) => el.selected === true);
    if (selectedObject.length > 0) {
      fetch(configData.baseUrl + '/buckets/' + id + '/objects/' + selectedObject[0].name, {
        method: "DELETE",
        headers: { "Authorization": "Token " + configData.token }
      })
        .then(
          (response) => {
            if (response.status === 200) {
              getBucketDetailList();
            } else {
              setError('Something went wrong, Please try again!')
            }
          })
        .catch(err => console.log(err));
    }
  }

  //Delete an bucket
  const deleteBucket = () => {
    fetch(configData.baseUrl + '/buckets/' + id, {
      method: "DELETE",
      headers: { "Authorization": "Token " + configData.token }
    })
      .then(
        (response) => {
          if (response.status === 200) {
            navigate('/', { replace: true })
          } else {
            setError('Something went wrong, Please try again!')
          }
        })
      .catch(err => console.log(err));
  }
  const bytesToMegaBytes = bytes => bytes / (1024 * 1024);
  return <div className="container">
    <div className='bucket-container'>
      <h4>My New Storage</h4>
      <Tabs defaultActiveKey="files" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="files" title="Files">
          <div className="row bucket-detail-container">
            <p className='error'>{error}</p>
            <div className='row'>
              <div className="col-8"><h5>All Files ({bucketDetailList.length})</h5></div>
              <div className="col-2">
                <button className='btn-danger' disabled={bucketDetailList.length === 0 ? true : false} onClick={deleteObject} type="button">Delete Object</button>
              </div>
              <div className="col-2">
                <input type="file" id="file" className='default-upload' onChange={(evt) => uploadObject(evt)} />
                <button className='btn-primary' onClick={() => { setError(''); document.getElementById('file').click() }} type="button">Upload Object</button>
              </div>
            </div>
            {(bucketDetailList && bucketDetailList.length > 0) &&
              < table className="table">
                <thead className="thead-light"></thead>
                <tr>
                  <th scope='col-1'></th>
                  <th scope="col-6">Name</th>
                  <th scope="col-3">Last Modified</th>
                  <th scope="col-3">Size</th>
                </tr>
                <tbody>
                  {bucketDetailList.map(
                    (item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input type="radio" checked={item.selected} onChange={(() => handleSelectedObject(item.name))} />
                          </td>
                          <td>
                            {item.name}
                          </td>
                          <td>
                            {(new Date(item.last_modified).toLocaleDateString())}
                          </td>
                          <td>
                            {`${bytesToMegaBytes(item.size).toFixed(2)} MB`}
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            }
          </div>
        </Tab>
        <Tab eventKey="details" title="Details">
          {(bucketDetail.name && bucketDetail.location) ?
            <div className="row">
              <div className="col-10">
                <table>
                  <tbody>
                    <tr>
                      <td><b>Name:</b></td>
                      <td>&nbsp;{bucketDetail.name}</td>
                    </tr>
                    <tr>
                      <td><b>Location:</b></td>
                      <td>&nbsp;{bucketDetail.location.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='col-2'>
                <button type="button" onClick={deleteBucket} className='btn btn-danger'>Delete Bucket</button>
              </div>
            </div> :
            <div>Bucket details not found!</div>
          }
        </Tab>
      </Tabs>
    </div>
  </div >
}

export default BucketDetail;
