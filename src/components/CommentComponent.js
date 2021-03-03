import {DELETE_COMMENT , SINGLE_POST} from '../utils/GraphQl'
import {useMutation} from '@apollo/client';

function CommentComponent({ id , username , body, userName,postId , postAuthor}){

  const [deleteComment , {loadingComment} ] = useMutation(DELETE_COMMENT , {
      variables : {postId : postId , commentId : id},
      refetchQueries: [{
        query:SINGLE_POST,
        variables: { postId}
      }]
  })

  const handleOnClick = (e)=>{
    e.preventDefault();
    deleteComment();
  }

return(
  <footer>
        <span id="author" >{username} : </span>
        <section className="deleteCommentButton">
            <p>{body}</p>
            {
              (username === userName || userName === postAuthor ) && <i className = "fa fa-trash" onClick ={handleOnClick} >
               </i>
            }
        </section>
  </footer>
)

}


export default CommentComponent;
