import React,{useState,useEffect} from 'react'
import './Layout.css'
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { addPermission, deletePermission } from '../redux';

const statusCheck = [
  "category_add" ,
  "category_delete" ,
  "category_view" ,
  "category_list" ,
  "post_add" ,
  "post_delete" ,
  "post_view" ,
  "post_list" ,
  "post_status_change" ,
];
function UserPermissions({match}) {
  const [id] = useState(match.params.id)
  const [permission, setpermission] = useState("")
  const dispatch = useDispatch();
  const [permissions, setpermissions] = useState([])

  const getUser = async () => {
    try {
      const users = await axios.get(`/users/${match.params.id}`);
      setpermissions(users.data.user?.permissions)
    }
    catch(e) {
      console.log(e);
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(addPermission(id,permission))
    setpermission("")
  }
  const handleDelete = per => {
    console.log(per);
    dispatch(deletePermission(id,per))
  }
  useEffect(()=>{
    getUser()
  },[permissions])

  return (
    <div className='my-4 container-lg'>
      <form onSubmit={handleSubmit}>
        <h2 className='my-5'>Users, Click to change each users permissions</h2>
        <select name="status" value={permission} onChange={e=>setpermission(e.target.value)} className="form-control mb-4">
        <option value="">Please Select a Permission</option>
          {statusCheck.filter(f=> !permissions.includes(f)).map((st,i)=>(
            <>
          <option value={st} key={i}>{st}</option>
          </>
          ))}
        </select>
        <button className={`btn btn-success mb-4 ${permission ? '' : 'disabled'}`}>Add a new permission</button>
        </form>
        <ul className="list-group">
        {permissions?.map(permission=>(
          <li className="list-group-item d-flex justify-content-between align-items-center" role="button">
          <h5 className='text-capitalize'>{permission}</h5>
          <span className="badge badge-danger badge-pill " role="button" onClick={()=>handleDelete(permission)}>x</span>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default UserPermissions