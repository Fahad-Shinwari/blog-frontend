import React,{useState,useEffect} from 'react'
import { getComment, createComment } from '../redux';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import './Comment.css'

function Comment({id}) {
  const [comment, setcomment] = useState("")
  const [username, setusername] = useState(JSON.parse(localStorage.getItem("user")).username)
  let comments = useSelector(state=> state?.comment?.comments)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment(id))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createComment(comment,id,username))
    setcomment('')
  }

  return (
    <>
      <h3 className='my-4'>Write your comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea className="form-control" onChange={e=>setcomment(e.target.value)} value={comment} placeholder="Message" rows={7} ></textarea>
        <button className='btn btn-primary my-4'>Submit</button>
      </form>
      {comments.length !== 0 && <h3 className='mb-4'>All {comments.length} comments</h3>} 
      {comments?.map((c,i)=>(
      <div className='d-flex justify-content-between align-items-center mb-4'>
       <div className='d-flex align-items-center'><div className='profileImage'>{c.personName.charAt(0)}</div>
       <div><span>{c.personName}</span><h4 key={i}>{c.comment}</h4> </div>
       </div> 
      <span>{moment(c.createdAt).fromNow()}</span>
      </div>
      ))}
    </>
  )
}

export default Comment