
import {gql} from '@apollo/client';

 export const YOUR_POSTS = gql `
 query{
     getYourPosts{
      id
    imageUrl
    description
    bookname
    likeCount
 }
 }`;

 export const DELETE_POST = gql `
 mutation(
   $postId : Int!
 ){
   deleteYourPosts(postId : $postId)
 }
 `;

export const GET_POSTS = gql `
 query{
   getAllPosts{
    id
    imageUrl
    description
    bookname
    username
    likeCount
   }
 }
 `;


 export const GET_BOOKMARK = gql`
 query($postId : Int!)
 {
   getBookMarks(postId : $postId)
 }
 `;


export const ADD_BOOKMARK = gql `
 mutation addBookMark(
   $postId : Int!
 ){
   addBookMark (postId : $postId)
 }
 `;

export const ADD_POST = gql `
 mutation createPost(
   $bookname : String!
   $description: String!
   $imageUrl : String
 ){
   createPost (
     input:{
       bookname : $bookname
       description:$description
       imageUrl : $imageUrl
     })

 }
 `;

 export const LOGIN_USER = gql `
 mutation login(
 $email : String!
 $password : String!
 ){
   login(
       email : $email
       password : $password
   )
 }
 ` ;
export const REGISTER_USER = gql `
mutation register(
$username : String!
$email : String!
$password : String!
){
  register(
      username : $username
      email : $email
      password : $password
  )
}
`
export const SINGLE_POST = gql `
  query ($postId : Int!){
    getSinglePost(postId : $postId){
        bookname
        imageUrl
        description
        commentCount
        username
        id
    }
  }
`;



export const GET_POST_TO_EDIT = gql `
  query ($postId : String!) {
    getPost (postId : $postId){
        bookname
        summary
    }
  }
`;






export const INSERT_COMMENT = gql `
mutation addPostComment(
$postId : Int!
$parentId:Int
$comment : String!
){
  addPostComment(
      postId  : $postId
      parentId:$parentId
      comment : $comment
  )
}
`;

export const DELETE_COMMENT = gql `
mutation deleteComment(
$postId : String!
$commentId: String!
){
  deleteComment(
      postId : $postId
      commentId : $commentId
  )
}
`;

export const GET_COMMENTS = gql`
query (
  $postId:Int!
){
  getComments(postId:$postId){
    comment
    username
    commentId
  }
}
`;











export const INSERT_LIKES = gql `
mutation addLikes(
$postId : Int!
){
  addLikes(postId : $postId)
}
`

export const GET_LIKES = gql`
query getLikes($postId : Int!){
  getLikes(postId:$postId)
}

`


export const EDIT_POST = gql `
mutation editPost(
$postId : String!
$bookname : String!
$summary  : String!
){
  editPost(
    postId   : $postId
    bookname : $bookname
    summary  : $summary
  )
}
`;


export const S3_SIGNATURE = gql`
mutation s3Signature(
$filename : String!
$filetype:String!
)
{
  s3Signature(filename:$filename  filetype:$filetype){
    signedRequest
    url
  }
}
`;


export const AUTH_ME = gql`
  query{
    authMe
  }
`; 


export const GET_YOUR_BOOKMARKS = gql`
  query{
    getYourBookMarks{
      id
      bookname
      description
      imageUrl
      likeCount
    }
  }
`;

export const LOGOUT = gql`
  mutation{
      logOut
  }
`;