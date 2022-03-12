import React, { useState } from 'react';
import Footer from '../home/footer/Footer';
import Header from '../home/header/Header';
import Button from '../../commonComponents/button/Button';
import Input from '../../commonComponents/input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../utils/validateFunction';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordAPI } from '../../reduxtoolkit/apiService';
import { toast } from 'react-toastify';
import { logout } from '../../reduxtoolkit/slice/userSlice';

const ChangePassword = () => {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const isValidate = password !== "" && newPassword !== "" && confirmNewPassword !== "" && newPasswordError === "" && passwordError === "" && confirmPasswordError === "";
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { userInfor } = useSelector(state => state.user);
  const { id } = userInfor;

  const handleChangePassword = async () => {
    try {
      let response = await changePasswordAPI({ id, password, newPassword });
      if (response.errCode === 0) {
        toast.success(response.errMessage);
        dispatch(logout());
        navigation("/login");

      } else {
        setPasswordError(response.errMessage);
      }
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (e) {
      toast.warn(e);
    }
  }

  return (
    <>
      <Header />
      <div className="auth-form">

        <h2 style={{ textAlign: 'center' }}>Change your password</h2>
        <div className="auth-form-box">
          <div>
            <Input
              title="Password"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value, setPasswordError)
              }}
              onBlur={() => setPasswordError("")}
            />
            <div className='auth-form-error'>{passwordError}</div>
          </div>
          <div style={{ position: 'relative' }}>
            <Input
              title="New Password"
              type={isShowPassword ? "password" : "text"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePassword(e.target.value, setNewPasswordError)
              }}
              onBlur={() => setNewPasswordError("")}
            />
            <div className='auth-form-error'>{newPasswordError}</div>
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
          <div style={{ position: 'relative' }}>
            <Input
              title="New Password Confirmation"
              type={isShowConfirmPassword ? "password" : "text"}
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                validateConfirmPassword(newPassword, e.target.value, setConfirmPasswordError)
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
          <Button
            text="Submit"
            backgroundColor={isValidate ? "#de2454" : "#cc97a4"}
            disabled={!isValidate}
            cursor={isValidate ? 'pointer' : 'not-allowed'}
            onClick={() => handleChangePassword()}
          />
        </div>

      </div>
      <Footer />
    </>
  )
}

export default ChangePassword