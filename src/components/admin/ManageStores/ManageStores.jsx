import React, { useEffect, useState } from 'react';
import Input from '../../../commonComponents/input/Input';
import  { getAllStoresAPI, createStoreAPI, updateStoreAPI, deleteStoreAPI } from '../../../reduxtoolkit/apiService';
import Button from '../../../commonComponents/button/Button';
import { ACTIONS } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';


const ManageStores = () => {

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
 
  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAuthors = async () => {
        try {
            let response = await getAllStoresAPI(limit);
            if(response.errCode===0) {
              setAuthors(response.authors);
              setIsLoading(false);
            } else {
              setAuthors([]);
              setIsLoading(true);
            }
        } catch(e) {
          dispatch(logout());
          navigation("/login");
        }
    }
    getAllAuthors();
    
  }, [navigation, dispatch, limit])

  const handleUpdateAuthor = (author) => {
    setId(author.id);
    setName(author.name);
    setAction(ACTIONS.UPDATE);
  }

  const handleSubmit = async () => {
    const data = { id, name };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createStoreAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setAuthors([...authors, resCreate.author]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateStoreAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setAuthors(
          authors.map(author => {
            return author.id === id ? resUpdate.author : author
          })
        )
      } else {
        toast.warn(resUpdate.errMessage);
      }
    }
    setId("")
    setName("");
    setAction(ACTIONS.CREATE);
  }

  const handleDeleteAuthor = async (id) => {
    let response = await deleteStoreAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setAuthors(authors.filter(author => author.id!==id));
  }

  return (
    <div>
      <div className="title">Manage Stores</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
          <Input
            type="text"
            title="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={action===ACTIONS.UPDATE ? true : false}
          />
        </div>
      </div>
      <Button
        text={action===ACTIONS.CREATE ? "Create" : "Update"}
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
      />
      <table className='table'>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              isLoading ? 
              <tr className='table-tr'>
                <td className='table-td' colSpan='4'>
                  <LoadingSmall/>
                </td>
              </tr> :
              authors && authors.length>0 && authors.map(author => (
                <tr key={author.id}>
                  <td style={{textAlign: 'center'}}>{author.id}</td>
                  <td>{author.name}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdateAuthor(author)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeleteAuthor(author.id)}
                    ></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Button
          text="Load more"
          backgroundColor="#C8E6F8"
          onClick={() => setLimit(limit+3)}
        />
    </div>
  )
}

export default ManageStores