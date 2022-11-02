import {
    CREATE_BLOG,
    BLOG_SUCCESS,
    BLOG_FAILURE,
    GET_BLOG,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAILURE,
    GET_LIKED_BLOG,
    GET_LIKED_BLOG_SUCCESS,
    GET_LIKED_BLOG_FAILURE,
    UPDATE_BLOG,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAILURE
  } from './blogTypes'

import axios from 'axios'
import { toast } from 'react-toastify';

export const createBlog = (blog,history) => {
  return (dispatch) => {
    dispatch(createBlogs())
    console.log(history);
    axios
      .post('/upload/upload-blog',blog)
      .then(response => {
        console.log(response);
        // response.data is the users
        dispatch(blogSuccess(response.data.message))
        toast.success('Blog Added');
        history.push('/')
      })
      .catch(error => {
        // error.message is the error message
        dispatch(blogFailure(error.response.data.msg))
      })
  }
}

export const getBlog = () => {
    return (dispatch) => {
      dispatch(getBlogs())
      axios
        .get('/blog')
        .then(response => {
          // response.data is the users
          dispatch(getBlogsSuccess(response))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getBlogsFailure(error.response.data.msg))
        })
    }
}

export const getLikedBlog = () => {
  return (dispatch) => {
    dispatch(getLikedBlogs())
    axios
      .get('/blog/liked')
      .then(response => {
        // response.data is the users
        dispatch(getLikedBlogsSuccess(response))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(getLikedBlogsFailure(error.response.data.msg))
      })
  }
}

export const updateBlog = (id,blog) => {
  return (dispatch) => {
    dispatch(updateBlogs())
    axios
      .put(`/blog/${id}`,{'status':blog})
      .then(response => {
        // response.data is the users
        dispatch(updateBlogSuccess(response.data.blog._id,blog))
        toast.success('Blog Updated');
      })
      .catch(error => {
        // error.message is the error message
        dispatch(updateBlogFailure(error.response.data.msg))
      })
  }
}

export const createBlogs = () => {
    return {
      type: CREATE_BLOG
    }
  }
  
  export const blogSuccess = status => {
    return {
      type: BLOG_SUCCESS,
      payload: status
    }
  }
  
  export const blogFailure = error => {
    return {
      type: BLOG_FAILURE,
      payload: error
    }
  }

  export const getBlogs = () => {
    return {
      type: GET_BLOG
    }
  }
  
  export const getBlogsSuccess = blogs => {
    return {
      type: GET_BLOG_SUCCESS,
      payload: blogs
    }
  }
  
  export const getBlogsFailure = error => {
    return {
      type: GET_BLOG_FAILURE,
      payload: error
    }
  }

  export const getLikedBlogs = () => {
    return {
      type: GET_LIKED_BLOG
    }
  }
  
  export const getLikedBlogsSuccess = blogs => {
    return {
      type: GET_LIKED_BLOG_SUCCESS,
      payload: blogs
    }
  }
  
  export const getLikedBlogsFailure = error => {
    return {
      type: GET_LIKED_BLOG_FAILURE,
      payload: error
    }
  }

  export const updateBlogs = () => {
    return {
      type: UPDATE_BLOG
    }
  }
  
  export const updateBlogSuccess = (id,status) => {
    return {
      type: UPDATE_BLOG_SUCCESS,
      id,
      status
    }
  }
  
  export const updateBlogFailure = error => {
    return {
      type: UPDATE_BLOG_FAILURE,
      payload: error
    }
  }