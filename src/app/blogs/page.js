'use client'
import axios from 'axios';
import React from 'react';

const page = async () => {
    const getBlogs = async () =>{
        try 
        {
            const res = await axios.get('/api/create');
            const blogs = res.data.blogs;
            console.log(blogs);
            return blogs;
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
    </div>
  )
}

export default page
