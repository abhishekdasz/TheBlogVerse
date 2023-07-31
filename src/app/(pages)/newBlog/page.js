'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState();
    const handleLoginUser = async () =>{
        try 
        {
            const res = await axios.get('/api/loginUserDetails');
            setUserInfo(res.data.data._id)
            console.log(res.data.data._id);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    
    const [blogData, setBlogData] = useState({
        title:'', description:''
    })
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setBlogData({ ...blogData, [name]: value });
    }
    const userIdAndblogData = {...blogData, userInfo};
    const handleCreateBlog = async (e) =>{
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
    useEffect(()=>{
        handleLoginUser();
    },[])
  return (
    <div className='blogs-sec'>
        <form onSubmit={handleCreateBlog} className='blogs-container' >
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
