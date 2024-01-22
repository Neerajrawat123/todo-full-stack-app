import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='container'>
      <div className='content'>
        <div>
          <h1>Welcome to Todo app</h1>
        </div>
        <div className='btn_container'>
          <Link className='btn' to={'/login'}>Login</Link>
          <Link className='btn' to={'/register'}>Register</Link>
        </div>

      </div>
    </div>
  )
}

export default Landing