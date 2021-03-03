
import React , {useState , useEffect}from 'react';
import {useLocation} from "react-router-dom";
import {useMutation , useQuery} from '@apollo/client';
import {EDIT_POST , GET_POST_TO_EDIT , GET_POSTS , SINGLE_POST} from '../utils/GraphQl'

function EditPost(props){
  const location = useLocation();
  const postId = location.search.split("=")[1];
  const [showModal ,setShowModal] = useState('modal');
  console.log(postId);
  //
  const{loading , errors  , data } = useQuery(GET_POST_TO_EDIT , {
    variables : {postId : postId }
  })
  const initPost = {
    bookname : "",
    summary  : ""
  }
  const [editPost , setEditPost] = useState(initPost);

  const [editPostFunc , {_}] = useMutation(EDIT_POST , {
    variables :  {postId , bookname : editPost.bookname , summary : editPost.summary},
    refetchQueries: [{
      query:GET_POSTS
    } , {
      query : SINGLE_POST ,
      variables : {postId}
    }],
    update(proxy , res){
      props.history.push("/");
    },
    onError :  ({ graphQLErrors, networkError })=>{
      console.log(graphQLErrors);
      console.log(networkError);
    },
  })


  useEffect(()=>{
    if(!loading){
      setEditPost({
        bookname : data.getPost.bookname,
        summary  : data.getPost.summary
      });
    }
  } , [loading]);

if(loading){
  return <h1>...loading</h1>;
}


  function onChange(e){
    setEditPost({ ...editPost , [e.target.name] : e.target.value})
  }

  function handleClose(e){
    e.preventDefault()
    setShowModal('notAModal');
    props.history.push('/');
  }


  function handleEditPost(e){
    e.preventDefault();
    editPostFunc();
  }


  return(
      <form onSubmit = {handleEditPost} className="register">
          <label htmlFor = "bookname">Bookname:</label>
          <input type="text" name = "bookname" value={editPost.bookname} onChange = {onChange} />
          <label htmlFor = "summary">Summary:</label>
          <textarea type="text" name = "summary" value={editPost.summary} onChange = {onChange} >

          </textarea>
         <button type = "submit" className="registerbtn"> Edit </button>
      </form>
  )
}


export default EditPost;
