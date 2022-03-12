import React from 'react';
import Slider from "react-slick";
import './Background.scss';
import bg1 from '../../../assets/images/bg1.jpg';
import bg2 from '../../../assets/images/bg2.jpg';
import bg3 from '../../../assets/images/bg3.jpg';
import bg4 from '../../../assets/images/bg4.jpg';
import bg5 from '../../../assets/images/bg5.jpg';
import bg6 from '../../../assets/images/bg6.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Background = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 5000,
      };

  return (
      <div className='background'>
        <Slider {...settings}>
          <div>
            <img src={bg1} alt="bg1" className="background-image" />
          </div>
          <div>
            <img src={bg2} alt="bg2" className="background-image" />
          </div>
          <div>
            <img src={bg3} alt="bg3" className="background-image" />
          </div>
          <div>
            <img src={bg4} alt="bg4" className="background-image" />
          </div>
          <div>
            <img src={bg5} alt="bg5" className="background-image" />
          </div>
          <div>
            <img src={bg6} alt="bg6" className="background-image" />
          </div>
          
        </Slider>
      </div>
  )
};

export default Background;
