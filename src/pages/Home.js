import React  from 'react';
import { useQuery} from '@apollo/client';
import PostComponent from '../components/PostComponent'

import {GET_POSTS} from '../utils/GraphQl'

function Home(props){
const output = useQuery(GET_POSTS);

if(output.loading) {return <h1> ....loading </h1> ;}



console.log(output);

const posts = output.data!=null ? output.data.getAllPosts : [];

  return (
      <div className="ui container text ">
      {

         posts.map(post=>{
        return   <PostComponent  key = {post.id} {...post} {...props}/>
        })
      }
    </div>
  );

}

export default Home;
