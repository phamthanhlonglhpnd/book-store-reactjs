import React, { useEffect, useState } from 'react';
import "./ManageUsers.scss";
import Input from '../../../commonComponents/input/Input';
import { getAllUsersAPI, createUserAPI, deleteUserAPI, updateUserAPI } from '../../../reduxtoolkit/apiService';
import Button from '../../../commonComponents/button/Button';
import { ACTIONS } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { convertBase64, convertToImage } from '../../../utils/globalFunction';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';

const ManageUsers = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("123456");
  const [roleID, setRoleID] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetAllUsers = async () => {
      try {
        let response = await getAllUsersAPI();
        if(response.errCode===0) {
          setIsLoading(false);
          setUsers(response.data);
        } else {
          setUsers([]);
          setIsLoading(true);
        }
      } catch(e) {
        dispatch(logout());
        navigation("/login");
      }
    };
    handleGetAllUsers();
  }, [navigation, dispatch]);

  const handleSubmit = async () => {
    const data = { id, email, password, name, roleID, image, phone };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createUserAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setUsers([...users, resCreate.user]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateUserAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setUsers(
          users.map(user => {
            return user.id === id ? { ...data } : user
          })
        )
      } else {
        toast.warn(resUpdate.errMessage);
      }
    }
    setEmail("");
    setName("");
    setRoleID("");
    setSelectedImage("");
    setImage("");
    setPhone("");
  }

  const handleUpdateUser = (user) => {
    setId(user.id);
    setEmail(user.email);
    setName(user.name);
    setImage(user.image);
    setSelectedImage(convertToImage(user.image));
    setRoleID(user.roleID);
    setPhone(user.phone);
    setAction(ACTIONS.UPDATE);
    setSelectedImage(convertToImage(user.image));
  }

  const handleDeleteUser = async (id) => {
    let response = await deleteUserAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setUsers(users.filter(user => user.id!==id));
  }

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if(file) {
      let img = URL.createObjectURL(file);
      let fileBase64 = await convertBase64(file);
      setSelectedImage(img);
      setImage(fileBase64);
    }
  }

  return (
    <div className="manage-user">
      <div className="title">Manage Users</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
          <Input
            type="text"
            title="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={action===ACTIONS.UPDATE ? true : false}
          />
          <Input
            type="password"
            title="Password"
            value={password}
            disabled={true}
          />
        </div>
        <div className="fields-container fields-flex3">
          <Input
            type="text"
            title="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="text"
            title="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <Input
            type="text"
            title="RoleID"
            value={roleID}
            onChange={e => setRoleID(e.target.value)}
          />
        </div>
        <div className='manage-user-bottom'>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => handleChangeImage(e)}
          />
          <label htmlFor='image' className='manage-user-field'>Avatar</label>
          <div 
            className="manage-user-avatar"
            style={{
              backgroundImage: `url(${selectedImage})`
            }}
          >
          </div>
        </div>
      </div>
      <Button
        text={action===ACTIONS.CREATE ? "Create" : "Update"}
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
      />
      <div className='title'>Tables of All Users In System</div>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>RoleID</th>
              <th>Phone</th>
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
              users && users.length>0 && users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roleID}</td>
                  <td>{user.phone}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdateUser(user)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeleteUser(user.id)}
                    ></i>
                    <i className="fas fa-eye"></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}


export default ManageUsers;