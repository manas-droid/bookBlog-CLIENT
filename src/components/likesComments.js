

import {useQuery , useMutation} from '@apollo/client';
import {SINGLE_POST , INSERT_COMMENT,INSERT_LIKES} from '../utils/GraphQl'
import React , {useState,useContext,useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import CommentForm from './CommentForm.js';

function LikesComments({username , likeCount , commentsLength , likes, postId , history}){

const {user} = useContext(AuthContext);
const id = (user) ? user.id : ' ';
const userName = (user) ? user.username : ' ';

let initialIcon = ' ';
const [icon , setIcon] = useState(initialIcon);
const [visibleForm , setVisibleForm] = useState('invisible'); // for Comment Form

const [insertLikes , {loadingLikes} ] = useMutation(INSERT_LIKES , {
      variables : {postId : postId},
      refetchQueries: [{
        query:SINGLE_POST,
        variables: { postId}
      }]
});

likes = likes || [] ;

useEffect(()=>{
    if(likes.findIndex(l=> l.username === userName) >= 0){
      initialIcon = 'fa-heart red-color';
    }
    else {
      initialIcon = 'fa-heart-o';
    }
    setIcon(initialIcon);
},[likes , id])


const handleLikes = (e)=>{
    e.preventDefault();
    if(!user)
        return history.push(`/login/came_from=/posts/${postId}`);
    insertLikes()
}

console.log(visibleForm);
return (
  <div>
        <div className="subFlex2">
          <div className="username">
            <span id="author">Author</span> :   {username}
          </div>

          <div className='likes'>
            <i className = {`fa ${icon} fa-2x`} onClick = {handleLikes}></i>
            <p>{likeCount} </p>
         </div>
         <div className='comments'>
           <i className = 'fa fa-comment-o fa-2x' onClick = {()=>(visibleForm === 'invisible') ? setVisibleForm('commentForm') : setVisibleForm('invisible') }> </i>
          <p>{commentsLength}</p>
        </div>
      </div>
      <CommentForm   visibleForm = {visibleForm} history ={history}  postId = {postId} user = {user} />
</div>
)

}


export default LikesComments;
