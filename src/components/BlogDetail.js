import React,{useState,useEffect} from 'react'
import './Layout.css'
import { useDispatch,useSelector } from 'react-redux';
import { Carousel } from 'react-carousel-minimal';
import { toast } from 'react-toastify';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Like from './Like';
import { singlePostViewPermission } from '../CheckPermissions';

const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
}
const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
}

function BlogDetail({match}) {
  const [blog, setblog] = useState({})
  const [images, setimages] = useState([])
  const [id, setid] = useState(match.params.id)
  let imagesArray = []
  const [datas, setdatas] = useState([  {
    image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
    caption: "Darjeeling"
  }])

  const getBlog = async () => {
    try {
      const blogs = await axios.get(`/blog/${match.params.id}`);
      setblog(blogs.data.blog)
      setimages(blogs.data.image)
      // setimages(blogs.data.blog.image);
      console.log(blogs.data.image)
      for(let images of blogs.data.image){
        imagesArray.push({image:`${images.image}`,caption: ""})
        console.log(imagesArray)
      }
      setdatas(imagesArray && imagesArray)
    }
    catch(e) {
      console.log(e);
    }
  }
  console.log(datas)
  
  useEffect(()=>{
    if(singlePostViewPermission()) { 
      getBlog()
    }else{
      return toast.error("No Access to view post")
    }
  },[])

  return (
      <div className='container-lg'>
      <div className='row no-gutters'>
      <Link to='/' className='mt-4'>Go Back</Link> 
      <Carousel
            data={datas && datas}
            time={5000}
            width="100%"
            height="650px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              width: "100%",
              maxHeight: "600px",
              margin: "40px auto",
            }}
          />
        {blog && Object.keys(blog).length !== 0 ?
        <>  
        <div className='col mt-5'>         
          <h1>{blog.title}</h1>
          <Like id={id} title={blog.title}/>
          <div dangerouslySetInnerHTML={{__html:blog.description}} />      
        </div>
        <Comment id={id}/>  
        </> 
        : <h2 className='mt-4'>Unfortunately you don't have permission to view this post</h2>
          }    
      </div>
    </div>
  )
}

export default BlogDetail