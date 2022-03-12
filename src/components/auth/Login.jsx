import React, { useState } from 'react';
import Button from '../../commonComponents/button/Button';
import Input from '../../commonComponents/input/Input';
import { login } from '../../reduxtoolkit/slice/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../home/footer/Footer';
import Header from '../home/header/Header';
import { validateEmail, validatePassword } from '../../utils/validateFunction';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const isValidate = email !=="" && password !== "" && emailError ==="" && passwordError === "";

  const dispatch = useDispatch();
  const navigation = useNavigate();
  
  const handleLogin = async ( email, password ) => {
    try {
      const response = await dispatch(login({ email, password })).unwrap();
      if(response.errCode===0) {
        navigation("/");
      }
      if(response.errCode===1) {
        setEmailError(response.errMessage);
      }
      if(response.errCode===2) {
        setPasswordError(response.errMessage);
      }
    } catch (e) {
      toast.warn(e);
    }
  }

  const loginWithEnter = (e) => {
    if(e.key === "Enter") {
      handleLogin();
    }
  }


  return (
      <>
        <Header/>
        <div className="auth-form">
          {/* <div className="container"> */}
            <h2 style={{textAlign: 'center'}}>Login as Existing Customer</h2>
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
                  onKeyDown = {(e) => loginWithEnter(e)}
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
              <div style={{padding: '20px 0', lineHeight: '1.5'}}>By creating an account, you agree to Bookshop’s Privacy Notice and Terms of Use.</div>
              <Button
                text="Login"
                backgroundColor = { isValidate ? "#de2454" : "#cc97a4" }
                onClick={() => handleLogin( email, password )}
              />
              <div style={{padding: '20px 0'}}>
                or <Link style={{display: 'inline-block'}} to="/register">Create a new account</Link> | <Link style={{display: 'inline-block'}} to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
          {/* </div> */}
        </div>
        <Footer/>
      </>
  )
};

export default Login;
