import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import validator from 'validator';
import useForm from '../../hooks/useForm';
import {setError, removeError} from '../../actions/ui';
import {startLoginEmailPassword, startGoogleLogin} from '../../actions/auth';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const {msgError} = useSelector(state => state.ui);

  const[formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const {email, password} = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  };

  const hangleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isValidForm = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is invalid'));
      return false;
    }
    else if (password.trim().length < 5) {
      dispatch(setError('Password is invalid'));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        {
          msgError &&
          (
            <div className="auth__alert-error">
              {msgError}
            </div>
          )
        }
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with Social Media</p>
          <div 
            className="google-btn"
            onClick={hangleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link
          to="/auth/register"
          className="link"
        >
          Create new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
