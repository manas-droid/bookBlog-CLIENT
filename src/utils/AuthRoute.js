import React , {useContext} from 'react'
import {Route , Redirect} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'

function AuthRoute({component : Component , ...rest}) {
  const {user} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render = {
        (props) =>{
         return  user ? 

         (<Component {...props} />) 
         :
         (
         <Redirect to= {{
           pathname : '/login',
           state :{from : props.location} 
         }} /> 
         
         )
        }
      }
     />

  )
}


function LogRoute({component : Component , ...rest}){
  const {user} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render = {
        (props) =>{
         return  !user ? 
         (<Component {...props} />) 
         :
         (
         <Redirect to={"/"}/> 
         )
        }
      }
     />
  );


}




export {AuthRoute , LogRoute};
