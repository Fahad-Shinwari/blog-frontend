import {
    CREATE_COMMENT,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    GET_COMMENT,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILURE,
  } from './commentTypes'

import axios from 'axios'
import { toast } from 'react-toastify';

export const createComment = (comment,blogId,username) => {
  return (dispatch) => {
    dispatch(createComments())
    axios
      .post('/comment/create',{'comment':comment,"blogId":blogId,"personName":username})
      .then(response => {
        // response.data is the users
        dispatch(commentSuccess(response.data.comment))
        toast.success('Comment Added');
      })
      .catch(error => {
        // error.message is the error message
        dispatch(commentFailure(error.response.data.msg))
      })
  }
}

export const getComment = (id) => {
    return (dispatch) => {
      dispatch(getComments())
      axios
        .get(`/comment/${id}`)
        .then(response => {
          // response.data is the users
          dispatch(getCommentsSuccess(response.data.comment))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getCommentsFailure(error.response.data.msg))
        })
    }
}


export const createComments = () => {
    return {
      type: CREATE_COMMENT
    }
  }
  
  export const commentSuccess = comment => {
    return {
      type: CREATE_COMMENT_SUCCESS,
      payload: comment
    }
  }
  
  export const commentFailure = error => {
    return {
      type: CREATE_COMMENT_FAILURE,
      payload: error
    }
  }

  export const getComments = () => {
    return {
      type: GET_COMMENT
    }
  }
  
  export const getCommentsSuccess = comments => {
    return {
      type: GET_COMMENT_SUCCESS,
      payload: comments
    }
  }
  
  export const getCommentsFailure = error => {
    return {
      type: GET_COMMENT_FAILURE,
      payload: error
    }
  }

  