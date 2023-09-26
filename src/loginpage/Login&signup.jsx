import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Auth.css';


const Auth = () => {
  const { createNewUser, login } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
  } = useForm();
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
  } = useForm();

  const handleRegister = (data) => {
    createNewUser(data);

  };

  const handleLogin = (data) => {
    const success = login(data);
    if (success) {
      navigate('/Task'); 
    }
  };


  return (
    <div className='bigmain'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="signup">
          <form onSubmit={handleSubmitRegister(handleRegister)}>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              {...registerRegister('username', { required: true })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...registerRegister('password', { required: true })}
            />
            <button className='signupbutton' type="submit">Sign up</button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleSubmitLogin(handleLogin)}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              {...registerLogin('username', { required: true })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...registerLogin('password', { required: true })}
            />
            <button className='signupbutton' type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
