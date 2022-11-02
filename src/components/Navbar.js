import React,{useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';
import axios from 'axios'
import { io } from "socket.io-client";
import FitRecursive from './FitRecursive';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import { toast } from 'react-toastify';
import {
  NotificationTwoTone
} from '@ant-design/icons';

function Navbar() {
  let id = '62ec2923065a413f58a4f7a4'
  const [treeData, setTreeData] = useState({
    items: [
      // { title: 'Chicken', children: [{ title: 'Egg' }], expanded: false },
      // { title: 'Fish', children: [{ title: 'fingerline' }], expanded: false },
    ],
  });
  const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
  };
  const decode = parseJwt(localStorage.getItem('token'));
  const isAuth = decode && decode.exp * 1000 < Date.now() ;
  const user =  JSON.parse(localStorage.getItem('user'));
  const isAdmin = localStorage.getItem('isAdmin')
  const [adminId] = useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))._id : '' )
  const [admin] = useState("62deea8edc18f629541dedce")
  const socket = useRef();
  const [notifications, setnotifications] = useState([])

  const logout=()=> {
      localStorage.clear();
      window.location.href = '/login';
  }
  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    socket.current = io("http://localhost:5000",{transports: ['websocket'], upgrade: false});
    // const adminId = JSON.parse(localStorage.getItem("user"))._id
    if(adminId && adminId==admin){
      socket.current.emit("add-notifications", admin);
    }
}, [adminId]);

const updateNotifications = (c) => {
  setnotifications(notifications => [...notifications, c]);
}
useEffect(() => {
  if (socket.current) {
    socket.current.on("post-liked", (details) => {
        const c = {id:details.blogId,title:details.title,name:details.user,liked:true}; 
        updateNotifications(c)
        return toast.success(`Post ${details.blogId} Liked by:   ${details.user}`)
    });
  }
  if (socket.current) {
    socket.current.on("post-disliked", (details) => {
        const c = {id:details.blogId,title:details.title,name:details.user,liked:false};
        updateNotifications(c)
        return toast.error(`Post ${details.blogId} DisLiked by:   ${details.user}`)
    });
  }
}, []);

  const getCategory = async () => {
    try {
      const categories = await axios.get(`/navigation/${id}`);
      setTreeData({items:categories.data.navigation[0].navigationMenu})
    }
    catch(e) {
      console.log(e);
    }
  }

console.log(notifications);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand"><img src={logo} alt="" className='logo'/></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          {isAdmin &&   
          <div class="dropdown">
            <li className="nav-item position-relative" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Link className='nav-link'><NotificationTwoTone style={{ fontSize: '200%'}}/><span className='notifications'>{notifications.length > 0 && notifications.length}</span></Link>
            </li>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {notifications && notifications.slice(0).reverse().map(n=>
              n.liked ?  <h5><a class="dropdown-item">{n.title} was <span className='badge badge-success'>Liked</span> by {n.name}</a><hr /></h5>
              : <h5><a class="dropdown-item">{n.title} was <span className='badge badge-danger'>DisLiked</span> by {n.name}</a><hr /></h5>  
            )}
            </div> 
          </div>
          }
          <li className="nav-item">
            <Link to="/category" className='nav-link'>Categories</Link>
          </li>
          {treeData && treeData.items.map(tree=>(
            <NavDropdownMenu title={tree.title} id="collasible-nav-dropdown">
              {tree?.children.length>0 &&   <FitRecursive children={tree?.children}/>
               }
            </NavDropdownMenu>
              // tree?.children.map(child=>(
              //   <div class="btn-group dropright">
              //     <button type="button" className="btn btn-secondary">
              //       {child.title}
              //     </button>
              //     <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              //       <span className="sr-only">Toggle Dropright</span>
              //     </button>
              //     <div className="dropdown-menu">
              //     {child?.children.length>0 && dynamicMenu(child.children)}
              //     </div>
              //   </div>
                
              // // <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              // //   <button className="dropdown-item" type="button">{child.title}</button>
              // //   {child?.children.length>0 && dynamicMenu(child.children)}
              // // </div>  
              // ))
             
            ))}
          {isAdmin && 
          <>
          <li className="nav-item">
            <Link to="/users" className='nav-link'>Users</Link>
          </li>
          <li className="nav-item">
            <Link to="/most-liked" className='nav-link'>Liked Blogs</Link>
          </li>
          <li className="nav-item">
            <Link to="/tree-builder" className='nav-link'>Dynamic Categories</Link>
          </li>
          </>
          }
          <li className="nav-item">
            <Link to="/post-blog" className='nav-link'>Post a Blog</Link>
          </li>
          <li className="nav-item">
            <Link to="/update-blog" className='nav-link'>Update Blog</Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className='nav-link'>Chat</Link>
          </li>
          {(user === null || isAuth === null)  ?  <li className="nav-item">
            <Link to="/login"   className='nav-link'>Log In</Link>
          </li> :  <li className="nav-item">
            <Link onClick={logout}  className='nav-link'>Log Out</Link>
          </li>}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar