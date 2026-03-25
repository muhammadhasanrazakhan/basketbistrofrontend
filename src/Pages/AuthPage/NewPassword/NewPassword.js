import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import passwordIcon from '../../../assets/images/login/password.svg';
import forgetPass from '../../../assets/images/login/forget-password.png';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../actions/userAction";
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import toast from 'react-hot-toast';
import { useNavigate, useMatch } from "react-router-dom";
import styles from './NewPassword.module.css';

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useMatch('/password/reset/:token');

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    // --- Validation Logic ---

    // 1. Length Check
    if (password.length < 8) {
      return toast.error("Password length must be greater than or equal to 8 characters!");
    }

    // 2. Match Check
    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password do not match!");
    }

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    // match.params.token se token nikal kar dispatch kar rahe hain
    dispatch(resetPassword(match?.params?.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully", {
        duration: 2000,
      });
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  useEffect(() => {
    document.title = 'Reset Password | Mono Basket';
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <Container className={styles.reset__section}>
          <div className={styles.reset__container}>
            <img src={forgetPass} alt='forgetPass' className={styles.reset__img} />
            
            {/* noValidate browser ki default validation ko rokne ke liye */}
            <form className={styles.reset__email} onSubmit={resetPasswordSubmit} noValidate>
              <span className={styles.inputs}>
                <input 
                  type='password' 
                  name='password' 
                  id='newpassword' 
                  autoComplete='off' 
                  spellCheck='false' 
                  placeholder='Enter Your New Password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <label htmlFor='newpassword'>
                  <img src={passwordIcon} alt='passwordIcon' />
                </label>
              </span>

              <span className={styles.inputs}>
                <input 
                  type='password' 
                  name='confirmpassword' 
                  id='confirmnewpassword' 
                  autoComplete='off' 
                  spellCheck='false' 
                  placeholder='Confirm Your Password' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
                <label htmlFor='confirmnewpassword'>
                  <img src={passwordIcon} alt='passwordIcon' />
                </label>
              </span>

              <div className='d-flex justify-content-end'>
                <button type='submit'>Update Password</button>
              </div>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default NewPassword;