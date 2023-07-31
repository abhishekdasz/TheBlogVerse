'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const userInfo = '64c7d28704a1c1293e13032b';
    const [blogData, setBlogData] = useState({
        title:'', description:''
    })
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setBlogData({ ...blogData, [name]: value });
    }
    const userIdAndblogData = {...blogData, userInfo};
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try 
        {
            console.log(blogData);
            console.log(userIdAndblogData);
            const res = await axios.post('/api/blogs', userIdAndblogData);
            const createdBlogs = res.data;
            console.log(createdBlogs);
            alert("Blog created successfully");
            router.push('/blogs');
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div className='blogs-sec'>
        <form onSubmit={handleSubmit} className='blogs-container' >
            <div className='input'>
                <label> Enter your Blogs Title: </label>
                <input type="text" name='title' value={blogData.title} onChange={handleInputs} />
            </div>
            <div className="input">
                <label> Enter your Blogs Description: </label>
                <textarea name="description" value={blogData.description} onChange={handleInputs}/>
            </div>
            <button> Submit </button>
        </form>
    </div>
  )
}

export default page
