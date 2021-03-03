import React , {useState} from 'react';
import { useMutation } from '@apollo/client'
import {GET_POSTS , ADD_POST} from '../utils/GraphQl';

function AddPosts(props){
const initialState = {
  bookname : '',
  summary  : '',
  tags : '',
  image : ''
}

const [ post , setAddPost]  = useState(initialState);
const [errors , setErrors] = useState({});

function onChange(e){
  setAddPost({
      ...post ,
      [e.target.name] : e.target.value
    });
}

const [addPosts , {loading}] = useMutation(ADD_POST , {
  variables : {bookname : post.bookname , summary : post.summary , tags : post.tags , image : post.image },
  update(proxy , res){
    const data = proxy.readQuery({ query : GET_POSTS});
    proxy.writeQuery({ query: GET_POSTS , data : {
      getPosts : [res.data.insertPost , ...data.getPosts]
    }
  });
    props.history.push("/");
  },
  onError :  ({ graphQLErrors, networkError })=>{
        setErrors(graphQLErrors[0].extensions.exception.errors);
  },
})

function handleSubmit(e) {
  e.preventDefault()
  addPosts();
}

  return(
      <form onSubmit = {handleSubmit} className="register">
            <label htmlFor = "bookname" > Book Name:</label>
           <input type="text" className="add-post-id" name = "bookname"  placeholder = "name of the book ..." value = {post.bookname}  onChange = { onChange }  />

            <label htmlFor = "summary"> Summary: </label>
          <textarea name="summary"  placeholder = "write a short summary" value = {post.summary} onChange = { onChange } style = {{height : "200px"}}/>

            <label htmlFor = "tags"> Book Genres: </label>
            <input className="add-post-id" type="text" name = "tags"  placeholder="add hastags before every genre ..." value = {post.tags} onChange = { onChange } />

            <label htmlFor = "image"> Book Image: </label>
            <input className="add-post-id"  id='fileInput'type="text" name = "image"  placeholder="https link of the image ..."value = {post.image} onChange = { onChange } />

      <button type = "submit" className = "submit" onClick = {handleSubmit}> Add Post </button>

        {Object.keys(errors).length > 0 && (
          <div >
            <ul >
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
</form>



  )


}

export default AddPosts;




// 130019504204717
