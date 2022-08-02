import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Catogory = [
    { value: 0, label: "Action" },
    { value: 1, label: "Romance" },
    { value: 2, label: "Comedy" },
    { value: 3, label: "Animation" },
    { value: 4, label: "Horror/Thriller" },
    { value: 5, label: "Music/Arts" },
]

function PostPage(props) {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Categories, setCategories] = useState("Action");
    const [FilePath, setFilePath] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeCategories = (event) => {
        setCategories(event.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        axios.post('/api/blog/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setFilePath(response.data.filePath);
                } else {
                    alert('failed to save the blog in server')
                }
            }
        )
    }

    const onSubmit = (event) => {

        event.preventDefault(); // prevent refreshing pages

        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            blogId: props.blogId,
            title: title,
            description: Description,
            filePath: FilePath,
            category: Categories,
        }

        axios.post('/api/blog/uploadBlog', variables)
            .then(response => {
                if (response.data.success) {
                    alert('a movie blog Uploaded Successfully')
                    navigate('/blog');
                } else {
                    alert('Failed to upload a movie blog')
                }
            })
    }

    return (
        <div style={{ maxWidth: '1500px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1> Upload a Movie Blog</h1>
            </div>

            <form onSubmit={onSubmit} style={{margin: 'auto'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin:'auto' }}>
                    {/* Dropzone  */}
                    {/* <FileUpload refreshFunction={updateImages} /> */}
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <i className="fa fa-plus" style={{ fontSize: "36px"}}></i>

                            </div>
                        )}
                    </Dropzone>
                    {/* <FileUpload /> */}
                    <div className='file' style={{display:"flex", alignItems:"center", textAlign:"center", fontSize:"1rem"}}>
                    {/* <img  style={{minWidth:'300px', width: '300px', height:'240px'}}  src={`http://localhost:5001/${FilePath}`}></img> */}
                        <p>{FilePath}</p>                      
                    </div>                    
                </div>

                <br /><br />
                <label>Title</label>
                <input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <textarea
                    onChange={handleChangeDecsription}
                    value={Description}
                    style={{height:'200px'}}
                />
                <br /><br />

                <select onChange={handleChangeCategories}  style={{fontSize:'1.5rem'}}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <button type="primary" onClick={onSubmit} style={{ fontSize:'2rem', width:'30%', margin:'auto'}}>
                    Submit
                </button>

            </form>
        </div>
    )
}

export default PostPage;