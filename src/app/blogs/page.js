'use client'
import React, { useState } from 'react';

const page = () => {
    const [userInfo, setUserInfo] = useState();
    const getBlogs = async () =>{
        try 
        {
            const res = await fetch('/api/create' , { cache: 'no-store' });
            const data = await res.json();
            const blogs = data.blogs;
            console.log(blogs);
            setUserInfo(blogs);
        }
        catch(error)
        {
            console.log(error);
        }
    };
  return (
    <div>
        Blogs
        <button onClick={getBlogs}> Get Blogs </button>
        {
            userInfo && userInfo.map((elem)=>(
                <p key={elem._id}> {elem.title} </p>
            ))
        }
        <p> {userInfo?.title} </p>
    </div>
  )
}

export default page
