import {
    ALL_LIKE,
    ALL_LIKE_SUCCESS,
    ALL_LIKE_FAILURE,
    CREATE_LIKE,
    CREATE_LIKE_SUCCESS,
    CREATE_LIKE_FAILURE,
    DELETE_LIKE,
    DELETE_LIKE_SUCCESS,
    DELETE_LIKE_FAILURE
  } from './likeTypes'

import axios from 'axios'
import { toast } from 'react-toastify';

export const createLike = (blogId,username) => {
  return (dispatch) => {
    dispatch(createLikes())
    axios
      .post('/like/create',{"blogId":blogId,"personName":username})
      .then(response => {
        dispatch(createLikeSuccess(response.data.like))
        toast.success('You Liked the Content');
      })
      .catch(error => {
        // error.message is the error message
        dispatch(createLikeFailure(error.response.data.msg))
      })
  }
}

export const getAllLike = (blogId) => {
    return (dispatch) => {
      dispatch(getAllLikes())
      axios
        .post(`/like/all`,{"blogId":blogId})
        .then(response => {
          // response.data is the users
          dispatch(getAllLikesSuccess(response.data.like))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getAllLikesFailure(error.response.data.msg))
        })
    }
}

export const deleteLike = (blogId,personName) => {
    return (dispatch) => {
      dispatch(deleteLikes())
      axios
        .delete(`/like/delete`,{data:{"blogId":blogId,"personName":personName}})
        .then(response => {
          // response.data is the users
          dispatch(deleteLikeSuccess(response.data.like._id))
          toast.error('You Un Liked the Content');
        })
        .catch(error => {
          // error.message is the error message
          dispatch(deleteLikeFailure(error.response.data.msg))
        })
    }
}

export const createLikes = () => {
    return {
      type: CREATE_LIKE
    }
  }
  
  export const createLikeSuccess = like => {
    return {
      type: CREATE_LIKE_SUCCESS,
      payload: like
    }
  }
  
  export const createLikeFailure = error => {
    return {
      type: CREATE_LIKE_FAILURE,
      payload: error
    }
  }

  export const getAllLikes = () => {
    return {
      type: ALL_LIKE
    }
  }
  
  export const getAllLikesSuccess = likes => {
    return {
      type: ALL_LIKE_SUCCESS,
      payload: likes
    }
  }
  
  export const getAllLikesFailure = error => {
    return {
      type: ALL_LIKE_FAILURE,
      payload: error
    }
  }

  export const deleteLikes = () => {
    return {
      type: DELETE_LIKE
    }
  }
  
  export const deleteLikeSuccess = id => {
    return {
      type: DELETE_LIKE_SUCCESS,
      payload: id
    }
  }
  
  export const deleteLikeFailure = error => {
    return {
      type: DELETE_LIKE_FAILURE,
      payload: error
    }
  }

  