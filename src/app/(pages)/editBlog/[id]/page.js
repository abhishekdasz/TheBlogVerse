'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic'; // Import dynamic for dynamic import of ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamic import for ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor

const page = ({params}) => {
    const router = useRouter();
    const id = params.id;
    const [inputs, setInputs] = useState({});
    const getSingleBlogDetails = async () =>{
        try 
        {
            const res = await axios.get(`/api/singleBlog/${id}`);
            console.log(res.data);
            setInputs({title:res.data.blog.title, description:res.data.blog.description})
            console.log(res.data.blog)
        }
        catch(error)
        {
            console.log(error);
        }
    }
    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    const handleUpdate = async (e) =>{
        e.preventDefault();
        try 
        {
            const res = await axios.put(`/api/blogs/update/${id}`, inputs);
            console.log(res);
            alert("Blog updated successfully");
            router.push('/blogs')
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(()=>{
        getSingleBlogDetails();
    },[])
  return (
    <div className='create-edit-blog-sec'>
        <div className="create-edit-blog-container">
            <h2> Edit Your Blog Post </h2>
            <p> Revise and enhance your existing blog post with new ideas and updates. Edit your blog title and content below, and click 'Update Blog' to save your changes and share your updated post with the world. </p>
            <form onSubmit={handleUpdate} className='create-edit-blog-form'>
                <div className="create-edit-blogs-inputs">
                    <label> Edit your Blogs Title: </label>
                    <input type="text"  name='title' value={inputs.title} onChange={handleInputs}/>
                </div>
                <div className='create-edit-blogs-inputs'>
                    <label> Edit your Blogs Description: </label>
                    <ReactQuill value={inputs.description} onChange={(value) => setInputs({ ...inputs, description: value })}placeholder='Start writing your blog here...' modules={{
                toolbar: 
                {
                  container: 
                  [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean'],
                    [{ 'color': [] }]
                  ],
                },
              }}/>
                </div>
                <div className="create-edit-blog-btns">
                    <button className='create-edit-btn'> Update </button>
                    <Link href='/blogs' className='create-edit-btn'> Cancel </Link> 
                </div>
            </form>
        </div>
    </div>
  )
}

export default page
