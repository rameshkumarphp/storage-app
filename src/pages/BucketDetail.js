import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const BucketDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Bucket Id
  const navigate = useNavigate(); // default in react-router - used for navigation
  const [rerender, setRerender] = useState(false); // Used for force update
  const [validError, setValidError] = useState('');
  let errorMsg = "";

  //Get Details of selected bucket
  const getbucketDetail = useCallback(() => {
    dispatch({ type: "GET_BUCKET_DETAIL", id })
  }, [dispatch, id])

  //Get list of objects
  const getBucketDetailList = useCallback(() => {
    dispatch({ type: "GET_BUCKET_OBJECTS", id })
  }, [dispatch, id])

  useEffect(() => {
    getbucketDetail();
    getBucketDetailList();
  }, [getbucketDetail, getBucketDetailList])

  //Upload a new object
  const uploadObject = (evt) => {
    setValidError('');
    if (evt.target.files) {
      let file = evt.target.files[0];
      let filenameExist = bucketDetailList.filter((el) => el.name === file.name);
      if (filenameExist.length > 0) {
        setValidError('File name already exists!')
      } else {
        let formData = new FormData();
        formData.append('file', file);
        let data = {
          id: id,
          formData: formData
        }
        dispatch({ type: "CREATE_OBJECT", data })
      }
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
    bucketDetailList = objList;
    setRerender(!rerender);
  }

  //Delete an object
  const deleteObject = () => {
    let bucketList = bucketDetailList;
    let selectedObject = bucketList.filter((el) => el.selected === true);
    if (selectedObject.length > 0) {
      let data = {
        id: id,
        name: selectedObject[0].name
      }
      dispatch({ type: "REMOVE_OBJECT", data })
    }
  }

  //Delete an bucket
  const deleteBucket = () => {
    dispatch({ type: "REMOVE_BUCKET", id })
  }

  const bytesToMegaBytes = bytes => bytes / (1024 * 1024);

  const bucketDetail = useSelector((state) => state.bucketDetailReducer.bucketDetail);
  let bucketDetailError = useSelector((state) => state.bucketDetailReducer.bucketDetailError);
  if (bucketDetailError !== undefined) errorMsg = bucketDetailError;

  let bucketDetailList = useSelector((state) => state.bucketDetailReducer.bucketObjects);
  let bucketObjectsError = useSelector((state) => state.bucketDetailReducer.bucketObjectsError);
  if (bucketObjectsError !== undefined) errorMsg = bucketObjectsError;

  const removeBucket = useSelector((state) => state.bucketDetailReducer.removeBucket);
  if (removeBucket === true) navigate('/', { replace: true });
  let removeBucketError = useSelector((state) => state.bucketDetailReducer.removeBucketError);
  if (removeBucketError !== undefined) errorMsg = removeBucketError;

  const createObject = useSelector((state) => state.bucketDetailReducer.createObject);
  if (createObject === true) getBucketDetailList();
  let createObjectError = useSelector((state) => state.bucketDetailReducer.createObjectError);
  if (createObjectError !== undefined) errorMsg = createObjectError;

  const removeObject = useSelector((state) => state.bucketDetailReducer.removeObject);
  if (removeObject === true) getBucketDetailList();
  let removeObjectError = useSelector((state) => state.bucketDetailReducer.removeObjectError);
  if (removeObjectError !== undefined) errorMsg = removeObjectError;

  return (
    <div className="container">
      <div className='bucket-container'>
        <h4>My New Storage</h4>
        <Tabs defaultActiveKey="files" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="files" title="Files">
            <div className="row bucket-detail-container">
              <p className='error'>{validError}</p>
              <p className='error'>{errorMsg}</p>
              <div className='row'>
                <div className="col-8"><h5>All Files ({(bucketDetailList && bucketDetailList.length) ? bucketDetailList.length : 0})</h5></div>
                <div className="col-2">
                  <button className='btn-danger' disabled={bucketDetailList && bucketDetailList.length === 0 ? true : false} onClick={deleteObject} type="button">Delete Object</button>
                </div>
                <div className="col-2">
                  <input type="file" id="file" className='default-upload' onChange={(evt) => uploadObject(evt)} />
                  <button className='btn-primary' onClick={() => { document.getElementById('file').click() }} type="button">Upload Object</button>
                </div>
              </div>
              {(bucketDetailList && bucketDetailList.length > 0) &&
                < table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope='col-1'></th>
                      <th scope="col-6">Name</th>
                      <th scope="col-3">Last Modified</th>
                      <th scope="col-3">Size</th>
                    </tr>
                  </thead>
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
            {(bucketDetail && bucketDetail.name && bucketDetail.location) ?
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
    </div >)
}

export default BucketDetail;
