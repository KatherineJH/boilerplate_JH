import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function BlogPage() {
    const {blogId} = useParams();
    const [Blog, setBlog] = useState([]);

    const blogVariable = {
        blogId: blogId
    }

    useEffect(() => {
        axios.post('/api/blog/getBlog', blogVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blog)
                    setBlog(response.data.blog)
                } else {
                    alert('Failed to get blog Info')
                }
            })
    }, [])

    if (Blog.writer) {
        return (
            <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                <span style={{ fontSize:'2rem'}}> {moment(Blog.updatedAt).format("MMM Do YY")} </span>
                <img style={{ width: '100%' }} src={`http://localhost:5001/${Blog.filePath}`} controls></img>
                <h1>Title: {Blog.title}</h1>
                <p>{Blog.description}</p>
            </div>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default BlogPage;

