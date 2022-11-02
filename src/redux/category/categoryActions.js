import {
    CREATE_CATEGORY,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    GET_CATEGORY,
    GET_FAILURE,
    GET_SUCCESS,
    DELETE_CATEGORY,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    UPDATE_CATEGORY,
    UPDATE_SUCCESS,
    UPDATE_FAILURE
  } from './categoryTypes'
  import axios from 'axios'
  import { toast } from 'react-toastify';

  export const createCategory = (category) => {
    return (dispatch) => {
      dispatch(createCategories())
      axios
        .post('/category/create',{'name':category})
        .then(response => {
          // response.data is the users
          dispatch(createSuccess(response.data.category.name))
          toast.success('Category Added');
        })
        .catch(error => {
          // error.message is the error message
          dispatch(createFailure(error.response.data.msg))
        })
    }
  }

  export const getCategory = () => {
    return (dispatch) => {
      dispatch(getCategories())
      axios
        .get('/category/')
        .then(response => {
          // response.data is the users
          dispatch(getSuccess(response))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(getFailure(error.response.data.msg))
        })
    }
  }

  export const deleteCategory = (id) => {
    return (dispatch) => {
      dispatch(deleteCategories())
      axios
        .delete(`/category/${id}`)
        .then(response => {
          // response.data is the users
          dispatch(deleteSuccess(response.data.category._id))
          toast.error('Category Deleted');
        })
        .catch(error => {
          // error.message is the error message
          dispatch(deleteFailure(error.response.data.msg))
        })
    }
  }

  export const updateCategory = (id,category) => {
    return (dispatch) => {
      dispatch(updateCategories())
      axios
        .put(`/category/${id}`,{'name':category})
        .then(response => {
          // response.data is the users
          dispatch(updateSuccess(response.data.category._id,category))
          toast.success('Category Updated');
        })
        .catch(error => {
          // error.message is the error message
          dispatch(updateFailure(error.response.data.msg))
        })
    }
  }
  export const getCategories = () => {
    return {
      type: GET_CATEGORY
    }
  }
  
  export const getSuccess = categories => {
    return {
      type: GET_SUCCESS,
      payload: categories
    }
  }
  
  export const getFailure = error => {
    return {
      type: GET_FAILURE,
      payload: error
    }
  }

  export const createCategories = () => {
    return {
      type: CREATE_CATEGORY
    }
  }
  
  export const createSuccess = status => {
    return {
      type: CREATE_SUCCESS,
      payload: status
    }
  }
  
  export const createFailure = error => {
    return {
      type: CREATE_FAILURE,
      payload: error
    }
  }

  export const deleteCategories = () => {
    return {
      type: DELETE_CATEGORY
    }
  }
  
  export const deleteSuccess = id => {
    return {
      type: DELETE_SUCCESS,
      payload: id
    }
  }
  
  export const deleteFailure = error => {
    return {
      type: DELETE_FAILURE,
      payload: error
    }
  }

  export const updateCategories = () => {
    return {
      type: UPDATE_CATEGORY
    }
  }
  
  export const updateSuccess = (id,category) => {
    return {
      type: UPDATE_SUCCESS,
      id,
      category
    }
  }
  
  export const updateFailure = error => {
    return {
      type: UPDATE_FAILURE,
      payload: error
    }
  }