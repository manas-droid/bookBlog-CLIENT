import React from 'react';
import {InMemoryCache , ApolloClient , ApolloProvider , createHttpLink} from '@apollo/client'
import App from './App';
import {Auth0Provider}  from "./utils/auth";
import  history  from "./utils/history";

const httpLink = createHttpLink({
uri : 'https://infinite-hollows-96731.herokuapp.com/graphql',
credentials : "include"
});


const onRedirectCallback = (appState)=>{
  history.push(appState && appState.targetUrl?
    appState.targetUrl : 
    window.location.pathname
    );
}


const client = new ApolloClient({
  link : httpLink,
  cache: new InMemoryCache()
});

export default (
  <Auth0Provider
    domain = {process.env.REACT_APP_AUTH0_DOMAIN}
    client_id = {process.env.REACT_APP_AUTH0_CLIENT_ID}
    audience = {process.env.REACT_APP_AUTH0_AUDIENCE}
    redirect_uri = {window.location.origin}
    onRedirectCallback = {onRedirectCallback}
  >
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>
  </Auth0Provider>
);
