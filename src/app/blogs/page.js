'use client'
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  const getBlogs = async () => {
    try {
      const res = await fetch('/api/create', { cache: 'no-store' });
      const data = await res.json();
      const blogs = data.blogs;
      console.log(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Blogs
      {showButton && <button onClick={getBlogs}>Get Blogs</button>}
    </div>
  );
};

export default Page;
