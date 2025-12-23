import React from 'react'
import { Login as loginComponent } from '../components' // by default import from index.js
function Login() {
  return (
    <div className='py-8'>
        <loginComponent />
    </div>
  )
}

export default Login