import React,{ useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchUsers } from '../redux'
import './Auth.css'
import { toast } from 'react-toastify';

import logo from '../images/logo.png';

function Signup({history}) {
  const [user, setuser] = useState({username:'',password:''})
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
      e.preventDefault();
      if(user.username.trim() === '' || user.password.trim() === '') {
        return toast.error("Please fill the fields")
      }
      dispatch(fetchUsers(user,history))
  };

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
      <h1>Signup</h1>{" "}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">UserName</label>
        <input type="text" className='form-control' name="username" onChange={handleChange} id="id" />
        <label htmlFor="password">Password</label>
        <input type="password" className='form-control' name="password" onChange={handleChange} id="password" />
        <button className="btn btn-success my-4" type="submit">
          Signup
        </button>
      <Link to="/login"><button className='btn btn-primary w-100'>Login Page</button></Link>
      </form>
    </div> 
    </div>
    </div>
  )
}

export default Signup