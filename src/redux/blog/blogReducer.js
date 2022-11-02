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

  const initialState = {
    loading: false,
    error: '',
    blogs: [],
    status:""
  }

  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_BLOG:
        return {
          ...state,
          loading: true
        }
      case BLOG_SUCCESS:
        return {
          loading: false,
          status: "New Blog Created",
          error: ''
        }
      case BLOG_FAILURE:
        return {
          loading: false,
          error: action.payload
        }

        case GET_BLOG:
            return {
              ...state,
              loading: true
            }
          case GET_BLOG_SUCCESS:
            return {
              loading: false,
              blogs: action.payload,
              error: ''
            }
          case GET_BLOG_FAILURE:
            return {
              loading: false,
              error: action.payload
            }
            case GET_LIKED_BLOG:
              return {
                ...state,
                loading: true
              }
            case GET_LIKED_BLOG_SUCCESS:
              return {
                loading: false,
                blogs: action.payload,
                error: ''
              }
            case GET_LIKED_BLOG_FAILURE:
              return {
                loading: false,
                error: action.payload
              }    

            case UPDATE_BLOG:
              return {
                ...state,
                loading: true
              }
            case UPDATE_BLOG_SUCCESS:
              return {
                loading: false,
                blogs: state.blogs.data.blog.map(cat=>cat._id === action.id ? {...cat,status: action.status} : cat),
                error: ''
              }
            case UPDATE_BLOG_FAILURE:
              return {
                loading: false,
                error: action.payload
              }

      default: return state
    }
  }

  export default blogReducer