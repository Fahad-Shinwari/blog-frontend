import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getBlog, updateBlog } from '../redux'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { checkPermissionsForPostList, updatePostStatusPermission } from '../CheckPermissions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%'
  },
};
const statusCheck = [
  { name: "Published" },
  { name: "Un Published" },
  { name: "Review" },
];

function BlogStatus() {
  const [blog, setblog] = useState({})
  const [status, setstatus] = useState("")
  const dispatch = useDispatch();
  const blogs = useSelector(state =>  state.blog?.blogs?.data?.blog)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [renderFirstTime, setrenderFirstTime] = useState(false)
  
  const openModal = (cat) => {
    setIsOpen(true);
    setstatus(cat.status)
    setblog(cat)
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleChange = e => {
    setstatus(e.target.value)
  }

  const changeStatus = e => {
    e.preventDefault();
    if(updatePostStatusPermission()) { 
      dispatch(updateBlog(blog._id,status))
      setIsOpen(false);
      setrenderFirstTime(true)
    }else{
      return toast.error("No Access to change post status")
    }
    
  }

  useEffect(() => {
    if(checkPermissionsForPostList()) {
      dispatch(getBlog())
      setrenderFirstTime(false)
    } else {
      return toast.error("No Access for posts")
    }
    
  }, [renderFirstTime && blogs])

  return (
    <div className='my-4 container-lg'>
      <h2 className='my-5'>Blogs</h2>
      <ul className="list-group">
      {blogs?.map(blog=>(
        <li className="list-group-item d-flex justify-content-between align-items-center" role="button" key={blog._id}>
        <span onClick={()=>openModal(blog)}>{blog.title}</span>
        <span className="badge badge-success badge-pill " role="button">{blog.status}</span>
        </li>
      ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className='d-flex justify-content-between'>
          <h2>Change Status</h2>
        <button className='btn btn-danger' onClick={closeModal}>x</button>
        </div>
        <form onSubmit={changeStatus}>
          <label style={{color:"black"}}>Status</label>
          <select name="status" onChange={handleChange} value={status}  className="form-control mb-4">
        <option value="">Please Select a Status</option>
          {statusCheck?.map((st,i)=>(
            <>
          <option value={st.name} key={i}>{st.name}</option>
          </>
          ))}
        </select>
          <button className='btn btn-success mt-4'>Change Status</button>
        </form>
      </Modal>
    </div>
  )
}

export default BlogStatus