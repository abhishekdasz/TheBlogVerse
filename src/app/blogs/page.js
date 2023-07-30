'use client'
import axios from 'axios';
import React, { useState } from 'react';

const page = () => {
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
        }
        catch(error)
        {
            console.log(error);
        }
    }



    const [userInfo, setUserInfo] = useState();
    const getBlogs = async () =>{
        try 
        {
            const res = await axios.get('/api/blogs');
            const blogs = res.data;
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
        <form onSubmit={handleSubmit} >
            <input type="text" name='title' value={blogsData.title} onChange={handleInputs} />
            <textarea name="description" value={blogsData.description} onChange={handleInputs}/>
            <button> Submit </button>
        </form>
        <button onClick={getBlogs}> Get Blogs </button>
        {/* {
            userInfo && userInfo.map((elem)=>(
                <p key={elem._id}> {elem.title} </p>
            ))
        }
        <p> {userInfo?.title} </p> */}
    </div>
  )
}

export default page
