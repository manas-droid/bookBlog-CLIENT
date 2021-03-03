import React , {useContext} from 'react';
import { useQuery } from '@apollo/client';
import YourPostComponent from '../components/YourPostComponent'
import {AuthContext} from '../context/AuthContext'

import {YOUR_POSTS} from '../utils/GraphQl.js'


function YourPosts(props){
const {user} = useContext(AuthContext);

const output = useQuery(YOUR_POSTS ,{
variables : { userId :  user.id}
});

const userId = user.id;


if(output.data && output.data.getUserPosts.length== 0){
  return <h1 style = {{"margin" : "20px 60px"}}> You Have not posted anything yet ;( </h1>
}
return (
    <div>
    {
      output.data   &&
      output.data.getUserPosts.map(post=>{
        return <YourPostComponent key = {post._id} {...post} history = {props.history}  />
      })
    }
    </div>
)
}


export default YourPosts;
