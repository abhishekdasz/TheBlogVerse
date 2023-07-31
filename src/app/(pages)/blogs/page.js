'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
        <Link href='/newBlog'> Create Your New Blog </Link>
        {
            userInfo && userInfo.map((elem)=>(
                <div key={elem._id}>
                    <h4> title: {elem.title}  </h4>
                    <p> description: {elem.description} </p> 
                </div>
            ))
        }
        <p> {userInfo?.title} </p>
    </div>
  )
}

export default page
