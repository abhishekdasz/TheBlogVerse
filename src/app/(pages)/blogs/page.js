'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import BlogsCard from '@/app/components/BlogsCard';

const page = () => {
    const formatTimestamp = (timestamp) => {
        const dateObj = new Date(timestamp);
        const formattedDate = dateObj.toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return formattedDate;
      };
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
    const [loginUsername, setLoginUsername] = useState();
    const handleLoginUser = async () =>{
        try 
        {
            const res = await axios.get('/api/loginUserDetails');
            setLoginUserId(res.data.data._id);
            setLoginUsername(res.data.data.username);
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
    <div className='all-blogs-sec'>
        <div className="all-blogs-container">
            <h1> Hey {loginUsername}, Discover amazing blogs! </h1>
        <div className="all-blogs-navigation">
            <Link href='/newBlog'> Create Your New Blog </Link>
            <Link href='/'> Back to Home </Link>
        </div>
        <div className="all-blogs-cards">
            {
            userInfo && userInfo.map((elem)=>(
                <BlogsCard key={elem._id} id={elem._id} username={elem.userInfo?.username} title={elem.title} description={elem.description} isUser={elem.userInfo?._id === loginUserId} createdAt={formatTimestamp(elem.createdAt)} refreshBlogs={getBlogs} /> 
            ))
            }
        </div>
        </div>
    </div>
  )
}

export default page;
