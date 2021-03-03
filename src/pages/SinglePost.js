import React , {useState,useContext,useEffect} from 'react';
import {useQuery , useMutation} from '@apollo/client';
import {SINGLE_POST , INSERT_COMMENT,INSERT_LIKES} from '../utils/GraphQl'
import {AuthContext} from '../context/AuthContext';
import CommentComponent from '../components/CommentComponent'
import LikesComments from '../components/likesComments'
import SummaryAndTitle from '../components/summaryAndTitle.js';

function SinglePost(props){
  const {user} = useContext(AuthContext);

  const id = (user) ? user.id : ' ';
  const userName = (user) ? user.username : ' ';

  const postId = props.location.pathname.substring(7);

  const{loading , errors  , data} = useQuery(SINGLE_POST , {
    variables : {postId : postId }
  })


if(loading)
    return <h1>loading ..</h1>;


    return(
        <div>
            {
              data &&
             <div className = 'commentDiv'>
              <div className = "flex">
                <SummaryAndTitle summary = {data.getPost.summary} image = {data.getPost.image} bookname = {data.getPost.bookname}/>

                <LikesComments  username = {data.getPost.username} likeCount = {data.getPost.likeCount}
                     commentsLength = {data.getPost.comments.length}  likes = {data.getPost.likes}
                     history = {props.history}
                    postId = {postId}
                     />
             </div>
          </div>
        }
      <section className="commentDisplay">
          <h3>
            Check the reviews!
          </h3>

          {
            data && data.getPost && data.getPost.comments.length > 0 &&
              data.getPost.comments.map(comment =>{
                return  <CommentComponent  key={comment.id} {...comment } userName = {userName} postId = {postId} postAuthor = {data.getPost.username}/>
              }) || <h1>Be the first to comment</h1>
          }

      </section>

        </div>

    )
}

export default SinglePost;
