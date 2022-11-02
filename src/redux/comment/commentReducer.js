import {
    CREATE_COMMENT,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    GET_COMMENT,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILURE,
  } from './commentTypes'

  const initialState = {
    loading: false,
    error: '',
    comments: [],
    status:""
  }

  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT:
        return {
          ...state,
          loading: true
        }
      case CREATE_COMMENT_SUCCESS:
        return {
          loading: false,
          status: "New Comment Created",
          comments: [...state.comments,action.payload],
          error: ''
        }
      case CREATE_COMMENT_FAILURE:
        return {
          loading: false,
          error: action.payload
        }

        case GET_COMMENT:
            return {
              ...state,
              loading: true
            }
          case GET_COMMENT_SUCCESS:
            return {
              loading: false,
              comments: action.payload,
              error: ''
            }
          case GET_COMMENT_FAILURE:
            return {
              loading: false,
              error: action.payload
            }

      default: return state
    }
  }

  export default commentReducer