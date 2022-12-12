import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <div className='Logo'>
        <img src="https://miro.medium.com/max/640/1*W16WceS4vtyr2jst_4IEow.jpeg" alt='Logo' style={{ width: 200 }} />
        <p className='slogan'>You're not alone for I see you</p>
      </div>
      <div className='form'>

        <input type='email' placeholder="email" /><br />
        <input type='password' placeholder="password" /><br />
        <div className='Landing-buttons'>
        <button className='btn'>LogIn</button><br />
        <button className='btn'>signUp</button>

        </div>
        <div className='link'>

        <Link to="register">don't have an account? signUp</Link><br />
        <Link>forgotten password</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage