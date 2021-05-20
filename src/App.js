import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import  Home from './pages/Home'
import  Login from './pages/Login'
import  Register from './pages/Register'
import  AddPosts from './pages/AddPosts'
import YourPosts from './pages/YourPosts'
import {MenuBar} from './components/MenuBar'
import SinglePost from './pages/SinglePost'
import BookMark from './pages/BookMark'
import EditPost from './pages/EditPost'
import {AuthRoute , LogRoute} from './utils/AuthRoute'
import "./utils/color.css"

function App() {
  return (
    <Router>
        <MenuBar/>
        <LogRoute exact path = '/login' component = {Login}/>
        <LogRoute exact path = '/register' component={Register} />
        <Route exact path = '/' component={Home} />
        <Route exact path="/posts/:postId" component = {SinglePost} />
        <AuthRoute exact path='/add-posts' component={AddPosts} />
        <AuthRoute exact path='/your-posts' component={YourPosts} />
        <AuthRoute exact path="/your-bookmarks" component = {BookMark}/>
        <AuthRoute exact path = "/editPost" component = {EditPost} />
    </Router>
  );
}

export default App;
