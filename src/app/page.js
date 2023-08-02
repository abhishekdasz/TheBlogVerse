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
  const handleLogOut = async () =>{
    try 
    {
      await axios.get('/api/logout');
      window.location.reload();
      // router.push('/login');
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
    <div className='home-section'>
      <div className="home-container">
        <div className="left-h">
          <div className="contents">
            <h1> <span style={{color:'rgb(255, 46, 99)'}} > Hi,</span> {loginUserId} </h1>
            <h2> <span style={{color:'rgb(255, 46, 99)'}}>Welcome  </span> to TheBlogVerse <br /> Discover a diverse collection of captivating blogs by talented writers. Our engaging blog website offers inspiring stories, insightful content, and a platform to share your thoughts and experiences. </h2>
            <div className="hero-btns">
              <Link href='/blogs' className='hero-btn'> Explore Blogs  </Link>
              {/* <Link href='/newBlog' className='hero-btn'> Create Your Blog </Link> */}
              <button className='hero-btn' onClick={handleLogOut}> Logout </button>
            </div>
          </div>
        </div>
        <div className="right-h">
          <img src="hero-img-hd.png" alt="home-img" />
        </div>
      </div>
    </div>
  )
}

export default page
