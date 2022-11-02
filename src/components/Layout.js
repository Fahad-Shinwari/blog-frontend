import React,{useState,useEffect} from 'react'
import './Layout.css'
import { useDispatch,useSelector } from 'react-redux';
import { getBlog } from '../redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkPermissionsForPostList } from '../CheckPermissions';

const statusCheck = [
  { name: "Published" },
  { name: "Un Published" },
  { name: "Review" },
];

function Layout() {
  let blogs = useSelector(state=> state.blog?.blogs?.data?.blog)
  const [filterData, setfilterData] = useState()
  const dispatch = useDispatch();
  const [status, setstatus] = useState("")

  useEffect(() => {
    // if(permissions?.includes(process.env.REACT_APP_POST_LIST) || isAdmin) {
    //   dispatch(getBlog())
    // } else {
    //   return toast.error("No Access for posts")
    // }
    checkPermissionsForPostList() ? dispatch(getBlog()) : toast.error("No Access for posts");
  }, [])
  
  // console.log(permissions);
  const handleChange = e => {
    if(e.target.value === '') {
      setfilterData(blogs)
    }else {
      setfilterData(blogs.filter(blog=>blog.status===e.target.value)); 
    }
    setstatus(e.target.value);
  }

  return (
    <div className='container-lg'>
      <h1 className='black'>Blogs Page</h1>
      <div className='row no-gutters justify-content-center'>
      <select name="status" onChange={handleChange} value={status} className="form-control mb-4">
        <option value="">Please Select a Status</option>
          {statusCheck?.map((st,i)=>(
            <>
          <option value={st.name} key={i}>{st.name}</option>
          </>
          ))}
        </select>
        {filterData ? filterData?.map((blog,index)=>(
        <div className='col-md-4 blog' key={index}>
          <img src= {blog.thumbnail} className="img-fluid blog-img" alt="" />
          <Link className='text-decoration-none' to={`/blog/${blog._id}`}><h4 className='text-capitalize my-3'>{blog.title}</h4></Link>
        </div>
        ))
      : blogs?.map((blog,index)=>(
        <div className='col-md-4 blog' key={index}>
          <img src= {blog.thumbnail} className="img-fluid blog-img" alt="" />
          <Link className='text-decoration-none' to={`/blog/${blog._id}`}><h4 className='text-capitalize my-3'>{blog.title}</h4></Link>
        </div>
        ))
      }
      </div>
    </div>
  )
}

export default Layout