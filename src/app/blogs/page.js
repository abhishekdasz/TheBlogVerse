'use client'
import axios from 'axios';
import React from 'react';

const page = () => {
    const getBlogs = async () => {
        try {
            const res = await axios.get('/api/create');
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            const blogs = res.data.blogs;
            return blogs;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const [blogs, setBlogs] = React.useState(null);

    const handleClick = async () => {
        const newBlogs = await getBlogs();
        setBlogs(newBlogs);
    };

    return (
        <div>
            <h1>Blogs</h1>
            {blogs && blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
            ))}
            <button onClick={handleClick}>Get Blogs</button>
        </div>
    );
};

export default page;