import React , {useState , useContext} from 'react';
import {useMutation } from '@apollo/client';
import {Link } from 'react-router-dom';
import {AUTH_ME, LOGIN_USER} from '../utils/GraphQl'


function Login(props){
 
const login = {
  email    : '',
  password : ''
};

const [log , setLogin] = useState(login);
const [ errors , setErrors] = useState({});



const [logUser , __] = useMutation(LOGIN_USER , {
  onError :  ({ graphQLErrors, networkError })=>{
    console.log(networkError);
    if(graphQLErrors[0])
      setErrors(graphQLErrors[0].extensions.exception.errors);
  },
  variables : log,
  refetchQueries:[{
    query : AUTH_ME
  }]
});

const onChange = (e)=>{
  setLogin(
    {
      ...log ,
      [e.target.name] : e.target.value
    }
  )
}

const handleSubmit = async (e)=>{
  e.preventDefault();
    await logUser();
  props.history.push("/");
}


  return (
    <div className="ui container text">
      <form class="ui form" onSubmit={handleSubmit}>
        <div class="field">
          <label htmlFor="email"> Email</label>
          <input type="email" name="email" value={log.email} onChange={onChange} />
        </div>
        <div class="field">
          <label htmlFor="password"> Password</label>
          <input type="password" name="password" value={log.password} onChange={onChange} />
        </div>
        <Link to='/register' className='registerLink'> Register Now! </Link>
        <button type="submit" class="ui button">Submit</button>
      </form>
    </div>
  )

}


export default Login;
