import axios from 'axios';
import {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext';

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] =  useState<string>('');

  const navigate = useNavigate()

 
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post('/login', {email, password})
    .then((response) => {
      setEmail('');
      setPassword('');

      navigate(`/todo/${response?.data?.user?._id}`)

    })
    .catch((error) => {
      console.log('error on register user', error)
    })
  }


  return (
    <div className="container">

    <div className="container_form">
      <div className="center">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <div className="txt_field">
              <input type="text" 
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               required/>                  <span></span>
                  <label>Email</label>
              </div>
              <div className="txt_field">
              <input type="password"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required/>                  <span></span>
                  <label>Password</label>
              </div>
              <div className="pass">Forget Password?</div>
              <input name="submit" type="Submit" value="Login"/>
              <div className="signup_link">
                  Not a Member ? <Link to={'/register'}>Signup</Link>
              </div>
          </form>
      </div>
    </div>
    </div>

  )
}

export default Login