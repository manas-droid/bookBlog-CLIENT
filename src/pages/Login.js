import React , {useState , useContext} from 'react';
import {useMutation } from '@apollo/client';
import {Link } from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import {LOGIN_USER} from '../utils/GraphQl'


function Login(props){
  const prev  = props.location.pathname.split("=")[1] || '/'
  console.log(prev);
const login = {
  email    : '',
  password : ''
};

const [log , setLogin] = useState(login);
const [ errors , setErrors] = useState({});


const context = useContext(AuthContext);

const [logUser , {loading}] = useMutation(LOGIN_USER , {
  update(proxy , res){
    console.log(prev);
    context.login(res.data.login);
    props.history.push(prev);
  },
  onError :  ({ graphQLErrors, networkError })=>{
    console.log(graphQLErrors);
    console.log(networkError);
    if(graphQLErrors[0])
      setErrors(graphQLErrors[0].extensions.exception.errors);
  },
  variables : log
});

const onChange = (e)=>{
  setLogin(
    {
      ...log ,
      [e.target.name] : e.target.value
    }
  )
}

const handleSubmit = (e)=>{
  e.preventDefault();
  logUser();
}


  return (
      <form onSubmit = {handleSubmit} className="register">
            <label htmlFor = "email"> Email</label>
            <input type="email" name = "email"  value = {log.email} onChange = {onChange}/>
            <label htmlFor = "password"> Password</label>
            <input type="password" name = "password"  value = {log.password} onChange = {onChange}/>
           <button type = "submit" className="registerbtn"> Login </button>

           <Link to = '/register' className='registerLink'> Register Now! </Link>

           {Object.keys(errors).length > 0 && (
             <div className="ui error message">
             <ul className="list">
             {Object.values(errors).map((value) => (
               <li key={value}>{value}</li>
             ))}
             </ul>
             </div>
           )}
      </form>
  )

}


export default Login;
