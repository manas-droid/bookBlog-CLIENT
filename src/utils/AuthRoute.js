import React  from 'react'
import {Route , Redirect} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

function AuthRoute({component : Component , ...rest}) {
  const {user} = useAuth0();

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
  const {user} = useAuth0();
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
