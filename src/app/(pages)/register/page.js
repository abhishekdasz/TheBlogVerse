'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const[user, setUser] = useState({
    username:"",
    email:"",
    phone:"",
    pwd:"",
  }) 
  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user, [name]: value
    })
  }
  const handleRegister = async (e) =>{
    e.preventDefault();
    try 
    {
      const res = await axios.post('/api/users/register', user);
      console.log(res);
      if(res.status === 200)
      {
        router.push('/login');
        alert("Account created succesfully");
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }
  return (
    <div className='reg-sec'>
      <div className="reg-container">
        <form onSubmit={handleRegister}>
          <input type="text"  name='username' value={user.username} onChange={handleInputs} placeholder='Enter your Name' />
          <input type="email" name='email'    value={user.email}    onChange={handleInputs} placeholder='Enter your Email'  />
          <input type="phone" name='phone'    value={user.phone}    onChange={handleInputs} placeholder='Enter your Phone Number' />
          <input type="pwd"   name='pwd'      value={user.pwd}      onChange={handleInputs} placeholder='Create a Password' />
          <button> Submit </button>
        </form>
      </div>
    </div>
  )
}

export default page
