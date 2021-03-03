import React , {useContext} from 'react';
import {gql , useQuery,useMutation} from '@apollo/client'
import {AuthContext} from '../context/AuthContext'
import PostComponent from '../components/PostComponent'

import {READ_QUERY} from '../utils/GraphQl.js'

function BookMark(props){

const {user} = useContext(AuthContext);
const output = useQuery(READ_QUERY , {
  variables : {userId : user.id}
});

if(!output.data || output.data && output.data.getBookMarks.length === 0){
  return <h1 style = {{"margin" : "20px 60px" }}> You have no BookMarks ;(</h1>
}

return (
  <div className="allPosts">
  {
    output.data &&
    output.data.getBookMarks.map(post=>{
    return   <PostComponent key = {post._id} {...post} {...props} />;
  })
  }
  </div>
)

}


export default BookMark;
