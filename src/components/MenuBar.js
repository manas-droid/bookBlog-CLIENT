import {Link , useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {useMutation} from '@apollo/client';
import {AuthContext} from '../context/AuthContext'
import {LOGOUT , AUTH_ME} from '../utils/GraphQl';
import 'semantic-ui-css/semantic.min.css';
import {useAuth0} from "../utils/auth";

function MenuBar(){

  const {user} = useContext(AuthContext);
  const{isAuthenticated , loading:authLoading , loginWithRedirect} = useAuth0();

  const currentLocation = useLocation().pathname;

  console.log(currentLocation);

  const [logOut ] = useMutation(LOGOUT , {
    refetchQueries : [{
      query : AUTH_ME
    }]
  });

  async function handleLogOut (){
    await logOut();

  }

  const activeItem = 'home';

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
          <Link className={`item ${currentLocation==='/login' ? "active" : ""}`} onClick = {loginWithRedirect}>Login</Link>
        )
      }  
      
      {
        user &&
        (
          <Link to="/" className="item" onClick = {handleLogOut}>Logout</Link>
        )
        }
      </div>
    </div>
  </div>
)
}
export {MenuBar};
