import React from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BlogsCard = (props) => {
    const router = useRouter();
    const { id,username, createdAt, title, description, isUser, refreshBlogs } = props;
    const handleDelete = async () =>{
        try
        {
            const res = await axios.delete(`/api/blogs/delete/${id}`);
            console.log(res);
            alert("Blog deleted successfully");
            refreshBlogs();
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div className='blogs-card'>
        <div className="blog-user-details">
            <p> {username} </p>
            <p> Created at: {createdAt} </p>
        </div>
        
        <div className="blog-post">
            <h5> Title: {title} </h5>
            <p> Description: {description} </p>
        </div>
        
        <div className="blog-btns">
            {
            isUser && 
            ( 
                <div>
                    <Link href={`/editBlog/${id}`}>edit</Link> 
                    <button onClick={handleDelete}> delete </button>
                </div> 
            )
            }
        </div>

    </div>
  )
}

export default BlogsCard
