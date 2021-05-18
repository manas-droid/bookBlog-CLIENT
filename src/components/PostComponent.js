import BookMark from './BookMark.js';
import Likes from './Likes.js';
import {Link} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import {DELETE_POST} from '../utils/GraphQl';
function PostComponent({id , imageUrl ,bookname,description,username , likeCount , history ,came_from }){
  const [deletePost] = useMutation(DELETE_POST)

  async function handleDelete(){
     await deletePost({variables : {postId : id}});
  }


return (
<div className="ui card fluid">
  {
    came_from==="yourposts" &&
  <div className = "content center aligned">
      <Link onClick = {handleDelete} >
          <i className="fa fa-trash"></i>
            Delete Post
      </Link>
  </div>

}  <div className="ui medium centered image">
    <img alt={bookname} src={imageUrl}/>
    </div>

    <div className="content">
      <div className="header">{bookname}</div>
      <div className="meta"><span class="date">Joined in 2015</span></div>
    {
      (came_from !== "singlePost" ) ? 
        <div className="description" style={{"whiteSpace" : "break-spaces"}}>
        {description.length > 500 ? description.substring(0,500)+" ......" : description}
        </div>
       : 
       <div  className="description" style={{"whiteSpace" : "break-spaces"}}>
          {description}
        </div>
    }


    </div>

    <div className="content">
      <Likes postId={id} likeCount ={likeCount} />
      <BookMark postId={id} history={history} />
    </div>

   {
     came_from !== "singlePost" && (
    <div className="content center aligned">
      <Link to={`/posts/${id}`}>See Full Post</Link>
    </div>
    )
   } 
  </div>
 );
}

export default PostComponent;


