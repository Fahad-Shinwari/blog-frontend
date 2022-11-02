import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import './Auth.css'
import { loginUser,googleUser } from '../redux'
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';

import logo from '../images/logo.png';

function Auth({history}) {
  const [user, setuser] = useState({username:'',password:''})
  const dispatch = useDispatch();
    
  const handleGoogleLogin = async googleData => {
    dispatch(googleUser(googleData,history))
  }
    
  const handleSubmit = e => {
    e.preventDefault();
    if(user.username.trim() === '' || user.password.trim() === '') {
      return toast.error("Please fill the fields")
    }
    dispatch(loginUser(user,history))
  }      
  
  const handleChange =  e => {
    setuser({...user,[e.target.name]:e.target.value})
  }
    
  return (
    <div className="container-fluid">
      <div className='row no-gutters'>
      <div className='col-md-6 left'>
        <img src={logo} alt="" className='logo-img'/>
      </div> 
      <div className='col-md-6 pl-4 pr-4 mt-5'> 
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">UserName</label>
        <input type="text" name="username" className='form-control' onChange={handleChange} id="id" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className='form-control' onChange={handleChange} id="password" />
        <button className="btn btn-success my-4" type="submit">
          Login
        </button>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={'single_host_origin'}
          className="d-flex justify-content-center"
        />
        <Link to="/signup"><button className='btn btn-primary mt-3 w-100'>Signup</button></Link>
      </form>
      </div>
      </div>
    </div>  )
}

export default Auth