import React from 'react';
import './Footer.scss';
import star from '../../../assets/images/stars-5.svg';
import neutral from '../../../assets/images/neutral.png';
import Button from '../../../commonComponents/button/Button';

const Footer = () => {
  return (
      <>
        <div className="footer">
            <div className="footer-top">
                <div className='footer-top-container'>
                    <div className="footer-top-left">
                        <h1>Sign up for our Newsletter</h1>
                        <div>Tell us what books you love.</div>
                    </div>
                    <div className="footer-top-right">
                        <Button
                            text="Sign Up"
                            backgroundColor='#573BA3'
                        />
                    </div> 
                </div> 
            </div>
            <div className="footer-bottom">
                <div style={{padding: '0 80px'}}>
                    <div className="footer-bottom-info">
                        <div className="footer-bottom-item">
                            <h1>POLARBEAR BOOKSTORE</h1>
                            <div style={{margin: '40px 0'}}>
                                <span>Follow us: </span>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-facebook"></i>
                                <i className="fab fa-instagram"></i>
                            </div>
                            <div>
                                <span>Payments Accepted: American Express, Discover, Mastercard and Visa</span>
                            </div>
                        </div>
                        <div className="footer-bottom-item">
                            <div className="footer-bottom-list">About</div>
                            <div className="footer-bottom-list">Support/Help</div>
                            <div className="footer-bottom-list">Become a Affiliate</div>
                            <div className="footer-bottom-list">Gift Cards</div>
                            <div className="footer-bottom-list">Bookshop for Authors</div>
                            <div className="footer-bottom-list">Bookshop for Bookstores</div>
                            <div className="footer-bottom-list">Contact</div>
                            <div className="footer-bottom-list">Return and Refund Policy</div>
                        </div>
                        <div className="footer-bottom-item">
                            <span style={{fontSize: '20px'}}>Trustpilot</span>
                            <div>
                                <img src={star} alt="star" className="footer-bottom-star" />
                            </div>
                            <div>
                                <img src={neutral} alt="neutral" className="footer-bottom-neutral"/>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-copyright">
                        <span>© 2022 All Rights Reserved </span>
                        <span>Terms of Use</span>
                        <span> Privacy Notice</span>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
};

export default Footer;
