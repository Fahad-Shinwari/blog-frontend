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

  const initialState = {
    loading: false,
    error: '',
    likes: [],
    status:""
  }

  const likeReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_LIKE:
        return {
          ...state,
          loading: true
        }
      case ALL_LIKE_SUCCESS:
        return {
          loading: false,
          likes: action.payload,
          error: ''
        }
      case ALL_LIKE_FAILURE:
        return {
          loading: false,
          error: action.payload
        }

      case CREATE_LIKE:
          return {
              ...state,
              loading: true
          }
          case CREATE_LIKE_SUCCESS:
          return {
              loading: false,
              status: "New Like Added",
              error: ''
          }
          case CREATE_LIKE_FAILURE:
          return {
              loading: false,
              error: action.payload
          }

        case DELETE_LIKE:
            return {
                ...state,
                loading: true
            }
            case DELETE_LIKE_SUCCESS:
            return {
                loading: false,
                status: "Like Deleted",
                likes: state.likes.filter(lk=>lk._id !== action.payload),
                error: ''
            }
            case DELETE_LIKE_FAILURE:
            return {
                loading: false,
                error: action.payload
            }    

      default: return state
    }
  }

  export default likeReducer