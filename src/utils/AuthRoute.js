import React , {useContext} from 'react'
import {Route , Redirect} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'

import Login from '../pages/Login'

function AuthRoute({component : Component , ...rest}) {
  const {user} = useContext(AuthContext);
  return (
    <Route

      {...rest}
      render = {
        (props) =>
          user ? <Redirect to={props.location.pathname} /> : <Component {...props} />
      }

     />

  )
}

function LogRoute({component : Component , ...rest}) {
  const {user} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render = {
        (props) =>
          !user ? <Redirect to = {`/login/came_from_=${props.location.pathname}`} /> : <Component {...props} />
      }
     />

  )
}



export {AuthRoute , LogRoute};
