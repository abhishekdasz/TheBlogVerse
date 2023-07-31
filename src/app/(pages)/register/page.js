'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
        <form onSubmit={handleRegister} className='form'>
          <div className='inputs'>
            <label> Name:      </label>
            <input type="text"     name='username' value={user.username} onChange={handleInputs} autoComplete='off' placeholder='Enter your Name' />
          </div>
          <div className='inputs'>
            <label> Email:     </label>
            <input type="email"    name='email'    value={user.email}    onChange={handleInputs} autoComplete='off' placeholder='Enter your Email'  />
          </div>
          <div className='inputs'>
            <label> Mobile No: </label>
            <input type="number"   name='phone'    value={user.phone}    onChange={handleInputs} autoComplete='off' placeholder='Enter your Phone Number' />
          </div>
          <div className='inputs'>
            <label> Password:  </label>
            <input type="password" name='pwd'      value={user.pwd}      onChange={handleInputs} placeholder='Create a Password' />
          </div>
          <button> Submit </button>
        </form>
        <p className='already'> Already registered? <Link href="/login"> Log In </Link> </p>
      </div>
    </div>
  )
}

export default page;
