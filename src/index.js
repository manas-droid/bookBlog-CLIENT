import ReactDOM from 'react-dom';
import App from './App';
import {InMemoryCache , ApolloClient ,ApolloProvider , createHttpLink} from '@apollo/client'
import React, { useEffect, useState , useCallback } from "react";
import {useAuth0 , Auth0Provider} from "@auth0/auth0-react";
import {setContext} from "@apollo/client/link/context";

function ApolloWrapper(){
const [bearerToken , setBearerToken] = useState("");

const {getAccessTokenSilently , isAuthenticated } = useAuth0();

const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently()
      setBearerToken(token)
    } catch (err) {
      //loginWithRedirect()
    }
  }, [getAccessTokenSilently, isAuthenticated])

  useEffect(() => {
    getAccessToken()
  }, [getAccessToken]);
  

const httpLink = createHttpLink({
    uri : 'http://localhost:8080/graphql',
    credentials : "include"
});
    

const authLink = setContext((_ , {headers , ...rest})=>{
    if(!bearerToken) return {headers , ...rest};
    return {
        ...rest,
        headers : {
            ...headers,
            authorization : `Bearer ${bearerToken}`
        }
    }
});

const client = new ApolloClient({
        link : authLink.concat(httpLink),
        cache: new InMemoryCache()
});



return <ApolloProvider client = {client}>
          <App/>
        </ApolloProvider>

}


const Main = () => (
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
  >

    <ApolloWrapper />
  </Auth0Provider>
)



ReactDOM.render(
      <Main />
      ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
