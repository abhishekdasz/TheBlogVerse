import Link from 'next/link';
import React from 'react'

const BlogsCard = (props) => {
    const { id,username, createdAt, title, description, isUser } = props;
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
            ( <Link href={`/editBlog/${id}`}>edit</Link> )
            }
        </div>

    </div>
  )
}

export default BlogsCard
