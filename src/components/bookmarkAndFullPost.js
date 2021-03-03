
import {AuthContext} from '../context/AuthContext';
import {READ_QUERY , ADD_BOOKMARK} from '../utils/GraphQl.js'
import { useMutation} from  '@apollo/client'
import  {useContext,useState} from 'react';
import {Link} from 'react-router-dom';


function BookmarkAndFullPost({_id , username , bookmarks , history}){
  const {user} = useContext(AuthContext);
  const id =  (user) ? user.id : " ";
  const userName = (user) ? user.username : " ";

const [addBookMark , {isLoading}] = useMutation(ADD_BOOKMARK , {
      variables : {userId : id , postId : _id },
      refetchQueries: [{
        query:READ_QUERY,
        variables: { userId : id },
      }] ,
      onErrors : (graphQLErrors)=>{
          console.log(graphQLErrors);
      }
  })


  let initialIcon = ' ';

  const bookmarkIndex = bookmarks.findIndex(b => b.username ===userName);
  if(bookmarkIndex>=0)
      initialIcon = 'fa-bookmark';
  else
      initialIcon = 'fa-bookmark-o';


  const [icon , setIcon] = useState(initialIcon);

function bookmark(e){
    e.preventDefault();
    if(!user){
     return  history.push("/login");
    }
    if(icon == 'fa-bookmark-o')
      setIcon('fa-bookmark');
    else
      setIcon('fa-bookmark-o');
    addBookMark();
}

return(

        <div className="subFlex2">
           <div className = "username">
              <span id="author">Author</span> :  {username}
           </div>
           <div className="full_post_link">
             <Link to = {`/posts/${_id}`}> Read the full post</Link>
           </div>
           <div className="bookmark">
           <i className={`fa ${icon} fa-2x`} onClick = {bookmark} > </i>
           </div>
      </div>

  );
}



export default BookmarkAndFullPost;
