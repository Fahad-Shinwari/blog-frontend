import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import Logo from '../../images/logo.png';

function Users({users,changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    // const data = await JSON.parse(localStorage.getItem("user"))
    setCurrentUserName(await JSON.parse(localStorage.getItem("user")).username);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
    {users && (
      <Container>
      <div className="brand">
      <img src={Logo} alt="logo" />
    </div>
    <div className="contacts">
      {users.map((user, index) => {
        return (
          <div
            key={user._id}
            className={`contact ${
              index === currentSelected ? "selected" : ""
            }`}
            onClick={() => changeCurrentChat(index, user)}
          >
            <div className="avatar">
              {user.username.charAt(0)}
            </div>
            <div className="username">
              <h3>{user.username}</h3>
            </div>
          </div>
        );
      })}
    </div>
    <div className="current-user">
      <div className="avatar">
        {currentUserName?.charAt(0)}
      </div>
      <div className="username">
        <h2>{currentUserName}</h2>
      </div>
    </div>
    </Container>
    )}
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #512DA8;
    font-size: 2rem;
    color: #fff;
    text-align: center;
    margin:1rem 1rem 1rem 0;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #512DA8;
    font-size: 2rem;
    color: #fff;
    text-align: center;
    margin:1rem 1rem 1rem 0;
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Users