import React,{useState,useEffect,useRef} from 'react'
import { getUser } from '../redux'
import { useDispatch,useSelector } from 'react-redux';
import { io } from "socket.io-client";
import styled from "styled-components";

import Messages from './chat/Messages'
import Users from './chat/Users'
import Welcome from './chat/Welcome';

function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const users = useSelector(state =>  state.user?.user?.data?.user)
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(async () => {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem("user")
        )
      );
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user"))._id
    dispatch(getUser(id))
  }, [])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log(currentChat);
  return (
    <>
      <Container>
        <div className="containers">
        <Users users={users} changeChat= {handleChatChange} />   
        {currentChat === undefined ? <Welcome /> : <Messages currentChat={currentChat}  socket={socket} /> }
        </div>
      </Container> 
    </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .containers {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat