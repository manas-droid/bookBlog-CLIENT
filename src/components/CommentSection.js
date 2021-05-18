
import React from 'react';
import {GET_COMMENTS} from "../utils/GraphQl";
import {useQuery} from "@apollo/client";
import { Link } from 'react-router-dom';

function CommentSection({postId}){
  console.log(postId);
  const comments = useQuery(GET_COMMENTS , {
    variables : {postId}
  });
  console.log(comments)
  return(
    <div>
      {
        comments.data && comments.data.getComments &&
        comments.data.getComments.map(post=>{

          return (
            <div class="ui comments">
              <div class="comment">
                <Link class="avatar">
                  <img src="https://semantic-ui.com/images/avatar2/small/matthew.png" alt={post.username} />
                </Link>
                <div class="content">
                  <div class="author">{post.username}</div>
                  <div class="metadata">
                    <div>1 day ago</div>
                  </div>
                  <div class="text">
                    <p>{post.comment}</p>
                  </div>
                </div>
              </div>
              <div class="ui fitted divider"></div>
            </div>
        )
        })
      }
    </div>

  )
}

export default CommentSection;
