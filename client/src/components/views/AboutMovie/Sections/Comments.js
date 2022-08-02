import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comments(props) {
    const user = useSelector(state => state.user);
    const [Comment, setComment] = useState("");

    const handleChange = (event) => {
        setComment(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault(); // prevent refreshing pages.

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <div>
            <br />
            <p style={{margin:'auto'}}> Share your opinions about {props.movieTitle} </p>
            <hr />
            {/* Comment Lists  */}
            {/* {console.log(props.CommentLists)} */}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}


            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }

            {/* Root Comment Form */}
            <div style={{ display: 'flex'}} >
                <form onSubmit={onSubmit} style={{ width:'100%' }}>
                    <textarea
                        style={{ height:'100px', borderRadius: '5px', fontSize:'18px' }}
                        onChange={handleChange}
                        value={Comment}
                        placeholder="write some comments"
                    />
                    <br />
                    <div style={{ display: 'flex', justifyContent:'center'}}>
                        <button style={{ width: '20%', height: '40px', fontSize:'1.5rem'}} onClick={onSubmit}>Submit</button>   
                    </div>            
                </form>
            </div>
            

        </div>
    )
}

export default Comments;