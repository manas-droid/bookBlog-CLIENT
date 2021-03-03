import {useQuery , useMutation} from '@apollo/client';
import {SINGLE_POST , INSERT_COMMENT,INSERT_LIKES} from '../utils/GraphQl'
import React , {useState,useContext,useEffect} from 'react';


function CommentForm({visibleForm , postId , history , user}){

const [singlePost , setSinglePost] = useState('');

const [insertComment , {loadingComment} ] = useMutation(INSERT_COMMENT , {
    variables : {postId : postId , body : singlePost},
    refetchQueries: [{
      query:SINGLE_POST,
      variables: { postId}
    }]
  });


const handleSubmit = (e)=>{
    e.preventDefault();
      if(!user){
          return history.push(`/login/came_from=/posts/${postId}`);
}    insertComment();
}

function onChange(){
  setSinglePost(document.getElementById('commentDiv').innerText);
}

return(
  <form onSubmit = {handleSubmit} className={`${visibleForm}`}>
    <div contentEditable = "true"  value = { singlePost }  onInput = { onChange } id="commentDiv" aria-label="Add a comment"></div>
    <button type='submit'>Comment</button>
  </form>
)
}


export default CommentForm;
