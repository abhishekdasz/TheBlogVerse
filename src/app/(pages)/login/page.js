'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const router = useRouter();
  const[user, setUser] = useState({
    email:"",
    pwd:"",
  }) 
  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user, [name]: value
    })
  }
  const handleLogin = async (e) =>{
    e.preventDefault();
    try 
    {
      const res = await axios.post('/api/users/login', user);
      console.log(res);
      if(res.status === 200)
      {
        router.push('/');
        alert("Login succesful");
      }
      if(res.status === 400)
      {
        alert("User doen't exists, please Register first")
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (
    <div className='login-sec'>
      <div className="login-container">
        <form onSubmit={handleLogin} className='form'>
          <div className='inputs'>
            <label> Email:    </label>
            <input type="email"    name='email' value={user.email} onChange={handleInputs} placeholder='Enter your Email'  />
          </div>
          <div className="inputs">
            <label> Password: </label>
            <input type="password" name='pwd'   value={user.pwd}   onChange={handleInputs} placeholder='Enter your Password' />
          </div>
          <button> Submit </button>
        </form>
        <p className='already'> Haven't registered yet? <Link href="/register"> Register Now </Link> </p>
      </div>
    </div>
  )
}

export default page
