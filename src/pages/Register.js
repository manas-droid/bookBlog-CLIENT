import React , {useState} from 'react';
import {Link } from 'react-router-dom';
import {  useMutation } from '@apollo/client';
import {REGISTER_USER} from '../utils/GraphQl'
function Register(props){

  const register = {
    email    : '',
    username : '',
    password : '',
  };


  const [reg , setRegister] = useState(register);
  const [errors , setErrors] = useState({});

  const [addUser , {loading}] = useMutation(REGISTER_USER , {
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

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await addUser();
    props.history.push("/login");
  }

  return (
    <div className="ui container text">
      <form class="ui form" onSubmit={handleSubmit}>
        <div class="field">
          <label htmlFor="email"> Email:</label>
          <input type="email" name="email" value={reg.email} onChange={onChange}/>
        </div>

        <div class="field">
          <label htmlFor="username"> Username: </label>
          <input type="text" id="form-id" name="username" value={reg.username} onChange={onChange} />
        </div>

        <div class="field">
          <label htmlFor="password"> Password:</label>
          <input type="password" name="password" value={reg.password} onChange={onChange} />
        </div>
        <Link to='login' className='registerLink'> Already have an account? </Link>
        <button type="submit" className="ui button"> Register </button>
      </form>
    </div>

  )
}





export default Register;
