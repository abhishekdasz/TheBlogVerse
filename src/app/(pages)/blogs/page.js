'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const page = () => {
    const [userInfo, setUserInfo] = useState();
    const getBlogs = async () =>{
        try 
        {
            const res = await axios.get('/api/blogs');
            const blogs = res.data.blogs;
            console.log(blogs);
            setUserInfo(blogs);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    useEffect(()=>{
        getBlogs();
    },[])
 
  return (
    <div>
        Blogs
        <button onClick={getBlogs}> Get Blogs </button>
        {
            userInfo && userInfo.map((elem)=>(
                <p key={elem._id}> title: {elem.title} </p>
            ))
        }
        <p> {userInfo?.title} </p>
    </div>
  )
}

export default page
