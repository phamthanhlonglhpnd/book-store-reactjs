import React, { useEffect, useState } from 'react';
import Input from '../../../commonComponents/input/Input';
import { getAllAuthorsAPI, createAuthorAPI, deleteAuthorAPI, updateAuthorAPI } from '../../../reduxtoolkit/apiService';
import Button from '../../../commonComponents/button/Button';
import { ACTIONS } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageAuthors = () => {

  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
 
  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleEditorChange = ({ html, text}) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  }

  useEffect(() => {
    const getAllAuthors = async () => {
        try {
            let response = await getAllAuthorsAPI(limit);
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
    setDescriptionHTML(author.descriptionHTML);
    setDescriptionMarkdown(author.descriptionMarkdown);
    setAction(ACTIONS.UPDATE);
  }

  const handleSubmit = async () => {
    const data = { id, name, descriptionHTML, descriptionMarkdown };
    if(action===ACTIONS.CREATE) {
      let resCreate = await createAuthorAPI(data);
      if(resCreate.errCode===0) {
        toast.success("Success!");
        setAuthors([...authors, resCreate.author]);
      } else {
        toast.warn(resCreate.errMessage);
      }
    }
    if(action===ACTIONS.UPDATE) {
      let resUpdate = await updateAuthorAPI(data);
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
    setDescriptionHTML("");
    setDescriptionMarkdown("");
    setAction(ACTIONS.CREATE);
  }

  const handleDeleteAuthor = async (id) => {
    let response = await deleteAuthorAPI(id);
    if(response.errCode===0) {
      toast.success("Success!");
    } else {
      toast.warn(response.errMessage);
    }
    setAuthors(authors.filter(author => author.id!==id));
  }

  return (
    <div>
      <div className="title">Manage Authors</div>
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
        <div className="description">
          <div className="description-title">Description of Author</div>
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
              authors && authors.length>0 && authors.map(author => (
                <tr key={author.id}>
                  <td style={{textAlign: 'center'}}>{author.id}</td>
                  <td>{author.name}</td>
                  
                  <td>{`${author?.descriptionMarkdown.substring(0, 50)}...`}</td>
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

export default ManageAuthors