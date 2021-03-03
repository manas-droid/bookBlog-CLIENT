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
import {AuthProvider} from './context/AuthContext';
import {AuthRoute , LogRoute} from './utils/AuthRoute'

import './utils/css/form.css'
import './utils/css/menubar.css'
import './utils/css/addposts.css'
import './utils/css/home.css'
import './utils/css/singlpost.css'




function App() {
  return (
    <AuthProvider>
    <Router>
        <MenuBar/>
        <Route exact path = '/' component={Home} />
        <Route exact path="/posts/:postId" component = {SinglePost} />
        <AuthRoute path = '/login' component = {Login}/>
        <AuthRoute exact path = '/register' component={Register} />
        <LogRoute exact path='/add-posts' component={AddPosts} />
        <LogRoute exact path='/your-posts' component={YourPosts} />
        <LogRoute exact path="/your-bookmarks" component = {BookMark}/>
        <LogRoute exact path = "/editPost" component = {EditPost} />
    </Router>
    </AuthProvider>

  );
}

export default App;
