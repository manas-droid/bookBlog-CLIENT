import React from 'react';
import {InMemoryCache , ApolloClient , ApolloProvider , createHttpLink} from '@apollo/client'
import App from './App';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
uri : 'http://localhost:8000/graphql'
})


const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');
    return {
    headers :  {
        Authorization : token ? token : ''
      }
    }
})


const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default (
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>
);
