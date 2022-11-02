import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Auth from './components/Auth';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import Categories from './components/Categories';
import BlogPost from './components/BlogPost';
import BlogDetail from './components/BlogDetail';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Navbar from './components/Navbar';
import BlogStatus from './components/BlogStatus';
import Users from './components/Users';
import UserPermissions from './components/UserPermissions';
import Chat from './components/Chat';
import MostLiked from './components/MostLiked';
import SortableTrees from './components/tree/SortableTree';
import Fit from './components/Fit';

// import Counter from './counter/Counter';

function App() {
// const auth = useSelector((state)=>state.app.isLoggedIn  )
useEffect(() => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "",
    });
  });
})

  return [
      <ToastContainer key="toasts" autoClose={ 3500 } hideProgressBar />,
    <BrowserRouter>
    <Switch>
    <div className="App">
      <Navbar />
      <Route path="/" component={Layout} exact />
      <Route path="/login" component={Auth} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/blog/:id" component={BlogDetail} exact />
      <Route path="/tree-builder" component={SortableTrees} exact />
      <Route path="/fit" component={Fit} exact />
      <ProtectedRoute path="/category" component={Categories} exact />
      <ProtectedRoute path="/post-blog" component={BlogPost} exact />
      <ProtectedRoute path="/update-blog" component={BlogStatus} exact />
      <AdminRoute path="/users" component={Users} exact />
      <AdminRoute path="/most-liked" component={MostLiked} exact />
      <ProtectedRoute path="/users/:id" component={UserPermissions} exact />
      <ProtectedRoute path="/chat" component={Chat} exact />
    </div>
    </Switch>
    </BrowserRouter>
  ]
}

export default App;
