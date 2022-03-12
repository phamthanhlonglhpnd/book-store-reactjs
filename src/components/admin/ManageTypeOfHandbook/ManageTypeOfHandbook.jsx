import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../commonComponents/button/Button';
import Input from '../../../commonComponents/input/Input';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { createTypeAPI, deleteTypeAPI, getAllTypeAPI, updateTypeAPI } from '../../../reduxtoolkit/apiService';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import { ACTIONS } from '../../../utils/constant';

const ManageTypeOfHandbook = () => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [action, setAction] = useState(ACTIONS.CREATE);
  const [types, setTypes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();

    const handleGetAllUsers = async () => {
      try {
        let response = await getAllTypeAPI(page);
        if(response.errCode===0) {
          setIsLoading(false);
          isMounted && setTypes(response.types);
          setTotalPage(Math.ceil(response.count/5));
        } else {
          setTypes([]);
          setIsLoading(true);
        }
      } catch(e) {
        dispatch(logout());
        navigation("/login");
      }
    };
    handleGetAllUsers();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [navigation, dispatch, page]);

  const handleSubmit = async () => {
    const data = { id, name };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createTypeAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setTypes([...types, resCreate.type]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateTypeAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setTypes(
          types.map(type => {
            return type.id === id ? { ...data } : type
          })
        )
      } else {
        toast.warn(resUpdate.errMessage);
      }
    }
    setId("")
    setName("");
  }

  const handleUpdateType = (type) => {
    setId(type.id);
    setName(type.name);
    setAction(ACTIONS.UPDATE);
  }

  const handleDeleteType = async (id) => {
    let response = await deleteTypeAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setTypes(types.filter(type => type.id!==id));
  }

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  }

  return (
    <div>
        <div className="title">Manage Type of Handbook</div>
        <div className="fields">
          <div className="fields-container fields-flex2">
            <Input
              type="text"
              title="Type of Handbook"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <Button
        text={action===ACTIONS.CREATE ? "Create" : "Update"}
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
        />
        <div className='title'>Tables of All Type of Handbook In System</div>
        <table className='table'>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Date created</th>
              <th>Date updated</th>
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
              types && types.length>0 && types.map(type => (
                <tr key={type.id}>
                  <td style={{textAlign: 'center'}}>{type.id}</td>
                  <td>{type.name}</td>
                  <td>{new Date(Date.parse(type.createdAt)).toLocaleString()}</td>
                  <td>{new Date(Date.parse(type.updatedAt)).toLocaleString()}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdateType(type)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeleteType(type.id)}
                    ></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
    </div>
  )
}

export default ManageTypeOfHandbook