import React, { useEffect, useState } from 'react';
import Background from './background/Background';
import Footer from './footer/Footer';
import Header from './header/Header';

const HomePage = () => {

  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    
    const scroll = () => {
      if(window.scrollY > 20) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    }

    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    }
  }, [])

  const scrollToTop = () => {
    setIsTop(false);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

  return (
      <div
        style={{
          position: 'relative'
        }}
      >
        <Header/>
        <Background/>
        <Background/>
        <Background/>
        <Background/>
        <Footer/>
        {
          isTop ?
          <div 
            style={{
              position: 'fixed',
              bottom: '10px',
              right:'10px',
              height: '50px',
              width: '50px',
              borderRadius: '50%',
              backgroundColor: '#FE6955',
              cursor: 'pointer',
              boxShadow: '0 0 10px 10px rgba(255, 255, 255, 0.3)'
            }}
            onClick={() => scrollToTop()}
          >
            <i 
              className='fas fa-arrow-alt-circle-up'
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '18px'
              }}
            ></i>
          </div>
          : ""
        }
      </div>
  )
};

export default HomePage;
