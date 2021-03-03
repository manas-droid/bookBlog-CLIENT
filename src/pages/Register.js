import React , {useState} from 'react';
import {Link } from 'react-router-dom';
import {  useMutation } from '@apollo/client';
import {REGISTER_USER} from '../utils/GraphQl'


function Register(props){
  const register = {
    email    : '',
    username : '',
    password : '',
    confirmPassword:''
  };


  const [reg , setRegister] = useState(register);
  const [errors , setErrors] = useState({});

  const [addUser , {loading}] = useMutation(REGISTER_USER , {
    update(proxy , res){
      props.history.push('/login');
    },
    onError :  ({ graphQLErrors, networkError })=>{
      if(graphQLErrors[0].extensions.exception){
        setErrors(graphQLErrors[0].extensions.exception.errors);
      }
    },
    variables : reg
  });

  const onChange = (e)=>{
    setRegister(
      {
        ...reg ,
        [e.target.name] : e.target.value
      }
    )
  }


  const handleSubmit = (e)=>{
    e.preventDefault();
    addUser();
  }

  return (

        <form onSubmit = {handleSubmit} className="register">
            <label htmlFor = "email"> Email:</label>
            <input type="email" name = "email"  value = {reg.email} onChange = {onChange}/>

            <label htmlFor = "username"> Username: </label>
            <input type="text" id="form-id" name = "username" value = {reg.username} onChange = {onChange} />

            <label htmlFor = "password"> Password:</label>
            <input type="password" name = "password"  value = {reg.password} onChange = {onChange}/>

            <label htmlFor = "password">Confirm Password: </label>
            <input type="password" name = "confirmPassword"  value = {reg.confirmPassword} onChange = {onChange}/>

           <button type = "submit" className = "registerbtn"> Register </button>
           <Link to = 'login' className='registerLink'> Already have an account? </Link>

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





export default Register;
