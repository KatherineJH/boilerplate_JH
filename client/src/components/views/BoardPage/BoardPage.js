import React, { useEffect, useState  } from "react";
import "./board.css";
import Axios from "axios";
import moment from 'moment';
import '../LandingPage/LandingPage.css'


function BoardPage() {
    const [Blogs, setBlogs] = useState([]);
    const alertMessage = "Do you really want to delete this blog?";

    const fetchUploadedBlog = () => {
        Axios.get('api/blog/getBlogs')
        .then(response => {
            if (response.data.success) {
                console.log(response.data.blogs)
                setBlogs(response.data.blogs);
            } else {
                alert('Failed to get Blogs');
            }
        })
    };

    useEffect(() => {
        fetchUploadedBlog()
    }, []);

    const onClickDelete = (writer, blogId) => {
        const variables = {
            writer,
            blogId
        }

        if(window.confirm(alertMessage) === true){
            Axios.post('/api/blog/removeFromBoard', variables)
            .then(response => {
                if (response.data.success) { 
                    console.log(response.data.success);
                    fetchUploadedBlog()  
                } else {
                    alert("failed to remove.")
                }
            })
        }       
    };

    const renderCards = Blogs.map((blog, index) => {

        return <div key={index}  style={{display: 'flex', flexDirection: 'column'}} >
            <div>
                <a href={`/blog/${blog._id}`} >
                <img style={{ width: '100%' }} src={`http://localhost:5001/${blog.filePath}`} alt='Main pic' controls></img>
                </a>
            </div>
            <button onClick={() => onClickDelete(blog.writer, blog._id)}>
                Delete
            </button>
            <div style={{marginTop: 'auto'}}>
                <span>Title: {blog.title}</span><br />
                <span>Author: {blog.writer.name} </span><br />
                <span>Date: {moment(blog.createdAt).format("MMM Do YY")} </span>
                <br />
            </div>  
        </div>
    })

  return (
    <div style={{ width: '85%', margin: '1rem auto' }}>
        <span><a href="/blog/upload" style={{color:'black'}}><i className="fa fa-upload" style={{ fontSize:'2rem'}}></i></a></span>     
        <div>
            <h1>My Board</h1>
            <hr /><br />
        </div>
        <div className='grid-container' style={{ fontSize:'1.5rem'}}>
                {renderCards}
        </div>      
    </div>
  )
}

export default BoardPage;