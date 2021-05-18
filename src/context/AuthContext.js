import React , {createContext} from 'react';
import {useQuery} from "@apollo/client";
import {AUTH_ME} from '../utils/GraphQl';
const AuthContext = createContext()


function AuthProvider(props){
const result = useQuery(AUTH_ME);

if(result.loading)
  return <h1>Loading ...</h1>;

  return (
    <AuthContext.Provider
        value={
            {
              user : (result.data) ? result.data.authMe : undefined
            }
        }
      {...props}
  />
);



}


export {AuthContext , AuthProvider};
