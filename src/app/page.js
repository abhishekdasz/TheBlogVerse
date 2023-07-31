'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
  const [loginUserId, setLoginUserId] = useState();
  const handleLoginUser = async () =>{
      try 
      {
          const res = await axios.get('/api/loginUserDetails');
          setLoginUserId(res.data.data.username)
          console.log(res.data.data.username);
      }
      catch(error)
      {
          console.log(error);
      }
  }
  useEffect(()=>{
    handleLoginUser();
  })
  return (
    <div>
      <h1> Welcome {loginUserId} </h1>
      <Link href='/blogs'> All Blogs </Link>
    </div>
  )
}

export default page
