import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../../commonComponents/button/Button';
import Input from '../../../commonComponents/input/Input';
import { getUserByIDAPI, updateUserAPI } from '../../../reduxtoolkit/apiService';
import { convertBase64, convertToImage } from '../../../utils/globalFunction';

const ManageAccount = () => {

  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const { userInfor } = useSelector( state => state.user );
  const { id } = userInfor;

  useEffect(() => {
    const getUserByID = async () => {
      try {
        let response = await getUserByIDAPI(id);
        setUser(response.user);
        setSelectedImage(convertToImage(response.user?.image));
        setName(response.user?.name);
        setPhone(response.user?.phone);
      } catch(e) {
        toast.warn(e);
        setUser({})
      }
    }
    getUserByID();
  }, [id])

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if(file) {
      let img = URL.createObjectURL(file);
      let fileBase64 = await convertBase64(file);
      setSelectedImage(img);
      setImage(fileBase64);
    }
  }

  const handleSubmit = async () => {
    const { email, roleID } = user;
    const data = { id, image, name, email, roleID, phone };
    let resUpdate = await updateUserAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setUser(data);
      } else {
        toast.warn(resUpdate.errMessage);
      }
  }

  return (
    <div className=''>
      <div className="title">Manage Account</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
          <Input
            type="text"
            title="Email"
            value={userInfor.email}
            disabled={true}
          />
          <Input
            type="password"
            title="Password"
            value="123456"
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
            value={userInfor.roleID}
            disabled={true}
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
        text="Update"
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default ManageAccount