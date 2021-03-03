import React , {useContext}  from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {useMutation} from '@apollo/client';
import SummaryAndTitle from './summaryAndTitle.js';
import {AuthContext} from '../context/AuthContext';
import {YOUR_POSTS , GET_POSTS , DELETE_POST} from '../utils/GraphQl.js'
function YourPostComponent({bookname , summary , createdAt , _id , image ,history}){

const {user} = useContext(AuthContext);

const [deletePost, {loading}] = useMutation(DELETE_POST , {
  variables : {postId : _id },
  refetchQueries: [{
    query:YOUR_POSTS,
    variables: { userId : user.id },
  },
  {
    query : GET_POSTS
  }
]
});


function handleEditPost(e){
  e.preventDefault();
  history.summary = summary;
  history.push(`/editPost?post=${_id}`);
  console.log("hi");
}
function handleSubmit(e){
  e.preventDefault();
  deletePost();
}

return(
<div className = "allPosts">
    <div className = "flex">
        <div className="time">
        <span>
          {moment(createdAt).fromNow(true)} ago
        </span>
        </div>
      <SummaryAndTitle bookname = {bookname} summary = {summary} image = {image}  />
    <div className="subFlex2">
             <div className="full_post_link">
               <Link to = {`/posts/${_id}`}> Read the full post</Link>
             </div>

             <div className="bookmark">
             <i className = "fa fa-trash fa-2x"  onClick ={handleSubmit} > </i>
             </div>

             <div className = "button">
                <button type = "submit" onClick = {handleEditPost}>  Edit Post  </button>
             </div>
    </div>

    </div>
</div>

  )




}

export default YourPostComponent;
