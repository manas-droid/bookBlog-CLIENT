import React from 'react';
import { useQuery } from '@apollo/client';
import PostComponent from '../components/PostComponent'

import {YOUR_POSTS} from '../utils/GraphQl.js'


function YourPosts(props){

const output = useQuery(YOUR_POSTS);

if(output.loading)
return <h1 style = {{"margin" : "20px 60px"}}> loading ... </h1>



const yourPost = (output.data) ? output.data.getYourPosts : [];

if(yourPost.length===0){
  return <h1 style = {{"margin" : "20px 60px"}}> You Have not posted anything yet ;( </h1>
}

return (
    <div className="ui container text">
    {
      yourPost.map(post=>{
        return <PostComponent key = {post._id} {...post} {...props} came_from="yourposts"/>
      })
    }
    </div>
)
}


export default YourPosts;
