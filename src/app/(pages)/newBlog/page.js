'use client'
// pages/newBlog.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic'; // Import dynamic for dynamic import of ReactQuill

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamic import for ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor

const NewBlog = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState();
  const handleLoginUser = async () => {
    try {
      const res = await axios.get('/api/loginUserDetails');
      setUserInfo(res.data.data._id);
      console.log(res.data.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlogData({ ...blogData, [name]: value });
  };

  const userIdAndblogData = { ...blogData, userInfo };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      console.log(blogData);
      console.log(userIdAndblogData);
      const res = await axios.post('/api/blogs', userIdAndblogData);
      const createdBlogs = res.data;
      console.log(createdBlogs);
      alert('Blog created successfully');
      router.push('/blogs');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoginUser();
  }, []);

  return (
    <div className='create-edit-blog-sec'>
      <div className='create-edit-blog-container'>
        <h2> Create Your Blog Post </h2>
        <p>
          Share your ideas, experiences, and stories with the world by creating your very own blog post. Craft your
          thoughts, express yourself, and inspire others through your writing. Start typing your blog title and content
          below, press 'Enter' to make a new paragraph and click 'Add Blog' to publish your masterpiece."
        </p>
        <form onSubmit={handleCreateBlog} className='create-edit-blog-form'>
          <div className='create-edit-blogs-inputs'>
            <label> Enter your Blogs Title: </label>
            <input type='text' name='title' value={blogData.title} onChange={handleInputs} />
          </div>
          <div className='create-edit-blogs-inputs'>
            <label> Enter your Blogs Description: </label>
            <ReactQuill
              value={blogData.description}
              onChange={(value) => setBlogData({ ...blogData, description: value })}
              placeholder='Start writing your blog here...'
            />
          </div>
          <div className='create-edit-blog-btns'>
            <button className='create-edit-btn'> Create New Blog </button>
            <Link href='/blogs' className='create-edit-btn'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
