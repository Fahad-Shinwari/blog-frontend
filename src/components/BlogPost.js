import React,{useEffect, useRef, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createBlog, getBlog, getCategory } from '../redux'
import axios from 'axios'
import { Editor } from "@tinymce/tinymce-react";
import { toast } from 'react-toastify';
import { addPostPermission } from '../CheckPermissions';

const statusCheck = [
  { name: "Published" },
  { name: "Un Published" },
  { name: "Review" },
];

function BlogPost({history}) {
  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    status: "",
    image:[]
  });
  const [image, setImage] = useState({ preview: '', data: '' })
  const dispatch = useDispatch();
  const categories = useSelector(state =>  state.category?.categories?.data?.category)
// console.log(blog.image);
  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const handleChange = (e) => {
    setBlog({...blog,[e.target.name]:e.target.value})
  }
  const handleDescription = (description, editor)=> {
    setBlog({...blog,description});
  }

  const slugMaker = () => {
    return blog.title.toLowerCase().replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    let formData = new FormData()
    for (const key of Object.keys(blog.image)) {
      formData.append('image', blog.image[key])
  }
  formData.append("title", blog.title);
  formData.append("slug", slugMaker());
  formData.append("description", blog.description);
  formData.append("category", blog.category);
  formData.append("status", blog.status);

    try {
        if(addPostPermission()) { 
          dispatch(createBlog(formData,history))
        }else{
          return toast.error("No Access to add post")
        }

    } catch (error) {
      console.log(error)
    }
  }
  
  const handleFileChange = (e) => {
    setBlog({...blog,image:e.target.files})
  }
  return (
    <div className='container-lg my-5'>
      <h2 className='text-center mb-5'>Post a Blog</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label for="exampleInputEmail1">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            className="form-control mb-4"
          />

        <label>Category</label>
        <select name="category" onChange={handleChange} className="form-control mb-4">
        <option value="">Please Select a Category</option>
          {categories?.map((cat,i)=>(
            <>
          <option value={cat.name} key={i}>{cat.name}</option>
          </>
          ))}
        </select>

        <label>Status</label>
        <select name="status" onChange={handleChange} className="form-control mb-4">
        <option value="">Please Select a Status</option>
          {statusCheck?.map((st,i)=>(
            <>
          <option value={st.name} key={i}>{st.name}</option>
          </>
          ))}
        </select>

        <label>Description</label>
        <Editor
          init={{
            height: 600,
            menubar: false
          }}
          name="description"
          onEditorChange={handleDescription}
        />
        
        <input type='file' name='file' onChange={handleFileChange} className="btn btn-primary mt-4" multiple></input>
        {/* {image.preview && <img src={image.preview} width='200' height='200' />} */}
      </div>
        <button className='btn-lg btn-success'>Submit</button>
      </form>      
    </div>
  )
}

export default BlogPost