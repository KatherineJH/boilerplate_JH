import React, { useState } from 'react'
import { Comment, Avatar } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span style={{fontSize:'1rem'}} onClick={openReply} key="comment-basic-reply-to"> Reply to </span>
    ]

    return (
        <div>
            <Comment
                style={{fontSize:'1rem'}}
                actions={actions}
                author={
                    <p style={{fontSize:'18px'}}>
                        {props.comment.writer.name}
                    </p>
                }
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p style={{fontSize:'18px'}}>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply &&
                <form onSubmit={onSubmit}>
                    <div style={{ display: 'flex' }}>
                        <textarea
                            style={{ width: '100%', marginTop:'10',borderRadius: '5px', fontSize:'18px' }}
                            onChange={handleChange}
                            value={CommentValue}
                            placeholder='write some comments'
                        />
                        <button style={{ width: '20%', height: '45px'}} onClick={onSubmit}>Submit</button>   
                    </div>
                </form>
            }
        </div>
    )
}

export default SingleComment;