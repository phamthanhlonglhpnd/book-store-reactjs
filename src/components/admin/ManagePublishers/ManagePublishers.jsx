import React, { useEffect, useState } from 'react';
import Input from '../../../commonComponents/input/Input';
import Button from '../../../commonComponents/button/Button';
import { createPublisherAPI, updatePublisherAPI, getAllPublishersAPI, deletePublisherAPI } from '../../../reduxtoolkit/apiService';
import { ACTIONS } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { convertBase64, convertToImage } from '../../../utils/globalFunction';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManagePublishers = () => {

  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
 
  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const getAllPublishers = async () => {
        try {
            let response = await getAllPublishersAPI(limit);
            if(response.errCode===0) {
              setPublishers(response.publishers);
              setIsLoading(false);
            } else {
              setPublishers([]);
              setIsLoading(true);
            }
        } catch(e) {
          dispatch(logout());
          navigation("/login");
        }
    }
    getAllPublishers();
    
  }, [navigation, dispatch, limit])

  const handleUpdatePublisher = (publisher) => {
    setId(publisher.id);
    setName(publisher.name);
    setImage(publisher.image);
    setSelectedImage(convertToImage(publisher.image));
    setDescriptionHTML(publisher.descriptionHTML);
    setDescriptionMarkdown(publisher.descriptionMarkdown);
    setAction(ACTIONS.UPDATE);
  }

  const handleSubmit = async () => {
    const data = { id, name, image, descriptionHTML, descriptionMarkdown };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createPublisherAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setPublishers([...publishers, resCreate.publisher]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updatePublisherAPI(data);
      if(resUpdate.errCode===0) {
        toast.success("Success!");
        setPublishers(
          publishers.map(publisher => {
            return publisher.id === id ? resUpdate.publisher : publisher
          })
        )
      } else {
        toast.warn(resUpdate.errMessage);
      }
    }
    setId("")
    setName("");
    setImage("");
    setSelectedImage("");
    setDescriptionHTML("");
    setDescriptionMarkdown("");
    setAction(ACTIONS.CREATE);
  }

  const handleDeletePublisher = async (id) => {
    let response = await deletePublisherAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setPublishers(publishers.filter(publisher => publisher.id!==id));
  }

  return (
    <div>
      <div className="title">Manage Publishers</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
          <Input
            type="text"
            title="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={action===ACTIONS.UPDATE ? true : false}
          />
          <div className='manage-user-bottom'>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => handleChangeImage(e)}
            />
            <label htmlFor='image' className='manage-user-field'>Image</label>
            <div 
              className="manage-user-avatar"
              style={{
                backgroundImage: `url(${selectedImage})`
              }}
            >
          </div>
        </div>
        </div>
        <div className="description">
          <div className="description-title">Description of Publisher</div>
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
      <table className='table'>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
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
              publishers && publishers.length>0 && publishers.map(publisher => (
                <tr key={publisher.id}>
                  <td style={{textAlign: 'center'}}>{publisher.id}</td>
                  <td>{publisher.name}</td>
                  
                  <td>{`${publisher?.descriptionMarkdown.substring(0, 50)}...`}</td>
                  <td>
                    <i 
                      className="fas fa-pen"
                      onClick={() => handleUpdatePublisher(publisher)}
                    ></i>
                    <i 
                      className="fas fa-trash-alt"
                      onClick={() =>handleDeletePublisher(publisher.id)}
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

export default ManagePublishers