import {
    CREATE_CATEGORY,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    GET_CATEGORY,
    GET_SUCCESS,
    GET_FAILURE,
    DELETE_CATEGORY,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    UPDATE_CATEGORY,
    UPDATE_SUCCESS,
    UPDATE_FAILURE
  } from './categoryTypes'

  const initialState = {
    loading: false,
    error: '',
    categories: []
  }

  const categoryReducer = (state = initialState, action) => {
    let name = action.payload && action.payload
    switch (action.type) {
      case CREATE_CATEGORY:
        return {
          ...state,
          loading: true
        }
      case CREATE_SUCCESS:
        return {
          loading: false,
          categories: [...state.categories.data.category],
          error: ''
        }
      case CREATE_FAILURE:
        return {
          loading: false,
          error: action.payload
        }

        case GET_CATEGORY:
        return {
          ...state,
          loading: true
        }
      case GET_SUCCESS:
        return {
          loading: false,
          categories: action.payload,
          error: ''
        }
      case GET_FAILURE:
        return {
          loading: false,
          error: action.payload
        }

        case DELETE_CATEGORY:
            return {
              ...state,
              loading: true
            }
          case DELETE_SUCCESS:
            return {
              loading: false,
              categories: state.categories.data.category.filter(cat=>cat._id !== action.payload),
              error: ''
            }
          case DELETE_FAILURE:
            return {
              loading: false,
              error: action.payload
            }

          case UPDATE_CATEGORY:
            return {
                ...state,
                loading: true
            }
          case UPDATE_SUCCESS:
          return {
              loading: false,
              categories: state.categories.data.category.map(cat=>cat._id === action.id ? {...cat,name : action.category} : cat),
              error: ''
          }
          case UPDATE_FAILURE:
          return {
              loading: false,
              error: action.payload
          }    
      default: return state
    }
  }
  
  export default categoryReducer