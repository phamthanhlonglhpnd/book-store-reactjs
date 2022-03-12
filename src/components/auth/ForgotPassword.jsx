import React, { useState } from 'react';
import Header from '../home/header/Header';
import Button from '../../commonComponents/button/Button';
import Input from '../../commonComponents/input/Input';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validateFunction';
import Footer from '../home/footer/Footer';
import { toast } from 'react-toastify';
import { forgotPasswordAPI } from '../../reduxtoolkit/apiService';
import Loading from '../../commonComponents/loading/Loading';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isValidate = email !== "" && emailError === "";
  const navigation = useNavigate();

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      let response = await forgotPasswordAPI({ email });
      if(response.errCode === 0) {
        toast.success(response.errMessage);
        navigation("/login");
        setIsLoading(false);
        setEmail("");
      } else {
        setEmailError(response.errMessage);
        setIsLoading(false);
      }
    } catch(e) {
      toast.warn(e);
    }
  }

  return (
    <>
      <Header/>
      <div className='auth-form'>
      <h2 style={{textAlign: 'center'}}>Enter your email and a new password will be sent to your email.</h2>
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
          <Button
            text="Submit"
            backgroundColor = { isValidate ? "#de2454" : "#cc97a4" }
            disabled={!isValidate}
            cursor={isValidate ? 'pointer' : 'not-allowed'}
            onClick = {() => handleForgotPassword()}    
          />
        </div>
      </div>
      {
        isLoading ? <Loading/> : ""
      }
      <Footer/>
    </>
  )
}

export default ForgotPassword