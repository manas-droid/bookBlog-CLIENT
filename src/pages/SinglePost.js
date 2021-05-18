
import React , {useState} from "react";
import { useQuery , useMutation } from '@apollo/client'
import {SINGLE_POST , INSERT_COMMENT , GET_COMMENTS} from '../utils/GraphQl';
import PostComponent from '../components/PostComponent'
import CommentSection from '../components/CommentSection';

function SinglePost(props){
  const postId = parseInt(props.match.params.postId);

  const result= useQuery(SINGLE_POST , {
    variables : {postId},
  });

const [comment , setComment] = useState('');

const [addPostComment ] = useMutation(INSERT_COMMENT , {

 refetchQueries: [
  {
    query:GET_COMMENTS,
    variables : {postId}
  }
]
});

  async function submitComment(e){
    e.preventDefault();
    await addPostComment({variables:{comment , postId}});
  }

  function onChangeComment(e){
    setComment(e.target.value);
  }

const post = (result.data) ? result.data.getSinglePost : null;


if(!post)
  return <div>...Loading</div>

  return(
    <div className="ui container text">
      <PostComponent  {...post} {...props} came_from="singlePost"/>
      <div id="container">
        <h1>
          {post.commentCount} Comments:
        </h1>
        <form class="ui reply form">
          <div class="field">
                <textarea rows="3"onChange = {onChangeComment} value = {comment} placeholder="Add a comment..."></textarea>
          </div>
              <button className="ui icon primary button" onClick={submitComment}>
                Add Comment
              </button>
        </form>
            
      </div>
      <CommentSection  postId = {postId}/>
    </div>

  )
}

export default SinglePost;
