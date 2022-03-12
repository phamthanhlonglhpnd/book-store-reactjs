import React, { useEffect, useRef, useState } from 'react';
import "./ManageBooks.scss";
import Input from '../../../commonComponents/input/Input';
import Button from '../../../commonComponents/button/Button';
import { ACTIONS, customStyles } from '../../../utils/constant';
import { toast } from 'react-toastify';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { convertArrayToSelectedOpject, convertBase64, convertObjectToSelectedOpject, convertToImage } from '../../../utils/globalFunction';
import { getAllAuthor, getAllLanguage, getAllPublisher, getAllType } from '../../../reduxtoolkit/slice/appSlice';
import { createBookAPI } from '../../../reduxtoolkit/apiService';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageBooks = () => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState("");
  const [descriptionHTML, setDescriptionHTML] = useState("");
  const [page, setPage] = useState("");
  const [price, setPrice] = useState("");
  const [dimension, setDimension] = useState("");
  const [count, setCount] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [publishDate, setPublishDate] = useState("");
  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const [action, setAction] = useState(ACTIONS.CREATE);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { languages, publishers, authors, types } = useSelector(state => state.app);

  const handleEditorChange = ({ html, text }) => {
    setDescriptionHTML(html);
    setDescriptionMarkdown(text);
  }

  const handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let img = URL.createObjectURL(file);
      let fileBase64 = await convertBase64(file);
      setSelectedImage(img);
      setImage(fileBase64);
    }
  }

  const handleChangeSelect = (selectedOption, name) => {
    switch(name.name) {
      case 'selectedLanguage': 
        setSelectedLanguage(selectedOption);
        break;
      case 'selectedPublisher':
        setSelectedPublisher(selectedOption);
        break;
      case 'selectedAuthor':
        setSelectedAuthor(selectedOption);
        break;
      case 'selectedType': 
        setSelectedType(selectedOption);
        break;
      default: 
        return null;
    }
  }

  const handlePublishDate = (date) => {
    setPublishDate(new Date(date).toLocaleDateString('en-US'));
  }

  const handleUpdateBook = (book) => {
    setId(book.id);
    setName(book.name);
    setDescriptionHTML(book.descriptionHTML);
    setDescriptionMarkdown(book.descriptionMarkdown);
    setImage(book.image);
    setSelectedImage(convertToImage(book.image));

  }

  const handleDeleteBook = async (id) => {

  }

  const handleSubmit = async () => {
    const languageID = selectedLanguage.value;
    const publisherID = selectedPublisher.value;
    const authorID = selectedAuthor.map(author => author.value);
    const typeID = selectedType.map(type => type.value);
    const data = {
      name,
      image, 
      descriptionHTML,
      descriptionMarkdown,
      page,
      price,
      dimension, 
      count,
      publishDate,
      languageID,
      publisherID,
      authorID,
      typeID,

    }

    await createBookAPI(data);

    // setId("");
    // setName("");
    // setPage("");
    // setSelectedImage("");
    // setImage("");
    // setSelectedAuthor("");
    // setSelectedPublisher("");
    // setSelectedType("");
    // setPublishDate("");
    // setSelectedLanguage("");
    // setCount("");
    // setPage("");
    // setPrice("");
    // setDimension("");
    // setDescriptionHTML("");
    // setDescriptionMarkdown("")
  }

  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  const offShowAccount = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !menuBtnRef.current.contains(e.target)) {
      setIsShowCalendar(false);
    }
  }

  useEffect(() => {
    dispatch(getAllLanguage());
    dispatch(getAllPublisher());
    dispatch(getAllAuthor());
    dispatch(getAllType());

    window.addEventListener('click', offShowAccount, true);
    return () => {
      window.removeEventListener('click', offShowAccount, true);
    }
  }, [dispatch])

  return (
    <div>
      <div className="title">Manage Books</div>
      <div className="fields">
        <div className="fields-container fields-flex2">
          <Input
            type="text"
            title="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={action === ACTIONS.UPDATE ? true : false}
          />
          <div className='manage-book-bottom'>
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => handleChangeImage(e)}
            />
            <label htmlFor='image' className='manage-book-field'>Image</label>
            <div
              className="manage-book-avatar"
              style={{
                backgroundImage: `url(${selectedImage})`
              }}
            >
            </div>
          </div>
        </div>
        <div className="fields-container fields-flex4">
          <Input
            type="text"
            title="Page"
            value={page}
            onChange={e => setPage(e.target.value)}
          />
          <Input
            type="text"
            title="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <Input
            type="text"
            title="Dimension"
            value={dimension}
            onChange={e => setDimension(e.target.value)}
          />
          <Input
            type="text"
            title="Count"
            value={count}
            onChange={e => setCount(e.target.value)}
          />
        </div>
        <div className="fields-container fields-flex3">
          <div className="select">
            <div className="select-title">Language</div>
            <Select
              value={selectedLanguage ?? ""}
              name="selectedLanguage"
              options={convertArrayToSelectedOpject(languages)}
              onChange={handleChangeSelect}
              styles={customStyles}
            />
          </div>
          <div className="select">
            <div className="select-title">Publisher</div>
            <Select
              value={selectedPublisher ?? ""}
              name="selectedPublisher"
              options={convertArrayToSelectedOpject(publishers)}
              onChange={handleChangeSelect}
              styles={customStyles}
            />
          </div>
          {/* <div className="select">
            <div className="select-title">Store</div>
            <Select
              value={selectedOption}
              options={convertArrayToSelectedOpject(publishers)}
              onChange={handleChangeSelect}
              styles={customStyles}
            />
          </div> */}
        </div>
        <div className="fields-container fields-flex3">
          <div className="select">
            <div className="select-title">Authors</div>
            <Select
              value={selectedAuthor ?? ""}
              name="selectedAuthor"
              options={convertArrayToSelectedOpject(authors)}
              onChange={handleChangeSelect}
              styles={customStyles}
              isMulti={true}
            />
          </div>
          <div className="select">
            <div className="select-title">Categories</div>
            <Select
              value={selectedType ?? ""}
              name="selectedType"
              options={convertArrayToSelectedOpject(types)}
              onChange={handleChangeSelect}
              styles={customStyles}
              isMulti={true}
            />
          </div>
          <div className="select">
            <div className="select-title">Publish Date</div>
            <div className="select-box">
              <div
                className="select-input"
                onClick={() => setIsShowCalendar(!isShowCalendar)}
                ref={menuBtnRef}
              >
                <input 
                  type="text" 
                  defaultValue={publishDate}
                  style={{
                    position: 'absolute',
                    transform: 'translateY(-10px)'
                  }}
                />
                <i className="fas fa-angle-down select-icon"></i>
              </div>
              {
                isShowCalendar ?
                  <div 
                    className="select-options"
                    ref={menuRef}
                  >
                    <Calendar
                      onChange={(date) => handlePublishDate(date)}
                    />
                  </div> : ""
              }
            </div>
          </div>
        </div>
        <div className="description">
          <div className="description-title">Description of Book</div>
          <MdEditor
            value={descriptionMarkdown}
            style={{ height: '500px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
      </div>
      <Button
        text={action === ACTIONS.CREATE ? "Create" : "Update"}
        backgroundColor="#C8E6F8"
        onClick={() => handleSubmit()}
      />
    </div>
  )
}

export default ManageBooks