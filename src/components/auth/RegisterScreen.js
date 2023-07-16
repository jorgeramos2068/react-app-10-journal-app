import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import validator from 'validator';
import useForm from '../../hooks/useForm';
import {setError, removeError} from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {msgError} = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isValidForm()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isValidForm = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Invalid name'));
      return false;
    }
    else if (!validator.isEmail(email)) {
      dispatch(setError('Invalid email'));
      return false;
    }
    else if (password !== password2 || password.trim().length < 5) {
      dispatch(setError('Passwords do not match or are invalid'));
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
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
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>
        <Link
          to="/auth/login"
          className="link"
        >
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
