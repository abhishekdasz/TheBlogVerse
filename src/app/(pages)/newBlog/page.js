'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();

    const [blogsData, setBlogsData] = useState({
        title:'', description:''
    })
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setBlogsData({ ...blogsData, [name]: value });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try 
        {
            const res = await axios.post('/api/blogs', blogsData);
            const createdBlogs = res.data;
            console.log(createdBlogs);
            router.push('/blogs')
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit} >
            <input type="text" name='title' value={blogsData.title} onChange={handleInputs} />
            <textarea name="description" value={blogsData.description} onChange={handleInputs}/>
            <button> Submit </button>
        </form>
    </div>
  )
}

export default page
