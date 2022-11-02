import React,{useState,useEffect,useRef} from 'react'
import {
  LikeOutlined,
  LikeFilled
} from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import { createLike, deleteLike, getAllLike, getSingleLike } from '../redux';
import axios from 'axios'

function Like({id,title}) {
  const [Liked, setLiked] = useState(false)
  const [renderFirstTime, setrenderFirstTime] = useState(false)
  const dispatch = useDispatch();
  const socket = useRef();
  let like = useSelector(state=> state.like?.likes)
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")).username)
  const [admin] = useState("62deea8edc18f629541dedce")

  const handleLike = async() => {
    if(!Liked) {
      dispatch(createLike(id,user))
      socket.current.emit("liked-post", {
        blogId: id,
        user:user,
        admin:admin,
        title
      });
      setrenderFirstTime(true)
    } else if(Liked) {
      dispatch(deleteLike(id,user))
      socket.current.emit("disliked-post", {
        blogId: id,
        user:user,
        admin:admin,
        title
      });
      setrenderFirstTime(true)
    }
  }
  
  useEffect(() => {
      socket.current = io("http://localhost:5000",{transports: ['websocket'], upgrade: false});
      // socket.current.emit("add-notifications", admin);
  }, []);

  const getLike = async () => {
    try {
      const response = await axios.post(`/like/one`,{"blogId":id,"personName":user})
      if(response.data.like) {
        setLiked(true)
      }
    }
    catch(e) {
      console.log(e);
    }
  }
  
  useEffect(async() => {
    await getLike()
    await dispatch(getAllLike(id))
    if(renderFirstTime){
      setLiked(!Liked)
    }
    setrenderFirstTime(false)
  }, [renderFirstTime && like])
  
  return (
    <div style={{ fontSize: "2rem",color: "#0a95ff", marginBottom: "2rem",display: "flex", alignItems: "center" }}>
     {!Liked ? <LikeOutlined onClick={handleLike}/> : <LikeFilled onClick={handleLike}/> }  <span className='ml-3'>{like?.length}</span>
    </div>
  )
}

export default Like