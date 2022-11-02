import { combineReducers } from 'redux'
import userReducer from './user/userReducer'
import categoryReducer from './category/categoryReducer'
import blogReducer from './blog/blogReducer'
import commentReducer from './comment/commentReducer'
import likeReducer from './like/likeReducer'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  blog: blogReducer,
  comment: commentReducer,
  like: likeReducer
})

export default rootReducer