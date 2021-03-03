
import {gql} from '@apollo/client';

 export const YOUR_POSTS = gql `
 query ($userId : String!){
     getUserPosts(userId : $userId){
       _id
       bookname
       summary
       createdAt
       image
 }
 }`;

 export const DELETE_POST = gql `

 mutation(
   $postId : String!
 ){
   deletePost(postId : $postId)
 }
 `;

export const GET_POSTS = gql `
 query{
   getPosts{
     _id
     bookname
     summary
     createdAt
     image
     username
     likes {
       username
     }
     comments {
       username
       createdAt
       body
     }
     bookmarks{
       username
     }
     tags
   }
 }
 `;
 export const READ_QUERY = gql  `
 query($userId : String!){
   getBookMarks(userId : $userId){
     _id
     bookname
     image
     summary
     username
     bookmarks{
       username
     }
   }
 }
 `;

export const ADD_BOOKMARK = gql `
 mutation addBookMark(
   $userId : String!
   $postId : String!
 ){
   addBookMark (userId : $userId  postId : $postId)
 }
 `;

export const ADD_POST = gql `
 mutation insertPost(
   $bookname : String!
   $summary  : String!
   $tags     : String!
   $image    : String
 ){
   insertPost (
     insertpost :{
       bookname : $bookname
       summary  : $summary
       tags     : $tags
       image    : $image
     }
   ){
     _id
     bookname
     summary
     tags
     image
   }

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
   ){
     id
     email
     username
     token
     createdAt
   }
 }
 ` ;
export const REGISTER_USER = gql `
mutation register(
$username : String!
$email : String!
$password : String!
$confirmPassword: String!
){
  register(
    registeration : {
      username : $username
      email : $email
      password : $password
      confirmPassword : $confirmPassword
    }
  ){
    id
    email
    username
    createdAt
  }
}
`
export const SINGLE_POST = gql `
  query ($postId : String!) {
    getPost (postId : $postId){
        bookname
        image
        summary
        username
        likeCount
        likes{
           username
           createdAt
        }
        comments{
          id
          username
          body
          createdAt
        }
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
mutation insertComment(
$postId : String!
$body : String!
){
  insertComment(
      postId : $postId
      body : $body
  ){
    _id
    createdAt
  }
}
`

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
`
export const INSERT_LIKES = gql `
mutation insertLike(
$postId : String!
){
  insertLike(postId : $postId)
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
