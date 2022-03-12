import React, { useEffect, useState } from 'react'
import Input from '../../../commonComponents/input/Input'
import { ACTIONS } from '../../../utils/constant';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { convertBase64, convertToImage, convertArrayToSelectedOpject, convertObjectToSelectedOpject } from '../../../utils/globalFunction';
import Select from 'react-select';
import Button from '../../../commonComponents/button/Button';
import { toast } from 'react-toastify';
import { createHandbookAPI, deleteHandbookAPI, getAllHandbooksAPI, updateHandbookAPI } from '../../../reduxtoolkit/apiService';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import { getAllType } from '../../../reduxtoolkit/slice/appSlice';
const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageHandbooks = () => {
  
  const [handbooks, setHandbooks] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [action, setAction] = useState(ACTIONS.CREATE);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(3);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const { types } = useSelector(state => state.app);

  useEffect(() => {
    const getAllHandbooks = async () => {
        try {
            let response = await getAllHandbooksAPI(limit);
            if(response.errCode===0) {
              setHandbooks(response.handbooks);
              setIsLoading(false);
            } else {
              setHandbooks([]);
              setIsLoading(true);
            }
        } catch(e) {
          dispatch(logout());
          navigation("/login");
        }
    }
    getAllHandbooks();
    dispatch(getAllType());
  }, [navigation, dispatch, limit])

  const handleEditorChange = ({ html, text}) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
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

  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const handleSubmit = async () => {
    let typeID = selectedOption.value;
    const data = { id, name, image, descriptionHTML, descriptionMarkdown, typeID };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createHandbookAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setHandbooks([...handbooks, resCreate.handbook]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateHandbookAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setHandbooks(
          handbooks.map(handbook => {
            return handbook.id === id ? resUpdate.handbook : handbook
          })
        )
      } else {
        toast.warn(resUpdate.errMessage);
      }
    }
    setId("")
    setName("");
    setSelectedImage("");
    setImage("");
    setSelectedOption({});
    setDescriptionHTML("");
    setDescriptionMarkdown("");
    setAction(ACTIONS.CREATE);
  }

  const handleUpdateHandbook = (handbook) => {
    setId(handbook.id);
    setName(handbook.name);
    setDescriptionHTML(handbook.descriptionHTML);
    setDescriptionMarkdown(handbook.descriptionMarkdown);
    setImage(handbook.image);
    setSelectedImage(convertToImage(handbook.image));
    setSelectedOption(convertObjectToSelectedOpject(handbook.typeOfHandbook));
    setAction(ACTIONS.UPDATE);
  }

  const handleDeleteHandbook = async (id) => {
    let response = await deleteHandbookAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setHandbooks(handbooks.filter(handbook => handbook.id!==id));
  }

  return (
    <div>
      <div className="title">Manage Handbooks</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
            <Input
              type="text"
              title="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div className="select">
              <div className="select-title">Type of Handbook</div>
              <Select
                value={selectedOption}
                options={convertArrayToSelectedOpject(types)}
                onChange={handleChangeSelect}
                styles={customStyles}
              />
            </div>
        </div>
        <div className="image">
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => handleChangeImage(e)}
          />
          <label htmlFor='image' className='image-title'>Image of Handbook</label>
          <div 
            className="image-avatar"
            style={{
              backgroundImage: `url(${selectedImage})`
            }}
          >
          </div>
        </div>
        <div className="description">
          <div className="description-title">Description of Handbook</div>
          <MdEditor 
            value={descriptionMarkdown}
            style={{ height: '500px' }} 
            renderHTML={text => mdParser.render(text)} 
            onChange={handleEditorChange} 
          />
        </div>
      </div>
      <Button
        text={action===ACTIONS.CREATE ? "Create" : "Update"}
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
      />
      <div className='title'>Tables of All Handbooks In System</div>
        <table className='table'>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Type of Handbook</th>
              <th>Description</th>
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
              handbooks && handbooks.length>0 && handbooks.map(handbook => (
                <tr key={handbook.id}>
                  <td style={{textAlign: 'center'}}>{handbook.id}</td>
                  <td>{handbook.name}</td>
                  <td>{handbook.typeOfHandbook?.name}</td>
                  <td>{`${handbook?.descriptionMarkdown.substring(0, 50)}...`}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdateHandbook(handbook)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeleteHandbook(handbook.id)}
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

export default ManageHandbooks