import {Link , useLocation} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {useAuth0} from "@auth0/auth0-react";


function MenuBar(){

  const{ loginWithRedirect , logout , isAuthenticated} = useAuth0();
  const user = isAuthenticated;
  console.log(isAuthenticated);

  const currentLocation = useLocation().pathname;


  return (
    <div className="ui inverted segment">
    <div className="ui inverted pointing secondary menu">
      <Link className={`item ${currentLocation === "/" ? "active" : ""}`} to="/">Home</Link>
      <Link className={`item ${currentLocation === "/add-posts" ? "active" : ""}`} to="/add-posts">Add a Post</Link>
      <Link className={`item ${currentLocation === '/your-bookmarks'  ? "active" : ""}`} to="/your-bookmarks">Your bookmarks</Link>
      <Link to = '/your-posts'   className = {currentLocation === '/your-posts' ? 'item active' : 'item'}> Your Posts </Link>
      <div className="right menu">
        
       { 
         !user && (  
          <Link className={`item ${currentLocation==='/register' ? "active" : ""}`} to="/register">Sign Up</Link>
         )
        }
      {
        !user && (
          <Link className={`item ${currentLocation==='/login' ? "active" : ""}`} onClick = {()=>loginWithRedirect()}>Login</Link>
        )
      }  
      
      {
        user &&
        (
          <Link to="/" className="item" onClick = {logout}>Logout</Link>
        )
        }
      </div>
    </div>
  </div>
)
}
export {MenuBar};
