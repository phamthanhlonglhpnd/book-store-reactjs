import React, { useEffect, useState } from 'react';
import "./Start.scss";
import logo from "../../../assets/images/logo.jpg";
import { getHandbookByIDAPI } from '../../../reduxtoolkit/apiService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../reduxtoolkit/slice/userSlice';
import LoadingSmall from '../../../commonComponents/loadingsmall/LoadingSmall';

const Start = () => {

  const [handbook, setHandbook] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  
  useEffect(() => {
    const getHandbook = async () => {
      try {
        let response = await getHandbookByIDAPI(1);
        if(response.errCode===0) {
          setIsLoading(false);
          setHandbook(response.handbook);
        } else {
          setHandbook({});
          setIsLoading(true);
          
        }
    } catch(e) {
        dispatch(logout());
        navigation("/login");
      } 
    }
    getHandbook();
  }, [dispatch, navigation])

  return (
    <div className='start'>
        <div className="start-title">Welcome to POLARBEAR BOOKSHOP!</div>
        <div 
            style={{
                backgroundImage: `url(${logo})`
            }} 
            alt="" 
            className="start-logo">

        </div>
        <div className="start-box">
            <p className="start-comment">“Thanks to Polarbear Bookshop, there is no reason to buy books on Amazon anymore.”</p>
            <span className="start-author">— Inside Hook</span>
            <p className="start-comment">“PolarbearBookshop.org hopes to play Rebel Alliance to Amazon’s Empire.”</p>
            <span className="start-author">— Chicago Tribune</span>
        </div>
        {
          isLoading ? 
          <LoadingSmall/> : 
          <div className="start-content">
            <div className="title">About Polarbear Bookshop</div>
            <div          
              dangerouslySetInnerHTML={{__html: handbook?.descriptionHTML && handbook?.descriptionHTML}}
            >    
            </div>
          </div>
        }
    </div>
  )
}

export default Start