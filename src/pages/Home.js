import React , {useState} from 'react';
import { useQuery} from '@apollo/client';
import PostComponent from '../components/PostComponent'

import {GET_POSTS} from '../utils/GraphQl'
function Home(props){
const output = useQuery(GET_POSTS);
const [searchTerm , setSearchTerm] = useState("");
if(output.loading) {return <h1> ....loading </h1> ;}
let isNull = 0;
function handleSearchQuery(e){
  setSearchTerm(e.target.value);
}

  return (
      <div>
      <div className="search">
          <input type="text" placeholder="search genres or titles"  onChange = {handleSearchQuery} />
      </div>


      <div className = "allPosts">
      {
        output.data &&
       output.data.getPosts.filter((post)=>{
        if(searchTerm.trim()  === ""){
            return post;
          }

          else if(post.bookname.toLowerCase().includes(searchTerm.toLowerCase()) || post.tags.filter(tag=> tag.toLowerCase().startsWith(searchTerm.toLowerCase())).length > 0){
              return post;
          }
          else{
            isNull++;
          }
        }).map(post=>{
        return (
          <PostComponent  key = {post._id} {...post} {...props} />
        )
        })
      }
      {
        output.data && output.data.getPosts.length === isNull && <h1>no such post exists ;(</h1>
      }
      </div>
      </div>
  );

}

export default Home;
