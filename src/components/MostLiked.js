import React,{useEffect} from 'react'
import './Layout.css'
import { useDispatch,useSelector } from 'react-redux';
import { getLikedBlog } from '../redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkPermissionsForPostList } from '../CheckPermissions';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2';

function MostLiked() {
  let blogs = useSelector(state=> state.blog?.blogs?.data?.blog)
  // console.log(blogs);
  let titles = []
  let likes = []
  if(blogs){
    for(let blog of blogs) {
      titles.push(blog.title)
      likes.push(blog.likes)
    }
  } 
  console.log(blogs && titles,likes);
  const dispatch = useDispatch();
  const state = {
    labels: blogs && titles,
    datasets: [
      {
        label: 'Likes',
        fill:'start',
        lineTension: 0,
        backgroundColor: '#6ebb3b',
        borderColor: '#000',
        borderWidth: 4,
        data: blogs && likes
      }
    ]
  }

  useEffect(() => {
    checkPermissionsForPostList() ? dispatch(getLikedBlog()) : toast.error("No Access for posts");
  }, [])

  return (
    <div className='container-lg'>
      <h1 className='black'>Most Liked Posts Chart</h1>
      <div className='row no-gutters justify-content-center'>
        {/* Chart */}
      <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Top Most Liked Posts',
              fontSize:22
            },
            scale: {
              y: {  
                min: 0
                },
              ticks: {
                beginAtZero: true,
                precision: 0,
              }
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          className="mb-5"
          /> 
          <h2 className='mt-5'>Top 5 Posts</h2>
        { blogs?.map((blog,index)=>(
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

export default MostLiked