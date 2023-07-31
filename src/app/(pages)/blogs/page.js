'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import BlogsCard from '@/app/components/BlogsCard';

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

    const [loginUserId, setLoginUserId] = useState();
    const handleLoginUser = async () =>{
        try 
        {
            const res = await axios.get('/api/loginUserDetails');
            setLoginUserId(res.data.data._id)
            console.log(res.data.data._id);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        getBlogs();
        handleLoginUser();
    },[])
 
  return (
    <div>
        Blogs
        <Link href='/newBlog'> Create Your New Blog </Link>
        
        {
            userInfo && userInfo.map((elem)=>(
                <BlogsCard key={elem._id} id={elem._id} username={elem.username} title={elem.title} description={elem.description} isUser={elem.userInfo?._id === loginUserId} createdAt={elem.createdAt} /> 
            ))
        }
        <p> {userInfo?.title} </p>
    </div>
  )
}

export default page
