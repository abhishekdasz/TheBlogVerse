import React from 'react';

const Page = () => {
  const getBlogs = async () => {
    try {
      const res = await fetch('/api/create', { cache:'no-store' });
      const data = await res.json();
      const blogs = data.blogs;
      console.log(blogs);
      return blogs;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Blogs
      <button onClick={getBlogs}>Get Blogs</button>
    </div>
  );
};

export default Page;
