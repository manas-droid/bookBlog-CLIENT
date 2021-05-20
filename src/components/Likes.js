import React , {useState , useEffect , useContext} from "react";
import {Link} from "react-router-dom"
import { useQuery , useMutation} from '@apollo/client';
import {INSERT_LIKES , GET_LIKES} from '../utils/GraphQl';

import{useAuth0}  from "@auth0/auth0-react" ;
 function Likes({postId , likeCount}){

  const{user} = useAuth0();

  const [likes , setLikes] = useState('fa-heart-o');
  const [addLikes , __] =  useMutation(INSERT_LIKES);


  const output = useQuery(GET_LIKES , {
    variables : {postId} ,
    fetchPolicy:"network-only"
  });


  useEffect(()=>{
      if(output.data && user){
        const {getLikes} =  output.data;
        if(getLikes){
          setLikes('fa-heart red-colour');
        }
        else
        setLikes('fa-heart-o');
      }
      else if (!user){
        setLikes('fa-heart-o');
      }
    } , [output ,user]);




  async function handleLikes(){
    if(likes === 'fa-heart-o'){
      setLikes('fa-heart red-colour');
    }else {
      setLikes('fa-heart-o');
    }
    await addLikes({variables : {postId}});
  }

  return(
    <span class="right floated">
       <i className = {`fa ${likes} fa-2x`} onClick = {handleLikes}></i>
      {likeCount}
    </span>
    
  )
}

export default Likes;
