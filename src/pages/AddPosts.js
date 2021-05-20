import React , {useState} from 'react';
import { useMutation } from '@apollo/client'
import {S3_SIGNATURE , ADD_POST} from '../utils/GraphQl';

function AddPosts(props){
const initialState = {
  bookname : '',
  description  : '',
}

const [ post , setAddPost]  = useState(initialState);
// const [errors , setErrors] = useState({});

const [image , setImage] =  useState({
  type : "",
  name : "",
});

const uploadToS3 = async(signedRequest , file)=>{

  await fetch(signedRequest , {
    method : "PUT",
    body : file,
    headers:  {
        "Content-Type":file.type
    }
  });
}


function onUploadImage(e){
  setImage(e.target.files[0]);
}

function formatFileName(imageName){
  const date = new Date().toISOString().substring(0,10);
  const randomString = Math.random()
      .toString(36)
      .substring(2, 7);

  const cleanImageName = imageName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newImagename = `images/${date}-${randomString}-${cleanImageName}`;
  return newImagename.substring(0, 60);
}


function onChange(e){
  setAddPost({
     ...post ,
     [e.target.name] : e.target.value
   });
}


const [insertSignature , _] = useMutation(S3_SIGNATURE , {
    variables : { filename : formatFileName(image.name) , filetype : image.type}
});


const [createPost , __] = useMutation(ADD_POST);

async function  handleSubmit(e) {
  e.preventDefault();
  const res = await insertSignature();
  const {signedRequest , url} = res.data.s3Signature;
  await uploadToS3(signedRequest , image);
  const posted = await createPost({variables : {imageUrl : url , bookname : post.bookname , description : post.description }});
  props.history.push("/");
  console.log("success");
}



  return(
    <div className="ui container text">
      <form class="ui form">
        <div class="field">
          <label htmlFor="bookname" > Book Name:</label>
          <input type="text" name="bookname" placeholder="name of the book ..." value={post.bookname} onChange={onChange} />
        </div>
        <div class="field">
          <label htmlFor="description"> Summary: </label>
          <textarea name="description" rows="3" placeholder="write a short summary" value={post.description} onChange={onChange} style={{ height: "200px" }} />
        </div>
        <div class="field">
          <label htmlFor="image"> Book Image: </label>
          <input className="add-post-id" id='fileInput' type="file" name="image" onChange={onUploadImage} />
        </div>
        <button type="submit" className="ui icon primary button" onClick={handleSubmit}> Add Post </button>
      </form>
    </div>
);


}




export default AddPosts;