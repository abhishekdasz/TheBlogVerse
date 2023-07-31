'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

const page = ({params}) => {
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
    useEffect(()=>{
        getSingleBlogDetails();
    },[])
  return (
    <div className='edit-blog-sec'>
        <div className="edit-blog-container">
            <form>
                <div className="input">
                    <input type="text"  name='title' value={inputs.title}/>
                </div>
                <div className='input'>
                    <textarea name='description' value={inputs.description}/>
                </div>
                <Link href='/blogs' className='button'> Cancel </Link> 
            </form>
        </div>
    </div>
  )
}

export default page
