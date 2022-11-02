import React,{useEffect} from 'react'
import { getUser } from '../redux'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Users() {
  const users = useSelector(state =>  state.user?.user?.data?.user)
  console.log(users);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user"))._id
    dispatch(getUser(id))
  }, [])
  return (
    <div className='my-4 container-lg'>
        <h2 className='my-5'>Users, Click to change each users permissions</h2>
        <ul className="list-group">
        {users?.map(user=>(
          <li className="list-group-item d-flex justify-content-between align-items-center" role="button" key={user._id}>
          <Link className='text-decoration-none' to={`/users/${user._id}`}><h5 className='text-capitalize'>{user.username}</h5></Link>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Users