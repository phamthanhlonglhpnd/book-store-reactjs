import React, { useEffect, useState } from 'react';
import Input from '../../../commonComponents/input/Input';
import  { createLanguageAPI, deleteLanguageAPI, getAllLanguagesAPI, updateLanguageAPI } from '../../../reduxtoolkit/apiService';
import Button from '../../../commonComponents/button/Button';
import { ACTIONS } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';


const ManageLanguage = () => {

  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
 
  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllLanguages = async () => {
        try {
            let response = await getAllLanguagesAPI();
            if(response.errCode===0) {
              setLanguages(response.languages);
              setIsLoading(false);
            } else {
              setLanguages([]);
              setIsLoading(true);
            }
        } catch(e) {
          dispatch(logout());
          navigation("/login");
        }
    }
    getAllLanguages();
    
  }, [navigation, dispatch])

  const handleUpdateLanguage = (language) => {
    setId(language.id);
    setName(language.name);
    setAction(ACTIONS.UPDATE);
  }

  const handleSubmit = async () => {
    const data = { id, name };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createLanguageAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setLanguages([...languages, resCreate.language]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateLanguageAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setLanguages(
          languages.map(language => {
            return language.id === id ? resUpdate.language : language
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

  const handleDeleteLanguage = async (id) => {
    let response = await deleteLanguageAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setLanguages(languages.filter(language => language.id!==id));
  }

  return (
    <div>
      <div className="title">Manage Languages</div>
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
              languages && languages.length>0 && languages.map(language => (
                <tr key={language.id}>
                  <td style={{textAlign: 'center'}}>{language.id}</td>
                  <td>{language.name}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdateLanguage(language)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeleteLanguage(language.id)}
                    ></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default ManageLanguage