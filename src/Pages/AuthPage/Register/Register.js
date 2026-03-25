import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../actions/userAction";

import emailIcon from '../../../assets/images/login/email.svg';
import passwordIcon from '../../../assets/images/login/password.svg';
import userIcon from '../../../assets/images/login/user.svg';
import PreLoader from '../../SharedComponents/PreLoader/PreLoader';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();

    // --- Validation Logic ---
    
    // 1. Name Validation: Numbers allow nahi honge (Sirf letters aur spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return toast.error("Please enter your name");
    }
    if (!nameRegex.test(name)) {
      return toast.error("Special characters are not allowed in the name. Please enter a valid name!");
    }

    // 2. Email Validation: Sahi pattern check karega
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address!");
    }

    // 3. Password Validation: Minimum 8 characters
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    // Agar saari validations pass ho gayin, to register dispatch karo
    dispatch(register(name, email, password));
  };

  const redirect = "/main-home";

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  useEffect(() => {
    document.title = 'Register | Mono Basket';
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <section id={styles.register}>
          <Container>
            <h3>Get started for free!</h3>

            {/* noValidate browser ki default tooltips ko rokne ke liye hai */}
            <form onSubmit={registerSubmit} autoComplete='off' noValidate>
              <span className={styles.inputs}>
                <input 
                  type='text' 
                  name="name"
                  id='name1' 
                  placeholder='Enter Your Full Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
                <label htmlFor='name1'>
                  <img src={userIcon} alt='userIcon' />
                </label>
              </span>

              <span className={styles.inputs}>
                <input
                  type='email'
                  name='email'
                  id='email2'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor='email2'>
                  <img src={emailIcon} alt='emailIcon' />
                </label>
              </span>

              <span className={styles.inputs}>
                <input
                  type='password'
                  name='password'
                  id='password1'
                  placeholder='Enter Your Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor='password1'>
                  <img src={passwordIcon} alt='passwordIcon' />
                </label>
              </span>

              <span className={styles.options}>
                <NavLink to='/login'>Already Have Account?</NavLink>
              </span>
              
              <button type='submit'>
                Get Started Now <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </form>
          </Container>
        </section>
      )}
    </>
  );
};

export default Register;