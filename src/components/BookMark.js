import React , {useState , useEffect , useContext} from "react";

import { useQuery , useMutation} from '@apollo/client';
import {GET_BOOKMARK , ADD_BOOKMARK} from "../utils/GraphQl"
import{AuthContext}  from "../context/AuthContext" ;

function BookMark({postId , history}){
const{user} = useContext(AuthContext);
const [bookmark , setBookMark] = useState('fa-bookmark-o');
const [addBookMark , __] = useMutation(ADD_BOOKMARK , {
  onError : ({ graphQLErrors, networkError })=>{
        if(graphQLErrors[0].message === "User not authorised"){
          history.push('/login');
        }
  }
});


const output = useQuery(GET_BOOKMARK , {
  variables : {postId},
  fetchPolicy:"network-only"
});

useEffect(()=>{
    if(output.data && user){
      const {getBookMarks} = output.data;
      if(getBookMarks){
        setBookMark('fa-bookmark');
      }
      else
        setBookMark('fa-bookmark-o')
    }
    else if (!user){
      setBookMark('fa-bookmark-o');
    }
} , [user,output.data])




async function onClick(e){
    await addBookMark({variables : {postId}});
    if(bookmark === 'fa-bookmark')
       setBookMark('fa-bookmark-o');
    else
      setBookMark('fa-bookmark');
}

  return (
    <i className={`fa ${bookmark} fa-2x`} onClick = {onClick}></i>
  );
}

export default BookMark;
