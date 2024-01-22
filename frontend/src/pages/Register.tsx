import axios from 'axios';
import  { SyntheticEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

 
  

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    axios.post('/register', {email, username, password})
    .then((response) => {
      console.log(response)
      setEmail('');
      setPassword('');
      setUsername('');
      navigate('/todo')

    })
    .catch((error) => {
      console.log('error on register user', error)
    })

  }
  return (
    
<div className="container">

<div className="container_form">
  <div className="center">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <div className="txt_field">
              <input type="text" 
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               required/>
              <span></span>
              <label>Email</label>
          </div>
          <div className="txt_field">
              <input type="text" name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required/>
              <span></span>
              <label>Username</label>
          </div>
          <div className="txt_field">
              <input type="password"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required/>
              <span></span>
              <label>Password</label>
          </div>
          <div className="pass">Forget Password?</div>
          <input type="Submit" className='submit'/>
          <div className="signup_link">
              Already a member ? <Link to={'/login'}>Sign In</Link>
          </div>
      </form>
  </div>
</div>
</div>  )
}
