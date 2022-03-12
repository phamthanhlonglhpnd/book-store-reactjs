import React, { useState } from 'react';
import Button from '../../commonComponents/button/Button';
import Input from '../../commonComponents/input/Input';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../home/footer/Footer';
import Header from '../home/header/Header';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../utils/validateFunction';
import { toast } from 'react-toastify';
import { registerAPI } from '../../reduxtoolkit/apiService';

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const isValidate = email !=="" && password !== "" && confirmPassword !== "" && emailError ==="" && passwordError === "" && confirmPasswordError === "";
  const navigation = useNavigate();

  const handleRegister = async () => {
    try {
      let response = await registerAPI({email, password});
      if(response.errCode===0) {
        navigation("/login");
      } else {
        setEmailError(response.errMessage);
      }
    } catch(e) {
      toast.warn(e);
    }
  }
  
  return (
      <>
        <Header/>
        <div className="auth-form">
          
            <h2 style={{textAlign: 'center'}}>Create an account for fast checkout, special coupon codes, wishlists, and order history.</h2>
            <div className="auth-form-box">
              <div>
                <Input
                  title="Email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value, setEmailError)
                  }}
                  onBlur={() => setEmailError("")}
                />
                <div className='auth-form-error'>{emailError}</div>
              </div>
              <div style={{position: 'relative'}}>
                <Input
                  title="Password"
                  type={isShowPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value, setPasswordError)
                  }}
                  onBlur={() => setPasswordError("")}
                />
                <div className='auth-form-error'>{passwordError}</div>
                <div 
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="auth-form-show"
                >
                  {
                    isShowPassword ? 
                    <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>
                  }
                </div>
              </div>
              <div style={{position: 'relative'}}>
                <Input
                  title="Password Confirmation"
                  type={isShowConfirmPassword ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(password, e.target.value, setConfirmPasswordError)
                  }}
                  onBlur={() => setConfirmPasswordError("")}
                />
                <div className='auth-form-error'>{confirmPasswordError}</div>
                <div 
                  onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                  className="auth-form-show"
                >
                  {
                    isShowConfirmPassword ? 
                    <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>
                  }
                </div>
              </div>
              <div style={{padding: '20px 0', lineHeight: '1.5'}}>By creating an account, you agree to Bookshop’s Privacy Notice and Terms of Use.</div>
              <Button
                text="Register"
                backgroundColor = { isValidate ? "#de2454" : "#cc97a4" }
                disabled={!isValidate}
                cursor={isValidate ? 'pointer' : 'not-allowed'}
                onClick={() => handleRegister()}
              />
              <div style={{padding: '20px 0'}}>Or <Link style={{display: 'inline-block'}} to="/login">Login</Link> as Existing Customer</div>
            </div>
          
        </div>
        <Footer/>
      </>
  )
};

export default Register;
