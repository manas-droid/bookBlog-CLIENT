import {Link , useLocation} from 'react-router-dom';
import {useContext , useState} from 'react';
import {AuthContext} from '../context/AuthContext'

function MenuBar(){

  const context = useContext(AuthContext);
  const [ class_name , setClassName] = useState("topnav");
  const currentLocation = useLocation().pathname;
  function handleClick(){
    if(class_name == "topnav")
      setClassName("topnav responsive");
    else
        setClassName("topnav");
  }
  return (
      <header>
          <div className={class_name} id="myTopnav">
          <Link to='/'  className = {currentLocation == '/' ? 'activate' : ''}  >Home</Link>
          <Link to = '/add-posts'   className = {currentLocation == '/add-posts' ? 'activate' : ''}             > Add a New Post </Link>
          <Link to = '/your-bookmarks'  className = {currentLocation == '/your-bookmarks' ? 'activate' : ''}    > Your Bookmarks </Link>
          <Link to = '/your-posts'   className = {currentLocation == '/your-posts' ? 'activate' : ''}           > Your Posts </Link>

          {
            !context.user &&
            <Link to='/login' style = { (class_name == "topnav") ? {  float: "right" } : {}  }  className = {currentLocation == '/login' ? 'activate' : ''}  >Login</Link>
          }

          {
            !context.user &&
            <Link to='/register' style = { (class_name == "topnav") ? {  float: "right" } : {}  }  className = {(currentLocation == '/register') ? 'activate' : ''}  >Register</Link>
          }

          {
            context.user &&
              <Link to = '/' style = { (class_name == "topnav") ? {  float: "right" } : {}  } onClick = { () => { context.logout() }}> Logout </Link>
          }
            <Link to="#" className = "icon"   onClick = {handleClick}>
              <i class="fa fa-bars"></i>
            </Link>
          </div>
      </header>

  )
}
export {MenuBar};
